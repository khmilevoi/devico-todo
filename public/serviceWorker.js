// const saveSubscription = async (subscription) => {
//   const SERVER_URL = 'http://localhost:3000/subscription';
//   const response = await fetch(SERVER_URL, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(subscription),
//   });
//   return response.json();
// };

self.addEventListener('activate', async () => {
  try {
    // const subscription = await self.registration.pushManager.subscribe(options);
    // const response = await saveSubscription(subscription);
    // console.log(response);
  } catch (err) {
    console.log('Error', err);
  }
});

const showLocalNotification = (title, body) => {
  const options = {
    body,
  };
  self.registration.showNotification(title, options);
};

self.addEventListener('push', (event) => {
  if (event.data) {
    console.log(event.data.text());
    showLocalNotification('Todo', event.data.text());
  } else {
    console.log('Push event but no data');
  }
});
