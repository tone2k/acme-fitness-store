using System.Text.Json.Serialization;

namespace AcmeOrder.Request;

public class PaymentRequest
{
    [JsonPropertyName("card")]
    public CardRequest Card { get; set; }

    [JsonPropertyName("total")]
    public string Total { get; set; }
}