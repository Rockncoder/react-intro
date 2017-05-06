import React, {Component} from 'react';
import { Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class TimerDashboard extends Component {
  state = {
    timer: {
      id: 1,
      initial: 1 * 60 * 1000,
      start: 0,
      elapsed: 0,
      isRunning: false,
      isBeginning: true,
      runningSince: Date.now(),
    }
  };

  render() {
    return (
      <Timer
        elapsed={this.state.timer.elapsed}
        runningSince={this.state.timer.runningSince}
        initial={this.state.timer.initial}
      />
    );
  }
}

class Timer extends Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  render() {
    const elapsedString = renderElapsedString(this.props.elapsed, this.props.runningSince, this.props.initial);

    return (
      <Segment padded compact>
      <div>
        <h1>{elapsedString}</h1>
      </div>
      </Segment>
    );
  }
}

export default TimerDashboard;


function renderElapsedString(elapsed, runningSince, initial) {
  let totalElapsed = elapsed;
  if (runningSince) {
    totalElapsed += Date.now() - runningSince;
  }
  let ticks = initial - totalElapsed;
  ticks = ticks > 0 ? ticks : 0;
  return millisecondsToHuman(ticks);
}

function millisecondsToHuman(ms) {
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