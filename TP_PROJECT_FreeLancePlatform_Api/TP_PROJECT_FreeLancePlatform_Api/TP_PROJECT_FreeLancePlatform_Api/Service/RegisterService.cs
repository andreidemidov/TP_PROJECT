using AutoMapper.Configuration;
using CryptoHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TP_PROJECT_FreeLancePlatform_Api.Helpers;
using TP_PROJECT_FreeLancePlatform_Api.Interface;
using TP_PROJECT_FreeLancePlatform_Api.Model;
using TP_PROJECT_FreeLancePlatform_Api.ModelVm;

namespace TP_PROJECT_FreeLancePlatform_Api.Service
{
    public class RegisterService: IRegister
    {
        private readonly UserModelContext _context;

        public RegisterService(UserModelContext context)
        {
            _context = context;
        }

        public void CreateUser(UserModel user)
        {
            if (string.IsNullOrWhiteSpace(user.Password))
                throw new AppException("Password is required");

            if (_context.UserModels.Any(x => x.EmailAddress == user.EmailAddress))
                throw new AppException("Username \"" + user.EmailAddress + "\" is already taken");

            var paswordHash = HashPassword(user.Password);
            user.Password = paswordHash;

            _context.UserModels.Add(user);
            _context.SaveChanges();

        }

        public string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }
    }
}
