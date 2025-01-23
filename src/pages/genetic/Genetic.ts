import Visual from "../../util/Visual.ts";
import {Entity} from "../../algs/genetic/Entity.ts";
import {Distance} from "../../util/Distance.ts";

const visualizer = new Visual('geneticCanvas');
visualizer.generateCities(5);
// visualizer.showCitiesAsJSON()
const ent = new Entity(5);

const rte = ent.route
console.log(rte)

const xx = Distance.distanceMatrix(visualizer.getCities())
console.log(xx)
const dst = ent.calculateFitness(xx)
console.log(dst)
// const exampleRoute = [1, 2, 0, 3]; // Индексы городов
visualizer.animateRoute(rte);
