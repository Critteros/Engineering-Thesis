beforeAll(async () => {
  await Promise.all([
    this.testDbContainer.setup(),
    this.testRedisContainer.setup(),
  ]);
  process.env.DATABASE_URL = this.testDbContainer.connectionUri;
  process.env.REDIS_URL = this.testRedisContainer.connectionUri;
  this.dbClient = new PrismaClient();
  this.redisClient = createClient({
    url: this.testRedisContainer.connectionUri,
  });
  this.redisClient.on("error", (error) => {
    console.error(error);
  });
  await Promise.all([this.dbClient.$connect(), this.redisClient.connect()]);
  await this.testDbContainer.seed(this.dbClient);
});

afterAll(async () => {
  await Promise.all([
    this.dbClient.$disconnect(),
    this.redisClient.disconnect(),
  ]);
  await Promise.all([
    this.testDbContainer.teardown(),
    this.testRedisContainer.teardown(),
  ]);

  delete process.env.DATABASE_URL;
  delete process.env.REDIS_URL;
});
