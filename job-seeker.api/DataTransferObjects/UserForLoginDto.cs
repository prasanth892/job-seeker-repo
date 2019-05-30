namespace job_seeker.api.DataTransferObjects
{
    public class UserForLoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string UserType { get; set; }
    }
}