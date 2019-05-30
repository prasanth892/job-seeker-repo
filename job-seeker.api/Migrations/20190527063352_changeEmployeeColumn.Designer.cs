﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using job_seeker.api.Data;

namespace job_seekerapp.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20190527063352_changeEmployeeColumn")]
    partial class changeEmployeeColumn
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("job_seeker.api.Models.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ContactNumber");

                    b.Property<string>("FirstName");

                    b.Property<DateTime>("IsCreated");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.Property<string>("Status");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Admin");
                });

            modelBuilder.Entity("job_seeker.api.Models.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ContactNumber");

                    b.Property<string>("FirstName");

                    b.Property<DateTime>("IsCreated");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.Property<string>("Status");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("job_seeker.api.Models.Job", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EducationLevel");

                    b.Property<string>("JobTitle");

                    b.Property<string>("PostedBy");

                    b.Property<DateTime>("PostedDate");

                    b.Property<string>("ProfessionalQualification");

                    b.Property<string>("Sector");

                    b.Property<string>("SpecialExperience");

                    b.Property<string>("SpecialSkill");

                    b.Property<string>("State");

                    b.Property<string>("Status");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Jobs");
                });

            modelBuilder.Entity("job_seeker.api.Models.JobSeeker", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("ContactNumber");

                    b.Property<DateTime>("Dob");

                    b.Property<string>("FirstName");

                    b.Property<string>("Gender");

                    b.Property<float>("Height");

                    b.Property<DateTime>("IsCreated");

                    b.Property<string>("LastName");

                    b.Property<string>("Overview");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Religion");

                    b.Property<string>("Sector");

                    b.Property<string>("State");

                    b.Property<string>("Type");

                    b.Property<string>("UserType");

                    b.Property<string>("Username");

                    b.Property<string>("email");

                    b.Property<string>("maritalStatus");

                    b.Property<string>("minEduLvl");

                    b.Property<string>("minNumGscePasses");

                    b.Property<string>("specificEduLvl");

                    b.Property<string>("specificExperience");

                    b.Property<string>("specificProfessionalLvl");

                    b.Property<string>("specificSkill");

                    b.HasKey("Id");

                    b.ToTable("JobSeekers");
                });

            modelBuilder.Entity("job_seeker.api.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("PublicId");

                    b.Property<string>("Url");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Photoes");
                });

            modelBuilder.Entity("job_seeker.api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("UserType");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
