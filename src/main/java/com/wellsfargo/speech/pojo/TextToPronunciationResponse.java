package com.wellsfargo.speech.pojo;

public class TextToPronunciationResponse {
    public String getAudioContent() {
        return audioContent;
    }

    public void setAudioContent(String audioContent) {
        this.audioContent = audioContent;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDefaultAudioEncoding() {
        return defaultAudioEncoding;
    }

    public void setDefaultAudioEncoding(String defaultAudioEncoding) {
        this.defaultAudioEncoding = defaultAudioEncoding;
    }

    private String audioContent;
    private String language;
    private String text;
    private String defaultAudioEncoding;


}
