import {Random} from "../../util/Random.ts";

export class Entity {

    private _route: number[] = [] // массив индексов городов
    private _routeLen: number = 0 // длина расстояния
    constructor(maxRoute: number) {
        //! Заполнить случайными индексами городов route
        let i = 0;
        while (i < maxRoute){
            this.route.push(i)
            i++
        }
        Random.shuffle(this.route)
    }

    //! Особь с максимально длинным маршрутом считаем непригодной

    calculateFitness(distanceMatrix: number[][]): number {
        //* Рассчитываем расстояния пути
        let sum: number = 0
        /*
        * [0,1,2]
        * sum += dm[0][1]
        * sum += dm[1][2]
        * */
        for (let i = 0; i < distanceMatrix.length - 1; i++) {
            sum += distanceMatrix[this.route[i]][this.route[i + 1]]
            console.log({i: i, j: i+1, dij: distanceMatrix[this.route[i]][this.route[i + 1]]}, sum)
        }
        return sum;
    }
    mutate(){
        //TODO сделать метод мутации
    }

    get route(): number[] {
        return this._route;
    }

    set route(value: number[]) {
        this._route = value;
    }

    get routeLen(): number {
        return this._routeLen;
    }

    set routeLen(value: number) {
        this._routeLen = value;
    }


}