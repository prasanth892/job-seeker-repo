using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace job_seekerapp.Migrations
{
    public partial class AddingJobTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "placeOfBirth",
                table: "JobSeekers");

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Sector = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    EducationLevel = table.Column<string>(nullable: true),
                    ProfessionalQualification = table.Column<string>(nullable: true),
                    SpecialSkill = table.Column<string>(nullable: true),
                    SpecialExperience = table.Column<string>(nullable: true),
                    PostedDate = table.Column<DateTime>(nullable: false),
                    PostedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.AddColumn<string>(
                name: "placeOfBirth",
                table: "JobSeekers",
                nullable: true);
        }
    }
}
