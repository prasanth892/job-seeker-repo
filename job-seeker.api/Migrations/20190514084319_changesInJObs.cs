using Microsoft.EntityFrameworkCore.Migrations;

namespace job_seekerapp.Migrations
{
    public partial class changesInJObs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "JobTitle",
                table: "Jobs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JobTitle",
                table: "Jobs");
        }
    }
}
