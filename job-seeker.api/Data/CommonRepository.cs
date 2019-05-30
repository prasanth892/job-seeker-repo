using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace job_seeker.api.Data
{
    public class CommonRepository : ICommonRepository
    {
        private readonly DataContext _context;
        public CommonRepository(DataContext context)
        {
            this._context = context;
        }

        public void Save<T>(T entity) where T : class
        {
                _context.Add(entity);
                _context.SaveChanges();
        }
    }
}