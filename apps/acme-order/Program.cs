using System;
using AcmeOrder.Auth;
using AcmeOrder.Configuration;
using AcmeOrder.Db;
using AcmeOrder.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Npgsql;
using Steeltoe.Common.Http.Discovery;
using Steeltoe.Discovery.Client;
using Steeltoe.Discovery.Eureka;
using Steeltoe.Extensions.Configuration.CloudFoundry;
using Steeltoe.Management.Endpoint;

var builder = WebApplication.CreateBuilder(args);
builder.AddCloudFoundryConfiguration();
var services = builder.Services;
var configuration = builder.Configuration;
builder.AddAllActuators();
builder.AddServiceDiscovery(c => c.UseEureka());

services.Configure<AcmeServiceSettings>(configuration.GetSection(nameof(AcmeServiceSettings)));

services.AddSingleton<IAcmeServiceSettings>(sp =>
    sp.GetRequiredService<IOptions<AcmeServiceSettings>>().Value);

switch (configuration["DatabaseProvider"])
{
    case "Sqlite":
        services.AddDbContext<OrderContext, SqliteOrderContext>();
        break;

    case "Postgres":
        NpgsqlConnection.GlobalTypeMapper.EnableDynamicJson();
        services.AddDbContext<OrderContext, PostgresOrderContext>();
        break;
}

services.AddHttpClient<OrderService>(c => c.BaseAddress = new Uri("https://acme-payment"))
    .AddServiceDiscovery();
services.AddControllers();
services.AddScoped<AuthorizeResource>();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PostgresOrderContext>();
    db.Database.Migrate();
}

app.UseDeveloperExceptionPage();
app.UseRouting();
app.MapControllers();
await app.RunAsync();