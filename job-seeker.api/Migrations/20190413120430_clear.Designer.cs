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
    [Migration("20190413120430_clear")]
    partial class clear
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-preview3-35497")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("job_seeker.api.Models.JobSeeker", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("ContactNumber");

                    b.Property<DateTime>("Dob");

                    b.Property<string>("EmailId");

                    b.Property<string>("FirstName");

                    b.Property<string>("Gender");

                    b.Property<float>("Height");

                    b.Property<string>("LastName");

                    b.Property<string>("Marital_status");

                    b.Property<string>("Min_Edu_Level");

                    b.Property<string>("Min_Num_Gsce_Passes");

                    b.Property<string>("Overview");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("PlaceOfBirth");

                    b.Property<byte[]>("ProfileImage");

                    b.Property<string>("Religion");

                    b.Property<string>("Sector");

                    b.Property<string>("Spec_Edu_Level");

                    b.Property<string>("Spec_Experience");

                    b.Property<string>("Spec_Prof_Level");

                    b.Property<string>("Spec_Skill");

                    b.Property<string>("State");

                    b.Property<string>("Type");

                    b.Property<string>("UserType");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("JobSeekers");
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
