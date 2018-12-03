const rp = require('request-promise');

const testBody = {
  to: 'ExponentPushToken[_MUr0xHnOWYQpzogDJRBns]',
  title: 'Wishopper',
  body: 'Its Amys birthday, why not get her something?'
};

const options = {
  method: 'POST',
  uri: 'https://exp.host/--/api/v2/push/send',
  headers: {
    Accept: 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/json'
  },
  body: testBody,
  json: true // Automatically stringifies the body to JSON
};

const sendNotification = async options => {
  try {
    const sendNotification = await rp(options);
    console.log(sendNotification.data.status); // eslint-disable-line no-console
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};

sendNotification(options);
