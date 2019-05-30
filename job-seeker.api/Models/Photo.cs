using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace job_seeker.api.Models
{
    public class Photo
    {
        public int Id { get; set; }        
        public string Username { get; set; }
        public string Url { get; set; }
        public string PublicId  { get; set; }
        
    }
}