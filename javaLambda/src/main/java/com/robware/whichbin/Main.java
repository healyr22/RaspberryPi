package com.robware.whichbin;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import org.json.simple.JSONObject;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;

public class Main implements RequestStreamHandler {

    @Override
    public void handleRequest(
            InputStream inputStream, OutputStream outputStream, Context context)
            throws IOException {

//        }
        DesiredCapabilities DesireCaps = new DesiredCapabilities();
        DesireCaps.setCapability(PhantomJSDriverService.PHANTOMJS_EXECUTABLE_PATH_PROPERTY, "phantomjs");
        WebDriver driver=new PhantomJSDriver(DesireCaps);
        driver.get("http://google.com");
        System.out.println("Success!");

        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        JSONObject responseJson = new JSONObject();

        String s = "{\n" +
                "  \"session\": {\n" +
                "    \"id\": \"example_session_id\",\n" +
                "    \"params\": {}\n" +
                "  },\n" +
                "  \"custom\": httpResponse,\n" +
                "  \"prompt\": {\n" +
                "    \"override\": false,\n" +
                "    \"content\": {\n" +
                "      \"card\": {\n" +
                "        \"title\": \"Card Title\",\n" +
                "        \"subtitle\": \"Card Subtitle\",\n" +
                "        \"text\": \"Card Content\",\n" +
                "        \"image\": {\n" +
                "          \"alt\": \"Google Assistant logo\",\n" +
                "          \"height\": 0,\n" +
                "          \"url\": \"https://developers.google.com/assistant/assistant_96.png\",\n" +
                "          \"width\": 0\n" +
                "        }\n" +
                "      }\n" +
                "    },\n" +
                "    \"firstSimple\": {\n" +
                "      \"speech\": \"This is a card rich response. Hello World!\",\n" +
                "      \"text\": \"\"\n" +
                "    }\n" +
                "  }\n" +
                "}";

        JSONObject responseBody = new JSONObject();

        JSONObject sessionJson = new JSONObject();
        sessionJson.put("id", "example_session_id");
        sessionJson.put("params", new JSONObject());
        responseBody.put("session", sessionJson);

//        responseBody.put("custom", "hello world!");

        JSONObject promptJson = new JSONObject();
        promptJson.put("override", false);
        JSONObject contentJson = new JSONObject();
        JSONObject cardJson = new JSONObject();
        cardJson.put("title", "Card Title");
        cardJson.put("subtitle", "Card Subtitle");
        cardJson.put("text", "Card Content");
        JSONObject imageJson = new JSONObject();
        imageJson.put("alt", "Google Assistant logo");
        imageJson.put("height", 0);
        imageJson.put("url", "https://developers.google.com/assistant/assistant_96.png");
        imageJson.put("width", 0);
        cardJson.put("image", imageJson);
        contentJson.put("card", cardJson);
        promptJson.put("content", contentJson);
        JSONObject firstSimpleJson = new JSONObject();
        firstSimpleJson.put("speech", "This is a card rich response. Hello World!");
        firstSimpleJson.put("text", "");
        promptJson.put("firstSimple", firstSimpleJson);
        responseBody.put("prompt", promptJson);

//        responseBody.put("message", "New item created");

        JSONObject headerJson = new JSONObject();
        headerJson.put("x-custom-header", "my custom header value");
        headerJson.put("Content-Type", "application/json");

        responseJson.put("statusCode", 200);
        responseJson.put("headers", headerJson);
        responseJson.put("body", responseBody.toString());

        OutputStreamWriter writer = new OutputStreamWriter(outputStream, "UTF-8");
        writer.write(responseJson.toString());
        writer.close();

        // implementation
    }
}
