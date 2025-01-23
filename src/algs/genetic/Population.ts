import {Entity} from "./Entity";


export class Population{
    private _entities: Entity[] = []
    private _maxPopulation: number //* максимальное количество особей в популяции
    private _maxRoute: number; //* количество городов
    private _maxGenerations: number //* максимальное количество поколений
    private _selectionPercent: number //* процент отбрасываемых особей (отбор)
    private _mutationProb: number //* вероятность мутации

    constructor(maxp: number, maxg: number, mutp: number, maxr: number, sp: number) {
        this._maxPopulation = maxp
        this._maxGenerations = maxg
        this._maxRoute = maxr
        this._mutationProb = mutp
        this._selectionPercent = sp

    }

    initPopulation(): Entity[]{
        for (let i = 0; i < this.maxPopulation; i++) {
            this.entities.push(new Entity(this.maxPopulation))
        }
        return this.entities
    }

    selection() {
        //! Отбор особей
    }
    crossover(){
        //! Скрещивание
    }
    nextGen() {
        //! Следующее поколение
    }

    calculateAllFitness(distanceMatrix: number[][]) {
        //! Пересчитывает фитнес-функцию для каждой особи
        for (let i = 0; i < this.maxRoute; i++) {
            this.entities[i].routeLen = this.entities[i].calculateFitness(distanceMatrix)
        }
    }

    get entities(): Entity[] {
        return this._entities;
    }

    set entities(value: Entity[]) {
        this._entities = value;
    }

    get maxPopulation(): number {
        return this._maxPopulation;
    }

    set maxPopulation(value: number) {
        this._maxPopulation = value;
    }

    get maxGenerations(): number {
        return this._maxGenerations;
    }

    set maxGenerations(value: number) {
        this._maxGenerations = value;
    }

    get mutationProb(): number {
        return this._mutationProb;
    }

    set mutationProb(value: number) {
        this._mutationProb = value;
    }


    get maxRoute(): number {
        return this._maxRoute;
    }

    set maxRoute(value: number) {
        this._maxRoute = value;
    }

    get selectionPercent(): number {
        return this._selectionPercent;
    }

    set selectionPercent(value: number) {
        this._selectionPercent = value;
    }
}