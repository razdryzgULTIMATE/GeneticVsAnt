import Visual from "../../util/Visual.ts";
import {Population} from "../../algs/genetic/Population.ts";


const visualizer = new Visual('geneticCanvas');
const maxCitites: number = 20
visualizer.generateCities(maxCitites);
// const cities: City[] = visualizer.getCities()
// const distanceMatrix: number[][] = Distance.distanceMatrix(cities)


const pop = new Population(100, 10000, 0.1, maxCitites, 0.3)
const rte = pop.startSearch(visualizer)
console.log("-----------------------------------\n")
console.log("Min distance", rte.routeLen)
visualizer.animateRoute(rte.route);
