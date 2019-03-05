const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const expressStatic = require('express-static')

async function main () {
  const app = express()
  const port = 8000

  const publicVapidKey = process.env.PUBLIC_VAPID_KEY
  const privateVapidKey = process.env.PRIVATE_VAPID_KEY

  webpush.setVapidDetails('mailto:john.doe@mail.com', publicVapidKey, privateVapidKey)

  app.use(bodyParser.json())

  app.post('/subscribe', async (req, res) => {
    try {
      const subscription = req.body
      const payload = JSON.stringify({
        title: 'test'
      })
      console.log(subscription, payload)
      const response = await webpush.sendNotification(subscription, payload)
      return res.status(200).json(response)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  })

  // This must be placed after the other routes.
  app.use(expressStatic('./public'))

  app.listen(port, function () {
    console.log(`listening to port *:${port}. press ctrl+c to cancel`)
  })
}

main().catch(console.error)
