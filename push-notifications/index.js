const searchBirthdays = require('./birthdays');
const notification = require('./push-notifications');

const sendPushNotifications = async () => {
  // get an array with all persons whose birthday is in one week
  // array contains the friends of the person (that are following it)
  const birthdaysPersonsArray = await searchBirthdays();

  // send a notification to each of the friends of the birthday person
  birthdaysPersonsArray.forEach(person => {
    notification(person.pushtoken, person.birthdayperson);
  });
};

sendPushNotifications();

/* 
This script should be run everyday by a cron job
*/
