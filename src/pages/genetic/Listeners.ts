import Visual from "../../util/Visual.ts";
import {fillWithTestData} from "../../util/TestData.ts";
import {Population} from "../../algs/genetic/Population.ts";

export function setupGenerate(element: HTMLButtonElement, visual: Visual, maxCitiesInput: HTMLInputElement) {

    const generate = () => {
        const maxCities: number = +maxCitiesInput.value
        if (maxCities > 1) {
            visual.generateCities(maxCities)
        }
    }
    element.addEventListener('click', () => generate())
}

export function setupTestData(element: HTMLButtonElement, visual: Visual) {
    const fill = () => {
        const cities = fillWithTestData()
        visual.constructGraphWithCities(cities)
    }
    element.addEventListener('click', () => fill())
}

export function setupStartSearch(element: HTMLButtonElement, visual: Visual, [gen, pop, mut, sel]: HTMLInputElement[]) {

    const start = () => {
        const maxPop = +pop.value
        const maxCities = visual.getCities().length
        const maxGen = +gen.value
        const mP = +mut.value
        const selP = +sel.value
        if (maxPop > 0 && maxCities > 1 && maxGen > 0 && mP >= 0 && selP >= 0 && mP <= 1 && selP <= 1) {
            const population = new Population(maxPop, maxGen, mP, maxCities, selP)

            const startTime = new Date().getTime()
            const rte = population.startSearch(visual)
            const finishTime = new Date().getTime()
            const resultTime = (finishTime - startTime) / 1000

            visual.animateRoute(rte.route);
            console.log("-----------------------------------\n")
            console.log("Время выполнения алгоритма: ", resultTime + " секунд")
            console.log("Min route: \n", rte.route)
            console.log("Min distance: ", rte.routeLen)

        }
    }
    element.addEventListener('click', () => start())

}

