using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Persistence;

namespace Applicaiton.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string DisplayName { get; set; }

        public string Bio { get; set; } = string.Empty;
    }
    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();

            user.DisplayName = request.DisplayName;
            user.Bio = request.Bio;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to update profile", 500);
        }
    }
}