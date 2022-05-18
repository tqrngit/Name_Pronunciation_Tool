package com.wellsfargo.speech.domain;

import javax.persistence.*;

@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String first_name;
    private String last_name;
    private String uid;
    private String preferred_name;
    private String phonetics;
    private String pronunciation;
    private String languages;
    private String gender;
    private String speed;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private String base64Audio;

    public Client() {
    }

    public Client(Long id, String first_name, String last_name, String uid, String preferred_name, String phonetics, String pronunciation, String languages, String gender, String speed, String base64Audio) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.uid = uid;
        this.preferred_name = preferred_name;
        this.phonetics = phonetics;
        this.pronunciation = pronunciation;
        this.languages = languages;
        this.gender = gender;
        this.speed = speed;
        this.base64Audio = base64Audio;
    }

    public Client(String first_name, String last_name, String uid, String preferred_name, String phonetics, String pronunciation, String languages, String gender, String speed, String base64Audio) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.uid = uid;
        this.preferred_name = preferred_name;
        this.phonetics = phonetics;
        this.pronunciation = pronunciation;
        this.languages = languages;
        this.gender = gender;
        this.speed = speed;
        this.base64Audio = base64Audio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getPreferred_name() {
        return preferred_name;
    }

    public void setPreferred_name(String preferred_name) {
        this.preferred_name = preferred_name;
    }

    public String getPhonetics() {
        return phonetics;
    }

    public void setPhonetics(String phonetics) {
        this.phonetics = phonetics;
    }

    public String getPronunciation() {
        return pronunciation;
    }

    public void setPronunciation(String pronunciation) {
        this.pronunciation = pronunciation;
    }

    public String getLanguages() {
        return languages;
    }

    public void setLanguages(String languages) {
        this.languages = languages;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }

    public String getBase64Audio() {
        return base64Audio;
    }

    public void setBase64Audio(String base64Audio) {
        this.base64Audio = base64Audio;
    }
}
