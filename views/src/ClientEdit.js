import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

import ipa from './data/en_US.json';

let gumStream = null;
let recorder = null;
let audioContext = null;

// ===========================
// Add or Edit Employee screen
// ===========================
class ClientEdit extends Component {

    emptyItem = {
        uid:'',
        first_name: '',
        last_name: '',
        preferred_name: '',
        phonetics:'',
        pronunciation:'',
        languages:'en-US',
        gender:'male',
        speed:'1.0',
        base64Audio:''
    };
    state = {
        songplaying: false,
        nonStandardPronunPlaying: false
      };
    song = new Audio();
    nonStdAudio = new Audio();

    base64string = '';
    name = '';

    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePronunSubmit = this.handlePronunSubmit.bind(this);


    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const client = await (await fetch(`/clients/${this.props.match.params.id}`)).json();
            this.setState({item: client});
        }

    }

     componentWillUnmount() {
        this.song.removeEventListener("ended", () => {
          this.setState({ songplaying: false });
          }
        );
        this.nonStdAudio.removeEventListener("ended", () => {
          this.setState({ nonStandardPronunPlaying: false });
          }
        );
      }

// Standard Audio playing
switchPlay = () => {
    const {item} = this.state;
    if(item.base64Audio) {
    this.base64string = item.base64Audio;
    }
    if(this.base64string === ""){
        alert("ERROR: Unable to get a audio content\n Click Get:Pronunication button")
    }

    this.song = new Audio("data:audio/wav;base64," + this.base64string);
    this.song.addEventListener("ended", () => {
        this.setState({ songplaying: false });
        }
      );
    this.setState({ songplaying: !this.state.songplaying }, () => {
    this.state.songplaying ? this.song.play() : this.song.pause();
    });
};

handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
}

async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    if(!item.languages) {
        item.languages = 'en-US';
           }
       if(!item.speed) {
           item.speed = '1.0';
              }
      if(!item.gender) {
          item.gender = 'male';
             }
    item.base64Audio = this.base64string;
    console.log(JSON.stringify(item))

    await fetch('/clients' + (item.id ? '/' + item.id : ''), {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    });
    this.props.history.push('/');
}


async handlePronunSubmit(event) {
    event.preventDefault();
    console.log('handlePronunSubmit');
    const {item} = this.state;

    console.log(item)
    // If preferred name is empty, please use First and Last Names
    if(item.preferred_name !== ""){
       this.name = item.preferred_name;
    } else {
        this.name = item.first_name+' '+item.last_name;
    }

    // Set the value in case of empty items
    if(!item.languages) {
    item.languages = 'en-US';
       }
   if(!item.speed) {
       item.speed = '1.0';
          }
  if(!item.gender) {
      item.gender = 'male';
         }
     if(!this.name) {
           this.name = '';
              }
    const response = await fetch('/get:pronunciation?'+ new URLSearchParams({
                                                           text: this.name,
                                                           language: item.languages,
                                                           speakrate: item.speed,
                                                           gender: item.gender
                                                       }),{
    method:'GET',
    });
    if(response.ok) {
        let respJsonObj = JSON.parse(await response.text());
        this.base64string = respJsonObj.audioContent;
         item.base64Audio = respJsonObj.audioContent;
        alert("SUCCESS: Pronunciation completed")
    } else {
        alert("Get:pronunciation Error Code: "+response.status+' '+response.statusText);
    }
}

// IPA - START
getIPA = () => {
    let item = {...this.state.item};

    let namePhonetics = null;
    if(item.preferred_name !== ""){
       namePhonetics = item.preferred_name;
    } else {
        namePhonetics  = item.first_name+' '+item.last_name;
    }

    const nameArr = namePhonetics.split(" ");
    //    console.log(nameArr);

    let phonetics = '';
    for (let na in nameArr) {
        let name = nameArr[na].toLowerCase();

        if(ipa[name.toLowerCase()]) {
            let phStr = ''+ipa[name.toLowerCase()];
            phonetics = phonetics+' '+ phStr.substring(1,phStr.length-1);
        }
//        else {
//            phonetics = phonetics+' '+name;
//        }
    }
     item['phonetics'] = phonetics;

    this.setState({item});
}
// IPA - END

