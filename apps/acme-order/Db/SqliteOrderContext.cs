using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using AcmeOrder.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AcmeOrder.Db;

public class SqliteOrderContext(IConfiguration configuration) : OrderContext(configuration)
{
    private readonly JsonSerializerOptions _jsonSerializerOptions =
        new() { DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull };

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=sqlite.order.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("order");

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd()
                .IsRequired();

            entity.Property(e => e.Address)
                .HasColumnName("address")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, _jsonSerializerOptions),
                    v => JsonSerializer.Deserialize<Address>(v, _jsonSerializerOptions));

            entity.Property(e => e.Card)
                .HasColumnName("card")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, _jsonSerializerOptions),
                    v => JsonSerializer.Deserialize<Card>(v, _jsonSerializerOptions));

            entity.Property(e => e.Cart)
                .HasColumnName("cart")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, _jsonSerializerOptions),
                    v => JsonSerializer.Deserialize<ICollection<Cart>>(v, _jsonSerializerOptions));

            entity.Property(e => e.Date)
                .HasColumnName("date")
                .HasDefaultValue(DateTime.UtcNow);

            entity.Property(e => e.Delivery)
                .HasColumnName("delivery")
                .HasMaxLength(1000);

            entity.Property(e => e.Email)
                .HasColumnName("email")
                .HasMaxLength(1000);

            entity.Property(e => e.Firstname)
                .HasColumnName("firstname")
                .HasMaxLength(1000);

            entity.Property(e => e.Lastname)
                .HasColumnName("lastname")
                .HasMaxLength(1000);

            entity.Property(e => e.Paid)
                .HasColumnName("paid")
                .HasMaxLength(1000);

            entity.Property(e => e.Total)
                .HasColumnName("total")
                .HasMaxLength(1000);

            entity.Property(e => e.UserId)
                .HasColumnName("user_id")
                .HasMaxLength(1000);
        });
    }
}