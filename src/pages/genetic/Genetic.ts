import Visual from "../../util/Visual.ts";
import {Population} from "../../algs/genetic/Population.ts";
import {City} from "../../util/City.ts";

// const settings = document.querySelector<HTMLDivElement>('#settings-div')!.innerHTML


const citiesJSON: string = "[\n" +
    "  {\n" +
    "    \"name\": \"0\",\n" +
    "    \"x\": 821,\n" +
    "    \"y\": 180\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"1\",\n" +
    "    \"x\": 795,\n" +
    "    \"y\": 344\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"2\",\n" +
    "    \"x\": 337,\n" +
    "    \"y\": 37\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"3\",\n" +
    "    \"x\": 453,\n" +
    "    \"y\": 352\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"4\",\n" +
    "    \"x\": 788,\n" +
    "    \"y\": 231\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"5\",\n" +
    "    \"x\": 1103,\n" +
    "    \"y\": 205\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"6\",\n" +
    "    \"x\": 1035,\n" +
    "    \"y\": 478\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"7\",\n" +
    "    \"x\": 936,\n" +
    "    \"y\": 318\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"8\",\n" +
    "    \"x\": 1059,\n" +
    "    \"y\": 556\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"9\",\n" +
    "    \"x\": 254,\n" +
    "    \"y\": 459\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"10\",\n" +
    "    \"x\": 524,\n" +
    "    \"y\": 413\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"11\",\n" +
    "    \"x\": 338,\n" +
    "    \"y\": 566\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"12\",\n" +
    "    \"x\": 196,\n" +
    "    \"y\": 619\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"13\",\n" +
    "    \"x\": 587,\n" +
    "    \"y\": 220\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"14\",\n" +
    "    \"x\": 738,\n" +
    "    \"y\": 236\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"15\",\n" +
    "    \"x\": 543,\n" +
    "    \"y\": 395\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"16\",\n" +
    "    \"x\": 564,\n" +
    "    \"y\": 593\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"17\",\n" +
    "    \"x\": 984,\n" +
    "    \"y\": 265\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"18\",\n" +
    "    \"x\": 159,\n" +
    "    \"y\": 52\n" +
    "  },\n" +
    "  {\n" +
    "    \"name\": \"19\",\n" +
    "    \"x\": 590,\n" +
    "    \"y\": 168\n" +
    "  }\n" +
    "]\n"
const cities: City[] = Visual.JSONToCities(citiesJSON)

const visualizer = new Visual('geneticCanvas');
const maxCities: number = 20
const maxGen: number = 5000
const maxPop: number = 100
const mutationProbability = 0.3
const selectionPercent = 0.4

//visualizer.generateCities(maxCities);
visualizer.constructGraphWithCities(cities)


const pop = new Population(maxPop, maxGen, mutationProbability, maxCities, selectionPercent)
const rte = pop.startSearch(visualizer)
console.log("-----------------------------------\n")
console.log("Min route: \n", rte.route)
console.log("Min distance: ", rte.routeLen)
visualizer.animateRoute(rte.route);
// const jsonCitiesString = visualizer.citiesToJSON()
// console.log(jsonCitiesString)
// const cities: City[] = JSON.parse(jsonCitiesString)
// console.log(cities)
