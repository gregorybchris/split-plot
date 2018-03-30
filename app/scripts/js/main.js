
function drawImage() {
    let canvas = document.getElementById('my-canvas')
    paper.setup(canvas)

    let path = new paper.Path()
    path.strokeColor = 'black'
    let start = new paper.Point(10, 10)
    path.moveTo(start)
    path.lineTo(start.add([20, 20]))
    path.lineTo(start.add([40, 20]))

    let text = new paper.PointText({
        point: new paper.Point(40, 40),
        content: 'Hello there!',
        justification: 'center',
        fontFamily: 'Inconsolata',
        fontSize: 10
    })

    paper.view.draw()
}

let canvas = document.getElementById('my-canvas')
let button = document.getElementById('download-button-link')
button.addEventListener('click', function() {
    this.href = canvas.toDataURL('image/png')
    this.download = "test.png"
}, false)


loadCSS('//fonts.googleapis.com/css?family=Inconsolata')
const font = new FontFaceObserver('Inconsolata')
font.load().then(function() {
    console.log("All Fonts Loaded")
    drawImage()
})


//
