 MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Config>) => {
        const storages = {
          local: () =>
            diskStorage({
              destination: configService.get('filestorage.basePath', 
              { infer: true }),
              filename: (req, file, cb) => {
                const fileId = Identity.compactUUID();
                const fileName = uniqueFilename(file.originalname, fileId);
                file.id = fileId;
                req.on('aborted', () => {
                  unlink(
                    join(configService.get('filestorage.basePath', 
                    { infer: true })!, fileName),
                    () => {},
                  );
                });
                cb(null, fileName);
              },
            }),
        };
        return {
          storage: storages[configService.get('filestorage.engine', 
          { infer: true })!](),
        };
      },
    }),