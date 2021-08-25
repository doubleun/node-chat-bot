require('dotenv').config();
const axios = require('axios');
// const qs = require('qs');

// Handles messages events
const handleMessage = (sender_psid, received_message) => {
  let response;

  // Check if the message contains text
  if (received_message.text) {    

    // Create the payload for a basic text message
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an image!`
    }
  }  
  
  // Sends the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
const handlePostback = (sender_psid, received_postback)=> {

}

// Sends response messages via the Send API
const callSendAPI = (sender_psid, response) => {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  axios
    .post(
      `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
      request_body
    )
    .then(_ => console.log('Message sent!'))
    .catch(err => console.log('Error: ', err));
}

module.exports = {
  handleMessage: handleMessage,
  handlePostback: handlePostback,
  callSendAPI: callSendAPI
}