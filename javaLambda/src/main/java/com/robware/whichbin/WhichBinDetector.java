package com.robware.whichbin;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;

public class WhichBinDetector {

    private static final String URL = "http://toronto.ca/services-payments/recycling-organics-garbage/houses/collection-schedule/?addr=M5R,%20285%20St%20George%20St&lat=43.6741913625&lng=-79.4027566552";

    public static void main(String[] args) throws Exception {
//        Document doc = Jsoup.connect(URL).get();
//        System.out.println(doc.title());
//
//        Elements data = doc.select("#calendarData");
//        System.out.println(data.size());
//        for (Element e : data) {
//            System.out.println("Got");
//            System.out.println(e.text());
//        }
        DesiredCapabilities DesireCaps = new DesiredCapabilities();
        DesireCaps.setCapability(PhantomJSDriverService.PHANTOMJS_EXECUTABLE_PATH_PROPERTY, "/Users/rhealy/Downloads/phantomjs-2.1.1-linux-x86_64/bin/phantomjs");
        WebDriver driver=new PhantomJSDriver(DesireCaps);
        driver.get("http://google.com");
        System.out.println("Success!");



    }
}
