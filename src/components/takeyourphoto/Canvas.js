import React from "react";

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
    

    render() {
        const { image } = this.props;
        return (
            <div>
                <canvas id="selfie" ref="canvas" width={640} height={425} />
                <img ref="image" id="clickedImage" src={image} className="hidden" style={{ display: "none" }} />
                <img
                    src={require("./../../images/frame1.png")}
                    id="img2"
                    style={{ display: "none" }}
                />
                <img
                    src={require("./../../images/frame2.png")}
                    id="img3"
                    style={{ display: "none" }}
                />
                <p>
                    <button
                        onClick={() => this.drawImage("img2", 0, 0, 333, 290, "frame")}
                    >
                        Draw Frame
              </button>
                </p>
                <p>
                    <button
                        onClick={() => this.drawImage("img3", 0, 0, 333, 290, "frame")}
                    >
                        Draw Frame2
              </button>
                </p>
                <p>
                    <a id="download" onClick={this.downloadImage}>
                        Download Image
              </a>
                </p>
            </div>
        )
    }
}
export default Canvas