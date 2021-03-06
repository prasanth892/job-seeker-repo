﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace job_seekerapp.Migrations
{
    public partial class addingDateCreatedInEmployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "IsCreated",
                table: "Employees",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCreated",
                table: "Employees");
        }
    }
}
