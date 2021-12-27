
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

    const addCards = () => {
        const selectesToysList = document.querySelector('.toys')

        let newData: arrSortType[]
        const arr = localStorage.getItem('selected card').split(',')


        if (localStorage.getItem('selected card')){
            newData = data.filter((element: arrSortType) => {
                return arr.some((item: string) => {
                    return item === element.name
                })
            })
        } else {
            newData = data.slice(0, 20)
        }

        console.log('###', newData)

        newData.forEach((item: arrSortType) => {

            let cardToyButton = document.createElement('button');
            cardToyButton.className = "toys__item"
            const image = require(`src/assets/toys/${item.count}.png`)
            cardToyButton.style.backgroundImage = `url(${image})`
            selectesToysList.append(cardToyButton);

            let cardToysCount = document.createElement('div');
            cardToysCount.className = "toys__count"
            cardToysCount.innerHTML = `${item.count}`
            cardToyButton.append(cardToysCount);

        })
    }
    addCards()

    const workPanel = document.querySelector('.work-panel') as HTMLElement

    const changeTree = (dataSetValue: string) => {
        const image = document.querySelector('.work-panel__img') as HTMLImageElement
        const src = require(`src/assets/tree/${dataSetValue}.png`)
        image.src = `${src}`
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
            console.log(dataTreeValue)
        }
        // switch (event.target) {
        //     case :

        //         break;

        //     default:
        //         break;
        // }
    })

}

