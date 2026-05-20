import { test, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { loginData } from "../test-data/loginData";

test.describe("Login - Critical Test Cases", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ─── Happy Path ──────────────────────────────────────────────────────────────

  test("TC01 - Login successfully with valid credentials", async ({ page }) => {
    await loginPage.login(
      loginData.validUser.email,
      loginData.validUser.password
    );

    await expect(page.getByText("MeowDex")).toBeVisible();
  });

  // ─── Invalid Credentials ─────────────────────────────────────────────────────

  test("TC02 - Login with invalid password shows error message", async () => {
    await loginPage.login(
      loginData.invalidPassword.email,
      loginData.invalidPassword.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test("TC03 - Login with non-existent email shows error message", async () => {
    await loginPage.login(
      loginData.nonExistentEmail.email,
      loginData.nonExistentEmail.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test("TC04 - Login with invalid email format shows validation error", async ({ page }) => {
    await loginPage.navigateToLoginForm();
    await loginPage.enterEmail(loginData.invalidEmailFormat.email);
    await loginPage.enterPassword(loginData.invalidEmailFormat.password);
    await loginPage.clickSignInButton();

    // Browser-level HTML5 validation prevents submission; field is invalid
    const isEmailInvalid = await loginPage.emailField.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    const errorMessageVisible = await loginPage.errorMessage.isVisible().catch(() => false);

    expect(isEmailInvalid || errorMessageVisible).toBeTruthy();
  });

  // ─── Empty Field Validation ───────────────────────────────────────────────────

  test("TC05 - Login with empty email shows validation error", async ({ page }) => {
    await loginPage.navigateToLoginForm();
    await loginPage.enterEmail(loginData.emptyEmail.email);
    await loginPage.enterPassword(loginData.emptyEmail.password);
    await loginPage.clickSignInButton();

    // Either HTML5 required-field validation or app-level error should appear
    const isEmailInvalid = await loginPage.emailField.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    const errorMessageVisible = await loginPage.errorMessage.isVisible().catch(() => false);

    expect(isEmailInvalid || errorMessageVisible).toBeTruthy();
  });

  test("TC06 - Login with empty password shows validation error", async ({ page }) => {
    await loginPage.navigateToLoginForm();
    await loginPage.enterEmail(loginData.emptyPassword.email);
    await loginPage.enterPassword(loginData.emptyPassword.password);
    await loginPage.clickSignInButton();

    const isPasswordInvalid = await loginPage.passwordField.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    const errorMessageVisible = await loginPage.errorMessage.isVisible().catch(() => false);

    expect(isPasswordInvalid || errorMessageVisible).toBeTruthy();
  });

  test("TC07 - Login with both empty email and password shows validation error", async ({ page }) => {
    await loginPage.navigateToLoginForm();
    await loginPage.clickSignInButton();

    const isEmailInvalid = await loginPage.emailField.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    const isPasswordInvalid = await loginPage.passwordField.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    const errorMessageVisible = await loginPage.errorMessage.isVisible().catch(() => false);

    expect(isEmailInvalid || isPasswordInvalid || errorMessageVisible).toBeTruthy();
  });

  // ─── UI Verification ─────────────────────────────────────────────────────────

  test("TC08 - Login link is visible on the homepage", async () => {
    await expect(loginPage.loginLink).toBeVisible();
  });

  test("TC09 - Login form displays all required elements", async () => {
    await loginPage.navigateToLoginForm();

    await expect(loginPage.emailField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test("TC10 - Password field masks the entered text", async () => {
    await loginPage.navigateToLoginForm();

    const inputType = await loginPage.passwordField.getAttribute("type");
    expect(inputType).toBe("password");
  });

  // ─── Session / Security ───────────────────────────────────────────────────────

  test("TC11 - Unauthenticated user cannot view protected content on /dashboard", async ({ page }) => {
    await page.goto("https://purrvibex.web.app/dashboard");

    // SPA keeps the URL but renders the unauthenticated view — Login link is
    // visible and no protected content (MeowDex) is shown
    await expect(loginPage.loginLink).toBeVisible();
    await expect(page.getByText("MeowDex")).not.toBeVisible();
  });

  test("TC12 - User remains on login page after failed login attempt", async ({ page }) => {
    await loginPage.login(
      loginData.invalidPassword.email,
      loginData.invalidPassword.password
    );

    // Must NOT navigate to the authenticated view
    await expect(page.getByText("MeowDex")).not.toBeVisible();
  });
});

