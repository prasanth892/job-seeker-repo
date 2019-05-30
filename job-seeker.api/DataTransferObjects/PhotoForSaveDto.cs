using Microsoft.AspNetCore.Http;

namespace job_seeker.api.DataTransferObjects
{
    public class PhotoForSaveDto
    {
        public int Id { get; set; }
        public IFormFile File { get; set; }
        public string Username { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
    }
}