using System;
using AcmeOrder.Auth;
using AcmeOrder.Configuration;
using AcmeOrder.Db;
using AcmeOrder.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Npgsql;
using Steeltoe.Configuration.CloudFoundry;
using Steeltoe.Configuration.CloudFoundry.ServiceBindings;
using Steeltoe.Connectors.PostgreSql;
using Steeltoe.Discovery.Eureka;
using Steeltoe.Discovery.HttpClients;
using Steeltoe.Management.Endpoint.Actuators.All;

var builder = WebApplication.CreateBuilder(args);
builder.AddCloudFoundryConfiguration();
builder.Configuration.AddCloudFoundryServiceBindings();
builder.Services.AddAllActuators();
builder.Services.AddEurekaDiscoveryClient();

builder.Services.Configure<AcmeServiceSettings>(builder.Configuration.GetSection(nameof(AcmeServiceSettings)));
builder.Services.AddSingleton<IAcmeServiceSettings>(sp =>
    sp.GetRequiredService<IOptions<AcmeServiceSettings>>().Value); 

switch (builder.Configuration["DatabaseProvider"])
{
    case "Sqlite":
        builder.Services.AddDbContext<OrderContext, SqliteOrderContext>();
        break;

    case "Postgres":
        NpgsqlConnection.GlobalTypeMapper.EnableDynamicJson();
        builder.AddPostgreSql();
        builder.Services.AddDbContext<OrderContext, PostgresOrderContext>();
        break;
}

builder.Services.AddHttpClient<OrderService>(c => c.BaseAddress = new Uri("https://acme-payment"))
    .AddServiceDiscovery();
builder.Services.AddControllers();
builder.Services.AddScoped<AuthorizeResource>();

var app = builder.Build();

await using var scope = app.Services.CreateAsyncScope();
await using var orderContext = scope.ServiceProvider.GetRequiredService<OrderContext>();
orderContext.Database.Migrate();

app.UseDeveloperExceptionPage();
app.UseRouting();
app.MapControllers();

app.Run();