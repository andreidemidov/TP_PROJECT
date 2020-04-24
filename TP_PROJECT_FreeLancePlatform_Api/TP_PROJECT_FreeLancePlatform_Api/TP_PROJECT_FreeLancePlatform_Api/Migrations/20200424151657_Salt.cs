using Microsoft.EntityFrameworkCore.Migrations;

namespace TP_PROJECT_FreeLancePlatform_Api.Migrations
{
    public partial class Salt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Lastname",
                table: "UserModels",
                newName: "LastName");

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "UserModels",
                type: "nvarchar(9)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)");

            migrationBuilder.AddColumn<string>(
                name: "Salt",
                table: "UserModels",
                type: "nvarchar(30)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Salt",
                table: "UserModels");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "UserModels",
                newName: "Lastname");

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "UserModels",
                type: "nvarchar(10)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(9)");
        }
    }
}
