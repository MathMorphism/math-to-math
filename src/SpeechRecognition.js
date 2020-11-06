import React, { Component } from 'react';
import {
    AudioConfig,
    CancellationDetails,
    CancellationReason,
    PhraseListGrammar,
    ResultReason,
    SpeechConfig,
    SpeechRecognizer
} from "microsoft-cognitiveservices-speech-sdk";
// import axios from 'axios';
import {evaluate, sqrt} from 'mathjs'

class SpeechRecognition extends Component {
    constructor() {
        super();
        this.state = {
            startButtonDisabled: false,
            stopButtonDisabled: false,
            recognizer: {},
            apiKey: process.env.REACT_APP_API_KEY,
            serviceRegion: process.env.REACT_APP_SERVICE_REGION,
            phraseDiv: "",
            answer: ""
        }
    }

    componentDidMount() {
        // CONFIGURATION
        const speechConfig = SpeechConfig.fromSubscription(this.state.apiKey, this.state.serviceRegion);
        speechConfig.speechRecognitionLanguage = "en-US";
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        // Initialize a recognizer 
        // need to pass it the speechConfig, as this provides the credentials that the speech service requires to validate your request
        const recognizer = new SpeechRecognizer(speechConfig, audioConfig);
        this.setState({
            recognizer: recognizer
        })

        // INITIALIZE RECOGNIZER EVENTS TO LISTEN FOR
        // Signal for events containing intermediate recognition results
        recognizer.recognizing = (s, e) => {
            console.log(`RECOGNIZING: Text=${e.result.text}`);
        };
        // Signal for events containing final recognition results (indicating a successful recognition attempt)
        recognizer.recognized = (s, e) => {
            if (e.result.reason == 3) {
                // recognized speech - ResultReason.Recognized
                console.log(`RECOGNIZED: Text=${e.result.text}`);
                // phraseDiv.innerHTML += e.result.text;
                let phrase = this.state.phraseDiv;
                phrase += e.result.text;
                this.setState({
                    phraseDiv: phrase
                })
            }
            else if (e.result.reason == 0) {
                // could not recognize speech - ResultReason.NoMatch
                console.log("NOMATCH: Speech could not be recognized.");
                // do not add to phraseDiv
            }
        };
        // Signal for events containing canceled recognition results (indicating a recognition attempt that was canceled as a result or a direct cancellation request or, alternatively, a transport or protocol failure)
        recognizer.canceled = (s, e) => {
            console.log(`CANCELED: Reason=${e.reason}`);

            if (e.reason == CancellationReason.Error) {
                console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
                console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
                console.log("CANCELED: Did you update the subscription info?");
            }

            recognizer.stopContinuousRecognitionAsync();
        };
        // Function runs when the "stop" button is clicked and recognizer.stopContinuousRecognitionAsync is called
        recognizer.sessionStopped = (s, e) => {
            console.log("\n    Session stopped event.");
            recognizer.stopContinuousRecognitionAsync();
        };
    }

    startRecognition = () => {
        // Start listening for speech
        // disable the start button, so the user cannot click it again while speech detection is on (can only click the stop button)
        this.setState({
            startButtonDisabled: true,
            phraseDiv: '',
            answer: ''
        })
        // Start continuous speech recognition
        const recognizer = this.state.recognizer;
        recognizer.startContinuousRecognitionAsync(() => { }, (error) => { });
    }

    stopRecognition = () => {
        // Stop listening for speech
        // Stop continuous speech recognition
        const recognizer = this.state.recognizer;
        recognizer.stopContinuousRecognitionAsync(() => { }, (error) => { });
        // un-disable the start button
        this.setState({
            startButtonDisabled: false,
            // phraseDiv: ""
        })

        const phrase = this.state.phraseDiv.toLowerCase()
        const spread = phrase.split(" ")
        // Math terms
        const mathPhrases = ["sqrt", "power"]
        // check if the word is in the math terms array
        const check = spread.filter(word => mathPhrases.includes(word))
        console.log(check)
        const operator = new Function (check[0])
        // console.log(func(20)) 
        // console.log(check(20))
        // let name = func()
        // console.log(name)
        console.log(sqrt(20))
        console.log(Math.sqrt(20))
      console.log(operator)
      switch (check[0]) {
        case "sqrt":
          this.setState({
            answer: sqrt(spread[1])
          });
          break
        case "power":
          this.setState({
            answer: sqrt(spread[1])
          })
          break
        default:
          this.setState({
            answer: evaluate(phrase)
        })
      }
    }

    render() {
        return(
            <div className="speechRecognition">
                <button
                    onClick={this.startRecognition}
                    disabled={this.state.startButtonDisabled}>
                    Start Recognition
                </button>
                <button
                    onClick={this.stopRecognition}>
                    Stop Recognition
                </button>
                <textarea 
                    id="phraseDiv" 
                    // style={{"display: inline-block;width:500px;height:200px"}}
                    value={this.state.phraseDiv}
                    >
                </textarea>
                <textarea value={this.state.answer}>
                </textarea>
            </div>
        )
    }
}

export default SpeechRecognition;