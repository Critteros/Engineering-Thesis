// session.middleware.ts
/* Some imports were omitted */

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private redisStore: RedisStore;
  private sessionOptions: session.SessionOptions;

  constructor(
    @Inject(RedisClientToken) private readonly redisClient: RedisClient
  ) {
    this.redisStore = new RedisStore({
      client: redisClient,
      prefix: "hydra-ipxe:",
    });
    this.sessionOptions = {
      store: this.redisStore,
      secret: process.env.COOKIE_SECRET ?? "hydra-ipxe",
      cookie: { secure: false },
      resave: false,
      saveUninitialized: false,
      name: "session",
    };
  }

  use(req: Request, res: Response, next: NextFunction) {
    session(this.sessionOptions)(req, res, next);
  }
}
