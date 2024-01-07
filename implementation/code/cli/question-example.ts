@QuestionSet({ name: "create-user" })
export class CreateUserQuestion {
  constructor(private readonly validator: CreateUserValidatorService) {}

  @Question({
    type: "input",
    name: "email",
    message: "Email address",
  })
  parseEmail(email: string) {
    return email.trim();
  }

  @ValidateFor({ name: "email" })
  validateEmail(email: string) {
    try {
      this.validator.validateEmail(email);
    } catch (e) {
      return "Please enter a valid email address";
    }
    return true;
  }
  /* CODE OMMITED */
}
