export const signupData = () => {
  const timestamp = Date.now();

  return {
    displayName: `cat${timestamp}`,
    email: `cat${timestamp}@yopmail.com`,
    password: "1234abcd@",
  };
};
