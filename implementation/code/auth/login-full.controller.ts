@Controller("auth")
export class AuthController {
  /* ... */
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @PublicHandler()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UserLoginDto })
  async login(@InjectUser() user: AuthenticatedUser) {
    return {
      ...user,
    };
  }
  /* ... */
}
