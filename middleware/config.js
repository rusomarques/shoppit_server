module.exports = {
  facebook: {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    profileFields:
      'id,first_name,last_name,gender,birthday,email,picture.type(large),friends'
  }
};
