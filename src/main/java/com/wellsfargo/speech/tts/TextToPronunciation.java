package com.wellsfargo.speech.tts;
/**
 * Text to pronunciation - Convert given name into pronunciation
 */

import com.google.cloud.texttospeech.v1.AudioConfig;
import com.google.cloud.texttospeech.v1.AudioEncoding;
import com.google.cloud.texttospeech.v1.SsmlVoiceGender;
import com.google.cloud.texttospeech.v1.SynthesisInput;
import com.google.cloud.texttospeech.v1.SynthesizeSpeechResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.VoiceSelectionParams;
import com.google.common.io.BaseEncoding;
import com.google.protobuf.ByteString;
import com.wellsfargo.speech.pojo.TextToPronunciationResponse;
import com.wellsfargo.speech.utils.JsonUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class TextToPronunciation {
    private static final Log log = LogFactory.getLog(TextToPronunciation.class);
    private final Object mLock = new Object();


    /**
     *
     * @param name
     * @param language
     * @param speakingRate - Speaking rate/speed, in the range [0.25, 4.0]. 1.0 is
     *     the normal native speed supported by the specific voice. 2.0 is twice as
     *     fast, and 0.5 is half as fast. If unset(0.0), defaults to the native 1.0
     *     speed. Any other values &lt; 0.25 or &gt; 4.0 will return an error.
     * @return audioContent
     *
     */
    // NOTE: This is synchronize method, we may need to replace it
    public String textToSpeech(String name, String language, double speakingRate, SsmlVoiceGender gender) {
        log.info("textToSpeech: name="+name+",language="+language+",speakingRate="+speakingRate+",gender="+gender);
        synchronized (mLock) {
            String audioContent = null;
// Instantiates a client
            try {;
                TextToSpeechClient textToSpeechClient = TextToSpeechClient.create();
                // Set the text input to be synthesized
                SynthesisInput input = SynthesisInput.newBuilder().setText(name).build();
                log.debug("textToSpeech created SynthesisInput");
                // Build the voice request, select the language code ("en-US") and the ssml voice gender
                // ("neutral")
                VoiceSelectionParams voice =
                        VoiceSelectionParams.newBuilder()
                                .setLanguageCode(language)
                                .setSsmlGender(gender)
                                .build();
                log.debug("textToSpeech Created VoiceSelectionParams");
                // Select the type of audio file you want returned
                AudioConfig audioConfig =
                        AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.LINEAR16).setSpeakingRate(speakingRate).build();
                // Perform the text-to-speech request on the text input with the selected voice parameters and
                // audio file type
                SynthesizeSpeechResponse response =
                        textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

                String asBase64 = BaseEncoding.base64().encode(response.getAudioContent().toByteArray());

                log.debug("textToSpeech response:"+response);
                // Get the audio contents from the response
                log.info("textToSpeech:end");
                TextToPronunciationResponse textToPronunciationResponse = new TextToPronunciationResponse();
                textToPronunciationResponse.setAudioContent(asBase64);
                textToPronunciationResponse.setLanguage(language);
                textToPronunciationResponse.setText(name);
                textToPronunciationResponse.setDefaultAudioEncoding("LINDEAR16");

                return new JsonUtils().ObjectToJson(textToPronunciationResponse);
//                ByteString audioContents = response.getAudioContent();
//                log.info("textToSpeech5 audioContents = "+audioContents);
//                audioContent = audioContents.toString();
            } catch (Exception e) {
                e.printStackTrace();
            }
            return audioContent;
        }
    }
}
