module.exports = {
  session: {
    keys: ['meowmeowIDK']
  },
  facebook: {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: '/auth/facebook/redirect',
    profileFields: [
      'id',
      'first_name',
      'last_name',
      'gender',
      'birthday',
      'email',
      'picture',
      'friends'
    ]
  }
};
