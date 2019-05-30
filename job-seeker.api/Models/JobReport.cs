using System;

namespace job_seeker.api.Models
{
    public class JobReport
    {
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public string Sector { get; set; }
        public string State { get; set; }
        public string Type { get; set; }
    }
}