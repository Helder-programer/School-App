export class Student {
    name;
    scores;
    average;
    owner;
    constructor(name, owner) {
        this.name = name;
        this.scores = [0, 0, 0, 0];
        this.average = 0;
        this.owner = owner;
    }

    setScores(scores) {
        this.scores = scores;
    }
}