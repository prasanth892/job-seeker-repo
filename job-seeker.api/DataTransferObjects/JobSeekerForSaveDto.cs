using System;
using Microsoft.AspNetCore.Http;

namespace job_seeker.api.DataTransferObjects
{
    public class JobSeekerForSaveDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string UserType { get; set; }
        public string Sector { get; set; }
        public string State { get; set; }
        public string Type { get; set; }
        public IFormFile ProfileImage { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Overview { get; set; }
        public string Min_Edu_Level { get; set; }
        public string Min_Num_Gsce_Passes { get; set; }
        public string Spec_Edu_Level { get; set; }
        public string Spec_Prof_Level { get; set; }
        public string Spec_Skill { get; set; }
        public string Spec_Experience { get; set; }
        public DateTime Dob { get; set; }
        public string PlaceOfBirth { get; set; }
        public string Gender { get; set; }
        public string Marital_status { get; set; }
        public float Height { get; set; }
        public string Religion { get; set; }
        public string Address { get; set; }
        public string ContactNumber { get; set; }
        public string EmailId { get; set; }
    }
}