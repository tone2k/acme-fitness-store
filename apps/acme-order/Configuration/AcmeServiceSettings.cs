namespace AcmeOrder.Configuration;

public class AcmeServiceSettings : IAcmeServiceSettings
{
    public string AuthUrl { get; set; }
}

public interface IAcmeServiceSettings
{
    public string AuthUrl { get; set; }
}