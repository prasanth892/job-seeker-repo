using System.Collections.Generic;
using System.Threading.Tasks;
using job_seeker.api.Models;

namespace job_seeker.api.Data
{
    public interface IEmployeeRepository
    {
       Task<IEnumerable<Photo>> GetPhotoList();
       Task<IEnumerable<JobSeeker>> GetJobSeekerList();
       Task<IEnumerable<JobSeeker>> SearchJobSeekerList(string searchString);

        //Jobs
        /////////////////////////////////////////////
        Task<IEnumerable<Job>> GetJobs(string searchTerm);        
        Task<Job> SaveJob(Job job);



    }
}