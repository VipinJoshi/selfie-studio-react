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
      isFrameSet: false
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



  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    const { step, filter = "none" } = this.state;
    return (
      // <div className="container-fluid portrait">
      //   <img src={require("./../../images/bg.png")}></img>

      // </div>
      <div className="container-fluid">
        <div className="bg">
          <div className="row">
            <div className="col">
              <div className="mobile-bg">
                {
                  step === 0 ? (
                    <div className="row">
                      <div className="col">
                        <div className="first-screen">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-xs-12 ">
                            <div className="first-screen-text-position">
                              <p className="first-screen-text-heading">
                                Update Your Profile Picture</p>
                              <p classNamr="first-screen-text-heading">
                              With Real-Time Filters
                        </p>
                        <div>
                        <button
                    className="btn btn-selfie"
                    type="submit" onClick={() => this.setState({ step: 1 })}
                  >
                    TAKE SELFIE
                  </button>
                          </div>
                        </div>
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

                         <button onClick={this.capture}>Capture photo</button>
                       </div>
                    ) : null}
  {step === 2 && this.state.screenshot ? (
                      <div>
                        <Canvas image={this.state.screenshot} />
                       </div>
                   ) : null}

              </div>
            </div>
          </div>
          <div className="row">
            <SelfieSteps activeStep={step} />
          </div>
        </div>
      </div>
      //       <div>
      //         <div className="col-xl-12 col-lg-12 col-md-12">
      //           <div className="row">

      //             <div className="app-container">
      //               <div className="row m-2">
      //                 <div className="class col-xl-12 col-md-12">
      //                 <div className="parent">
      //                   <div className="frame-container">
      // <div className="inner-content"> take selfie</div>
      //                   </div>
      //                 </div>
      //                 </div>
      //               </div>
      //               <h1>Take Selfie</h1>
      //               {step === 0 ? (
      //                 <div>
      //                   <h1> take a selfie</h1>
      //                   <button onClick={() => this.setState({ step: 1 })}>
      //                     Take selfie
      //             </button>
      //                 </div>
      //               ) : null}
      //               {step === 1 ? (
      //                 <div className="webcams">
      //                   <Webcam
      //                     audio={false}
      //                     height={450}
      //                     ref={this.setRef}
      //                     screenshotFormat="image/jpeg"
      //                     width={450}
      //                     videoConstraints={videoConstraints}
      //                   />

      //                   <button onClick={this.capture}>Capture photo</button>
      //                 </div>
      //               ) : null}

      //               {step === 2 && this.state.screenshot ? (
      //                 <div>
      //                   <Canvas image={this.state.screenshot} />
      //                 </div>
      //               ) : null}
      //               <SelfieSteps activeStep={step} />
      //             </div>
      //           </div>
      //         </div>
      //       </div>
    );
  }
}

export default Selfie;