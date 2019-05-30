using System;

namespace job_seeker.api.Models
{
    public class JobSeeker
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string UserType { get; set; }
        public string Sector { get; set; }
        public string State { get; set; }
        public string Type { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Overview { get; set; }
        public string minEduLvl { get; set; }
        public string minNumGscePasses { get; set; }
        public string specificEduLvl { get; set; }
        public string specificProfessionalLvl { get; set; }
        public string specificSkill { get; set; }
        public string specificExperience { get; set; }
        public DateTime Dob { get; set; }
        public string Gender { get; set; }
        public string maritalStatus { get; set; }
        public float Height { get; set; }
        public string Religion { get; set; }
        public string Address { get; set; }
        public string ContactNumber { get; set; }
        public string email { get; set; }
        public DateTime IsCreated { get; set; }

        public JobSeeker()
        {
            IsCreated= DateTime.Now;
        }
    }
}