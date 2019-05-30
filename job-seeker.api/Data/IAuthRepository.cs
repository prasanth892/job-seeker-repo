using System.Threading.Tasks;
using job_seeker.api.Models;

namespace job_seeker.api.Data
{
    public interface IAuthRepository
    {
      Task<User> Register(User user, string password);    
      Task<User> Login(string name, string password);
      Task<bool> UserExists(string username);
    }
}