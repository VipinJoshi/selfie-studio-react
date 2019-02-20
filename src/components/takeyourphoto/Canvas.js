import React from "react";
import "./step3.css"
import axios from "axios";
import toastr from "toastr";


const URL = "localhost:8080/uploadFile1"; // hosted api end point
toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-center",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "4000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
};
class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFrameSet: false,
            email: "",
            validEmail: true,
            validationMessage: '',
            showLoader: true
        };
    }


    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.refs.image;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 303, 253)
        }
    }
    drawImage(imageId, x, y, dWidth = 233, dHeight = 183, type) {
        const c = document.getElementById("selfie");
        const context = c.getContext("2d");
        context.restore();
        if (context) {
            const img = document.getElementById(imageId);
            if (type === "frame" && this.state.isFrameSet) {
                context.clearRect(0, 0, c.width, c.height);
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
        const { showLoader } = this.props;
        showLoader(true);
        const { email } = this.state;

        if (email.length === 0) {
            this.setState({ validEmail: false, validationMessage: "Enter email address" });
            showLoader(false);
            return;
        } else if (
            /* eslint-disable*/
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
                email
            )
        ) {
            this.setState({ validEmail: false, validationMessage: "Email format is not correct" });
            showLoader(false);

            return;
        }
        const headers = {
            "Content-Type": "application/json",

        };

        const canvas = document.getElementById("selfie");

        const params = {
            file: canvas.toDataURL().replace("data:image/png;base64,", ""),
            email: email
        };

        axios.post(URL, params, { header: headers }).then(response => {
            const { data } = response;
            if (data && data.statuCode === 200) {
                toastr.success("Your image is with us you will get the image at your given email id");
                this.props.setSteps(0);
                showLoader(false);

            }
            else {
                showLoader(false);

                this.setState({ validEmail: false, validationMessage: "we are facing some issue in connecting ahh don't worry enjoy the party you can try it later" })
            }
        })
            .catch(err => {
                showLoader(false);

                this.setState({ validEmail: false, validationMessage: "we are facing some issue in connecting ahh don't worry enjoy the party you can try it later" })
            })


    }

    onChange = (e) => {
        this.setState({ email: e.target.value, validEmail: true, validationMessage: '' });
    }

    render() {
        const { image, step = 2 } = this.props;

        return (
            <div className="canvas-container">

                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div>
                            <canvas id="selfie" ref="canvas" width={350}
                                height={300} />
                        </div>
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
                                <div className="col-xl-12 col-lg-12 col-md-12 text-center save-n-share">
                                    Save & Share
                     </div>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 text-center form-row">
                                        <div className="form-group">
                                            <div className="div-label">
                                                <label className="label-text" htmlFor="email">
                                                    Enter email Id
        </label>
                                            </div>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Enter your email id"
                                                    value={this.state.email}
                                                    onChange={(e) => this.onChange(e)}
                                                />
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" disabled={this.state.email.length === 0} onClick={() => this.sendImage()}>Share</button>
                                                </div>

                                            </div>
                                            {!this.state.validEmail && <div className="alert alert-danger">{this.state.validationMessage}  </div>}

                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    {step === 2 ?
                        <div className="col-xl-1 col-lg-1 col-md-1">

                            <div className="row">
                                <div className="col">
                                    <button className="btn next" onClick={() => this.props.setSteps(3)}> 
                                    <img className="next_image" src={require("../../images/arrow_next.png")} />
                                    </button>
                                </div>
                                <div className="col">
                                    <button className="btn next"  onClick={() => this.props.setSteps(1)}>
                                    <img className="refresh_image" src={require("../../images/refresh.png")} /> </button>
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