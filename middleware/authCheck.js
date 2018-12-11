/* eslint-disable no-console */
const db = require('../schemas');
const fetchFacebook = require('../fetchAuth').facebook;
const { upsertUser } = require('./../models/userModel');

const authCheck = async (req, res, next) => {
  try {
    const { accesstoken, pushtoken } = req.headers;
    const currentUser = await db.User.findOne({
      where: { accesstoken }
    });
    if (currentUser) {
      next();
    } else {
      const profile = await fetchFacebook(accesstoken);
      await upsertUser(profile, accesstoken, pushtoken);
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = authCheck;
