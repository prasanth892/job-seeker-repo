using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using job_seeker.api.Data;
using job_seeker.api.DataTransferObjects;
using job_seeker.api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace job_seeker.api.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class JobSeekerController : ControllerBase
    {
        private readonly IJobSeekerRepository _repo;
        private readonly IHostingEnvironment _hostingEnvironment;

        public JobSeekerController(IJobSeekerRepository repo, IHostingEnvironment hostingEnvironment)
        {
            this._repo = repo;
            this._hostingEnvironment = hostingEnvironment;
        }

        // Save Jobseeker
        [HttpPost("jobseekersave")]
        public async Task<IActionResult> Save(JobSeeker jobSeeker)
        {   
            var user = await _repo.Save(jobSeeker);

            if (user != null)
                return Ok(user);
            else
                return BadRequest("Error in Saving");

        }


        // Get Jobseekers
        [HttpGet("getjobseeker")]
        public async Task<IActionResult> GetJobSeeker(string username)
        {
            // if (username != User.FindFirst(ClaimTypes.NameIdentifier).Value)
            // {
            //     return Unauthorized();
            // }
                        
            var jobSeeker = await _repo.GetJobSeeker(username);
            
            if(jobSeeker != null)
            return Ok(jobSeeker);

            return BadRequest("error in downloading");
        }






    }
}