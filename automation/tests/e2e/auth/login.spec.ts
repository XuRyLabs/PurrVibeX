import {
 test,
 expect
}
from '@playwright/test'

import {
 LoginPage
}
from '../../../pages/LoginPage'

import users from '../../../test-data/users.json'
test(
'User can login successfully',
async ({ page }) => {

 const loginPage =
 new LoginPage(page)

 await loginPage.navigate()

 await loginPage.login(
  users.validUser.email,
  users.validUser.password
 )

 await expect(page)
 .toHaveURL('https://purrvibex.web.app/purrdex/xu.cat')})