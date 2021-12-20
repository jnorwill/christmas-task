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

