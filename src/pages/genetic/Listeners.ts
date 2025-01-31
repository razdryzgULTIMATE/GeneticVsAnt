import Visual from "../../util/Visual.ts";
import {fillWithTestData} from "../../util/TestData.ts";
import {Population} from "../../algs/genetic/Population.ts";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

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

export function setupStartSearch(element: HTMLButtonElement, visual: Visual, [gen, pop, mut, sel]: HTMLInputElement[], resultDiv: HTMLDivElement) {

    const start = () => {
        const chart = document.querySelector<HTMLCanvasElement>('#myChart')!
        let chartStatus = Chart.getChart("myChart"); // <canvas> id
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }

        const maxPop: number = +pop.value
        const maxCities: number = visual.getCities().length
        const maxGen: number = +gen.value
        const mP: number = +mut.value
        const selP: number = +sel.value

        if (maxPop > 0 && maxCities > 1 && maxGen > 0 && mP >= 0 && selP >= 0 && mP <= 1 && selP <= 1) {
            const population = new Population(maxPop, maxGen, mP, maxCities, selP)

            const startTime = new Date().getTime()
            const [history, rte] = population.startSearch(visual)
            const finishTime = new Date().getTime()
            const resultTime = (finishTime - startTime) / 1000

            resultDiv.innerHTML = `
            <p>Время поиска ${resultTime} секунд</p>
            <p>Наименьшая найденная длинна ${rte.routeLen}</p>
            <p>Самый короткий путь ${rte.route}</p>
            `

            visual.animateRoute(rte.route);
            const historyIndexex: number[] = []
            for (let i = 0; i < maxGen; i++) {
                historyIndexex.push(i)
            }
            const myChart = new Chart(chart, {
                type: 'line',
                data: {
                    labels: historyIndexex,
                    datasets: [{
                        label: 'Длина маршрута от поколений',
                        data: history,

                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Поколения"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Длина маршрута"
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
            myChart.clear();


            console.log("-----------------------------------\n")
            console.log("Время выполнения алгоритма: ", resultTime + " секунд")
            console.log("Min route: \n", rte.route)
            console.log("Min distance: ", rte.routeLen)

        }
    }
    element.addEventListener('click', () => start())

}

