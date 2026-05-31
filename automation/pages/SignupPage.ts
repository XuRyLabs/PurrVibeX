import { Page } from "@playwright/test";

export class SignupPage {
  constructor(private page: Page) {}
  signupLink = () => this.page.getByRole("link", { name: "Register" });

  displayNameInput = () => this.page.getByRole('textbox', { name: 'Mochi Cat' });

  emailInput = () => this.page.locator('input[type="email"]');

  passwordInput = () => this.page.locator('input[type="password"]');

  signUpButton = () => this.page.locator('button[type="submit"]');

  async navigate() {
    await this.page.goto("https://purrvibex.web.app/");
  }
  async signup(displayName: string, email: string, password: string) {
    await this.signupLink().click();
    await this.displayNameInput().fill(displayName);
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.signUpButton().click();
  }
}
