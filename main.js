const baseUrl = 'https://657ead6f3e3f5b189463f6cb.mockapi.io/api/v1/'
let currentId


getBlogs()
function getBlogs(){
    const endPoint = 'blogs'
    
    fetch(baseUrl + endPoint,{
        method:"GET",
        headers: {'content-type':'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
        let allStatuses = document.querySelector(".all")
        allStatuses.innerHTML = data.length

        let draftStatuses = data.filter((item) =>{
            return item.status.toLowerCase().includes("draft")
        })
        let draft = document.querySelector(".draft")
        draft.innerHTML = draftStatuses.length 

        let publishedStatuses = data.filter((item) =>{
            return item.status.toLowerCase().includes("published")
        })
        let published = document.querySelector(".published")
        published.innerHTML = publishedStatuses.length  
        
        render(data)
    })
}

function filterAll(){
    getBlogs()
}

function filterDraft(){
    const endPoint = 'blogs'
    
    fetch(baseUrl + endPoint,{
        method:"GET",
        headers: {'content-type':'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
        let draftStatuses = data.filter((item) =>{
            return item.status.toLowerCase().includes("draft")
        })
        render(draftStatuses)
    })
}

function filterPublished(){
    const endPoint = 'blogs'
    
    fetch(baseUrl + endPoint,{
        method:"GET",
        headers: {'content-type':'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
        let publishedStatuses = data.filter((item) =>{
            return item.status.toLowerCase().includes("published")
        })
        render(publishedStatuses)
    })
}

function searchWithTitle() {
    let keyword = document.getElementById("search").value 
    const endPoint = 'blogs'
    
    fetch(baseUrl + endPoint,{
        method:"GET",
        headers: {'content-type':'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
        let searchedTitles = data.filter((item) =>{
            return item.title.toLowerCase().includes(keyword.toLowerCase())
        })
        render(searchedTitles)
    })
}

function addNewPost() {
    let title = document.getElementById("title").value 
    let status = document.getElementById("status").value

    let newObj = {
        title:title,
        status:status
    }
    document.getElementById("title").value = ''
    document.getElementById("status").value = ''

    const endPoint = 'blogs'
    fetch(baseUrl + endPoint,{
        method:"POST",
        headers: {'content-type':'application/json'},
        body: JSON.stringify(newObj)
    })
    .then((res) => res.json())
    .then((data) =>{
        getBlogs()
    })
}

function editCurrentBlog(num){
    currentId = num
    const endPoint = `blogs/${num}`

    fetch(baseUrl + endPoint,{
        method:"GET",
        headers: {'content-type':'application/json'},
    })
    .then((res) => res.json())
    .then((data) =>{
        document.getElementById("editTitle").value = data.title
        document.getElementById("editStatus").value = data.status
    })
}

function saveChanges(){
    let editedTitle = document.getElementById("editTitle").value
    let editStatus = document.getElementById("editStatus").value
    const endPoint = `blogs/${currentId}`
    let editedObj = {
        title:editedTitle,
        status:editStatus
    }
    fetch(baseUrl + endPoint,{
        method:"PUT",
        headers: {'content-type':'application/json'},
        body: JSON.stringify(editedObj)
    })
    .then((res) => res.json())
    .then((data) =>{
        getBlogs()
    })
}

function deleteBlog(num) {
    const endPoint = `blogs/${num}`

    fetch(baseUrl + endPoint,{
        method:'DELETE',
        headers: {'content-type':'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
        getBlogs()
    })
}


function render(arr){
    let tbody = document.querySelector("tbody")
    tbody.innerHTML = ''

    arr.map(item =>{
        let tr = document.createElement("tr")
        let id = document.createElement("td")
        let title = document.createElement("td")
        let status = document.createElement("td")
        let createdAt = document.createElement("td")
        let actions  = document.createElement("td")

        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "O'chirish"
        deleteBtn.classList.add("btn","btn-danger")
        deleteBtn.setAttribute("onclick",`deleteBlog(${item.id})`)
        
        let editBtn = document.createElement("button")
        editBtn.innerText = "Tahrirlash"
        editBtn.classList.add("btn","btn-warning","mx-3")
        editBtn.setAttribute("onclick",`editCurrentBlog(${item.id})`)
        editBtn.setAttribute("data-bs-toggle","modal")
        editBtn.setAttribute("data-bs-target","#staticBackdrop")
        
        actions.append(deleteBtn,editBtn)

        id.innerText = item.id
        title.innerText = item.title
        status.innerText = item.status    
        createdAt.innerText = item.createdAt


        tr.append(id,title,status,createdAt,actions)
        tbody.append(tr)
    })
}

























