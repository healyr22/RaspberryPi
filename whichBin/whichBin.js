const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'http://toronto.ca/services-payments/recycling-organics-garbage/houses/collection-schedule/?addr=M5R,%20285%20St%20George%20St&lat=43.6741913625&lng=-79.4027566552';

const run = async () => {
    console.log("start");
    const browser = await puppeteer.launch({args: ['--no-sandbox']} );
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
    return array.splice(0, 2);
};

module.exports = {
  check: run
};