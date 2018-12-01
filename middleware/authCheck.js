/* eslint-disable no-console */
const db = require('../schemas');
const fetchFacebook = require('../fetchAuth').facebook;

const authCheck = async (req, res, next) => {
  try {
    const { accesstoken } = req.headers;
    // check in db for accessToken
    const currentUser = await db.User.findOne({
      where: { accesstoken }
    });

    // // if exists in db call next with user id that matches accessToken
    if (currentUser) {
      next();
    } else {
      // if doesn't exist query oAuth provider with accessToken
      const profile = await fetchFacebook(accesstoken);

      // upsert user in db by user id returned from oAuth provider
      if (profile.birthday) {
        var birthdayDate = new Date(profile.birthday);
      }
      await db.User.upsert({
        user_id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        gender: profile.gender,
        birthday: birthdayDate,
        avatar_url: profile.picture.data.url,
        email: profile.email,
        accesstoken
      });

      next();
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = authCheck;
