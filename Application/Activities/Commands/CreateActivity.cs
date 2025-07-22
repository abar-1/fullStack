using System;
using MediatR;
using Domain;
using Persistence;
using AutoMapper;
using FluentValidation;
using Application.Core;
using Application.Activities.DTOs;

namespace Application.Activities.Commands;

public class CreateActivity {
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
       
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken){
                       
            var activity = mapper.Map<Activity>(request.ActivityDto);

            context.Activities.Add(activity);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
                    
            if(!result) return Result<String>.Failure("Failed to create the activity", 400);

            return Result<String>.Success(activity.Id);
        }
    }
}