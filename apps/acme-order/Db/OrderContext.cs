using AcmeOrder.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AcmeOrder.Db;

public abstract class OrderContext(IConfiguration configuration) : DbContext
{
    protected readonly IConfiguration Configuration = configuration;

    public virtual DbSet<Order> Orders { get; set; }
}