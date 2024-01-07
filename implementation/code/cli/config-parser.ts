// parser.ts
export class HydraConfig {
  constructor(public config: Config = defaultConfig) {}

  static async fromFile(path: string) {
    const contents = await readFile(path, "utf-8").catch(() => {
      throw new FileNotFound(path);
    });

    try {
      const loaded = load(contents);
      return new this(await this.buildSchema(path).parseAsync(loaded));
    } catch (e) {
      throw new BadConfigFormat(path);
    }
  }

  private static buildSchema(path: string) {
    return configSchema.transform(
      ({ socket: { path: inputPath, ...socketOptions }, ...other }) => ({
        socket: {
          path: resolve(dirname(path), inputPath),
          ...socketOptions,
        },
        ...other,
      })
    );
  }
}
