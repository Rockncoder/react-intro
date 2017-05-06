import React, {Component} from 'react';

class App extends Component {
  componentWillUpdate() {
    console.info('componentWillUpdate');
  }

  componentDidUpdate() {
    console.info('componentDidUpdate');
  }

  componentWillMount() {
    console.info('componentWillMount');
  }

  componentDidMount() {
    console.info('componentDidMount');
  }

  componentWillUnmount() {
    console.info('componentWillUnmount');

  }

  render() {
    console.info('render');

    return (
      <div>
        <h1>Logs are in the console</h1>
      </div>
    );
  }
}

export default App;
