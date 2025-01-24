import Visual from "../../util/Visual.ts";
import {Entity} from "../../algs/genetic/Entity.ts";
import {Distance} from "../../util/Distance.ts";
import {Population} from "../../algs/genetic/Population.ts";

const visualizer = new Visual('geneticCanvas');
visualizer.generateCities(5);
// visualizer.showCitiesAsJSON()
const ent = new Entity(5);

const rte = ent.route
// console.log(rte)
const dm = Distance.distanceMatrix(visualizer.getCities())
// console.log(dm)
const pop = new Population(5, 5, 0, 5, 0.5)
pop.initPopulation()
pop.calculateAllFitness(dm)
pop.selection()
console.log(pop.entities)


const dst = ent.calculateFitness(dm)
console.log(dst)
// const exampleRoute = [1, 2, 0, 3]; // Индексы городов
visualizer.animateRoute(rte);
