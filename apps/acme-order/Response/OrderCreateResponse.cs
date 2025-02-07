using System.Text.Json.Serialization;
using AcmeOrder.Services;

namespace AcmeOrder.Response;

public class OrderCreateResponse
{
    [JsonPropertyName("userid")]
    public string UserId { get; set; }

    [JsonPropertyName("order_id")]
    public string OrderId { get; set; }

    public Payment Payment { get; set; }
}