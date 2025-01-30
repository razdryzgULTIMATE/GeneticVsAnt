import {City} from "./City.ts";


export default class Visual {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private cities: City[] = [];
    private route: number[] = [];

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.canvas.addEventListener('click', this.addCity.bind(this));
    }

    // Метод для добавления города
    private addCity(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor(event.clientX - rect.left);
        const y = Math.floor(event.clientY - rect.top);
        const cityName = `${this.cities.length}`;
        if (this.isUnique(x, y, this.cities)) {
            this.cities.push(new City(cityName, x, y));
        }

        this.drawCities();
    }

    // Метод для рисования городов
    private drawCities(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cities.forEach(city => {
            this.ctx.fillStyle = 'blue';
            this.ctx.beginPath();
            this.ctx.arc(city.x, city.y, 6, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(city.name, city.x - 5, city.y - 10);
            this.ctx.fillText(`(${city.x}; ${city.y})`, city.x - 25, city.y + 15)
        });
        this.drawRoute();
    }

    // Метод для рисования маршрута
    private drawRoute(): void {
        // this.drawCities();
        this.ctx.strokeStyle = 'red';
        this.ctx.beginPath();
        if (this.route.length > 0) {
            this.ctx.moveTo(this.cities[this.route[0]].x, this.cities[this.route[0]].y);
            for (let i = 1; i < this.route.length; i++) {
                const city = this.cities[this.route[i]];
                this.ctx.lineTo(city.x, city.y);
            }
            this.ctx.closePath();
            this.ctx.stroke();
        }
    }

    // Метод для анимации маршрута
    public animateRoute(route: number[]): void {
        this.route = route;
        let index = 0;

        const animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawCities();

            if (index < this.route.length) {
                const city = this.cities[this.route[index]];
                this.ctx.fillStyle = 'red';
                this.ctx.beginPath();
                this.ctx.arc(city.x, city.y, 5, 0, Math.PI * 2);
                this.ctx.fill();
                index++;
            }

            this.drawRoute();
            window.requestAnimationFrame(animate)
        };
        animate();
    }

    generateCities(N: number) {
        // N - количество городов для генерации
        const w = this.canvas.width
        const h = this.canvas.height
        let x = 0;
        let y = 0;
        let i = 0;
        while (i < N) {
            x = Math.floor(Math.random() * w / 1.1) + 20
            y = Math.floor(Math.random() * h / 1.1) + 20
            const cityName = `${this.cities.length}`;
            if (this.isUnique(x, y, this.cities)) {
                this.cities.push(new City(cityName, x, y))
                i++;
            }
        }
        this.drawCities()
    }
    constructGraphWithCities(cities: City[]){
        this.cities = cities
        this.drawCities()
    }


    citiesToJSON(){
        const json = JSON.stringify(this.cities, null, 2)
        // console.log(json)
        return json
    }
    static JSONToCities(json: string){
        const cities: City[] = JSON.parse(json)
        return cities
    }


    private isUnique(x: number, y: number, cities: City[]) {
        for (const city of cities) {
            if (x == city.x && y == city.y) {
                return false
            }
        }
        return true
    }


    public getCities(): City[] {
        return this.cities;
    }


}
