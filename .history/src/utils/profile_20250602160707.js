const getAvatarUrl = (url) => {
  if (url) {
    return { uri: url };
  }
  return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
};
