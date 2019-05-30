using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_seeker.api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace job_seeker.api.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext context;
        
        // Constructor dependency injection
        public EmployeeRepository(DataContext context)
        {
            this.context = context;
        }

        // Jobseeker
        //////////////////////////////////////
        public async Task<IEnumerable<Photo>> GetPhotoList()
        {
            var photoList = await context.Photoes.ToListAsync();

            return photoList;
        }

        public async Task<IEnumerable<JobSeeker>> GetJobSeekerList()
        {
            var jobSeekerList = await context.JobSeekers.ToListAsync();

            return jobSeekerList;
        }

        public async Task<IEnumerable<JobSeeker>> SearchJobSeekerList(string searchString)
        {
            if (searchString == "all")
            {
                var allResult = context.JobSeekers;
                return allResult;
            }

            var searchResult = await context.JobSeekers.Where(j =>
                j.FirstName.Contains(searchString) ||
                j.LastName.Contains(searchString) ||
                j.Sector.Contains(searchString) ||
                j.State.Contains(searchString) ||
                j.Type.Contains(searchString) ||
                j.minEduLvl.Contains(searchString) ||
                j.minNumGscePasses.Contains(searchString) ||
                j.specificEduLvl.Contains(searchString) ||
                j.specificProfessionalLvl.Contains(searchString) ||
                j.specificSkill.Contains(searchString) ||
                j.specificExperience.Contains(searchString) ||
                j.Gender.Contains(searchString) ||
                j.maritalStatus.Contains(searchString)
                ).ToListAsync();

            return searchResult;
        }

        // JOBS
        ////////////////////////////////////////////////////////////////////////
        public async Task<IEnumerable<Job>> GetJobs(string searchString)
        {
            if (searchString == "all")
            {
                var allResult = context.Jobs;
                return allResult;
            }

            if (searchString == "all-jobseeker")
            {
                var allResult = context.Jobs.Where(j => j.Status == "active");
                return allResult;
            }

            var searchResult = await context.Jobs.Where(j =>
            j.Id.ToString() == searchString ||
            j.Sector.Contains(searchString) ||
            j.State.Contains(searchString) ||
            j.Type.Contains(searchString) ||
            j.EducationLevel.Contains(searchString) ||
            j.ProfessionalQualification.Contains(searchString) ||
            j.SpecialSkill.Contains(searchString) ||
            j.SpecialExperience.Contains(searchString) ||
            j.PostedDate.ToString() == searchString ||
            j.PostedBy.Contains(searchString) ||
            j.JobTitle.Contains(searchString)
            ).OrderByDescending(o => o.State)
            .ToListAsync();

            return searchResult;
        }

        public async Task<Job> SaveJob(Job job)
        {
            var checkExisting = await context.Jobs.FirstOrDefaultAsync(u => u.Id == job.Id);

            if (checkExisting == null)
            {
                await context.Jobs.AddAsync(job);
                var result = await context.SaveChangesAsync();

                if (result > 0)
                    return job;
            }
            else
            {
                checkExisting.JobTitle = job.JobTitle;
                checkExisting.PostedBy = job.PostedBy;
                checkExisting.EducationLevel = job.EducationLevel;
                checkExisting.ProfessionalQualification = job.ProfessionalQualification;
                checkExisting.SpecialSkill = job.SpecialSkill;
                checkExisting.SpecialExperience = job.SpecialExperience;
                checkExisting.Sector = job.Sector;
                checkExisting.State = job.State;
                checkExisting.Type = job.Type;
                checkExisting.Status = job.Status;

                context.Entry(checkExisting).State = EntityState.Modified;

                await context.SaveChangesAsync();

                return checkExisting;
            }

            return null;

        }
    }


}
