// const https = require('https');
// const options = {
//   host: 'jsonplaceholder.typicode.com',
//   path: '/posts/1'
//   //'/services-payments/recycling-organics-garbage/houses/collection-schedule/?addr=M5R,%20285%20St%20George%20St&lat=43.6741913625&lng=-79.4027566552'
// };

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

// handler = async (event, context) => {

//     let body;
//     let statusCode = '200';
//     const headers = {
//         'Content-Type': 'application/json',
//     };

//     console.log("BEFORE");
//                body = await doRequest();
//                console.log("GOT " + body);
//         body = JSON.stringify(body);

//         return body;
// };

// console.log("Calling handler");
// handler();
//////////////////////////////////////////////////////////////////
// console.log("Start");
// require('http').get('http://toronto.ca/services-payments/recycling-organics-garbage/houses/collection-schedule/?addr=M5R,%20285%20St%20George%20St&lat=43.6741913625&lng=-79.4027566552', (res) => {
//     console.log("RES?");
//     res.setEncoding('utf8');
//     res.on('data', function (body) {
//         console.log(body);
//     });
// });
/////////////////////////////////////////////////////////////////

// var https = require('https');

// var options = {
//   host: 'toronto.ca',
//   port: 443,
//   path: '//services-payments/recycling-organics-garbage/houses/collection-schedule/?addr=M5R,%20285%20St%20George%20St&lat=43.6741913625&lng=-79.402756655',
//   method: 'GET'
// };

// var req = https.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     console.log('BODY: ' + chunk);
//   });
// });

// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });

// // write data to request body
// req.write('data\n');
// req.write('data\n');
// req.end();

///////////////////////////////////////////////////////////////
// const rp = require('request-promise');
// const url = 'http://toronto.ca/services-payments/recycling-organics-garbage/houses/collection-schedule/?addr=M5R,%20285%20St%20George%20St&lat=43.6741913625&lng=-79.4027566552';

// rp(url)
//   .then(function(html){
//     //success!
//     console.log(html);
//   })
//   .catch(function(err){
//     //handle error
//   });

/////////////////////////////////////////////////////
// const puppeteer = require('puppeteer');
// const $ = require('cheerio');
// const url = 'http://toronto.ca/services-payments/recycling-organics-garbage/houses/collection-schedule/?addr=M5R,%20285%20St%20George%20St&lat=43.6741913625&lng=-79.4027566552';

// puppeteer
//   .launch()
//   .then(function(browser) {
//     return browser.newPage();
//   })
//   .then(function(page) {
//     return page.goto(url).then(function() {
//       return page.content();
//     });
//   })
//   .then(function(html) {
//     $('.pagecontent', html).each(function() {
//       console.log($(this).text());
//     });
//     console.log("DONE");
//   })
//   .catch(function(err) {
//     //handle error
//   });


  ///////////////////////////////////////



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
}

run();

