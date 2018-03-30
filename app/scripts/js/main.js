
function createSplitSheet() {
    let canvas = document.getElementById('my-canvas')
    canvas.style.width  = '425px';
    canvas.style.height = '550px';
    paper.setup(canvas)

    // Header

    const inch = 50;
    const width = 8.5 * inch;
    const height = 11 * inch;

    let dateString = moment().format('dddd MMMM Do, YYYY')
    let datePoint = new paper.Point(1 * inch, 1 * inch)
    let dateText = new paper.PointText({
        point: datePoint,
        content: dateString,
        fontFamily: 'Inconsolata',
        fontSize: 10
    })

    let coachString = "Coach: " + "Silva"
    let coachPoint = new paper.Point(7.5 * inch, 1 * inch)
    let coachText = new paper.PointText({
        point: coachPoint,
        content: coachString,
        fontFamily: 'Inconsolata',
        fontSize: 10
    })
    coachText.point = coachPoint.add([-coachText.bounds.width, 0])

    let path = new paper.Path()
    path.strokeColor = 'black'
    let start = new paper.Point(1 * inch, 1 * inch + 2)
    path.moveTo(start)
    path.lineTo(new paper.Point(width - 1 * inch, 1 * inch + 2))



    paper.view.draw()
}

function downloadSplitSheet() {
    let canvas = document.getElementById('my-canvas')
    let dataURL = canvas.toDataURL("image/png")
    this.href = dataURL;
    this.download = "splitplot.png"
}

let button = document.getElementById('download-button-link')
button.addEventListener('click', downloadSplitSheet, false)

loadCSS('//fonts.googleapis.com/css?family=Inconsolata')
const font = new FontFaceObserver('Inconsolata')
font.load().then(function() {
    createSplitSheet()
})


//
