using System;

namespace job_seeker.api.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactNumber { get; set; }
        public string Status { get; set; } = "active";
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime IsCreated { get; set; }

        public Employee()
        {
            IsCreated = DateTime.Now;
        }

    }
}