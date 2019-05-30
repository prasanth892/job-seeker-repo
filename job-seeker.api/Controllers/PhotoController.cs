using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using job_seeker.api.Data;
using job_seeker.api.DataTransferObjects;
using job_seeker.api.Helpers;
using job_seeker.api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace job_seeker.api.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IJobSeekerRepository _jobSeekerRepo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly DataContext _context;
        private Cloudinary _cloudinary;

        public PhotoController(IJobSeekerRepository jobSeekerRepo, IMapper mapper,
        IOptions<CloudinarySettings> cloudinaryConfig, DataContext context)
        {
            this._jobSeekerRepo = jobSeekerRepo;
            this._mapper = mapper;
            this._cloudinaryConfig = cloudinaryConfig;
            this._context = context;
            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }


        // Get Photo from Cloudinary API
        [HttpGet("{username}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(string username)
        {
            var photoFromRepo = await _jobSeekerRepo.GetPhoto(username);

            return Ok(photoFromRepo);
        }


        // Save photo into Cloudinary API
        [HttpPost("addphoto")]
        public async Task<IActionResult> AddPhotoUser([FromForm]PhotoForSaveDto photoForSave)
        {

            // CHeck wihether workign or not
            // if (userName != User.FindFirst(ClaimTypes.NameIdentifier).Value)
            // {
            //     return Unauthorized();
            // }

            string username = photoForSave.Username;

            var userFromRepo = await _jobSeekerRepo.GetJobSeeker(username);

            var file = photoForSave.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                        .Width(500).Height(500).Crop("fill")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForSave.Url = uploadResult.Uri.ToString();
            photoForSave.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForSave);

            _context.Photoes.Add(photo);
            var result = _context.SaveChanges();

            if (result > 0)
            {                
                return  Ok(photo.Url);
            }

            return BadRequest("Error in uploading photo");

        }
    }
}