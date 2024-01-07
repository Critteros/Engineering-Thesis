@Command({ name: "create-admin-user", description: "Create an admin user" })
class CreateAdminUserCommand extends CommandRunner {
  override async run(inputs: string[], options?: CreateAccount) {
    const params = await this.inquirerService.prompt<CreateAccount>(
      "create-user",
      options
    );
    const loading = ora(`Creating admin user`).start();
    try {
      await firstValueFrom(
        this.httpService.post<{ message: "success" }>(this.url, params)
      );
    } catch (e) {
      loading.fail(`Failed to create admin user`);
      throw e;
    }
    loading.succeed(`admin user created`);
  }
  @Option({
    flags: "-e, --email <email>",
    description: "The email address of the user",
  })
  parseEmail(email: string) {
    return this.validator.validateEmail(email);
  }
  @Option({
    flags: "-p, --password <password>",
    description: "The password of the user",
  })
  parsePassword(password: string) {
    return this.validator.validatePassword(password);
  }
  @Option({
    flags: "-n, --name <name>",
    description: "The name of the user",
  })
  parseName(name: string) {
    return this.validator.validateName(name);
  }
}
