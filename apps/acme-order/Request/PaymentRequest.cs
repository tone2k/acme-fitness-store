using Newtonsoft.Json;

namespace AcmeOrder.Request;

public class PaymentRequest
{
    [JsonProperty("card")] public CardRequest Card { get; set; }
    [JsonProperty("total")] public string Total { get; set; }
}