import { test, expect } from "@playwright/test";

import { LoginPage } from "../../../pages/LoginPage";

import users from "../../../test-data/users.json";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test("User can login successfully", async ({ page }) => {
    await loginPage.login(users.validUser.email, users.validUser.password);

    await expect(page).toHaveURL(/xu\.cat/);
  });

  test("User cannot login with invalid credentials", async ({ page }) => {
    await loginPage.login(users.invalidUser.email, users.invalidUser.password);

    await expect(loginPage.errorMessage()).toBeVisible();

    await loginPage.login(users.validUser.email, users.invalidUser.password);

    await expect(loginPage.errorMessage()).toBeVisible();

    await loginPage.login(users.invalidUser.email, users.validUser.password);

    await expect(loginPage.errorMessage()).toBeVisible();
  });
});
