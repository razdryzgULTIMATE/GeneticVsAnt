import {City} from "./City.ts";

export class Distance{

    static euclideanDist(a: City, b: City): number {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }


    static distanceMatrix(cities: City[]){
        const distanceMatrix: number[][] = []
        for (let i = 0; i < cities.length; i++) {
            const row: number[] = []
            for (let j = 0; j < cities.length; j++) {
                const dist = this.euclideanDist(cities[i], cities[j]);
                row.push(dist)
            }
            distanceMatrix.push(row)
        }
        return distanceMatrix

    }







}