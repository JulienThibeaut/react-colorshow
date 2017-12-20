import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class VideoContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      videoID: ''
    }
  }

  componentDidMount() {
    const videoID = this.props.location.state.videoID
    this.setState({videoID})
    setTimeout(() => this.setState({ isLoading: false }), 1000)
  }

  render() {
    const Loading = <h1 onClick={this.handleClick}>COLORS</h1>
    const { isLoading, videoID } = this.state
    return (
      isLoading?
        <div className="hello-container full-height alignvh bg-colors">
          {Loading}
        </div>:
        <div className="App bg-black">
          <div className="navbar-video">
            <Link to='/'>
              <h3>menu</h3>
            </Link>
          </div>
          <iframe className="video" frameBorder="0" scrolling="no" seamless="seamless"
            allowFullScreen="allowfullscreen" id="okplayer"
            src={`http://youtube.com/embed/${videoID}?autoplay=1&amp;loop=1&amp;hd=1&amp;controls=0&amp;showinfo=0&amp;modestbranding=1&amp;iv_load_policy=3&amp;rel=0`}></iframe>
        </div>
    )
  }
}


export default VideoContainer
