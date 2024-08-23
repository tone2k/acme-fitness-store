using Newtonsoft.Json;

namespace AcmeOrder.Request;

public class TokenRequest
{
    [JsonProperty("access_token")] public string AccessToken { get; set; }
}