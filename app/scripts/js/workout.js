export class Workout {
    constructor(athletes, sets) {
        // List of athlete name strings
        this.athletes = athletes || []
        // List of lists of rep strings
        this.sets = sets || []
    }

    getSets() {
        return this.sets
    }

    setSets(sets) {
        this.sets = sets
    }

    getAthletes() {
        return this.athletes
    }

    setAthletes(athletes) {
        this.athletes = athletes
    }

    countReps() {
        return this.sets.map(s => s.length).reduce((a, c) => a + c, 0)
    }
}
