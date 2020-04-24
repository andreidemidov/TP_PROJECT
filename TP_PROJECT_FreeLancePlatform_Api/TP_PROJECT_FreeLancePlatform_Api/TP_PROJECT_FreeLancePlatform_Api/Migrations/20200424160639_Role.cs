using Microsoft.EntityFrameworkCore.Migrations;

namespace TP_PROJECT_FreeLancePlatform_Api.Migrations
{
    public partial class Role : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Salt",
                table: "UserModels");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Salt",
                table: "UserModels",
                type: "nvarchar(30)",
                nullable: false,
                defaultValue: "");
        }
    }
}
