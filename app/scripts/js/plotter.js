import { Workout } from './workout.js'
import { SplitSheet } from './splitsheet.js'

const inch = 50
const width = 8.5 * inch
const height = 11 * inch

export class Plotter {
    constructor(canvas) {
        this.canvas = canvas
        this.setupCanvas()
        this.loadFonts()
    }

    loadFonts() {
        loadCSS('//fonts.googleapis.com/css?family=Inconsolata')
        const consolasFont = new FontFaceObserver('Consolas')
        const inconsolataFont = new FontFaceObserver('Inconsolata')
        inconsolataFont.load().then(function() {
            console.log('Fonts Loaded')
            this.plot()
        }.bind(this))
    }

    setupCanvas() {
        this.canvas.style.width  = '425px'
        this.canvas.style.height = '550px'
        paper.setup(this.canvas)
    }

    plot() {
        this.plotBackground()
        this.plotHeader()
        paper.view.draw()
    }

    plotBackground() {
        var rect = new paper.Rectangle(0, 0, width, height)
        var path = new paper.Path.Rectangle(rect)
        path.fillColor = 'white'
    }

    plotHeader() {
        let dateString = moment().format('dddd MMMM Do, YYYY')
        let datePoint = new paper.Point(1 * inch, 1 * inch)
        let dateText = new paper.PointText({
            point: datePoint,
            content: dateString,
            fontFamily: 'Consolas',
            fontSize: 10
        })

        let coachString = 'Coach: ' + 'Silva'
        let coachPoint = new paper.Point(7.5 * inch, 1 * inch)
        let coachText = new paper.PointText({
            point: coachPoint,
            content: coachString,
            fontFamily: 'Consolas',
            fontSize: 10
        })
        coachText.point = coachPoint.add([-coachText.bounds.width, 0])

        let path = new paper.Path()
        path.strokeColor = 'black'
        let start = new paper.Point(1 * inch, 1.0625 * inch)
        path.moveTo(start)
        path.lineTo(new paper.Point(width - 1 * inch, 1.0625 * inch))
    }
}
