module.exports = {
  session: {
    secret: process.env.EXPRESS_SECRET,
    maxAge: 24 * 60 * 60 * 1000
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
