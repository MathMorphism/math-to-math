import React, { Component } from 'react';
import SpeechRecognition from './SpeechRecognition'
import './styles/style.scss';

class App extends Component {
  render() {
    return (
        <div className="App">
          <SpeechRecognition />
        </div>
    )
  }
}

export default App;
