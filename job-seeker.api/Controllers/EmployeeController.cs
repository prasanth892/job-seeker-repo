using System.Threading.Tasks;
using job_seeker.api.Data;
using job_seeker.api.Models;
using Microsoft.AspNetCore.Mvc;

namespace job_seeker.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository repo;

        public EmployeeController(IEmployeeRepository repo)
        {
            this.repo = repo;
        }



        // JOBS
        ///////////////////////////////////////////

        // Get Job seekers
        [HttpGet("getjobseekers")]
        public async Task<IActionResult> GetJobSeekers()
        {
            // if (username != User.FindFirst(ClaimTypes.NameIdentifier).Value)
            // {
            //     return Unauthorized();
            // }

            var jobSeekers = await repo.GetJobSeekerList();

            if (jobSeekers != null)
                return Ok(jobSeekers);

            return BadRequest("error in downloading");
        }


        // Get Jobseekers' photo lists
        [HttpGet("getjobseekersphotoes")]
        public async Task<IActionResult> GetJobseekersPhotoList()
        {
            // if (username != User.FindFirst(ClaimTypes.NameIdentifier).Value)
            // {
            //     return Unauthorized();
            // }

            var photo = await repo.GetPhotoList();

            if (photo != null)
                return Ok(photo);

            return BadRequest("error in downloading");
        }


        // Get searched jobseekers
        [HttpPost("getsearchedjobseekers/{searchString}")]
        public async Task<IActionResult> getsearchedjobseekers(string searchString)
        {
            // if (username != User.FindFirst(ClaimTypes.NameIdentifier).Value)
            // {
            //     return Unauthorized();
            // }

            var jobSeekers = await repo.SearchJobSeekerList(searchString);

            if (jobSeekers != null)
                return Ok(jobSeekers);

            return BadRequest("error in downloading");
        }


        // JOBS
        ///////////////////////////////////////////

        // Get searched jobs
        [HttpGet("getjobs/{searchString}")]
        public async Task<IActionResult> GetJobs(string searchString)
        {
            var result = await repo.GetJobs(searchString);

            return Ok(result);
        }

        // Save jobs
        [HttpPost("savejob/")]
        public async Task<IActionResult> SaveJob(Job job)
        {

            if(job == null)
                return BadRequest("No job details to save...!");

            var jobResult = await repo.SaveJob(job);

            if (jobResult != null)
                return Ok(jobResult);

            return BadRequest("No job details to save...!");
        }


    }
}