using System.Collections.Generic;
using System.Threading.Tasks;
using job_seeker.api.Models;

namespace job_seeker.api.Data
{
    public interface IJobSeekerRepository
    {
        Task<JobSeeker> Save(JobSeeker jobSeeker);
        Task<JobSeeker> GetJobSeeker(string username);
        Task<Photo> GetPhoto(string id);

        // Task<IEnumerable<JobSeeker>> GetJobSeekerList();
        // Task<IEnumerable<Photo>> GetPhotoList();
        // Task<IEnumerable<JobSeeker>> SearchJobSeekerList(string searchString);

    }
}