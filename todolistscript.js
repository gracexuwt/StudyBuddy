const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const deleteTaskButton = document.querySelector('[data-delete-task-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTaskButton = document.querySelector('[data-delete-task-button]')
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIARD6ATKRQDOIDNRP4", 
    "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

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

deleteListButton.addEventListener('click', e=>{
    lists = lists.filter(list => list.id !== selectedListID)
    selectedListID = null
    saveAndRender();
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


newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName == null || taskName === "") return
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedList = lists.find(list => list.id === selectedListID)
    selectedList.tasks.push(task)
    saveAndRender()
})

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListID)
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        save()
        renderTaskCount(selectedList)
    }
})

clearCompleteTaskButton.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListID)
    //change the task list into a list that, through filter, only
    //have the incomplete tasks left
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
})


function render() {
    clearElement(listsContainer)
    renderLists()
    const selectedList = lists.find(list => list.id === selectedListID)
    // No list is selected
    if (selectedListID == null){
        listDisplayContainer.style.display = "none"
    } 

    // One list is selected
    else {
        listDisplayContainer.style.display = ""
        listTitleElement.innerText = selectedList.name
        renderTaskCount(selectedList)
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }
    writeToServer()
}

function renderLists(){
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

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
      const taskElement = document.importNode(taskTemplate.content, true)
      const checkbox = taskElement.querySelector('input')
      checkbox.id = task.id
      checkbox.checked = task.complete
      const label = taskElement.querySelector('label')
      label.htmlFor = task.id
      label.append(task.name)
      tasksContainer.appendChild(taskElement)
    })
}
  



function renderTaskCount(selectedList) {
    const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length
    const taskString = incompleteTasksCount === 1 ? "task": "tasks"
    listCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`
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

function createTask(name) {
    return {id: Date.now().toString(), 
            name: name,
            complete: false}
}


function readFromServer(){
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    
    function createParams(email){
        const params = {
            TableName: "StudyBuddy",
            Key: {
                "email_id": {S: email}
            },
        };
        return params;
    }
    
    
    function getProperty(){
        params = createParams("healtoneforever@gmail.com");
        return item = ddb.getItem(params).promise();
    }
    
    
    
    getProperty().then(
        function(data) {
            console.log('Success', data.Item.email_id);
            var email = data.Item.email_id;
            console.log(email);
    
        }).catch(function(err) {
            console.log(err);
        }
    );
}

function writeToServer(){
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    var params = {
        TableName: "StudyBuddy",
        Item: {
            "email_id": {S: "1@gmail.com"},
            "listOfTasks": {L: [{S: "1"}]}
        },
        
    };
    
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
}



render()

