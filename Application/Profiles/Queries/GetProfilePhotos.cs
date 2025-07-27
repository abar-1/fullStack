using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfilePhotos
{
    public class Query : IRequest<Result<List<Photo>>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Photo>>>
    {
        public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var photos = await context.Users
                .Where(p => p.Id == request.UserId)
                .SelectMany(p => p.Photos)
                .ToListAsync(cancellationToken);

            if (photos == null || !photos.Any()){
                return Result<List<Photo>>.Failure("No photos found for this user", 404);
            }
            return Result<List<Photo>>.Success(photos);
        }
    }
}