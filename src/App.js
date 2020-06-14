import React, {Component} from 'react';
import './styles/style.scss';

class App extends Component {
  state = {
    record: true
  }

  toggle = () => {
    this.setState({
      record: !this.state.record
    })
  }

  render() {
    return (
      <div>
        <h3> Words </h3>
        <div className="words" contenteditable></div>
        <h3> Mathematical Result </h3>
        <div className="words result" contenteditable></div>
        {this.state.record === true ?
        <button className="start" onClick={this.toggle}> START </button> :
        <button className="end" onClick={this.toggle}> END </button>
        }
      </div>
    )
  }
}

export default App;
