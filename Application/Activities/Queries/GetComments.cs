using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetComments
{
    public class Query : IRequest<Result<List<CommentDTO>>>
    {
        public required string ActivityId { get; set; }

    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<CommentDTO>>>
    {
        public async Task<Result<List<CommentDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var comments = await context.Comments
                .Where(x => x.ActivityId == request.ActivityId)
                .OrderByDescending(x => x.CreatedAt)
                .ProjectTo<CommentDTO>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<CommentDTO>>.Success(comments);
        }
    }
}