// Audio RECORDING - START

switchToNonStandardPlay = () => {
    const {item} = this.state;
    if(item.base64Audio) {
    this.base64string = item.base64Audio;
    }
    if(this.base64string === ""){
        alert("ERROR: Unable to get a audio content\n User Start/Stop recording button")
    }

    this.nonStdAudio = new Audio("data:audio/wav;base64," + this.base64string);
    this.nonStdAudio.addEventListener("ended", () => {
        this.setState({ nonStandardPronunPlaying: false });
        }
      );
    this.setState({ nonStandardPronunPlaying: !this.state.nonStandardPronunPlaying }, () => {
    this.state.nonStandardPronunPlaying ? this.nonStdAudio.play() : this.nonStdAudio.pause();
    });
};

onStop = (blob) => {
const {item} = this.state;
    // console.log('wav', blob)
    let reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.addEventListener("loadend", function() {
    var audioBase64 = reader.result.toString();
    let audioTurned = audioBase64.substr(audioBase64.indexOf(',')+1);
    item.base64Audio = audioTurned;
    // console.log(audioTurned);
    });
}

startRecording = () => {
    let constraints = {
        audio: true,
        video: false
    }

    audioContext = new window.AudioContext();
    console.log("sample rate: " + audioContext.sampleRate);

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            console.log("initializing Recorder.js ...");

            gumStream = stream;

            let input = audioContext.createMediaStreamSource(stream);

            recorder = new window.Recorder(input, {
                numChannels: 1
            })

            recorder.record();
            console.log("Recording started");
        }).catch(function (err) {
            //enable the record button if getUserMedia() fails
    });

}

 stopRecording = () => {
    console.log("stopButton clicked");
    recorder.stop(); //stop microphone access
    gumStream.getAudioTracks()[0].stop();
    recorder.exportWAV(this.onStop);
}
// Audio RECORDING END

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit User' : 'Add User'}</h2>;

        return <div>
                    <AppNavbar/>
                    <h2 className="AppCenter-Text">Change Name Pronunciation</h2>
                    <Container>
                        {title}
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="uid">User ID</Label>
                                <Input type="text" name="uid" id="uid" value={item.uid || ''}
                                       onChange={this.handleChange} autoComplete="uid"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="first_name">First Name</Label>
                                <Input type="text" name="first_name" id="first_name" value={item.first_name || ''}
                                       onChange={this.handleChange} autoComplete="first_name"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="last_name">Last Name</Label>
                                <Input type="text" name="last_name" id="last_name" value={item.last_name || ''}
                                       onChange={this.handleChange} autoComplete="last_name"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="preferred_name">Preferred Name</Label>
                                <Input type="text" name="preferred_name" id="preferred_name" value={item.preferred_name || ''}
                                       onChange={this.handleChange} autoComplete="preferred_name"/>
                            </FormGroup>
                            <p />

                        </Form>
                        <Label for="pronunciation">Pronunciation</Label>
                        <Form onSubmit={this.handlePronunSubmit} >
                          <label >Language:</label>{' '}
                            <select name="languages" id="languages" value={item.languages} onChange={this.handleChange} >
                                <option value="en-US" >English (US)</option>
                                <option value="en-IN">English (India)</option>
                                <option value="en-GB">English (UK)</option>
                                <option value="hi-IN">Hindi (India)</option>
                                <option value="cmn-TW">Mandarin Chinese</option>
                                <option value="ta-IN">Tamil (India)</option>
                                <option value="te-IN">Telugu (India)</option>
                                <option value="vi-VN">Vietnamese (Vietnam)</option>
                                <option value="ar-XA">Arabic</option>

                                <option value="bn-IN">Bengali (India)</option>
                                <option value="bg-BG">Bulgarian (Bulgaria)</option>
                                <option value="yue-HK">Chinese (Hong Kong)</option>

                                <option value="da-DK">Danish (Denmark)</option>
                                <option value="nl-BE">Dutch (Belgium)</option>
                                <option value="nl-NL">Dutch (Netherlands)</option>
                                <option value="en-AU">English (Australia)</option>
                                <option value="fil-PH">Filipino (Philippines)</option>
                                <option value="fr-CA">French (Canada)</option>
                                <option value="fr-FR">French (France)</option>
                                <option value="de-DE">German (Germany)</option>
                                <option value="gu-IN">Gujarati (India)</option>
                                <option value="id-ID">Indonesian (Indonesia)</option>
                                <option value="it-IT">Italian (Italy)</option>
                                <option value="ja-JP">Japanese (Japan)</option>
                                <option value="kn-IN">Kannada (India)</option>
                                <option value="ko-KR">Korean (South Korea)</option>
                                <option value="ms-MY">Malay (Malaysia)</option>
                                <option value="ml-IN">Malayalam (India)</option>
                                <option value="nb-NO">Norwegian (Norway)</option>
                                <option value="pl-PL">Polish (Poland)</option>
                                <option value="pt-BR">Portuguese (Brazil)</option>
                                <option value="pt-PT">Portuguese (Portugal)</option>
                                <option value="pa-IN">Punjabi (India)</option>
                                <option value="ru-RU">Russian (Russia)</option>
                                <option value="es-ES">Spanish (Spain)</option>
                                <option value="es-US">Spanish (US)</option>
                                <option value="sv-SE">Swedish (Sweden)</option>
                                <option value="tr-TR">Turkish (Turkey)</option>
                                <option value="vi-VN">Vietnamese (Vietnam)</option>
                                                            </select>{' '}
                            <label >Gender:</label>{' '}
                            <select name="gender" id="gender" value={item.gender} onChange={this.handleChange} >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>{' '}
                            <label >Speed:</label>{' '}
                            <select name="speed" id="speed" value={item.speed} onChange={this.handleChange} >
                                <option value="1.0">Medium (Normal)</option>
                                <option value="0.5">Low</option>
                                <option value="2.0">High</option>
                                <option value="4.0">Super High</option>
                            </select>
                            <p></p>
                            <Button color="danger" type="submit" >Get: Pronunciation</Button>{' '}
                            <Button color="success" onClick={this.switchPlay}>
                              {this.state.songplaying ? "Pause" : "Play"}
                            </Button>
                        </Form>

                        <div>
                        <p></p>
                            <Label for=""> <b>Not happy with standard Pronunciation?</b> (Override with your voice to Record/Playback using Mic) </Label>
                            <p></p>
                            <Button color="danger" onClick={this.startRecording} type="button">Start Recording</Button>{' '}
                            <Button color="secondary" onClick={this.stopRecording} type="button">Stop Recording</Button>{' '}
                            <Button color="success" onClick={this.switchToNonStandardPlay}>
                                                                                      {this.state.nonStandardPronunPlaying ? "Pause" : "Play"}
                                                                                    </Button>
                        </div>

                        <Form onSubmit={this.handleSubmit}>


                        <p></p>
                        <FormGroup>
                          <Label for="phonetics"><b>International Phonetic Alphabet (IPA)</b> </Label> {' '}
                          <Button color="danger" onClick={this.getIPA}>Get IPA</Button>{' '}
                          <Label for="phonetics">{item.phonetics || ''}</Label>

                        </FormGroup>
                        <p></p>
                        <FormGroup>
                          <Button color="danger" type="submit">Save</Button>{' '}
                          <Button color="secondary" tag={Link} to="/">Cancel</Button>
                        </FormGroup>
                        </Form>
                    </Container>
                </div>
    }
}
export default withRouter(ClientEdit);