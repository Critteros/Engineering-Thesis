async function setupManagementApi(socketPath: string) {
  const { ManagementModule } = await import("./management/management.module");
  const { UnixSocket } = await import("@hydra-ipxe/common/server/utils/fs");
  const { path } = await new UnixSocket(socketPath).obtain();
  const app = await NestFactory.create(ManagementModule);

  await app.listen(path);
  return app;
}

async function bootstrap() {
  const apiApp = await setupApi();
  const { enable: socketEnabled, path: socketPath } = apiApp
    .get<ConfigService<Config>>(ConfigService)
    .get<Config["socket"]>("socket")!;

  if (socketEnabled) {
    await setupManagementApi(socketPath);
  }
}
void bootstrap();
