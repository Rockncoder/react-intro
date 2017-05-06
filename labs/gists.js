import React, {Component} from 'react';

class App extends Component {

  state = {
    gists: null
  };

  componentDidMount() {
    fetch('https://api.github.com/gists')
      .then(res => res.json())
      .then(gists => {
        this.setState({gists})
      });
  }

  render() {
    const {gists} = this.state;
    return (
      <div>
        <div>
          {gists ? (
            gists.map(gist => (
              <div key={gist.id}>
                {gist.description || '[no description]'}
              </div>
            ))
          ):(
            <div>Loading...</div>
          )}
        </div>
        <div>
          <h1>Welcome</h1>
        </div>
      </div>
    )
  }
}

export default App;