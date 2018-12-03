const rp = require('request-promise');

const sendNotification = async (pushToken, giftReceiver) => {
  try {
    const body = {
      to: pushToken,
      title: 'Wishopper',
      body: `Its ${giftReceiver} birthday, why not get her something?`
    };
    const options = {
      method: 'POST',
      uri: 'https://exp.host/--/api/v2/push/send',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: body,
      json: true // Automatically stringifies the body to JSON
    };

    const sendNotification = await rp(options);
    console.log(`push-notif-status: ${sendNotification.data.status}`); // eslint-disable-line no-console
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};

module.exports = sendNotification;
