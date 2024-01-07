export const configSchema = z.object({
  socket: z
    .object({
      path: z.string().default(path),
      enable: z.boolean().default(enable),
    })
    .default(socket),
  filestorage: z
    .object({
      engine: z.literal("local").default(engine),
      basePath: z.string().default(basePath),
      maxFileSize: z.number().default(maxFileSize),
    })
    .default(filestorage),
});
