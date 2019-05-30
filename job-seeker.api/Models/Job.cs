using System;

namespace job_seeker.api.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string JobTitle { get; set; }
        public string Sector { get; set; }
        public string State { get; set; }
        public string Type { get; set; }
        public string EducationLevel { get; set; }
        public string ProfessionalQualification { get; set; }
        public string SpecialSkill { get; set; }
        public string SpecialExperience { get; set; }
        public DateTime PostedDate { get; set; }
        public string PostedBy { get; set; }
        public string Status { get; set; } = "active";
        public Job()
        {
            PostedDate = DateTime.Now;
        }


    }
}