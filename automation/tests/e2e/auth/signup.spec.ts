import { test, expect } from "@playwright/test";

import { SignupPage } from "../../../pages/SignupPage";

import { signupData } from "../../../test-data/signupData";

test.describe("Signup Tests", () => {
  let signupPage: SignupPage;
  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.navigate();
  });

  test("User can register successfully", async ({ page }) => {
    const userData = signupData();
    await signupPage.signup(
      userData.displayName,
      userData.email,
      userData.password,
    );

    await expect(page).toHaveURL(new RegExp(userData.displayName));
  });
});
