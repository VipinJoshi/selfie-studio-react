import React from "react";
import Webcam from "react-webcam";
import ImageFilter from "react-image-filter";
import SelfieSteps from "./SelfieSteps";
class Selfie extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      step: 0
    };
  }
  drawImage(imageId, x, y, dWidth = 233, dHeight = 183) {
    const c = document.getElementById("selfie");
    const context = c.getContext("2d");
    const img = document.getElementById(imageId);
    context.drawImage(img, x, y, dWidth, dHeight);
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
    this.setState({ screenshot, step: 2 });
  };


  retake = () => {
    this.setState({ screenshot: null, step: 0, filter:"none" });
  };

  applyFilter = filter => {
    this.setState({ filter });
  };

  render() {
    console.log("Home");
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    const { step, filter = "none" } = this.state;
    return (
      <div>
        <h1>Take Selfie</h1>
        {
          step===0?
          <div><h1> take a selfie</h1>
            <button onClick={()=>this.setState({step:1})}>Take selfie</button>
          </div>:null
        }
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

        {step === 2  && this.state.screenshot ? (
          <div>
            <canvas
              id="selfie"
              width="333"
              height="290"
              style={{ border: "1px solid #d3d3d3" }}
            />
            <img
              src={this.state.screenshot}
              id="img1"
              style={{ display: "none" }}
            />
            <img
              src={require("./../../frame1.png")}
              id="img2"
              style={{ display: "none" }}
            />
            <img
              src={require("./../../frame2.png")}
              id="img3"
              style={{ display: "none" }}
            />
            <p>
              <button onClick={() => this.drawImage("img1", 10, 10, 303, 253)}>
                Draw Image
              </button>
            </p>
            <p>
              <button onClick={() => this.drawImage("img2", 0,0,333,290)}>
                Draw Frame
              </button>
            </p>
            <p>
              <button onClick={() => this.drawImage("img3", 0,0,333,290)}>
                Draw Frame2
              </button>
            </p>
            <p>
              <a id="download" onClick={this.downloadImage}>
                Download Image
              </a>
            </p>
          </div>
        ) : null}
        <SelfieSteps activeStep={step}></SelfieSteps>
      </div>
    );
  }
}

export default Selfie;
