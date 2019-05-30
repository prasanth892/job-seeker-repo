using System;

namespace job_seeker.api.Models
{
    public class Admin
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ContactNumber { get; set; }
        public string Status { get; set; } = "active";
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime IsCreated { get; set; }

        public Admin()
        {
            IsCreated = DateTime.Now;
        }
    }
}