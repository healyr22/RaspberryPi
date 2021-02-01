// const AWS = require('aws-sdk');
// const https = require('https');
// const options = {
//   host: 'jsonplaceholder.typicode.com',
//   path: '/posts/1'
//   //'/services-payments/recycling-organics-garbage/houses/collection-schedule/?addr=M5R,%20285%20St%20George%20St&lat=43.6741913625&lng=-79.4027566552'
// };

// const dynamo = new AWS.DynamoDB.DocumentClient();

// function doRequest() {
//   return new Promise ((resolve, reject) => {
//     let req = https.request(options);

//     req.on('response', res => {
//       resolve(res);
//     });

//     req.on('error', err => {
//       reject(err);
//     });
//   }); 
// }

const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'http://toronto.ca/services-payments/recycling-organics-garbage/houses/collection-schedule/?addr=M5R,%20285%20St%20George%20St&lat=43.6741913625&lng=-79.4027566552';

const run = async () => {
    console.log("start");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForFunction(
    'document.querySelector("#calendarData") !== null && document.querySelector("#calendarData").innerText.includes("The next")'
    );
    const content = await page.content();
    // console.log(content);
    // $($('#calendarData .iconlbl')[1]).text()
    // $('#calendarData .iconlbl', content).each(function() {
    //     console.log($(this).text());
    // });
    var array = [];
    $('#calendarData .iconlbl', content).each(function() {
        array.push($(this).text());
    });
    console.log(array);
    console.log("DONE");
    return array;
}

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        switch (event.httpMethod) {
            case 'DELETE':
                body = {msg: "DELETE request", body: JSON.parse(event.body)};//await dynamo.delete(JSON.parse(event.body)).promise();
                break;
            case 'GET':
                body = {msg: "GET request", body: JSON.parse(event.body)};//await dynamo.scan({ TableName: event.queryStringParameters.TableName }).promise();
                break;
            case 'POST':
                var httpResponse = await run();
                body = {
  "session": {
    "id": "example_session_id",
    "params": {}
  },
  "custom": httpResponse,
  "prompt": {
    "override": false,
    "content": {
      "card": {
        "title": "Card Title",
        "subtitle": "Card Subtitle",
        "text": "Card Content",
        "image": {
          "alt": "Google Assistant logo",
          "height": 0,
          "url": "https://developers.google.com/assistant/assistant_96.png",
          "width": 0
        }
      }
    },
    "firstSimple": {
      "speech": "This is a card rich response. Hello World!",
      "text": ""
    }
  }
};
                //{msg: "POST request", body: JSON.parse(event.body)};//await dynamo.put(JSON.parse(event.body)).promise();
                break;
            case 'PUT':
                body = {msg: "PUT request", body: JSON.parse(event.body)};//await dynamo.update(JSON.parse(event.body)).promise();
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
