using System.Collections.Generic;
using System.Threading.Tasks;
using job_seeker.api.Models;

namespace job_seeker.api.Data
{
    public interface IAdminRepository
    {
        Task<Employee> Save(Employee employee);
        Task<bool> UserExists(string username);
        Task<IEnumerable<Employee>> GetEmployee(string searchString);
        Task<IEnumerable<JobSeeker>> GetJobSeekerReport(JobSeekerReport jsReport);
        Task<IEnumerable<Job>> GetJobReport(JobReport jobReport);
        Task<IEnumerable<Employee>> GetEmployeeReport(EmployeeReport employeeReport);
    }

}
