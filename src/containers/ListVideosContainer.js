import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import API_KEY from './../api/index.js'
import axios from 'axios'

const API = 'https://www.googleapis.com/youtube/v3/search?key='+API_KEY+'&channelId=UC2Qw1dzXDBAZPwS7zm37g8g&part=snippet,id'

class ListVideoContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: '',
      thumbnails: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
      isRedirect: false,
      isLoading: true,
      randomVideoID: '',
      randomColor: ''
    }
    this.listVideos = this.listVideos.bind(this)
    this.imgThumbails = this.imgThumbails.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.fetchApi = this.fetchApi.bind(this)
  }

  componentDidMount() {
    const orderBy = 'date'
    this.fetchApi(orderBy)
  }

  fetchApi(order) {
    const isLoading = false
    setTimeout(() =>
    axios.get(API+'&order='+order+'&maxResults=50')
      .then(response => {
        const items = response.data.items
        this.setState({items, isLoading})
      }), 1000)
  }

  onMouseEnter(thumbnails, event) {
    event.preventDefault()
    const randomColor = "#"+((1<<24)*Math.random()|0).toString(16);
    this.setState({thumbnails, randomColor})
  }

  onMouseLeave(event) {
    event.preventDefault()
    this.setState({thumbnails: null})
  }

  listVideos() {
    if (this.state.items instanceof Array) {
      return (
        <ul>
          {this.state.items.map(item => {
            let title = item.snippet.title
            title = title.replace('| A COLORS SHOW', ' ')
            let videoID = item.id.videoId
            let thumbnails = item.snippet.thumbnails.high.url
            let description = item.snippet.description
            return (
              <li key={item.etag}>
                <Link to={{
                    pathname: '/?watch',
                    search: '?v='+videoID,
                    state: { videoID: videoID }
                }}>
                  <p className={`list-title ${this.state.randomColor}`}
                    onMouseEnter={this.onMouseEnter.bind(null, thumbnails)}
                    onMouseLeave={this.onMouseLeave.bind(videoID)}>{title}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      )
    }
  }

  imgThumbails(thumbnails) {
    return (
      <div className="thumbnails-container">
        <img src={thumbnails} />
      </div>
    )
  }

  handleOrder(order, event) {
    event.preventDefault()
    const isLoading = true
    this.setState({isLoading})
    this.fetchApi(order)
  }

  handleRandom() {
    const videos = this.state.items
    const randomVideo = videos[Math.floor(Math.random()*videos.length)]
    const randomVideoID = randomVideo.id.videoId
    this.setState({
      randomVideoID,
      isRedirect: true
    })
  }

  render() {
    console.log(this.state)
    const { items, thumbnails, isRedirect, randomVideoID, isLoading } = this.state
    const footer = <footer className="alignvh"><a href="https://www.youtube.com/channel/UC2Qw1dzXDBAZPwS7zm37g8g">All COLORS, no genres.</a></footer>
    if (isRedirect) {
      return <Redirect to={{
          pathname: '/?watch',
          search: '?v='+randomVideoID,
          state: { videoID: randomVideoID }
      }} />
    }

    return (
      <div>
        <div className="navbar-list-videos">
          <div>
            <p onClick={this.handleOrder.bind(this,'viewCount')}>popularity</p>
            <p onClick={this.handleOrder.bind(this,'date')}>new</p>
          </div>
          <div>
            <p onClick={this.handleRandom.bind(this)}>random</p>
          </div>
        </div>
        {isLoading?
          <div className="load-list full-height alignvh">
            <h3>All COLORS, no genres.</h3>
          </div>:
        <div className="list-videos-container">
          {this.listVideos()}
        </div>}
        {this.imgThumbails(thumbnails)}
        {footer}
      </div>
    )
  }
}

export default ListVideoContainer
