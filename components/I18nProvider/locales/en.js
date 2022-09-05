import { z } from "zod";

export const en = {
  sign_in: "Sign in",
  sign_up: "Sign up",
  email: "Email",
  password: "Password",
  confirm_password: "Confirm password",
  name: "Name",
  sign_in_title: "Sign in",
  sign_up_title: "Sign up",
  create_new_account: "Create new account",
  already_have_an_account: "Already have an account",
  invalid_credentials: "Invalid credentials",
  unknown_error: "Unknown error",
  email_already_in_use: "Email already in use",
  signin_in: "Signin in",
  signin_up: "Create an account",
  registered_account: "Account created",
  welcome: "Welcome",
  verify_your_email: "Please verify your email",
  sign_out: "Sign out",
  seller: "Seller",
  buyer: "Buyer",
  role: "Role",
};
/** @type { z.ZodErrorMap  } */
export const zodCustomErrorMapEn = (issue, ctx) => {
  if (issue.path[0] === "confirmationPassword") {
    return { message: "Passwords do not match" };
  }
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: "Invalid data type" };
    }
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    return {
      message: `The field must contain at least ${issue.minimum} characters`,
    };
  }
  if (issue.code === z.ZodIssueCode.too_big) {
    return {
      message: `The field must contain at most ${issue.maximum} characters`,
    };
  }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === "email")
      return {
        message: "Invalid email",
      };
  }
  if (issue.code === z.ZodIssueCode.custom) {
    return { message: `less-than-${(issue.params || {}).minimum}` };
  }
  return { message: ctx.defaultError };
};