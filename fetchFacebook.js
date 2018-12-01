const rp = require('request-promise');
const profileFields = require('./middleware/config').facebook;

exports.fetchFacebook = async accesstoken => {
  const stringifiedProfile = await rp(
    `https://graph.facebook.com/me?access_token=${accesstoken}&fields=${profileFields}`
  );
  return JSON.parse(stringifiedProfile);
};
