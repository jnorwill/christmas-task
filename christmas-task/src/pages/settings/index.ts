import './index.scss'
import data from '../../data'
import settingsHtml from './index.html'
document.body.innerHTML = settingsHtml

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
    sortFavorites?: (item: arrSortType) => boolean,
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

let allFilters: arrFiltersType = {}

let sortedArr: arrSortType[]


const addCards = (arr: arrSortType[]) => {
    sortedArr = data.filter((element) => {
        return Object.values(allFilters).every((item: (item: arrSortType) => boolean) => item(element))
    })
    const catalogContainerHtml = document.querySelector('.catalog')
    const catalogHtml = document.createElement('div');
    catalogHtml.className = "catalog"
    catalogContainerHtml.replaceWith(catalogHtml);

    sortedArr.forEach((item) => {
        let card = document.createElement('div');
        card.className = "card"
        catalogHtml.append(card);

        let cardTittle = document.createElement('h4');
        cardTittle.className = "card__tittle"
        cardTittle.innerHTML = `${item.name}`
        card.append(cardTittle);

        let cardContainer = document.createElement('div');
        card.append(cardContainer);

        cardContainer.className = "card__container"
        let leftCardContainer = document.createElement('div');
        leftCardContainer.className = "card__container_left"
        cardContainer.append(leftCardContainer);
        let rightCardContainer = document.createElement('div');
        rightCardContainer.className = "card__container_right"
        cardContainer.append(rightCardContainer);

        // let cardImg = document.createElement('img');
        // cardImg.src = `../../assets/toys/${index}.png`
        // leftCardContainer.append(cardImg);

        let cardButton = document.createElement('button');
        cardButton.className = "card__button"
        cardButton.innerHTML = `Выбрать`
        leftCardContainer.append(cardButton);

        let cardCount = document.createElement('p');
        let cardYear = document.createElement('p');
        let cardShape = document.createElement('p');
        let cardColor = document.createElement('p');
        let cardSize = document.createElement('p');
        let cardFavorite = document.createElement('p');

        cardCount.innerHTML = `Количество: ${item.count}`
        cardYear.innerHTML = `Год покупки: ${item.year}`
        cardShape.innerHTML = `Форма: ${item.shape}`
        cardColor.innerHTML = `Цвет: ${item.color}`
        cardSize.innerHTML = `Размер: ${item.size}`
        cardFavorite.innerHTML = `Любимая: ${item.favorite}`

        rightCardContainer.append(cardCount);
        rightCardContainer.append(cardYear);
        rightCardContainer.append(cardShape);
        rightCardContainer.append(cardColor);
        rightCardContainer.append(cardSize);
        rightCardContainer.append(cardFavorite);

    })
}

addCards(data)

