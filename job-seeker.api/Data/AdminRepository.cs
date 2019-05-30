using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_seeker.api.Models;
using Microsoft.EntityFrameworkCore;

namespace job_seeker.api.Data
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DataContext context;
        public AdminRepository(DataContext context)
        {
            this.context = context;

        }

        // Get existing employees
        public async Task<IEnumerable<Employee>> GetEmployee(string searchString)
        {
            if (searchString == "all")
            {
                var allResult = context.Employees;
                return allResult;
            }

            var searchResult = await context.Employees.Where(j =>
            j.Id.ToString() == searchString ||
            j.FirstName.Contains(searchString) ||
            j.LastName.Contains(searchString) ||
            j.ContactNumber.ToString().Contains(searchString) ||
            j.Status.Contains(searchString) ||
            j.Username.Contains(searchString) ||
            j.Password.Contains(searchString)
            )
            .ToListAsync();

            return searchResult;
        }

        // Get job-seeker report
        public async Task<IEnumerable<JobSeeker>> GetJobSeekerReport(JobSeekerReport jsReport = null)
        {
            if (jsReport.Education == "education" && jsReport.Sector == "sector" && jsReport.State == "state" && jsReport.Type == "type")
            {
                var resultAll = context.JobSeekers.Where(j =>
               j.IsCreated >= jsReport.StartDate &&
               j.IsCreated <= jsReport.FinishDate);

                return resultAll;
            }

            if (jsReport.Education != null && jsReport.Sector == "sector" && jsReport.State == "state" && jsReport.Type == "type")
            {
                var resultAll = context.JobSeekers.Where(j => j.minEduLvl == jsReport.Education);
                return resultAll;
            }

            if (jsReport.Education == "education" && jsReport.Sector != null && jsReport.State == "state" && jsReport.Type == "type")
            {
                var resultAll = context.JobSeekers.Where(j => j.Sector == jsReport.Sector);
                return resultAll;
            }

            if (jsReport.Education == "education" && jsReport.Sector == "sector" && jsReport.State != null && jsReport.Type == "type")
            {
                var resultAll = context.JobSeekers.Where(j => j.State == jsReport.State);
                return resultAll;
            }

            if (jsReport.Education == "education" && jsReport.Sector == "sector" && jsReport.State == "state" && jsReport.Type != null)
            {
                var resultAll = context.JobSeekers.Where(j => j.Type == jsReport.Type);
                return resultAll;
            }

            var result = await context.JobSeekers.Where(
                j => j.minEduLvl == jsReport.Education &&
                j.Sector == jsReport.Sector &&
                j.State == jsReport.State &&
                j.Type == jsReport.Type &&
                j.IsCreated >= jsReport.StartDate &&
                j.IsCreated <= jsReport.FinishDate
            ).ToListAsync();

            return result;
        }

        // Get job report
        public async Task<IEnumerable<Job>> GetJobReport(JobReport jsReport = null)
        {
            if (jsReport.Sector == "sector" && jsReport.State == "state" && jsReport.Type == "type")
            {
                var resultAll = context.Jobs.Where(j =>
               j.PostedDate >= jsReport.StartDate &&
               j.PostedDate <= jsReport.FinishDate);

                return resultAll;
            }

            if (jsReport.Sector != null && jsReport.State == "state" && jsReport.Type == "type")
            {
                var resultAll = context.Jobs.Where(j => j.Sector == jsReport.Sector);
                return resultAll;
            }

            if (jsReport.Sector == "sector" && jsReport.State != null && jsReport.Type == "type")
            {
                var resultAll = context.Jobs.Where(j => j.State == jsReport.State);
                return resultAll;
            }

            if (jsReport.Sector == "sector" && jsReport.State == "state" && jsReport.Type != null)
            {
                var resultAll = context.Jobs.Where(j => j.Type == jsReport.Type);
                return resultAll;
            }

            var result = await context.Jobs.Where(j =>
                j.Sector == jsReport.Sector &&
                j.State == jsReport.State &&
                j.Type == jsReport.Type &&
                j.PostedDate >= jsReport.StartDate &&
                j.PostedDate <= jsReport.FinishDate
            ).ToListAsync();

            return result;
        }


        // Get existing employees
        public async Task<IEnumerable<Employee>> GetEmployeeReport(EmployeeReport employeeReport = null)
        {
            if (employeeReport.Status == "status")
            {
                var resultAll = context.Employees.Where(j =>
               j.IsCreated >= employeeReport.StartDate &&
               j.IsCreated <= employeeReport.FinishDate);

                return resultAll;
            }

            var result = await context.Employees.Where(j =>
                j.Status == employeeReport.Status &&
                j.IsCreated >= employeeReport.StartDate &&
                j.IsCreated <= employeeReport.FinishDate
            ).ToListAsync();

            return result;
        }

        // Save new employee
        public async Task<Employee> Save(Employee employee)
        {
            try
            {
                var checkExisting = await context.Employees.FirstOrDefaultAsync(u => u.Username == employee.Username);

                if (checkExisting == null)
                {
                    var user = new User();

                    byte[] passwordHash, passwordSalt;

                    CreatePasswordHash(employee.Password, out passwordHash, out passwordSalt);

                    user.Username = employee.Username;
                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.UserType = "employee";

                    var info = await context.Users.AddAsync(user);
                    var data = await context.SaveChangesAsync();

                    if (data > 0)
                    {
                        await context.Employees.AddAsync(employee);
                        await context.SaveChangesAsync();

                        return employee;
                    }

                    return null;
                }
                else
                {
                    checkExisting.ContactNumber = employee.ContactNumber;
                    checkExisting.FirstName = employee.FirstName;
                    checkExisting.LastName = employee.LastName;
                    checkExisting.Password = employee.Password;
                    checkExisting.Status = employee.Status;
                    // checkExisting.Username = employee.Username;

                    context.Entry(checkExisting).State = EntityState.Modified;

                    await context.SaveChangesAsync();

                    return checkExisting;
                }
            }
            catch (Exception )
            {
                return null;

            }


        }

        // Check any user exists under the same name
        public async Task<bool> UserExists(string username)
        {
            if (await context.Users.AnyAsync(u => u.Username == username))
                return true;
            else
                return false;
        }



        // Adding salt into the password hash
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }
}