import './index.scss'
import homeHtml from './pages/home'
import treeHtml, { runScript as treeRunScript } from './pages/tree'
import settingsHtml, { runScript as settingsRunScript } from './pages/settings'


const openPage = (newPage: string) => {
    const mainElement = document.getElementById('main')
    if(mainElement){mainElement.innerHTML = newPage}
}
openPage(homeHtml)

const addSelected = () => {
    const localStorageSelectedArr = localStorage.getItem('selected card')?.split(',').filter(Boolean)
    const selectHtml = document.querySelector('.selected')
    if (selectHtml) {selectHtml.innerHTML = `${localStorageSelectedArr?.length}`}
    console.log(localStorageSelectedArr)
}
addSelected()

document.addEventListener('click', (event) => {

    const buttonHome = document.getElementById('button-home')
    const buttonSetting = document.getElementById('button-settings')
    const buttonTree = document.getElementById('button-tree')
    const buttonStart = document.getElementById('start')

    switch (event.target) {
        case buttonHome:
            openPage(homeHtml)
            addSelected()
            break;
        case buttonTree:
            openPage(treeHtml)
            treeRunScript()
            addSelected()
            break;
        case buttonStart:
        case buttonSetting:
            openPage(settingsHtml)
            settingsRunScript()
            addSelected()
            break;
        default:
            break;
    }
})
