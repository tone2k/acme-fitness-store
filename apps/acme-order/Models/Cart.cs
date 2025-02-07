namespace AcmeOrder.Models;

public class Cart
{
    // ID is not present on incoming requests, so this is always null!
    public string Id { get; set; }
    public string Description { get; set; }
    public int Quantity { get; set; }
    public string Price { get; set; }
}