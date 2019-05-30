using System.ComponentModel.DataAnnotations;

namespace job_seeker.api.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string UserType { get; set; }
        
    }
}