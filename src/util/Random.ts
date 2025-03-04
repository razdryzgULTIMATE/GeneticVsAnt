export class Random {
    private _min: number
    private _max: number


    constructor(min: number, max: number) {
        this._min = min;
        this._max = max;
    }

    randomInt() {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }
    static randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static shuffle<T>(array: T[]){
        //+ Алгоритм тасование Фишера — Йетса

        let currentIndex = array.length;

        //+ Пока ещё остались элементы для тасования
        while (currentIndex != 0) {

            //+ Выбираем оставшийся элемент
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            //+ Меняем местами с текущим элементом
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    }


    get min(): number {
        return this._min;
    }

    set min(value: number) {
        this._min = value;
    }

    get max(): number {
        return this._max;
    }

    set max(value: number) {
        this._max = value;
    }
}