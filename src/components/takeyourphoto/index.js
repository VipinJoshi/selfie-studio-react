import React from "react";
import Webcam from "react-webcam";
import ImageFilter from "react-image-filter";
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

  capture = () => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot, step: 1 });
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
        {step === 0 ? (
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

        {step === 1 && this.state.screenshot ? (
          <div>
            <div className="capture-image">
            <div className="filter-box">
              {filter === "none" ? (
                <ImageFilter image={this.state.screenshot} />
              ) : (
                <ImageFilter
                  image={this.state.screenshot}
                  filter={filter} // see docs beneath
                  colorOne={[40, 250, 250]}
                  colorTwo={[250, 150, 30]}
                />
              )}
              </div>
              <button onClick={this.retake}>Retake</button>
              <div>
                <button onClick={() => this.applyFilter("none")}>None</button>
                <button onClick={() => this.applyFilter("invert")}>
                  Invert
                </button>
                <button onClick={() => this.applyFilter("grayscale")}>
                  Grayscale
                </button>
                <button onClick={() => this.applyFilter("sepia")}>Sepia</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Selfie;
