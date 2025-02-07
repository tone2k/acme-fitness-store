using System.Text.Json.Serialization;

namespace AcmeOrder.Request;

public class CardRequest
{
    [JsonPropertyName("number")]
    public string Number { get; set; }

    [JsonPropertyName("expMonth")]
    public string ExpMonth { get; set; }

    [JsonPropertyName("expYear")]
    public string ExpYear { get; set; }

    [JsonPropertyName("ccv")]
    public string Ccv { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; }
}