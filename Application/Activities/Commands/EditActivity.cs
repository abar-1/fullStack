using System;
using MediatR;
using Persistence;
using SQLitePCL;
using Domain;
using AutoMapper;
using Application.Core;
using Application.Activities.DTOs;

namespace Application.Activities.Commands;

public class EditActivity{

    public class Command : IRequest<Result<Unit>>{
        public required EditActivityDTO ActivityDTO { get; set;}
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>{

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken){
            var activity = await context.Activities
                .FindAsync([request.ActivityDTO.Id], cancellationToken);

             if(activity == null) return Result<Unit>.Failure("Activity not found", 404);

            mapper.Map(request.ActivityDTO, activity);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
                    
            if(!result) return Result<Unit>.Failure("Failed to edit the activity", 400);

            return Result<Unit>.Success(Unit.Value);
           
        }
    }
}