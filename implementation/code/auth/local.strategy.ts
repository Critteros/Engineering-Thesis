// local.strategy.ts
/* Some imports were omitted */
import { Strategy as LocalStrategyPassport } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(LocalStrategyPassport) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
