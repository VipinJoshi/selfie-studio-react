import React from "react";
import Webcam from "react-webcam";
import SelfieSteps from "./SelfieSteps";
import Canvas from "./Canvas";
import "./index.css";
class Selfie extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      step: 0,
      isFrameSet: false,
      showLoader: false
    };
  }

  capture = () => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot, step: 2 }, () => {
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


  checkSteps = step => {
    switch (step) {
      case 1: {
        setInterval(this.setState({ screenshot: null, step,showLoader: true }),2000);
        this.setState({ showLoader: false });
        return;
      }
      case 2: {
        this.setState({ step });
        return;
      }
      case 3: {
        this.setState({ step });
        return;
      }
      default: {
        this.retake();
        this.setState({showLoader:false})
        return;
      }
    }
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    const { step, showLoader=true } = this.state;
    return (
      <div  className={showLoader ? "container-fluid loading" : "container-fluid"}>
      
        <div className="bg">
        
          <div className="row">
            <div className="col padding-top-bottom">
              <div className="white-bg">
                {step === 0 ?
                  <div className="selfi-btn-position">
                    <div className="first-screen-text-position">
                      <p className="first-screen-text-heading">
                        Take your selfie</p>
                      <p className="first-screen-text">
                        select frame 
                        </p>
                      <div>
                        <button
                          className="btn btn-selfie"
                          type="submit" onClick={() => this.checkSteps(1)}
                        >
                          TAKE SELFIE
                  </button>
                      </div>
                    </div>
                  </div> : null
                }

                <div className="mobile-bg">
                  {
                    step === 0 ? (
                      <div className="row">
                        <div className="col">
                          <div className="first-screen">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-xs-12 ">

                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  {step === 1 ? (

                    <div className="webcams">
                      <Webcam
                        audio={false}
                        height={450}
                        ref={this.setRef}
                        screenshotFormat="image/jpeg"
                        width={750}
                        videoConstraints={videoConstraints}
                      />
                      <div class="grey-bg">
                        <button className="btn capture" onClick={this.capture}>
                        <img src={require("../../images/camera-icon.png")} alt="" /></button>
                      </div>
                    </div>
                  ) : null}
                  {(step === 2 || step === 3) && this.state.screenshot ? (
                    <div>
                      <Canvas image={this.state.screenshot} step={step} setSteps={(steps) => this.checkSteps(steps)} showLoader={(value)=>this.setState({showLoader:value})} />
                    </div>
                  ) : null}

                </div>
              </div>
            </div>
          </div>
          <div className="row selfie-step">
            <SelfieSteps activeStep={step} />
          </div>  
        </div>
        
        <div className="modal" />
      </div>
    );
  }
}

export default Selfie;