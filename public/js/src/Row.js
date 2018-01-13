class Row {
    constructor({id, lengthSection, seamPosition}){
        this.number = id,
        this.attempts = 1,
        this.lengthSection = lengthSection,
        this.seamPosition = seamPosition;
    }
    update() {
        this.attempts += 1;
    }
}

export default Row;