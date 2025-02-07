using System.Text.Json.Serialization;

namespace AcmeOrder.Request;

public class TokenRequest
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; }
}