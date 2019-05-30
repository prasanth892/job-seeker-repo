using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace job_seekerapp.Migrations
{
    public partial class just : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ProfileImage",
                table: "JobSeekers",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "ProfileImage",
                table: "JobSeekers",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
