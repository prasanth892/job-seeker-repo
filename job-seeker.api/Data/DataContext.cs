using job_seeker.api.Models;
using Microsoft.EntityFrameworkCore;

namespace job_seeker.api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<JobSeeker> JobSeekers { get; set; }

        public DbSet<Photo> Photoes { get; set; }

        public DbSet<Job> Jobs { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Employee> Curriculam_Vitae { get; set; }
        public DbSet<Admin> Admin { get; set; }

    }
}