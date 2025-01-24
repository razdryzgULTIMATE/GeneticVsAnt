import {Entity} from "./Entity";
import {Random} from "../../util/Random.ts";
import {Distance} from "../../util/Distance.ts";
import {City} from "../../util/City.ts";
import Visual from "../../util/Visual.ts";


export class Population {
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

    initPopulation(): Entity[] {
        //+ Генерируем начальную популяцию
        for (let i = 0; i < this.maxPopulation; i++) {
            this.entities.push(new Entity(this.maxPopulation))
        }
        return this.entities
    }

    selection() {
        //! Отбор особей
        //+ сортируем в порядке возрастания, чтобы убрать особей с самым длинным маршрутом (они будут располагаться в конце массива)
        this.sortEntities()

        //+ Сколько убираем
        const len = Math.floor(this.entities.length * this.selectionPercent)
        //console.log(this.entities.length, len)

        for (let i = 0; i < len; i++) {
            //- убираем худших особей
            this.entities.pop()
        }
    }

    crossover() {
        //+ Скрещивание

    }
    private sortEntities(){
        this.entities.sort((a, b) => a.routeLen - b.routeLen)
    }


    startSearch(visual: Visual) {
        //* Запуск алгоритма
        const cities: City[] = visual.getCities()
        const distanceMatrix: number[][] = Distance.distanceMatrix(cities)

        //+ Инициализация популяции
        this.initPopulation()

        //+ Подсчёт фитнес-функции для начальной популяции
        this.calculateAllFitness(distanceMatrix)

        let currentGeneration = 0
        const maxGen: number = this.maxGenerations
        const length: number = this.entities.length

        while (currentGeneration < maxGen) {

            this.sortEntities()

            //- Отбор
            this.selection()

            //+ Скрещивание
            this.crossover()

            //+ Мутация некоторых особей
            let mP: number = Math.random()
            if (mP > this.mutationProb) {
                let from = Random.randomInt(0, length)
                let to = Random.randomInt(from, length)
                this.mutateSome(from, to)
            }

            //+ Пересчёт фитнес-функции для всех особей
            this.calculateAllFitness(distanceMatrix)
            currentGeneration++;
        }
        return this.entities[0]
    }

    calculateAllFitness(distanceMatrix: number[][]) {
        //+ Пересчитывает фитнес-функцию для каждой особи
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].routeLen = this.entities[i].calculateFitness(distanceMatrix)
        }
    }

    mutateAll() {
        //+ Мутация всех особей
        for (let i = 0; i < this.entities.length; i++) {
            let index1 = Random.randomInt(0, this.maxRoute)
            let index2 = Random.randomInt(0, this.maxRoute)
            this.entities[i].mutate(index1, index2)
        }
    }

    mutateSome(from: number, to: number) {
        //+ Мутация некоторых особей
        for (let i = from; i < to; i++) {
            let index1 = Random.randomInt(0, this.maxRoute)
            let index2 = Random.randomInt(0, this.maxRoute)
            this.entities[i].mutate(index1, index2)
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