namespace Application.Profiles.DTOs;

public class UserProfile
{
    public required string Id { get; set; } = string.Empty;
    public required string DisplayName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string? ImageUrl { get; set; } = string.Empty;
    public string? UserName { get; set; } = string.Empty;

    public bool Following { get; set; }

    public int FollowersCount { get; set; }

    public int FollowingCount { get; set; }

    // Additional properties can be added as needed
}