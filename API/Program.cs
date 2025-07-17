using Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

var app = builder.Build();

// Configure the HTTP request pipeline (middleware)
app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope. ServiceProvider;

try{

    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync(); //create database if db not created
    await DbInitializer.SeedData(context); // once we have db, seed data into it

}catch (Exception ex){
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration.");
}


app.Run();
