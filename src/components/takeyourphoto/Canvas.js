import React from "react";
import "./step3.css"

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFrameSet: false
        };
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.refs.image;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 333, 290)
        }
    }
    drawImage(imageId, x, y, dWidth = 233, dHeight = 183, type) {
        const c = document.getElementById("selfie");
        const context = c.getContext("2d");
        if (context) {
            const img = document.getElementById(imageId);
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
    sendImage() {
        //add logic for email 
        this.props.setSteps(0);
    }

    render() {
        const { image, step = 2 } = this.props;
        return (
            <div className="canvas-container">

                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <canvas id="selfie" ref="canvas" width={640} height={525} />
                        <img ref="image" id="clickedImage" src={image} className="hidden" style={{ display: "none" }} />
                        <img
                            src={require("./../../images/frame1.png")}
                            id="img1"
                            style={{ display: "none" }}
                        />
                        <img
                            src={require("./../../images/frame2.png")}
                            id="img2"
                            style={{ display: "none" }}
                        />
                        <img
                            src={require("./../../images/frame3.png")}
                            id="img3"
                            style={{ display: "none" }}
                        />
                        <img
                            src={require("./../../images/frame4.png")}
                            id="img4"
                            style={{ display: "none" }}
                        />
                        <img
                            src={require("./../../images/frame5.png")}
                            id="img5"
                            style={{ display: "none" }}
                        />
                        <img
                            src={require("./../../images/frame6.png")}
                            id="img6"
                            style={{ display: "none" }}
                        />
                        <img
                            src={require("./../../images/frame7.png")}
                            id="img7"
                            style={{ display: "none" }}
                        />
                        <img
                            src={require("./../../images/frame8.png")}
                            id="img8"
                            style={{ display: "none" }}
                        />
                        <img
                            src={require("./../../images/frame9.png")}
                            id="img9"
                            style={{ display: "none" }}
                        />
                        <img
                            src={require("./../../images/frame10.png")}
                            id="img10"
                            style={{ display: "none" }}
                        />
                    </div>
                    {step === 2 ?
                        <div className="col-xl-5 col-lg-5 col-md-5 frames-box">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6">

                                    <div className="frame-button" onClick={() => this.drawImage("img1", 0, 0, 333, 290, "frame")}>
                                        <img src={require("./../../images/frame1.png")}></img>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6">

                                    <div className="frame-button" onClick={() => this.drawImage("img2", 0, 0, 333, 290, "frame")}>
                                        <img src={require("./../../images/frame2.png")}></img>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6">

                                    <div className="frame-button" onClick={() => this.drawImage("img3", 0, 0, 333, 290, "frame")}>
                                        <img src={require("./../../images/frame3.png")}></img>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6">

                                    <div className="frame-button" onClick={() => this.drawImage("img4", 0, 0, 333, 290, "frame")}>
                                        <img src={require("./../../images/frame4.png")}></img>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6">

                                    <div className="frame-button" onClick={() => this.drawImage("img5", 0, 0, 333, 290, "frame")}>
                                        <img src={require("./../../images/frame5.png")}></img>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6">

                                    <div className="frame-button" onClick={() => this.drawImage("img6", 0, 0, 333, 290, "frame")}>
                                        <img src={require("./../../images/frame6.png")}></img>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6">

                                    <div className="frame-button" onClick={() => this.drawImage("img7", 0, 0, 333, 290, "frame")}>
                                        <img src={require("./../../images/frame7.png")}></img>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6">

                                    <div className="frame-button"
                                        onClick={() => this.drawImage("img8", 0, 0, 333, 290, "frame")}
                                    >
                                        <img src={require("./../../images/frame8.png")}></img>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6">

                                    <div className="frame-button" onClick={() => this.drawImage("img9", 0, 0, 333, 290, "frame")}>
                                        <img src={require("./../../images/frame9.png")}></img>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6">

                                    <div className="frame-button" onClick={() => this.drawImage("img10", 0, 0, 333, 290, "frame")}>
                                        <img src={require("./../../images/frame10.png")}></img>
                                    </div>
                                </div>
                            </div>


                        </div>
                        : <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 text-center">
                                    Save & Share
                     </div>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 text-center mt-4">
                                        <div className="form-group">
                                            <div className="div-label">
                                                <label className="label-text" htmlFor="email">
                                                    Enter email Id
        </label>
                                            </div>

                                            <div className="text-input">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"

                                                    placeholder="Enter your email id"

                                                />

                                            </div>
                                        </div>
                                        <div><button className="btn btn-primary" onClick={() => this.sendImage()}>Share</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    {step === 2 ?
                        <div className="col-xl-1 col-lg-1 col-md-1">

                            <div className="row">
                                <div className="col">
                                    <button onClick={() => this.props.setSteps(3)}> Next</button>
                                </div>
                                <div className="col">
                                    <button className="btn btn-primary" onClick={() => this.props.setSteps(1)}> Redo</button>
                                </div>
                            </div>

                        </div>
                        : null}
                </div>
            </div>
        )
    }
}
export default Canvas;