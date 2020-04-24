using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TP_PROJECT_FreeLancePlatform_Api.Model;

namespace TP_PROJECT_FreeLancePlatform_Api.Helpers
{
    public class UserModelContext: DbContext
    {
          public UserModelContext(DbContextOptions<UserModelContext> options) : base(options) { }
        public DbSet<UserModel> UserModels { get; set; }

    }
}
