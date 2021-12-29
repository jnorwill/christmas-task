import './index.scss'
import data from '../../data'
export { default } from './index.html'

export const runScript = () => {

    type arrSortType = {
        num: string,
        name: string,
        count: string,
        year: string,
        shape: string,
        color: string,
        size: string,
        favorite: boolean,
    }
    type arrFiltersType = {
        sortBell?: (item: arrSortType) => boolean,
        sortBall?: (item: arrSortType) => boolean,
        sortCone?: (item: arrSortType) => boolean,
        sortSnowflake?: (item: arrSortType) => boolean,
        sortToy?: (item: arrSortType) => boolean,
        sortWhite?: (item: arrSortType) => boolean,
        sortYellow?: (item: arrSortType) => boolean,
        sortRed?: (item: arrSortType) => boolean,
        sortBlue?: (item: arrSortType) => boolean,
        sortGreen?: (item: arrSortType) => boolean,
        sortLargeSize?: (item: arrSortType) => boolean,
        sortMediumSize?: (item: arrSortType) => boolean,
        sortSmallSize?: (item: arrSortType) => boolean,
    }

    let newData: arrSortType[]
    const addCards = () => {
        const selectesToysList = document.querySelector('.toys')
        selectesToysList.innerHTML = ''

        const arr = localStorage.getItem('selected card').split(',')

        if (localStorage.getItem('selected card')) {
            newData = data.filter((element: arrSortType) => {
                return arr.some((item: string) => {
                    return item === element.name
                })
            })
        } else {
            newData = data.slice(0, 20)
        }

        newData.forEach((item: arrSortType) => {
            if (+item.count > 0) {
                let cardToyButton = document.createElement('button');
                cardToyButton.className = 'toys__item'
                selectesToysList.append(cardToyButton);

                let cardToyImg = document.createElement('img');
                cardToyImg.className = 'toys__img'
                cardToyImg.dataset.toy = `${item.num}`
                const src = require(`src/assets/toys/${item.num}.png`)
                cardToyImg.src = src
                cardToyImg.draggable = true

                cardToyImg.ondragstart = (event) => {
                    console.log('ondragstart')
                    event.dataTransfer.setData("application/cardToyImg", cardToyImg.dataset.toy);

                    event.dataTransfer.effectAllowed = "move";
                }
                cardToyButton.append(cardToyImg);

                let cardToysCount = document.createElement('div');
                cardToysCount.className = 'toys__count'
                cardToysCount.innerHTML = `${item.count}`
                cardToyButton.append(cardToysCount);
            }

        })
    }
    addCards()

    const workPanel = document.querySelector('.work-panel') as HTMLElement

    const changeTree = (dataSetValue: string) => {
        const image = document.querySelector('.work-panel__img') as HTMLImageElement
        const src = require(`src/assets/tree/${dataSetValue}.png`)
        image.src = src
    }

    const changeBg = (dataSetValue: string) => {
        const image = require(`src/assets/bg/${dataSetValue}.jpg`)
        workPanel.style.backgroundImage = `url(${image})`
    }


    document.addEventListener('click', (event) => {
        const actionType = event.target as HTMLElement

        const dataTreeValue = actionType.dataset.tree
        if (dataTreeValue) {
            changeTree(dataTreeValue)
        }

        const dataBgValue = actionType.dataset.bg
        if (dataBgValue) {
            changeBg(dataBgValue)
        }
    })

    const tree = document.querySelector('.work-panel__img') as HTMLElement
        const treeArea = document.querySelector('.work-panel__area') as HTMLElement
        // document.addEventListener('mousemove', (event) => console.log(event.target))
    treeArea.ondragover = (event) => {
        event.preventDefault();
        console.log('ondragover')
        event.dataTransfer.dropEffect = "move"
    }

    treeArea.ondrop = (event) => {
        event.preventDefault();
        console.log(event.dataTransfer.getData("application/cardToyImg"))
        const data = event.dataTransfer.getData("application/cardToyImg");
        const treeArea = document.querySelector('.work-panel__area') as HTMLElement
        const newElement = document.querySelector(`[data-toy="${data}"]`).cloneNode() as HTMLElement
        newElement.style.left = `${event.pageX}px`
        newElement.style.top = `${event.pageY}px`

        treeArea.append(newElement);


        newData.map((item) => {
            if(item.num === newElement.dataset.toy){
                item.count = `${+item.count - 1}`
            }
            return item
        })
        addCards()
    }
}

