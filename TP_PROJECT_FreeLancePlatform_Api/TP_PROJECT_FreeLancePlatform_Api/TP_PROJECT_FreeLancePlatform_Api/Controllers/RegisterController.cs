using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TP_PROJECT_FreeLancePlatform_Api.Interface;
using TP_PROJECT_FreeLancePlatform_Api.Model;
using TP_PROJECT_FreeLancePlatform_Api.ModelVm;

namespace TP_PROJECT_FreeLancePlatform_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class RegisterController : ControllerBase
    {
        private readonly IRegister _registerService;
        private readonly IMapper _mapper;

        public RegisterController(IRegister registerService, IMapper mapper)
        {
         
            _registerService = registerService;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult Register([FromBody]UserVm userVm)
        {
            UserModel userModel = _mapper.Map<UserModel>(userVm);
            try
            {
                _registerService.CreateUser(userModel);
                return Ok();
            }
            catch(ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}