// public/sw.js
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// ✅ Detect iOS
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

self.addEventListener('push', event => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: 'Notification', body: event.data.text() };
  }

  const options = {
    body: data.body || '',
    icon: data.icon || '/icon-192.png',
   // icon: data.icon || '/icon-192.png',
    //badge: data.badge || '/badge-96.png',
    vibrate: [200, 100, 200],

    // ✅ FIX: use URL from payload
    data: {
      url: data.data?.url || data.url || self.registration.scope
    },

    actions: [
      { action: 'open', title: 'Open' },
      { action: 'close', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
      self.registration.showNotification(data.title || 'Alert', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'close') return;

  const url = event.notification.data?.url || '/';

  event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
          .then(clientList => {
            for (const client of clientList) {
              if (client.url === url && 'focus' in client) {
                return client.focus();
              }
            }
            return clients.openWindow(url); // ✅ opens job link
          })
  );
});