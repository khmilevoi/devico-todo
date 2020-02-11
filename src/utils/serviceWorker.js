const pubicKey = 'BLNBquv_TzEMTZI9kN3Zk-nMW3dezq1b8z2Hjh26sba2YO4wnOIKX0QJCN7DkbtNqBSCZHaOphJQaaie4HhQqE0';

const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      console.log('serviceWorker available');

      const status = await Notification.requestPermission();

      if (status === 'granted') {
        const register = await navigator.serviceWorker.register(
          './serviceWorker.js',
        );

        const sw = register.active || register.installing || register.waiting;

        const options = {
          applicationServerKey: urlB64ToUint8Array(pubicKey),
          userVisibleOnly: true,
        };

        return () => new Promise((resolve) => {
          sw.addEventListener('statechange', async (event) => {
            if (event.target.state === 'activated') {
              const subscription = await register.pushManager.subscribe(
                options,
              );

              resolve(subscription);
            }
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return null;
};
