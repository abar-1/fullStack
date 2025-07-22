using System;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using Application.Activities.Queries;
using MediatR;
using Application.Activities.Commands;

using Application.Activities.DTOs;

namespace API.Controllers;

public class ActivitiesController : BaseApiController {
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")] //argument of id
    public async Task<ActionResult<Activity>> GetActivityDetail(string id){

        return HandleResult(await Mediator.Send(new GetActivityDetails.Query{Id = id}));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto){
        return HandleResult(await Mediator.Send(new CreateActivity.Command{ActivityDto = activityDto }));
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDTO activity){
        
       return HandleResult(await Mediator.Send(new EditActivity.Command{ActivityDTO = activity}));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id){
        return HandleResult(await Mediator.Send(new DeleteActivity.Command{Id = id}));
    }
}