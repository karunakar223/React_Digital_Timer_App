// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {secondsCount: 0, minCount: 25, isTimerRunning: false}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.timerId)
  }

  onResetBtn = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  renderTimerContainer = () => {
    const {isTimerRunning} = this.state

    const playOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const playOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="play-and-reset-container">
        <button
          type="button"
          onClick={this.onStartOrPauseTimer}
          className="play-btn"
        >
          <img
            src={playOrPauseImgUrl}
            alt={playOrPauseAltText}
            className="play-icon"
          />
          <p className="play-icon-name">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button type="button" onClick={this.onResetBtn} className="reset-btn">
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="reset-icon"
            alt="reset icon"
          />
          <p className="reset-icon-name">Reset</p>
        </button>
      </div>
    )
  }

  onIncrementBtn = () =>
    this.setState(prevState => ({
      minCount: prevState.minCount + 1,
    }))

  onDecrementBtn = () =>
    this.setState(prevState => ({
      minCount: prevState.minCount - 1,
    }))

  renderTimerLImitController = () => {
    const {minCount, secondsCount} = this.state
    const isButtonDisabled = secondsCount > 0

    return (
      <div className="increment-container">
        <p className="limit">Set Timer limit</p>
        <div className="row">
          <button
            type="button"
            disabled={isButtonDisabled}
            className="minus-btn"
            onClick={this.onDecrementBtn}
          >
            -
          </button>
          <p className="num">{minCount}</p>
          <button
            type="button"
            disabled={isButtonDisabled}
            className="plus-btn"
            onClick={this.onIncrementBtn}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, minCount, secondsCount} = this.state

    const isTimerCompleted = secondsCount === minCount * 60

    if (isTimerCompleted) {
      this.setState({secondsCount: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.incrementTimerInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  incrementTimerInSeconds = () => {
    this.setState(prevState => ({secondsCount: prevState.secondsCount + 1}))
  }

  setDigitalTimer = () => {
    const {minCount, secondsCount} = this.state
    const totalRemainingSeconds = minCount * 60 - secondsCount
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const strMinutes = minutes > 9 ? minutes : `0${minutes}`
    const strSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${strMinutes}:${strSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state

    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="flex-container">
          <div className="bg-image">
            <div>
              <h1 className="timer">
                {this.setDigitalTimer()} <br />
                <p className="type-timer">
                  {isTimerRunning ? 'Running' : 'Paused'}
                </p>
              </h1>
            </div>
          </div>

          <div className="operate-timer-container">
            <div>
              {this.renderTimerContainer()}
              {this.renderTimerLImitController()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
