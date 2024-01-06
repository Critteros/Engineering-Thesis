// local-auth.guard.ts
/* Some imports were omitted */
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") implements CanActivate {
  override async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest<Request>();

    await super.logIn(request);
    return result;
  }
}
