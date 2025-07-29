using System;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile{

    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<EditActivityDTO, Activity>();
        CreateMap<Activity, ActivityDTO>()
            .ForMember(dest => dest.HostId, opt => opt.MapFrom(src => src.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id))
            .ForMember(dest => dest.HostDisplayName, opt => opt.MapFrom(src => src.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName));
        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.UserName, o => o.MapFrom(s => s.User.UserName))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id));

        CreateMap<User, UserProfile>();

        CreateMap<Comment, CommentDTO>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));
            
            
    }
}