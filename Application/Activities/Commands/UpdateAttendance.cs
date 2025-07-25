using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Commands;

public class UpdateAttendance
{

    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }
    
    public class Handler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {

            var activity = await context.Activities
                .Include(a => a.Attendees)
                .ThenInclude(aa => aa.User)
                .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (activity == null)
                return Result<Unit>.Failure("Activity not found", 404);

            var user = await userAccessor.GetUserAsync();

            var attendance = activity.Attendees
                .FirstOrDefault(x => x.UserId == user.Id);

            var isHost = attendance != null && attendance.IsHost;

            if (isHost)
            {
                // Only toggle IsCancelled, do not change host attendance
                activity.IsCancelled = !activity.IsCancelled;
            }
            else
            {
                if (attendance != null)
                {
                    // User is not host and is not attending, remove them
                    activity.Attendees.Remove(attendance);
                }
                else
                {
                    // User is not host and is attending, add them
                    activity.Attendees.Add(new ActivityAttendee
                    {
                        User = user,
                        Activity = activity,
                        IsHost = false
                    });
                }
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            // Logic to update attendance
            // This is a placeholder for the actual implementation
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating attendance", 400);
        }
    }
}