package com.wellsfargo.speech.controller;


import com.google.cloud.texttospeech.v1.SsmlVoiceGender;
import com.wellsfargo.speech.tts.TextToPronunciation;
import org.apache.http.util.TextUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@Controller
public class GetPronunciationController {
    private static final Log log = LogFactory.getLog(GetPronunciationController.class);


    // TODO: implement error handling
    @RequestMapping(value = "/get:pronunciation", params = {"text","language","speakrate","gender"})
    @ResponseBody
    public String getPronunciation(@RequestParam(value = "text")String text,
                                   @RequestParam(value = "language")String language,
                                   @RequestParam(value = "speakrate")double speakrate,
                                   @RequestParam(value = "gender")String gender)
    {
        log.info("getPronunciation:start");
        // Perform parameter validation
        SsmlVoiceGender ssmlVoiceGender = SsmlVoiceGender.NEUTRAL;
        if(!TextUtils.isEmpty(gender)){
            if(gender.contains("female"))
                ssmlVoiceGender = SsmlVoiceGender.FEMALE;
            else if (gender.contains("male"))
                ssmlVoiceGender = SsmlVoiceGender.MALE;
        }
        TextToPronunciation textToPronunciation = new TextToPronunciation();
        return textToPronunciation.textToSpeech(text, language, speakrate, ssmlVoiceGender);
    }

}
