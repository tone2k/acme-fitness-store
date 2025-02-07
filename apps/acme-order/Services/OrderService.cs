using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using AcmeOrder.Db;
using AcmeOrder.Models;
using AcmeOrder.Request;
using AcmeOrder.Response;
using Microsoft.Extensions.Logging;

namespace AcmeOrder.Services;

public class OrderService(PostgresOrderContext context, ILogger<OrderService> logger, HttpClient httpClient)
{
    private const string PendingTransactionId = "pending";
    private readonly OrderContext _context = context;

    public async Task<OrderCreateResponse> Create(string userid, Order orderIn, string authorization)
    {
        var order = new Order
        {
            Paid = "pending",
            UserId = userid,
            Firstname = orderIn.Firstname,
            Lastname = orderIn.Lastname,
            Total = orderIn.Total,
            Address = orderIn.Address,
            Email = orderIn.Email,
            Delivery = orderIn.Delivery,
            Card = orderIn.Card,
            Cart = orderIn.Cart
        };

        var payment = await MakePayment(orderIn.Total, order.Card, authorization, cancellationToken);
        logger.LogDebug("Received payment response transactionId {transactionId}", payment.TransactionId);

        if (string.Equals(PendingTransactionId, payment.TransactionId)) return new OrderCreateResponse();

        order.Paid = payment.TransactionId;

        var savedOrder = SaveOrder(order);

        return new OrderCreateResponse
        {
            UserId = userid,
            OrderId = savedOrder.Id.ToString(),
            Payment = payment
        };
    }

    public List<OrderResponse> Get()
    {
        return FromOrderToOrderResponse(_context.Orders.ToList());
    }

    public List<OrderResponse> Get(string userId)
    {
        return FromOrderToOrderResponse(_context.Orders.Where(o => o.UserId == userId).ToList());
    }

    private Order SaveOrder(Order order)
    {
        logger.LogDebug("Attempting to Save Order {order}", order);
        var saved = _context.Orders.Add(order).Entity;
        _context.SaveChanges();
        logger.LogDebug("Saved Order {saved}", saved);
        return saved;
    }

    private async Task<Payment> MakePayment(string total, Card card, string authorization)
    {
        var paymentRequest = new PaymentRequest
        {
            Card = new CardRequest
            {
                Number = card.Number,
                ExpMonth = card.ExpMonth,
                ExpYear = card.ExpYear,
                Ccv = card.Ccv,
                Type = card.Type
            },
            Total = total
        };

        var jsonString = JsonSerializer.Serialize(paymentRequest);
        var data = new StringContent(jsonString, Encoding.UTF8, "application/json");

        logger.LogDebug("Making Payment Request for {total} to {baseurl}/pay", total, httpClient.BaseAddress);
        var request = new HttpRequestMessage(HttpMethod.Post, "/pay")
        {
            Content = data
        };
        _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var response = await httpClient.SendAsync(request, cancellationToken);

        if (response.StatusCode != HttpStatusCode.OK && response.StatusCode != HttpStatusCode.Unauthorized &&
            response.StatusCode != HttpStatusCode.BadRequest &&
            response.StatusCode != HttpStatusCode.PaymentRequired)
        {
            return new Payment();
        }

        return await response.Content.ReadFromJsonAsync<Payment>(cancellationToken);
    }

    private static List<OrderResponse> FromOrderToOrderResponse(IEnumerable<Order> orderList)
    {
        return orderList.Select(order =>
            new OrderResponse
            {
                Userid = order.UserId,
                Firstname = order.Firstname,
                Lastname = order.Lastname,
                Address = order.Address,
                Email = order.Email,
                Delivery = order.Delivery,
                Card = order.Card,
                Cart = order.Cart,
                Total = order.Total
            }).ToList();
    }
}