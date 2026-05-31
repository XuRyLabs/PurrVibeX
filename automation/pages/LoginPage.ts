import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  loginLink = () => this.page.getByRole("link", { name: "Login" });

  emailInput = () => this.page.locator('input[type="email"]');

  passwordInput = () => this.page.locator('input[type="password"]');

  signInButton = () => this.page.locator('button[type="submit"]');

  errorMessage = () => this.page.locator(".auth-message");

  async navigate() {
    await this.page.goto("https://purrvibex.web.app/");
  }

  async login(email: string, password: string) {
    await this.loginLink().click();

    await this.emailInput().fill(email);

    await this.passwordInput().fill(password);

    await this.signInButton().click();
  }
}
