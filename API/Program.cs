using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Activities.Queries;
using Application.Core;
using AutoMapper;
using FluentValidation;
using Application.Activities.Validators;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("http://localhost:3000", "https://localhost:3000");
    });
});
builder.Services.AddMediatR(x => { 
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));
    });
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddTransient<ExceptionMiddleware>();
var app = builder.Build();

// Configure the HTTP request pipeline (middleware)
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors("CorsPolicy");
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
