import { Workout } from "./workout.js"

export class SplitSheet {
    constructor() {
        this.workouts = []
        this.notes = ""
        this.coach = ""
        this.date = ""
    }

    getWorkouts() {
        return this.workouts
    }

    setWorkouts(workouts) {
        this.workouts = workouts
    }

    addWorkout(workout) {
        this.workouts.push(workout)
    }

    getNotes() {
        return this.notes
    }

    setNotes(notes) {
        this.notes = notes
    }

    getCoach() {
        return this.coach
    }

    setCoach(coach) {
        this.coach = coach
    }

    getDate() {
        return this.date
    }

    setDate(date) {
        this.date = date
    }

    toString() {
        return JSON.stringify(this)
    }
}
