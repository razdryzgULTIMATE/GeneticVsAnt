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
        const maxPop = this.maxPopulation
        for (let i = 0; i < maxPop; i++) {
            this.entities.push(new Entity(this.maxRoute))
        }
        return this.entities
    }

    //TODO Сделать турнирный отбор особей
    selection() {
        //! Отбор особей
        //+ сортируем в порядке возрастания, чтобы убрать особей с самым длинным маршрутом (они будут располагаться в конце массива)
        // this.sortEntities()

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
        const childs: Entity[] = []
        const citiesNumber = this.maxRoute / 2;
        while (childs.length < this.maxPopulation - this.entities.length) {
            const parentIndex1 = Random.randomInt(0, this.entities.length - 1)
            let parentIndex2 = Random.randomInt(0, this.entities.length - 1)

            while (parentIndex2 === parentIndex1) {
                parentIndex2 = Random.randomInt(0, this.entities.length - 1);
            }
            const parent1 = this.entities[parentIndex1]
            const parent2 = this.entities[parentIndex2]
            // console.log("Parent 1\n", parent1.route.slice(0, citiesNumber - 1))
            // console.log("Parent 2\n", parent2.route.filter(city => !parent1.route.slice(0, citiesNumber - 1).includes(city)))
            const childRoute = [
                ...parent1.route.slice(0, citiesNumber - 1), // Первая половина первого родителя
                ...parent2.route.filter(city => !parent1.route.slice(0, citiesNumber - 1).includes(city)), // Уникальные элементы второго родителя
            ];
            const ent = new Entity(childRoute.length)
            ent.route = childRoute
            // console.log("Child\n", ent)
            childs.push(ent);
        }
        // console.log("Childs\n", childs)
        this.entities.push(...childs)
    }

    sortEntities() {
        this.entities.sort((a, b) => a.routeLen - b.routeLen)
    }

    //TODO убрать постоянную сортировку особей
    //! Сортировка нужна лишь для отбора, поэтому переписать отбор на турнирный или ещё какой
    startSearch(visual: Visual): [number[], Entity] {
        //* Запуск алгоритма

        //+ Высчитываем матрицу расстояний(смежности)
        const cities: City[] = visual.getCities()
        const distanceMatrix: number[][] = Distance.distanceMatrix(cities)
        console.log(distanceMatrix)
        const history: number[] = []
        //+ Инициализация популяции
        this.initPopulation()
        // console.log("Initial Population", this.entities)

        //+ Подсчёт фитнес-функции для начальной популяции
        this.calculateAllFitness(distanceMatrix)
        history.push(this.entities[0].routeLen)
        console.log("Best entity route length from Generation #0\n", this.entities[0].routeLen)

        let currentGeneration = 0
        const maxGen: number = this.maxGenerations
        const length: number = this.entities.length

        while (currentGeneration < maxGen) {
            // console.log(distanceMatrix)
            // this.sortEntities()

            //- Отбор
            this.selection()
            // console.log("After selection\n", this.entities)

            //+ Скрещивание
            this.crossover()
            // console.log("After crossover\n", this.entities)

            //+ Мутация некоторых особей
            let mP: number = Math.random()
            if (mP > this.mutationProb) {
                let from = Random.randomInt(1, length - 1)
                let to = Random.randomInt(from, length - 1)
                // console.log({from: from, to: to})
                // this.mutateAll()
                this.mutateSome(from, to)
                // console.log("After mutation\n", this.entities)
            }

            //+ Пересчёт фитнес-функции для всех особей
            this.calculateAllFitness(distanceMatrix)
            // console.log("After calculate fitness\n", this.entities)
            // visual.animateRoute(this.entities[0].route)
            history.push(this.entities[0].routeLen)
            console.log("Best entity route length from Generation #" + (currentGeneration + 1) + "\n", this.entities[0].routeLen)
            currentGeneration++;
        }
        return [history, this.entities[0]]
    }

    calculateAllFitness(distanceMatrix: number[][]) {
        //+ Пересчитывает фитнес-функцию для каждой особи
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].routeLen = this.entities[i].calculateFitness(distanceMatrix)
        }
        this.sortEntities()
    }

    mutateAll() {
        //+ Мутация всех особей
        for (let i = 0; i < this.entities.length; i++) {
            let index1 = Random.randomInt(1, this.entities[0].route.length - 1)
            let index2 = Random.randomInt(1, this.entities[0].route.length - 1)
            this.entities[i].mutate(index1, index2)
        }
    }

    mutateSome(from: number, to: number) {
        //+ Мутация некоторых особей
        for (let i = from; i < to; i++) {
            let index1 = Random.randomInt(1, this.maxRoute - 1)
            let index2 = Random.randomInt(1, this.maxRoute - 1)
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