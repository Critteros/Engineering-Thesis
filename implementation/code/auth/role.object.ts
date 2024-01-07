// roles.object.ts
/* Imports were omitted */

@ObjectType()
export class Role {
  @Field(() => ID, { description: "Role unique identifier" })
  uid!: string;

  @Field(() => String, { description: "Role name" })
  name!: string;

  @Field(() => String, { description: "Role description" })
  description!: string;

  @Field(() => [User], { description: "Members of a given role" })
  members!: User[];

  @Field(() => Int, { description: "Number of members of a given role" })
  memberCount!: number;

  @Field(() => [AssignedPermission], { description: "Role permissions" })
  permissions!: AssignedPermission[];

  @Field(() => Int, {
    description: "Number of permissions assigned to a given role",
  })
  permissionsCount!: number;
}
