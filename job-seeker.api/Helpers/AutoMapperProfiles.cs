using AutoMapper;
using job_seeker.api.DataTransferObjects;
using job_seeker.api.Models;

namespace job_seeker.api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Photo, PhotoForSaveDto>();
        }
    }
}