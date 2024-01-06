@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login() {
    /* ... */
  }
}
