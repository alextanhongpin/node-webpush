
async function main () {
  const publicVapidKey = ''
  if ('serviceWorker' in navigator) {
    console.log('registering service worker')
    try {
      run(publicVapidKey)
    } catch (error) {
      console.error(error)
    }
  }
}

main().catch(console.error)
function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
}
async function run (publicVapidKey) {
  const registration = await navigator.serviceWorker.register('./worker.js', { scope: '/' })
  console.log('service worker registered')

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })
  console.log('push registered')

  try {
    await window.fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    console.log(err)
  }
  console.log('push sent')
}
