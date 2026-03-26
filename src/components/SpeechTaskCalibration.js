import React from 'react';
import Button from '@material-ui/core/Button';
import i18next from 'i18next';
import WebcamCapture from './WebcamCapture';
import ExplanationSpeechTask from './ExplanationSpeechTask';
import { calculateHeightInPx, calculateWidthInPx } from '../utils';

export default class SpeechTaskCalibration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webcamStream: null,
      hasUserMedia: false,

      countDownTimer: 3,

      countdownBegins: false,

      buttonState: 'explain',
    };
    this.startCountdown = this.startCountdown.bind(this);
    this.changeStartExplanation = this.changeStartExplanation.bind(this);
    this.webcamCallback = this.webcamCallback.bind(this);
    this.audioWaveWidth = calculateWidthInPx(80);
    this.audioWaveHeight = calculateHeightInPx(15);
  }

  webcamCallback(stream) {
    this.setState({
      webcamStream: stream,
      hasUserMedia: true,
    });
  }

  startCountdown() {
    this.setState({
      buttonState: 'countdown',
    });
    let countdown = setInterval(() => {
      this.setState({
        countDownTimer: this.state.countDownTimer - 1,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(countdown);
      this.props.incrementSpeechTaskStateCounter();
    }, 3000);
  }

  changeStartExplanation() {
    this.setState({ buttonState: 'configuration' }, () =>
      this.props.incrementSpeechTaskStateCounter(),
    );
  }

  render() {
    let button = null;
    if (this.state.buttonState === 'explain') {
      button = (
        <ExplanationSpeechTask
          changeStartExplanation={this.changeStartExplanation}
          handleCancelDialog={this.props.handleCancelDialog}
        />
      );
    } else if (this.state.buttonState === 'start') {
      button = (
        <>
          <Button
            variant="contained"
            size="large"
            className="speechTask-countdown-button"
            onClick={() => {
              if (this.state.hasUserMedia) {
                this.setState(
                  {
                    buttonState: 'configuration',
                  },
                  () => this.props.incrementSpeechTaskStateCounter(),
                );
              } else {
                window.alert(
                  'Please give permissions for camera and microphone before continuing',
                );
              }
            }}
          >
            {i18next.t('button.start')}
          </Button>
        </>
      );
    } else if (this.state.buttonState === 'countdown') {
      button = (
        <div className="text-center countdownSpeechTask">
          {this.state.countDownTimer}
        </div>
      );
    } else if (this.state.buttonState === 'configuration') {
      button = (
        <>
          <Button
            variant="contained"
            size="large"
            className="speechTask-countdown-button"
            onClick={() => {
              this.startCountdown();
            }}
          >
            {i18next.t('button.ready')}
          </Button>
        </>
      );
    }
    return (
      <div className="container-fluid p-0">
        <div className="row speechTask-start">
          <div className="col">
            <div className="row justify-content-center py-2">
              <div className="col-8 ">
                <div className="speechTask-header-wait">
                  {
                    this.props.speechTaskStates[
                      this.props.speechTaskStateCounter
                    ][2]
                  }
                </div>
              </div>
            </div>
            <div className="row justify-content-center pb-2">
              <WebcamCapture
                studyPage="speechTask"
                videoCounter={this.props.videoCounter}
                webcamCallback={this.webcamCallback}
                webcamSize={calculateHeightInPx(32)}
              />
            </div>
            {button}
          </div>
        </div>
      </div>
    );
  }
}
