module.exports = {
  session: {
    keys: ['meowmeowIDK']
  },
  facebook: {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3333/SOMEPATHHERE',
    profileFields: [
      'id',
      'first_name',
      'last_name',
      'gender',
      'birthday',
      'email',
      'picture'
    ]
  }
};
