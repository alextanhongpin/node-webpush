console.log('serviceWorker loaded')

self.addEventListener('push', (evt) => {
  const data = evt.data.json()
  console.log('got push', data)
  self.registration.showNotification(data.title, {
    body: 'hello, world',
    icon: ''
  })
})
