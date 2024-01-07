@Injectable()
export class AuthenticatedOrPublic implements CanActivate {
  constructor(private readonly metadataService: MetadataService) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.metadataService.getDecoratorMetadata({
      context,
      decorator: PublicHandler,
      priority: "handler",
    });

    if (isPublic) return true;

    const req = extractRequest(context);

    if (!req.isAuthenticated()) throw new UnauthorizedException();

    return true;
  }
}
