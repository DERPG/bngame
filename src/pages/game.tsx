import React from "react"

const CANVAS_WIDTH = 240
const CANVAS_HEIGHT = 160

const sprite = require('../assets/run_d_strip6.png');

class Game extends React.Component {
  private canvasRef: React.RefObject<HTMLCanvasElement>

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d')

    document.addEventListener('keydown', (ev) => {
      console.log('down ' + ev.keyCode)
    }, false)

    document.addEventListener('keyup', (ev) => {
      console.log('up ' + ev.keyCode)
    }, false)

    const runSprite = new Image();
    runSprite.src = sprite;

    const ball = {
      x: 100,
      y: 100,
      radius: 25,
      color: 'blue',
      draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function loop(frame) {
      update()
      draw()

      window.requestAnimationFrame(loop)
    }

    function update() {
      ball.x += 1
    }

    function draw() {
      ctx.fillStyle = 'rgb(0, 0, 0)'
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      ball.draw()

      ctx.drawImage(runSprite, 0, 0, 23, 32, 100, 100, 23, 32);
    }

    loop(null);
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      </div>
    )
  }
}

export default Game
