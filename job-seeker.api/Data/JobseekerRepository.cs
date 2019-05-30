using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using job_seeker.api.Models;
using Microsoft.EntityFrameworkCore;

namespace job_seeker.api.Data
{
    public class JobseekerRepository : IJobSeekerRepository
    {
        private readonly DataContext _context;


        public JobseekerRepository(DataContext context)
        {
            this._context = context;
        }

        // Not used yet
        public async Task<JobSeeker> GetJobSeeker(string username)
        {
            var jobSeeker = await _context.JobSeekers.FirstOrDefaultAsync(user => user.Username == username);

            return jobSeeker;
        }

        public async Task<Photo> GetPhoto(string username)
        {
            var photo = await _context.Photoes.OrderByDescending(o => o.Id)
                        .FirstOrDefaultAsync(p => p.Username == username);

            return photo;
        }

        public async Task<JobSeeker> Save(JobSeeker jobSeeker)
        {
            try
            {

                var userToGetCredential = await _context.Users.FirstOrDefaultAsync(user => user.Username == jobSeeker.Username);

                jobSeeker.PasswordHash = userToGetCredential.PasswordHash;
                jobSeeker.PasswordSalt = userToGetCredential.PasswordSalt;
                jobSeeker.UserType = userToGetCredential.UserType;

                var checkExisting = await _context.JobSeekers.FirstOrDefaultAsync(user => user.Username == jobSeeker.Username);

                if (checkExisting == null)
                {
                    await _context.JobSeekers.AddAsync(jobSeeker);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    checkExisting.Sector = jobSeeker.Sector;
                    checkExisting.State = jobSeeker.State;
                    checkExisting.Type = jobSeeker.Type;
                    checkExisting.Sector = jobSeeker.Sector;
                    checkExisting.FirstName = jobSeeker.FirstName;
                    checkExisting.LastName = jobSeeker.LastName;
                    checkExisting.Overview = jobSeeker.Overview;
                    checkExisting.minEduLvl = jobSeeker.minEduLvl;
                    checkExisting.minNumGscePasses = jobSeeker.minNumGscePasses;
                    checkExisting.specificEduLvl = jobSeeker.specificEduLvl;
                    checkExisting.specificProfessionalLvl = jobSeeker.specificProfessionalLvl;
                    checkExisting.specificSkill = jobSeeker.specificSkill;
                    checkExisting.specificExperience = jobSeeker.specificExperience;
                    checkExisting.Dob = jobSeeker.Dob;
                    checkExisting.Gender = jobSeeker.Gender;
                    checkExisting.maritalStatus = jobSeeker.maritalStatus;
                    checkExisting.Height = jobSeeker.Height;
                    checkExisting.Religion = jobSeeker.Religion;
                    checkExisting.Address = jobSeeker.Address;
                    checkExisting.ContactNumber = jobSeeker.ContactNumber;
                    checkExisting.email = jobSeeker.email;

                    _context.Entry(checkExisting).State = EntityState.Modified;

                    await _context.SaveChangesAsync();
                }

                return jobSeeker;
            }
            catch (Exception)
            {
                return null;
            }
        }

// delete

        // public async Task<IEnumerable<JobSeeker>> GetJobSeekerList()
        // {
        //     var jobSeekerList = await _context.JobSeekers.ToListAsync();

        //     return jobSeekerList;
        // }

        // public async Task<IEnumerable<Photo>> GetPhotoList()
        // {
        //     var photoList = await _context.Photoes.ToListAsync();

        //     return photoList;
        // }


        // public async Task<IEnumerable<JobSeeker>> SearchJobSeekerList(string searchString)
        // {
        //     if(searchString == "all")
        //     {
        //         var allResult =  _context.JobSeekers;
        //         return allResult;
        //     }

        //     var searchResult = await _context.JobSeekers.Where(j => 
        //         j.FirstName.Contains(searchString) ||
        //         j.LastName.Contains(searchString) ||
        //         j.Sector.Contains(searchString) ||
        //         j.State.Contains(searchString) ||
        //         j.Type.Contains(searchString) ||
        //         j.minEduLvl.Contains(searchString) ||
        //         j.minNumGscePasses.Contains(searchString) ||
        //         j.specificEduLvl.Contains(searchString) ||
        //         j.specificProfessionalLvl.Contains(searchString) ||
        //         j.specificSkill.Contains(searchString) ||
        //         j.specificExperience.Contains(searchString) ||
        //         j.Gender.Contains(searchString) ||
        //         j.maritalStatus.Contains(searchString) 
        //         ).ToListAsync();

        //     return searchResult;
        // }


        
    }
}

