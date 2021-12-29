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

    const sortBell = (item: arrSortType) => {
        return item.shape === 'колокольчик'
    }

    const sortBall = (item: arrSortType) => {
        return item.shape === 'шар'
    }
    const sortCone = (item: arrSortType) => {
        return item.shape === 'шишка'
    }
    const sortSnowflake = (item: arrSortType) => {
        return item.shape === 'снежинка'
    }
    const sortToy = (item: arrSortType) => {
        return item.shape === 'фигурка'
    }

    const sortWhite = (item: arrSortType) => {
        return item.color === 'белый'
    }
    const sortYellow = (item: arrSortType) => {
        return item.color === 'желтый'
    }
    const sortRed = (item: arrSortType) => {
        return item.color === 'красный'
    }
    const sortBlue = (item: arrSortType) => {
        return item.color === 'синий'
    }
    const sortGreen = (item: arrSortType) => {
        return item.color === 'зелёный'
    }

    const sortLargeSize = (item: arrSortType) => {
        return item.size === 'большой'
    }
    const sortMediumSize = (item: arrSortType) => {
        return item.size === 'средний'
    }
    const sortSmallSize = (item: arrSortType) => {
        return item.size === 'малый'
    }

    const globalFilters: {
        shape: arrFiltersType,
        color: arrFiltersType,
        size: arrFiltersType
    } = {
        shape: {
            sortBell,
            sortBall,
            sortCone,
            sortSnowflake,
            sortToy,
        },
        color: {
            sortWhite,
            sortYellow,
            sortRed,
            sortBlue,
            sortGreen,
        },
        size: {
            sortLargeSize,
            sortMediumSize,
            sortSmallSize,
        },
    }



    const allAppliedFilters: {
        shape: arrFiltersType,
        color: arrFiltersType,
        size: arrFiltersType,
    } = {
        shape: {},
        color: {},
        size: {},
    }

    let sortedArr: arrSortType[]

    const formSortedArr = () => {
        sortedArr = data.filter((element) => {
            return Object.values(allAppliedFilters).every((item: arrFiltersType) => {
                return Object.values(item).some((func: (item: arrSortType) => boolean) => {
                    return func(element)
                })
            })
        })
    }

    const addCards = (arr: arrSortType[]) => {

        const catalogContainerHtml = document.querySelector('.catalog')
        const catalogHtml = document.createElement('div');
        catalogHtml.className = "catalog"
        catalogContainerHtml?.replaceWith(catalogHtml);

        arr.forEach((item) => {
            const card = document.createElement('div');
            card.className = "card"
            catalogHtml.append(card);

            const cardTittle = document.createElement('h4');
            cardTittle.className = "card__tittle"
            cardTittle.innerHTML = `${item.name}`
            card.append(cardTittle);

            const cardContainer = document.createElement('div');
            card.append(cardContainer);

            cardContainer.className = "card__container"
            const leftCardContainer = document.createElement('div');
            leftCardContainer.className = "card__container_left"
            cardContainer.append(leftCardContainer);
            const rightCardContainer = document.createElement('div');
            rightCardContainer.className = "card__container_right"
            cardContainer.append(rightCardContainer);

            const cardImg = document.createElement('img');
            cardImg.className = "card__img";
            import(`src/assets/toys/${item.num}.png`).then((module) => {
                cardImg.src = module.default
            }).catch((error) => {
                console.log(error)
            })
            leftCardContainer.append(cardImg);

            const cardButton = document.createElement('button');
            cardButton.className = "card__button"
            cardButton.innerHTML = `Выбрать`
            leftCardContainer.append(cardButton);

            const cardCount = document.createElement('p');
            const cardYear = document.createElement('p');
            const cardShape = document.createElement('p');
            const cardColor = document.createElement('p');
            const cardSize = document.createElement('p');
            const cardFavorite = document.createElement('p');

            cardCount.innerHTML = `Количество: ${item.count}`
            cardYear.innerHTML = `Год покупки: ${item.year}`
            cardShape.innerHTML = `Форма: ${item.shape}`
            cardColor.innerHTML = `Цвет: ${item.color}`
            cardSize.innerHTML = `Размер: ${item.size}`
            if (item.favorite) {
                cardFavorite.innerHTML = `Любимая: Да`
            } else { cardFavorite.innerHTML = `Любимая: Нет` }


            rightCardContainer.append(cardCount);
            rightCardContainer.append(cardYear);
            rightCardContainer.append(cardShape);
            rightCardContainer.append(cardColor);
            rightCardContainer.append(cardSize);
            rightCardContainer.append(cardFavorite);
        })
    }
    let arrShape: string[] = []
    let arrColor: string[] = []
    let arrSize: string[] = []


    const formAllAppliedFilters = () => {
        const localStorageSortShape = localStorage.getItem('shape')
        const localStorageSortColor = localStorage.getItem('color')
        const localStorageSortSize = localStorage.getItem('size')
        if (localStorageSortShape) {
            (localStorageSortShape.split(',') as ['sortBell' |
                'sortBall' |
                'sortCone' |
                'sortSnowflake' |
                'sortToy']).forEach((item:
                    'sortBell' |
                    'sortBall' |
                    'sortCone' |
                    'sortSnowflake' |
                    'sortToy'
                ) => {
                    allAppliedFilters.shape[item] = globalFilters.shape[item]
                    const buttonChecked = document.getElementById(`${item}`) as HTMLInputElement
                    buttonChecked.checked = true
                    arrShape = localStorageSortShape.split(',')
                })
        } else {
            allAppliedFilters.shape = { ...globalFilters.shape }
        }
        if (localStorageSortColor) {
            (localStorageSortColor.split(',') as ['sortWhite' |
                'sortYellow' |
                'sortRed' |
                'sortBlue' |
                'sortGreen']).forEach((item:
                    'sortWhite' |
                    'sortYellow' |
                    'sortRed' |
                    'sortBlue' |
                    'sortGreen'
                ) => {
                    allAppliedFilters.color[item] = globalFilters.color[item]
                    const buttonChecked = document.getElementById(`${item}`) as HTMLInputElement
                    buttonChecked.checked = true
                    arrColor = localStorageSortColor.split(',')
                })
        } else {
            allAppliedFilters.color = { ...globalFilters.color }
        }
        if (localStorageSortSize) {
            (localStorageSortSize.split(',') as ['sortLargeSize' |
                'sortMediumSize' |
                'sortSmallSize']).forEach((item:
                    'sortLargeSize' |
                    'sortMediumSize' |
                    'sortSmallSize'
                ) => {
                    allAppliedFilters.size[item] = globalFilters.size[item]
                    const buttonChecked = document.getElementById(`${item}`) as HTMLInputElement
                    buttonChecked.checked = true
                    arrSize = localStorageSortSize.split(',')
                })
        } else {
            allAppliedFilters.size = { ...globalFilters.size }
        }


        formSortedArr()
        addCards(sortedArr)
    }

    formAllAppliedFilters()

    const buttonBell = document.getElementById('sortBell') as HTMLInputElement
    const buttonBall = document.getElementById('sortBall') as HTMLInputElement
    const buttonCone = document.getElementById('sortCone') as HTMLInputElement
    const buttonSnowflake = document.getElementById('sortSnowflake') as HTMLInputElement
    const buttonToy = document.getElementById('sortToy') as HTMLInputElement
    const buttonWhite = document.getElementById('sortWhite') as HTMLInputElement
    const buttonYellow = document.getElementById('sortYellow') as HTMLInputElement
    const buttonRed = document.getElementById('sortRed') as HTMLInputElement
    const buttonBlue = document.getElementById('sortBlue') as HTMLInputElement
    const buttonGreen = document.getElementById('sortGreen') as HTMLInputElement
    const buttonLargeSize = document.getElementById('sortLargeSize') as HTMLInputElement
    const buttonMediumSize = document.getElementById('sortMediumSize') as HTMLInputElement
    const buttonSmallSize = document.getElementById('sortSmallSize') as HTMLInputElement


    const localStorageSelected = localStorage.getItem('selected card')
    const selectArr: arrSortType[] = []
    const selectHtml = document.querySelector('.selected')
    if (localStorageSelected) {
        const button = document.querySelectorAll('.card__button')
        button.forEach((item) => {
            const buttonContainer = item.parentElement
            const cardContainer = buttonContainer?.parentElement
            if (localStorageSelected.split(',').find(item => item === cardContainer?.previousElementSibling?.innerHTML)) {
                item.classList.add('card__button_active')
            }
        })
        localStorageSelected.split(',').forEach(element => {
            const mediator = data.find(item => item.name === element)
            if (mediator) { selectArr.push(mediator) }
        });
        if (selectHtml) { selectHtml.innerHTML = `${selectArr.length}` }

    }

    const addSelectNumber = () => {
        if (selectHtml) { selectHtml.innerHTML = `${selectArr.length}` }
    }
    addSelectNumber()

    const functionOnClick = (button: HTMLInputElement, funcArr: string[], funcType: 'shape' | 'size' | 'color', funcName:
        'sortBell' |
        'sortBall' |
        'sortCone' |
        'sortSnowflake' |
        'sortToy' |
        'sortWhite' |
        'sortYellow' |
        'sortRed' |
        'sortBlue' |
        'sortGreen' |
        'sortLargeSize' |
        'sortMediumSize' |
        'sortSmallSize') => {
        if (button.checked) {
            const localStorageSort = localStorage.getItem(`${funcType}`)
            if (!localStorageSort) {
                allAppliedFilters[funcType] = {}
            }
            allAppliedFilters[funcType][funcName] = globalFilters[funcType][funcName]
            funcArr.push(`${funcName}`)
            localStorage.setItem(`${funcType}`, JSON.stringify(funcArr))
            formSortedArr()
            addCards(sortedArr)
        } else {
            const index = funcArr.findIndex((item: string) => item === `${funcName}`)
            funcArr.splice(index, 1)
            localStorage.setItem(`${funcType}`,  JSON.stringify(funcArr))
            setTimeout(() => {
                const localStorageSort = localStorage.getItem(`${funcType}`)
                if (localStorageSort) {
                    delete allAppliedFilters[funcType][funcName]
                    formSortedArr()
                    addCards(sortedArr)
                } else {
                    allAppliedFilters[funcType] = { ...globalFilters[funcType] }
                    formSortedArr()
                    addCards(sortedArr)
                }
            }, 100)
        }

    }

    document.addEventListener('click', (event) => {

        const buttonSelect = event.target as HTMLElement
        if (buttonSelect.classList.contains('card__button')) {
            const buttonContainer = buttonSelect.parentElement
            const cardContainer = buttonContainer?.parentElement
            const mediator = cardContainer?.previousElementSibling?.innerHTML
            let cardTitle: string
            if (mediator) { cardTitle = mediator }

            let card: arrSortType = data[0]
            const newCard = data.find(item => item.name === cardTitle)
            if (newCard) { card = newCard }
            const index = selectArr.findIndex(item => item?.name === cardTitle)

            if (!buttonSelect.classList.contains('card__button_active')) {
                if (selectArr.length < 20) {
                    buttonSelect.classList.add('card__button_active')
                    if (!selectArr.find(item => item?.name === cardTitle)) {
                        selectArr.push(card)
                        addSelectNumber()
                    }
                } else { alert("Извините, все слоты заполнены") }
            } else {
                buttonSelect.classList.remove('card__button_active')
                selectArr.splice(index, 1)
                addSelectNumber()
            }
            // const arrName: (string | undefined)[] = selectArr.map(item => item?.name)
            // localStorage.setItem('selected card', `${arrName.join(',')}`)

            selectArr.forEach(item => {
                if (item?.name) { selectArr.push(item) }
            })
            localStorage.setItem('selected card', `${selectArr.join(',')}`)
        }

        switch (event.target) {
            case buttonBell:
                functionOnClick(buttonBell, arrShape, 'shape', 'sortBell')
                break;
            case buttonBall:
                functionOnClick(buttonBall, arrShape, 'shape', 'sortBall')
                break;
            case buttonCone:
                functionOnClick(buttonCone, arrShape, 'shape', 'sortCone')
                break;
            case buttonSnowflake:
                functionOnClick(buttonSnowflake, arrShape, 'shape', 'sortSnowflake')
                break;
            case buttonToy:
                functionOnClick(buttonToy, arrShape, 'shape', 'sortToy')
                break;
            case buttonWhite:
                functionOnClick(buttonWhite, arrColor, 'color', 'sortWhite')
                break;
            case buttonYellow:
                functionOnClick(buttonYellow, arrColor, 'color', 'sortYellow')
                break;
            case buttonRed:
                functionOnClick(buttonRed, arrColor, 'color', 'sortRed')
                break;
            case buttonBlue:
                functionOnClick(buttonBlue, arrColor, 'color', 'sortBlue')
                break;
            case buttonGreen:
                functionOnClick(buttonGreen, arrColor, 'color', 'sortGreen')
                break;
            case buttonLargeSize:
                functionOnClick(buttonLargeSize, arrSize, 'size', 'sortLargeSize')
                break;
            case buttonMediumSize:
                functionOnClick(buttonMediumSize, arrSize, 'size', 'sortMediumSize')
                break;
            case buttonSmallSize:
                functionOnClick(buttonSmallSize, arrSize, 'size', 'sortSmallSize')
                break;
            default:
                break;
        }
    })
}
