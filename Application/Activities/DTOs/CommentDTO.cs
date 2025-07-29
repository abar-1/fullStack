
namespace Application.Activities.DTOs;

public class CommentDTO
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public required string Body { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public required string UserId { get; set; }

    public required string DisplayName { get; set; }

    public string? ImageUrl { get; set; }
    
}