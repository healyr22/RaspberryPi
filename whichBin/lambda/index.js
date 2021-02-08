const http = require('http');
const options = {
  host: 'ec2-3-129-140-240.us-east-2.compute.amazonaws.com',
  path: '/whichBin'
};

function httpRequest(postData) {
    return new Promise(function(resolve, reject) {
        var req = http.request(options, function(res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
}

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
                console.log("Making request");
                var httpResponse = await httpRequest();
                console.log("done! " + httpResponse);
                body = {
  "session": {
    "id": "example_session_id",
    "params": {}
  },
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
      "speech": "The next bin collection is " + httpResponse.bins[0] + " and " + httpResponse.bins[1],
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

