import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly loginLink: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.loginLink = page.getByRole("link", { name: "Login" });
    this.emailField = page.getByPlaceholder("you@example.com");
    this.passwordField = page.locator('input[type="password"]');
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.errorMessage = page.locator(".auth-message");
  }

  async goto() {
    await this.page.goto("https://purrvibex.web.app/");
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }

  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async login(email: string, password: string) {
    await this.clickLoginLink();
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignInButton();
  }

  async navigateToLoginForm() {
    await this.goto();
    await this.clickLoginLink();
  }
}
