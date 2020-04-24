using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TP_PROJECT_FreeLancePlatform_Api.Interface;
using TP_PROJECT_FreeLancePlatform_Api.Model;
using TP_PROJECT_FreeLancePlatform_Api.ModelVm;
using TP_PROJECT_FreeLancePlatform_Api.Service;

namespace TP_PROJECT_FreeLancePlatform_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAuthService _authService;

        public LoginController(IConfiguration config, IAuthService authService)
        {
            _config = config;
            _authService = authService;         
        }

        [HttpPost]
        public IActionResult Login([FromBody]UserVm userVm)
        {
            IActionResult response = Unauthorized();
            try
            {
                UserModel login = new UserModel();
                login.EmailAddress = userVm.EmailAddress;
                login.Password = userVm.Password;

                var user = _authService.AuthenticateUser(login);
                if (user != null)
                {
                    var tokenResponse = _authService.GenerateJSONWebToken(user);
                    response = Ok(new { token = tokenResponse, status = "success" });
                }
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }


            return response;
        }


        [HttpPost("GetUser")]
        [Authorize]
        public UserModel GetUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var user = new UserModel
            {
                EmailAddress = claim[0].Value,
                Role = claim[1].Value
            };

            return user;
        }
    }
}