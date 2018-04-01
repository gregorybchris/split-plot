import { Plotter } from "./plotter.js"
import { Workout } from "./workout.js"
import { SplitSheet } from "./split-sheet.js"
import { createHDCanvas } from "./hd-canvas.js"

export class App {
    constructor() {
        this.canvas = createHDCanvas($('#my-canvas')[0], 425, 550)
        this.sheet = new SplitSheet()
        this.plotter = new Plotter(this.canvas, this.sheet)
    }

    run() {
        this.fillSplitSheet()
        this.plotter.loadMaterials(this.enableButtonListeners.bind(this))
    }

    fillSplitSheet() {
        let workoutAthletes1 = ['TommyD','Jackson','ChrisG','Aiden']
        let workoutSets1 = [['200','200'],['400','400'],['300', '300'],['400', '400'],['200', '200']]
        let workout1 = new Workout(workoutAthletes1, workoutSets1)
        this.sheet.addWorkout(workout1)
        console.log("Workout 1: ", workout1)

        let workoutAthletes2 = ['Sam','Dylan','Andrew','JoeBar','JoeBer','MichaelV','Peter','Rory','Pat']
        let workoutSets2 = [['400','400','400','400','400','400','400','400','400','400']]
        let workout2 = new Workout(workoutAthletes2, workoutSets2)
        this.sheet.addWorkout(workout2)
        console.log("Workout 2: ", workout2)

        this.sheet.setNotes("MidD 400s ~78, 300s 43, 200s fast. Distance 400s 68 to 65")
        this.sheet.setCoach("Silva")
    }

    enableButtonListeners() {
        console.log("Enable Buttons")

        let previewButton = $('#preview-button')
        previewButton.removeClass('disabled')
        previewButton[0].addEventListener('click', function() {
            this.previewSplitSheet()
        }.bind(this))

        let downloadButton = $('#download-button')
        downloadButton.removeClass('disabled')
        downloadButton[0].addEventListener('click', function() {
            this.downloadSplitSheet(downloadButton[0])
        }.bind(this))
    }

    previewSplitSheet() {
        console.log("Preview Split Sheet")
        this.plotter.plot()
        let dataURL = this.canvas.toDataURL("image/png")
        let newWindow = window.open("", '_blank')
        let iframe = $('<iframe>', {
            src: dataURL,
            style: "border:0; height:100%; width:100%"
        })[0].outerHTML
        newWindow.document.write(iframe)
        newWindow.document.title = "Split Plot Preview"
        newWindow.document.close()
    }

    downloadSplitSheet(button) {
        console.log("Download Split Sheet")
        this.plotter.plot()
        let dataURL = this.canvas.toDataURL("image/png")
        button.href = dataURL
        button.download = "splitplot.png"
    }
}
