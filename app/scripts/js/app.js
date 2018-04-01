import { Plotter } from "./plotter.js"

export class App {
    constructor() {
        this.canvas = document.getElementById('my-canvas')
        this.plotter = new Plotter(this.canvas)
    }

    run() {
        this.createButtonListeners()
    }

    createButtonListeners() {
        let downloadButton = document.getElementById('download-button-link')
        downloadButton.addEventListener('click', function() {
            this.downloadSplitSheet(downloadButton)
        }.bind(this))
    }

    downloadSplitSheet(button) {
        console.log("Download Split Sheet")
        let dataURL = this.canvas.toDataURL("image/png")
        button.href = dataURL
        button.download = "splitplot.png"
    }
}
