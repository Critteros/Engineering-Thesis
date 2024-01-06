// passport.middleware.ts
/* Some imports were omitted */

@Injectable()
export class PassportMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    (passport.session() as Handler)(req, res, next);
  }
}
