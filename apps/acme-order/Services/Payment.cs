using System.Text.Json.Serialization;

namespace AcmeOrder.Services;

public class Payment
{
    public string Amount { get; set; }
    public string Message { get; set; }
    public bool Success { get; set; }

    public int Status { get; set; }
    [JsonPropertyName("transactionID")]
    public string TransactionId { get; set; }
}