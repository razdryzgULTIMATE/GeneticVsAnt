import './style.css'

// const visualizer = new Visual('tspCanvas');

// Пример маршрута для анимации
console.log("Init test")
document.querySelector<HTMLDivElement>('#main-page')!.innerHTML =`
    <div>
    <button id="genetic-button" onclick="window.open('/src/pages/genetic/genetic.html', '_blank')">Генетический алгоритм</button>
    <button id="ant-button">Муравьиный алгоритм</button>
    </div>
`



// setInterval(() => {
//     const cities = visualizer.getCities()
//     console.log(cities)
// }, 10000)

// const exampleRoute = [0, 1, 2, 3]; // Индексы городов
// visualizer.animateRoute(exampleRoute);


