﻿using campaignServer.Models;
using campaignServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace campaignServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
        }


        
        [HttpPost("signup")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var result = await _userService.RegisterAsync(request);
            if (!result)
            {
                return BadRequest("Email already exists.");

            }

            return Ok(result);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var token = await _userService.LoginAsync(request);
            if (token == null)
                return Unauthorized("Invalid credentials.");

            return Ok(new { Token = token });
        }




        


        
    }
}
