import './index.scss'
import homeHtml from './pages/home'
import treeHtml, { runScript as treeRunScript } from './pages/tree'
import settingsHtml, { runScript as settingsRunScript } from './pages/settings'


const openPage = (newPage: string) => {
    const mainElement = document.getElementById('main')
    mainElement.innerHTML = newPage
}
openPage(homeHtml)

document.addEventListener('click', (event) => {

    const buttonHome = document.getElementById('button-home')
    const buttonSetting = document.getElementById('button-settings')
    const buttonTree = document.getElementById('button-tree')
    const buttonStart = document.getElementById('start')

    switch (event.target) {
        case buttonHome:
            openPage(homeHtml)
            break;
        case buttonTree:
            openPage(treeHtml)
            treeRunScript()
            break;
        case buttonStart:
        case buttonSetting:
            openPage(settingsHtml)
            settingsRunScript()
            break;
        default:
            break;
    }
})
