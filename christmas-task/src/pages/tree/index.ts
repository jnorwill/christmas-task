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

    let newData: arrSortType[]
    const addCards = () => {
        const selectesToysList = document.querySelector('.toys')
        if (selectesToysList) { selectesToysList.innerHTML = '' }


        const arr = localStorage.getItem('selected card')?.split(',')

        if (localStorage.getItem('selected card')) {
            newData = data.filter((element: arrSortType) => {
                return arr?.some((item: string) => {
                    return item === element.name
                })
            })
        } else {
            newData = data.slice(0, 20)
        }

        newData.forEach((item: arrSortType) => {
            if (+item.count > 0) {
                const cardToyButton = document.createElement('button');
                cardToyButton.className = 'toys__item'
                selectesToysList?.append(cardToyButton);

                const cardToyImg = document.createElement('img');
                cardToyImg.className = 'toys__img'
                cardToyImg.dataset.toy = item.num

                import(`src/assets/toys/${item.num}.png`).then((src: string) => {
                    cardToyImg.src = src
                }).catch((error) => {
                    console.log(error)
                })
                cardToyImg.draggable = true

                cardToyImg.ondragstart = (event) => {
                    console.log('ondragstart')
                    const mediator = cardToyImg.dataset.toy
                    if (mediator) {
                        event.dataTransfer?.setData("application/cardToyImg", `${mediator}`);
                    }
                    if (event.dataTransfer) {
                        event.dataTransfer.effectAllowed = "move";
                    }
                }
                cardToyButton.append(cardToyImg);

                const cardToysCount = document.createElement('div');
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
        import(`src/assets/tree/${dataSetValue}.png`).then((src: string) => {
            image.src = src
        }).catch((error) => {
            console.log(error)
        })
    }
    const changeBg = (dataSetValue: string) => {

        import(`src/assets/bg/${dataSetValue}.png`).then((src: string) => {
            workPanel.style.backgroundImage = `url(${src})`
        }).catch((error) => {
            console.log(error)
        })
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

    const treeArea = document.querySelector('.work-panel__area') as HTMLElement
    treeArea.ondragover = (event) => {
        event.preventDefault();
        console.log('ondragover')
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move"
        }
    }

    treeArea.ondrop = (event) => {
        event.preventDefault();
        console.log(event.dataTransfer?.getData("application/cardToyImg"))
        let data = ''
        const mediator = event.dataTransfer?.getData("application/cardToyImg")
        if (mediator) { data = mediator }
        const treeArea = document.querySelector('.work-panel__area') as HTMLElement
        const newElement = document.querySelector(`[data-toy="${data}"]`)?.cloneNode() as HTMLElement
        newElement.style.left = `${event.pageX}px`
        newElement.style.top = `${event.pageY}px`

        treeArea.append(newElement);


        newData.map((item) => {
            if (item.num === newElement.dataset.toy) {
                item.count = `${+item.count - 1}`
            }
            return item
        })
        addCards()
    }
}

