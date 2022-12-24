const listContainer = document.querySelector('[data-lists]')

let lists = []

function render() {
    clearElement(listContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.classList.add("list-name")
        listElement.innerText = list
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element) {

}

render()
