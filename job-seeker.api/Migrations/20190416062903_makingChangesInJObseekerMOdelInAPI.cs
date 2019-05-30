using Microsoft.EntityFrameworkCore.Migrations;

namespace job_seekerapp.Migrations
{
    public partial class makingChangesInJObseekerMOdelInAPI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlaceOfBirth",
                table: "JobSeekers",
                newName: "placeOfBirth");

            migrationBuilder.RenameColumn(
                name: "Spec_Skill",
                table: "JobSeekers",
                newName: "specificSkill");

            migrationBuilder.RenameColumn(
                name: "Spec_Prof_Level",
                table: "JobSeekers",
                newName: "specificProfessionalLvl");

            migrationBuilder.RenameColumn(
                name: "Spec_Experience",
                table: "JobSeekers",
                newName: "specificExperience");

            migrationBuilder.RenameColumn(
                name: "Spec_Edu_Level",
                table: "JobSeekers",
                newName: "specificEduLvl");

            migrationBuilder.RenameColumn(
                name: "Min_Num_Gsce_Passes",
                table: "JobSeekers",
                newName: "minNumGscePasses");

            migrationBuilder.RenameColumn(
                name: "Min_Edu_Level",
                table: "JobSeekers",
                newName: "minEduLvl");

            migrationBuilder.RenameColumn(
                name: "Marital_status",
                table: "JobSeekers",
                newName: "maritalStatus");

            migrationBuilder.RenameColumn(
                name: "EmailId",
                table: "JobSeekers",
                newName: "email");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "placeOfBirth",
                table: "JobSeekers",
                newName: "PlaceOfBirth");

            migrationBuilder.RenameColumn(
                name: "specificSkill",
                table: "JobSeekers",
                newName: "Spec_Skill");

            migrationBuilder.RenameColumn(
                name: "specificProfessionalLvl",
                table: "JobSeekers",
                newName: "Spec_Prof_Level");

            migrationBuilder.RenameColumn(
                name: "specificExperience",
                table: "JobSeekers",
                newName: "Spec_Experience");

            migrationBuilder.RenameColumn(
                name: "specificEduLvl",
                table: "JobSeekers",
                newName: "Spec_Edu_Level");

            migrationBuilder.RenameColumn(
                name: "minNumGscePasses",
                table: "JobSeekers",
                newName: "Min_Num_Gsce_Passes");

            migrationBuilder.RenameColumn(
                name: "minEduLvl",
                table: "JobSeekers",
                newName: "Min_Edu_Level");

            migrationBuilder.RenameColumn(
                name: "maritalStatus",
                table: "JobSeekers",
                newName: "Marital_status");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "JobSeekers",
                newName: "EmailId");
        }
    }
}
