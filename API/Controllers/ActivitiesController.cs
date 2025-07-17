using System;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseApiController {
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync(); // good practice to use async when making db queries
    }

    [HttpGet("{id}")] //argument of id
    public async Task<ActionResult<Activity>> GetActivityDetail(string id){
        var activity = await context.Activities.FindAsync(id);

        if(activity == null) return NotFound(); //returns not found request

        return activity;
    }

}