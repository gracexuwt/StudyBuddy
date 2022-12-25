const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const LOCAL_STOARGE_LIST_KEY = 'task.lists'
const LOCAL_STOARGE_SELECTED_LIST_ID_KEY = 'task.selectedListID'
let lists = JSON.parse(localStorage.getItem(LOCAL_STOARGE_LIST_KEY)) || []
let selectedListID = localStorage.getItem(LOCAL_STOARGE_SELECTED_LIST_ID_KEY)

listsContainer.addEventListener('click', e=> {
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedListID = e.target.dataset.listId
        saveAndRender()
    }
})

//save the current list into the local storage
function save(){
    localStorage.setItem(LOCAL_STOARGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem
    (LOCAL_STOARGE_SELECTED_LIST_ID_KEY, selectedListID)
}


function saveAndRender(){
    save()
    render()
}

//add this fucntion later that allow users to save their information to the cloud
function saveToCloud() {

}

newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName === "") return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
})




function render() {
    clearElement(listsContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add("list-name")
        listElement.innerText = list.name
        if(list.id === selectedListID) {
            listElement.classList.add('active-list')
        } 
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function createList(name) {
    return {id: Date.now().toString(), 
            name: name,
            tasks: []}
}


render()
