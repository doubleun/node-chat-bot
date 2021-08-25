require('dotenv').config();
const axios = require('axios');
const qs = require('qs');
const http = require('http');

const https = require('https');

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

  let access_token = qs.stringify({ access_token: process.env.PAGE_ACCESS_TOKEN })

  axios
    .post(
      'https://reqbin.com/echo/post/json',
      request_body,
      { params: {
          access_token
        }
      }
    )
    .catch(function (error) {
      console.log(error);
  });
}

module.exports = {
  handleMessage: handleMessage,
  handlePostback: handlePostback,
  callSendAPI: callSendAPI
}