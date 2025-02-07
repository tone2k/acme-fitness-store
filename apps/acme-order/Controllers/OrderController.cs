using System.Collections.Generic;
using System.Threading.Tasks;
using AcmeOrder.Auth;
using AcmeOrder.Models;
using AcmeOrder.Response;
using AcmeOrder.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace AcmeOrder.Controllers;

[Route("order")]
[ApiController]
public class OrderController(OrderService orderService) : ControllerBase
{
    [HttpPost("add/{userid}")]
    [ServiceFilter(typeof(AuthorizeResource))]
    public async Task<ActionResult<OrderCreateResponse>> Create(string userid, Order orderIn)
    {
        var authorization = HttpContext.Request.Headers[HeaderNames.Authorization].ToString();
        return await orderService.Create(userid, orderIn, authorization);
    }

    [HttpGet("all")]
    [ServiceFilter(typeof(AuthorizeResource))]
    public ActionResult<List<OrderResponse>> Get()
    {
        return orderService.Get();
    }

    [HttpGet("{userId}", Name = "GetOrderByUser")]
    [ServiceFilter(typeof(AuthorizeResource))]
    public ActionResult<List<OrderResponse>> Get(string userId)
    {
        var orderList = orderService.Get(userId);

        if (orderList == null || orderList.Count == 0)
        {
            return NotFound();
        }

        return orderList;
    }
}