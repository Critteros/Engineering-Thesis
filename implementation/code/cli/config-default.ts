// default.ts
export const defaultConfig: Config = {
  socket: {
    enable: true,
    path: join(cwd(), "hydra.sock"),
  },
  filestorage: {
    engine: "local",
    basePath: join(cwd(), "media"),
    maxFileSize: /* 10GB */ 10 * 1024 * 1024 * 1024,
  },
};
