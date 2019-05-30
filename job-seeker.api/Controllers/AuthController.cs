using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using job_seeker.api.Data;
using job_seeker.api.DataTransferObjects;
using job_seeker.api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;


namespace job_seeker.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;

        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config, ILogger<AuthController> logger)
        {
            this._config = config;
            this._repo = repo;
            this._logger = logger;

        }

        // Register new Job Seeker
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            try
            {
                userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

                if (await _repo.UserExists(userForRegisterDto.Username))
                    return BadRequest("Username already exists..!");

                var userToCreate = new User
                {
                    Username = userForRegisterDto.Username
                };

                var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

                return StatusCode(201);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Handling login
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            try
            {
                var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

                if (userFromRepo == null)
                {
                    return Unauthorized("Invalid User credentials that you have passed..!");
                }

                // Add variables to access globally like stroring in session
                var claims = new[]
                {
                    new Claim (ClaimTypes.NameIdentifier, userFromRepo.Id.ToString ()),
                    new Claim (ClaimTypes.Name, userFromRepo.Username),
                    
                };

                // AppSettings is created in Appsetting.json 
                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                // Decrypt the token
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = creds
                };

                var tokenhandler = new JwtSecurityTokenHandler();

                var token = tokenhandler.CreateToken(tokenDescriptor);

                //var user = _mapper.Map<UserForListDTO>(userFromRepo);

                // Logging testing workin
                // _logger.LogInformation("Index page says hello");


                // Returning an anonymous object with OK Status code
                return Ok(new
                {
                    token = tokenhandler.WriteToken(token),
                    userFromRepo.UserType,
                    userFromRepo.Username
                     
                });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}