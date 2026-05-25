export const loginData = {
  validUser: {
    email: "xu.cat@yopmail.com",
    password: "1234abcd@",
  },

  invalidPassword: {
    email: "xu.cat@yopmail.com",
    password: "wrong123",
  },

  nonExistentEmail: {
    email: "no.such.user@yopmail.com",
    password: "1234abcd@",
  },

  invalidEmailFormat: {
    email: "invalid-email-format",
    password: "1234abcd@",
  },

  emptyEmail: {
    email: "",
    password: "1234abcd@",
  },

  emptyPassword: {
    email: "xu.cat@yopmail.com",
    password: "",
  },

  emptyCredentials: {
    email: "",
    password: "",
  },
};
