import React, {Component} from 'react';


class HelloWorld extends Component {
  render() {
    return <h1>Hello {this.props.Name}</h1>;
  }
}

export default HelloWorld;