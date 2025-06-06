const getAvatarUrl = (url) => {
  if (url) {
    return { uri: url };
  }
  return require("../assets/images/avatar.png");
};