const sortFavorites = (item: arrSortType) => {
    return item.favorite
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

const buttonFavorites = document.getElementById('favorites') as HTMLInputElement
const buttonBell = document.getElementById('bell') as HTMLInputElement
const buttonBall = document.getElementById('ball') as HTMLInputElement
const buttonCone = document.getElementById('cone') as HTMLInputElement
const buttonSnowflake = document.getElementById('snowflake') as HTMLInputElement
const buttonToy = document.getElementById('toy') as HTMLInputElement
const buttonWhite = document.getElementById('white') as HTMLInputElement
const buttonYellow = document.getElementById('yellow') as HTMLInputElement
const buttonRed = document.getElementById('red') as HTMLInputElement
const buttonBlue = document.getElementById('blue') as HTMLInputElement
const buttonGreen = document.getElementById('green') as HTMLInputElement
const buttonLargeSize = document.getElementById('large') as HTMLInputElement
const buttonMediumSize = document.getElementById('medium') as HTMLInputElement
const buttonSmallSize = document.getElementById('small') as HTMLInputElement


const localStorageSelected = localStorage.getItem('selected card')
let selectArr: arrSortType[] = []
const selectHtml = document.querySelector('.aside__select')
if (localStorageSelected) {
    const button = document.querySelectorAll('.card__button')
    button.forEach((item) => {
        const buttonContainer = item.parentElement
        const cardContainer = buttonContainer.parentElement
        const cardTitle: string = cardContainer.previousElementSibling.innerHTML
        if (localStorageSelected.split(',').find(item => item === cardTitle)) {
            item.classList.add('card__button_active')
        }
    })
    selectArr = localStorageSelected.split(',').map(element => {
        return data.find(item => item.name === element)
    });
    selectHtml.innerHTML = `${selectArr.length}`
}

const addSelect = () => {
    selectHtml.innerHTML = `${selectArr.length}`
}

document.addEventListener('click', (event) => {
    const buttonSelect = event.target as HTMLElement
    if (buttonSelect.classList.contains('card__button')) {
        const buttonContainer = buttonSelect.parentElement
        const cardContainer = buttonContainer.parentElement
        const cardTitle: string = cardContainer.previousElementSibling.innerHTML

        const card: arrSortType = data.find(item => item.name === cardTitle);
        const index = selectArr.findIndex(item => item.name === cardTitle)

        if (!buttonSelect.classList.contains('card__button_active')) {
            if (selectArr.length < 20) {
                buttonSelect.classList.add('card__button_active')
                if (!selectArr.find(item => item.name === cardTitle)) {
                    selectArr.push(card)
                    addSelect()
                }
            } else { alert("Извините, все слоты заполнены") }
        } else {
            buttonSelect.classList.remove('card__button_active')
            selectArr.splice(index, 1)
        }

        let arrName: string[] = selectArr.map(item => item.name)
        localStorage.setItem('selected card', `${arrName.join(',')}`)
    }
    switch (event.target) {
        case buttonFavorites:
            setTimeout(() => {
                if (buttonFavorites.checked) {
                    allFilters.sortFavorites = sortFavorites
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortFavorites
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonBell:
            setTimeout(() => {
                if (buttonBell.checked) {
                    allFilters.sortBell = sortBell
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortBell
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonBall:
            setTimeout(() => {
                if (buttonBall.checked) {
                    allFilters.sortBall = sortBall
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortBall
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonCone:
            setTimeout(() => {
                if (buttonCone.checked) {
                    allFilters.sortCone = sortCone
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortCone
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonSnowflake:
            setTimeout(() => {
                if (buttonSnowflake.checked) {
                    allFilters.sortSnowflake = sortSnowflake
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortSnowflake
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonToy:
            setTimeout(() => {
                if (buttonToy.checked) {
                    allFilters.sortToy = sortToy
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortToy
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonWhite:
            setTimeout(() => {
                if (buttonWhite.checked) {
                    allFilters.sortWhite = sortWhite
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortWhite
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonYellow:
            setTimeout(() => {
                if (buttonYellow.checked) {
                    allFilters.sortYellow = sortYellow
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortYellow
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonRed:
            setTimeout(() => {
                if (buttonRed.checked) {
                    allFilters.sortRed = sortRed
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortRed
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonBlue:
            setTimeout(() => {
                if (buttonBlue.checked) {
                    allFilters.sortBlue = sortBlue
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortBlue
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonGreen:
            setTimeout(() => {
                if (buttonGreen.checked) {
                    allFilters.sortGreen = sortGreen
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortGreen
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonLargeSize:
            setTimeout(() => {
                if (buttonLargeSize.checked) {
                    allFilters.sortLargeSize = sortLargeSize
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortLargeSize
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonMediumSize:
            setTimeout(() => {
                if (buttonMediumSize.checked) {
                    allFilters.sortMediumSize = sortMediumSize
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortMediumSize
                    addCards(sortedArr)
                }
            }, 100);
            break;
        case buttonSmallSize:
            setTimeout(() => {
                if (buttonSmallSize.checked) {
                    allFilters.sortSmallSize = sortSmallSize
                    addCards(sortedArr)
                } else {
                    delete allFilters.sortSmallSize
                    addCards(sortedArr)
                }
            }, 100);
            break;
        default:
            break;
    }

})
