package com.wellsfargo.speech.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Utility to convert objects to json and vice versa
 */
public class JsonUtils {

    public String ObjectToJson(Object obj) {
        Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .create();
        return gson.toJson(obj);
    }
}
