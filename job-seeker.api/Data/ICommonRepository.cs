using System.Collections.Generic;
using System.Threading.Tasks;

namespace job_seeker.api.Data
{
    public interface ICommonRepository
    {
        void Save<T>(T entity) where T: class;
        
        
    }
}