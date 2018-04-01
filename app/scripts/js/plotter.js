import { Workout } from './workout.js'

const inch = 50
const width = 8.5 * inch
const height = 11 * inch
const margin = 1 * inch

export class Plotter {
    constructor(canvas, sheet) {
        this.canvas = canvas
        this.sheet = sheet
        this.setupCanvas()
    }

    loadMaterials(callback) {
        loadCSS('//fonts.googleapis.com/css?family=Inconsolata')
        const consolasFont = new FontFaceObserver('Consolas')
        const inconsolataFont = new FontFaceObserver('Inconsolata')
        inconsolataFont.load().then(function() {
            callback()
        }.bind(this))
    }

    setupCanvas() {
        this.canvas.style.width  = '425px'
        this.canvas.style.height = '550px'
        paper.install(window);
        paper.setup(this.canvas)
    }

    plot() {
        console.log("Plotting Split Sheet")
        this.plotBackground()
        this.plotHeader()
        this.plotNotes()
        this.plotWorkouts()
        paper.view.draw()
    }

    plotBackground() {
        let rect = new Rectangle(0, 0, width, height)
        let path = new Path.Rectangle(rect)
        path.fillColor = 'white'
    }

    plotHeader() {
        let dateString = moment().format('dddd MMMM Do, YYYY')
        let dateText = new PointText({
            point: new Point(margin, margin),
            content: dateString,
            fontFamily: 'Consolas',
            fontSize: 10
        })

        let coachString = 'Coach: ' + this.sheet.getCoach()
        let coachPoint = new Point(7.5 * inch, margin)
        let coachText = new PointText({
            point: coachPoint,
            content: coachString,
            fontFamily: 'Consolas',
            fontSize: 10
        })
        coachText.point = coachPoint.add([-coachText.bounds.width, 0])

        let path = new Path()
        path.strokeColor = 'black'
        let start = new Point(margin, margin + 0.0625 * inch)
        path.moveTo(start)
        path.lineTo(new Point(width - margin, margin + 0.0625 * inch))
    }

    plotNotes() {
        let notesText = new PointText({
            point: new Point(1.5 * inch, 1.5 * inch),
            content: this.sheet.getNotes(),
            fontFamily: 'Consolas',
            fontSize: 8
        })
    }

    plotWorkouts() {
        let workouts = this.sheet.getWorkouts()
        console.log("Workouts: ", workouts)
        
        const defRepW = 0.75 * inch
        const defRepH = 0.25 * inch
        let workoutOffsetY = 2.75 * inch
        const workoutSpacing = 0.5 * inch

        workouts.forEach(function(workout, wi) {
            let sets = workout.getSets()
            let athletes = workout.getAthletes()
            const totalReps = workout.countReps()
            const repW = Math.min(defRepW, (width - 2 * inch) / totalReps)
            const repH = defRepH

            athletes.forEach(function(athlete, ai) {
                const repY = (ai * repH) + workoutOffsetY

                sets.forEach(function(set, si) {
                    const setW = repW * set.length
                    const setH = defRepH * athletes.length
                    const setX = margin + si * setW
                    const setY = workoutOffsetY
                    let setRect = new Path.Rectangle(new Rectangle(setX, setY, setW, setH))
                    setRect.strokeColor = 'black'
                    setRect.strokeWidth = 2

                    set.forEach(function(rep, ri) {
                        const repX = margin + (ri * repW) + (si * setW)
                        let repRect = new Path.Rectangle(new Rectangle(repX, repY, repW, repH))
                        repRect.strokeColor = 'black'
                        repRect.strokeWidth = 1
                    })
                })
                if (ai == athletes.length - 1)
                    workoutOffsetY = repY + workoutSpacing
            })
        })
    }
}
