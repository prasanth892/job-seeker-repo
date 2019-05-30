using System.Threading.Tasks;
using job_seeker.api.Data;
using job_seeker.api.Models;
using Microsoft.AspNetCore.Mvc;

namespace job_seeker.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IAdminRepository repo;
        public AdminController(DataContext context, IAdminRepository repo)
        {
            this.repo = repo;
            this.context = context;
        }

        // Get Employees
        [HttpGet("getemployees/{searchString}")]
        public async Task<IActionResult> GetEmployees(string searchString)
        {
            
            var result = await repo.GetEmployee(searchString);

            return Ok(result);
        }


        // Save Employee
        [HttpPost("saveemployee")]
        public async Task<IActionResult> Save(Employee employee)
        {

            var result = await repo.Save(employee);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest("Error in saving employee");
        }


        // Get Report Job Seeker
        [HttpGet("getreportjobseeker")]
        public async Task<IActionResult> GetReportJobSeeker([FromQuery] JobSeekerReport jsReport)
        {
            var result = await repo.GetJobSeekerReport(jsReport);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest("Error in saving employee");
        }

        // Get Report Jobs
        [HttpGet("getreportjob")]
        public async Task<IActionResult> GetReportJob([FromQuery] JobReport jsReport)
        {
            var result = await repo.GetJobReport(jsReport);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest("Error in saving employee");
        }

        // Get Report Employee
        [HttpGet("getreportemployee")]
        public async Task<IActionResult> GetReportEmployee([FromQuery] EmployeeReport employeeReport)
        {
            var result = await repo.GetEmployeeReport(employeeReport);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest("Error in saving employee");
        }

    }
}