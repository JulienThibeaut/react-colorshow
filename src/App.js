import React, { Component } from 'react';
import ListVideosContainers from './containers/ListVideosContainer'

class App extends Component {
  constructor() {
    super()
    this.state = {isLoading: true}
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 3500)
  }

  handleClick() {
    this.setState({ isLoading: false })
  }

  render() {
    const Loading = <h1 onClick={this.handleClick}>COLORS</h1>
    const { isLoading } = this.state
    return (
      isLoading?
        <div className="hello-container full-height alignvh bg-colors">
          {Loading}
        </div>:
        <div className="App">
           <ListVideosContainers />
       </div>
    );
  }
}

export default App;
