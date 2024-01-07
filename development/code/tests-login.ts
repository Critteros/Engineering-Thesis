export class E2ETestManager {
  // ..
  async login({ email, password }: Pick<User, "email" | "password">) {
    const response = await this.agent
      .post("/api/auth/login")
      .send({ email, password });
    expect(response.status).toBe(200);
  }
  // ...
}
