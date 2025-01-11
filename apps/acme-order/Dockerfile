FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY bin/Release/net8.0/linux-x64/publish/ /app

EXPOSE 8086
ENTRYPOINT ["dotnet", "acme-order.dll"]
