// auth.module.ts
/* Ommited imports */
@Module({
  imports: [
    PassportModule.register({ session: true }),
    UserModule,
    MetadataModule,
    RbacModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    UserSerializer,
    AuthResolver,
    {
      provide: APP_GUARD,
      useClass: AuthenticatedOrPublic,
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
