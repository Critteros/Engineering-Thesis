// permission.middleware.ts
/* Imports were omitted */

@Injectable()
export class PermissionsMiddleware implements NestMiddleware {
  constructor(private readonly permissionsService: PermissionService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next();
      return;
    }

    const { uid } = req.user;

    const userPermissions = (
      await this.permissionsService.getUserPermissions({ uid })
    ).map(({ id }) => id) as Permissions[];
    req.permissions = userPermissions;

    next();
  }
}
