using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AcmeOrder.Models;
using AcmeOrder.Response;
using AcmeOrder.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AcmeOrder.Controllers;

[Route("order")]
[ApiController]
public class OrderController(OrderService orderService) : ControllerBase
{
    [HttpPost("add")]
    [Authorize]
    public async Task<ActionResult<OrderCreateResponse>> Create(Order orderIn, CancellationToken cancellationToken)
    {
        var user = Request.HttpContext.User;
        var accessToken = await HttpContext.GetTokenAsync("access_token");
        return await orderService.CreateAsync(user, orderIn, accessToken, cancellationToken);
    }

    [HttpGet("all")]
    [Authorize]
    public ActionResult<List<OrderResponse>> Get()
    {
        return orderService.Get();
    }

    [HttpGet("{userId}", Name = "GetOrderByUser")]
    [Authorize]
    public ActionResult<List<OrderResponse>> Get(string userId)
    {
        var orderList = orderService.Get(userId);

        if (orderList == null || orderList.Count == 0)
        {
            return NotFound();
        }

        return orderList;
    }

    [Authorize]
    [HttpGet("successful")]
    public ActionResult<List<OrderResponse>> Successful()
    {
        return orderService.GetPaidOrdersAsResponses();
    }
}