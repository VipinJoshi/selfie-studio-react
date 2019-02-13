import React from "react";
import Webcam from "react-webcam";
import SelfieSteps from "./SelfieSteps";
import Canvas from "./Canvas";
class Selfie extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      step: 0,
      isFrameSet: false
    };
  }
  drawImage(imageId, x, y, dWidth = 233, dHeight = 183, type) {
    const c = document.getElementById("selfie");
    const context = c.getContext("2d");
    if (context) {
      const img = document.getElementById(imageId);
      debugger;
      if (type === "frame" && this.state.isFrameSet) {
        context.clearRect(0, 0, c.width, c.height);
        context.restore();
        this.drawImage("clickedImage", 10, 10, 303, 253);
        context.drawImage(img, x, y, dWidth, dHeight);
      } else {
        context.drawImage(img, x, y, dWidth, dHeight);
        if (type === "frame") {
          this.setState({ isFrameSet: true });
        }
      }
    }
  }

  downloadImage() {
    const download = document.getElementById("download");
    const canvas = document.getElementById("selfie");
    download.addEventListener("click", () => {
      download.href = canvas.toDataURL();
      download.download = "selfie.png";
    });
  }

  capture = () => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot, step: 2 }, () => {
      debugger;
      // this.drawImage("clickedImage", 10, 10, 303, 253);
    });

    //this.drawImage("clickedImage", 10, 10, 303, 253);

  };

  retake = () => {
    this.setState({ screenshot: null, step: 0, filter: "none" });
  };

  applyFilter = filter => {
    this.setState({ filter });
  };

 

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    const { step, filter = "none" } = this.state;
    return (
      <div>
        <h1>Take Selfie</h1>
        {step === 0 ? (
          <div>
            <h1> take a selfie</h1>
            <button onClick={() => this.setState({ step: 1 })}>
              Take selfie
            </button>
          </div>
        ) : null}
        {step === 1 ? (
          <div className="webcams">
            <Webcam
              audio={false}
              height={450}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={450}
              videoConstraints={videoConstraints}
            />

            <button onClick={this.capture}>Capture photo</button>
          </div>
        ) : null}

        {step === 2 && this.state.screenshot ? (
          <div>
             <Canvas image={this.state.screenshot}/>
          </div>
        ) : null}
        <SelfieSteps activeStep={step} />
      </div>
    );
  }
}

export default Selfie;