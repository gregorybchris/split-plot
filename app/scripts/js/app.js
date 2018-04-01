import { Plotter } from "./plotter.js"

export class App {
    constructor() {
        this.canvas = $('#my-canvas')[0]
        this.plotter = new Plotter(this.canvas)
    }

    run() {
        this.setupButtonListeners()
    }

    setupButtonListeners() {
        let downloadButton = $('#download-button-link')[0]
        downloadButton.addEventListener('click', function() {
            this.downloadSplitSheet(downloadButton)
        }.bind(this))

        let createButton = $('#create-button-link')[0]
        createButton.addEventListener('click', function() {
            let dataURL = this.canvas.toDataURL("image/png")
            let iFrame = '<iframe src="' + dataURL + '"style="border:0; \
                height:100%; width:100%"></iframe>'
            let newWindow = window.open("", '_blank');
            newWindow.document.write(iFrame)
        }.bind(this))
    }

    downloadSplitSheet(button) {
        console.log("Download Split Sheet")
        let dataURL = this.canvas.toDataURL("image/png")
        button.href = dataURL
        button.download = "splitplot.png"
    }
}
