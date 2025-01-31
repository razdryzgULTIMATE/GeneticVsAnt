import Visual from "../../util/Visual.ts";
import {setupGenerate, setupStartSearch, setupTestData} from "./Listeners.ts";

document.querySelector<HTMLDivElement>('#settings-div')!.innerHTML = `
    <div>
    <style>
    div{
        font-size: 18px;
    }
    ul{
        padding: 0;
    }
    li{
        list-style-type: none;
        display: flex; /* Используем flexbox для выравнивания элементов в строку */
        align-items: center; /* Выравниваем элементы по вертикали по центру */
        margin-bottom: 10px; /* Добавляем небольшой отступ между строками */
    }
    label {
        flex: 0 0 300px; /* Устанавливаем фиксированную ширину для меток */
    }
    button{
    margin-bottom: 20px;
    font-size: 14px;
    }
    </style>
        <a href="../help/help-genetic/help-genetic.html">Справка по генетическому алгоритму</a>
        <ul>
        <li><label for="maxCitiesInput">Максимальное количество городов</label> <input type="number" id="maxCitiesInput" placeholder="20"/> </li>
        <li><label for="maxGenInput">Максимальное число поколений</label> <input type="number" id="maxGenInput" placeholder="1000"/> </li>
        <li><label for="maxPopInput">Максимальная популяция</label> <input type="number" id="maxPopInput" placeholder="100"/> </li>
        <li><label for="mutationProbabilityInput">Вероятность мутации</label> <input type="number" id="mutationProbabilityInput" placeholder="0.2"/> </li>
        <li><label for="selectionPercentInput">Коэффициент отбора существ</label> <input type="number" id="selectionPercentInput" placeholder="0.3"/> </li>
        </ul>
        <div id="result"></div>
        <button id="generateCitiesButton">Сгенерировать города</button>
        <button id="fillTestCities">Заполнить тестовыми данными</button>
        <button id="startSearchButton">Начать поиск</button>
    </div>
`

const visualizer = new Visual('geneticCanvas');

const btnGenerate: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#generateCitiesButton')!
const btnFillWithTestData: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#fillTestCities')!
const btnStartSearch: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#startSearchButton')!

const maxCitiesInput = document.querySelector<HTMLInputElement>('#maxCitiesInput')!
const maxGenInput = document.querySelector<HTMLInputElement>('#maxGenInput')!
const maxPopInput = document.querySelector<HTMLInputElement>('#maxPopInput')!
const mutationProbInput = document.querySelector<HTMLInputElement>('#mutationProbabilityInput')!
const selectionPercentInput = document.querySelector<HTMLInputElement>('#selectionPercentInput')!

const resultDiv = document.querySelector<HTMLDivElement>('#result')!

setupGenerate(btnGenerate, visualizer, maxCitiesInput)
setupTestData(btnFillWithTestData, visualizer)
setupStartSearch(btnStartSearch, visualizer, [maxGenInput, maxPopInput, mutationProbInput, selectionPercentInput], resultDiv)

