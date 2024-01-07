@Resolver(() => Role)
export class RolesResolver {
  // ================================ Queries ================================
  @Query(() => Role, { description: "Get a single role", nullable: true })
  @RequirePermission("roles.read")
  async role(@Args() { uid, name }: RoleSelectionArgs) {
    return await this.rolesService.getRole({ uid, name });
  }
  // ================================ Mutations ================================
  @Mutation(() => Role, { description: "Create a new role" })
  @MapErrors({
    if: RoleAlreadyExistsError,
    then: () => new BadRequestException("Role already exists"),
  })
  @RequirePermission("roles.create")
  async createRole(@Args("data") { description, name }: CreateRoleInput) {
    return await this.rolesService.createRole({ description, name });
  }
  @Mutation(() => Boolean, { description: "Assign permissions to a role" })
  @RequirePermission("roles.assignPermissions")
  async assignPermissionsToRole(
    @Args() { uid, name }: RoleSelectionArgs,
    @Args({ name: "permissionIds", type: () => [String] })
    permissionIds: string[],
    @InjectUser() user: User
  ) {
    const res = await this.rolesService.assignPermissionsToRole({
      role: {
        uid,
        name,
      },
      permissionsIds: permissionIds,
      assignedByUser: {
        uid: user.uid,
      },
    });
    return res;
  }
  // ================================ Resolvers ================================
  @ResolveField(() => [AssignedPermission])
  async permissions(@Parent() { uid }: Role) {
    return await this.rolesService.getRolePermissions({ uid });
  }
}
