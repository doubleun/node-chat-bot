const express = require('express');
const app = express();
require('dotenv').config();

// Add middleware to parse
app.use(express.urlencoded({ extended: true }));

// Creates the endpoint for webhook
app.post('/webhook', (req, res) => {

  // Check this is an event from a page subscription
  if (req.body === 'page') {

    // Iterates over each entry - there may be multiple if batched
    req.body.forEach(entry => {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECIVED');
  } else {

    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(400);
  }
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

// Sets server port and logs messages
app.listen(process.env.PORT || 1337, () => console.log('Webhook is listening on port: ' + process.env.PORT));