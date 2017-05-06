import React, {Component} from 'react';
import {Segment, Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class TimerDashboard extends Component {
  state = {
    timer: {
      initial: 1 * 60 * 1000,
      start: 0,
      elapsed: 0,
      isRunning: true,
      isBeginning: true,
      runningSince: Date.now()
    }
  };

  handleClickStart = () => {
    const isRunning = !this.state.timer.isRunning;

    this.setState({
      timer: Object.assign({},
        this.state.timer,
        {
          isRunning: isRunning,
          elapsed: isRunning? 0: Date.now()
        })
    })
  };

  render() {
    return (
      <Segment padded compact>
        <Timer
          isRunning={this.state.timer.isRunning}
          elapsed={this.state.timer.elapsed}
          runningSince={this.state.timer.runningSince}
          initial={this.state.timer.initial}
        />
        <Button onClick={this.handleClickStart}>
          {this.state.timer.isRunning ? "Stop" : "Start"}
        </Button>
      </Segment>
    );
  }
}

class Timer extends Component {
  componentWillMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  render() {
    const display = renderElapsedString(this.props);

    return (
      <Segment padded compact>
        <h1>{display}</h1>
      </Segment>
    );
  }
}

export default TimerDashboard;

function renderElapsedString(props) {
  let elapsed = props.elapsed;
  let runningSince = props.runningSince;
  let initial = props.initial;
  let isRunning = props.isRunning;
  let totalElapsed = elapsed;

  if (runningSince && isRunning) {
    totalElapsed += Date.now() - runningSince;
  }
  let ticks = initial - totalElapsed;
  ticks = ticks > 0 ? ticks : 0;
  return milliSecondsToHuman(ticks);
}


function milliSecondsToHuman(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);

  return [
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');
}

function pad(numberString, size) {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
}