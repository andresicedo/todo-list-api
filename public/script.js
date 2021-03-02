function getAllTodos() {
    //get data from the api
    axios.get("/api/todos")
        .then(response => {
            //use data to render todos on page
            const todosContainer = document.querySelector("#todosContainer")
            //loop over each todo in the response and make an array of html strings
            const todosHtml = response.data.map(todo => {
                return `<li class="${todo.completed ? 'complete':'incomplete'}">
                ${todo.description}
                <button onclick="setCompleteStatus('${todo.id}', '${!todo.completed}')">
                ${todo.completed ? '💯' : 'Not Complete'}</button>
                <button onclick="deleteTodo('${todo.id}')">🗑</button>
                <button onclick="editTodo('${todo.id}')">Edit</button>
                </li>`
            }).join("")
            todosContainer.innerHTML = todosHtml
        })
}


function setCompleteStatus(id, status) {
    axios.patch(`/api/todos/${id}`, {
        completed: status
    })
    .then(() => {
        getAllTodos();
    })
}



function addNewTodo(description) {
    //send POST request to api
    return axios.post("/api/todos", {
        description: description//set description in request body
    })
}


function deleteTodo(id) {
    axios.delete(`/api/todos/${id}`)
        .then(() => {
            getAllTodos();
        })
}


function editTodo(id) {
    //send patch request to API
    return axios.patch(`/api/todos/${id}`, {
        description: prompt("New description: ")
    })
    .then(() => {
        getAllTodos();
    })
}



// App logic //

//fetch all todos on load
getAllTodos()

const todosForm = document.querySelector("#todosForm");
todosForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = todosForm.elements.description.value;
    addNewTodo(description)
        .then(() => {
            todosForm.reset();
            getAllTodos()
        })
})
