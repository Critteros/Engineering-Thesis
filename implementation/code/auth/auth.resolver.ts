// auth.resolver.ts
/* Imports were omitted */

@Resolver()
export class AuthResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean, {
    name: "adminLoginAsUser",
    description: "Login as a user",
  })
  @AdministratorOnly()
  async loginAs(@Args("uid") uid: string, @InjectRequest() request: Request) {
    const user = await this.userService.find({ uid });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    await new Promise((resolve, reject) => {
      request.logIn(exclude(user, ["password"]), (err) => {
        if (err) {
          reject(err);
        }

        resolve(undefined);
      });
    });

    return true;
  }
}
