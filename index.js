const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const allUsers = []

document.addEventListener("DOMContentLoaded", function() {
    getAllBooks()
    getUsers()
});

function getUsers(){
    fetch(`http://localhost:3000/users`)
    .then(res => res.json())
    .then(users => users.forEach(user => userList(user)))
}

function userList(user){
    allUsers.push(user)
}

function getAllBooks(){
    const allBooks = new BookList
    fetch(`http://localhost:3000/books`)
    .then(res => res.json())
    .then(books => books.forEach(book => makeBook(book, allBooks)))
}

function makeBook(book, allBooks){
    newBook = new Book(book.id, book.title, book.description, book.img_url, book.users)
    allBooks.books.push(newBook)
    allBooks.displayList()
}

function changeLikeStatus(e){
    fetch(`http://localhost:3000/books/${e.target.dataset.id}`)
    .then(res => res.json())
    .then(book => addUserToLikes(book,e))
}

function addUserToLikes(book, e){
    let liked = false
    let div = document.querySelector("#show-panel")
    let ul = div.querySelector('ul')
    for (let user of book.users){
        if (user.id == allUsers[0].id){
            liked = true
        }
    }
    if (liked == true){
        book.users.pop()
    } else {
        book.users.push(allUsers[0])
    }
    fetch(`http://localhost:3000/books/${e.target.dataset.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ users: book.users })
    })
    .then(res => res.json())
    .then(book => updateStatus(book, e))
}

function updateStatus(book, e){
    let div = document.querySelector("#show-panel")
    let btn = div.querySelector("button")
    let ul = div.querySelector('ul')
    ul.innerHTML = ''

    for (let user of book.users){
        let userLi = document.createElement('li')
        userLi.id = user.username
        userLi.innerText = user.username
        ul.appendChild(userLi)
    }

    for (let user of book.users){
        if (user.id != 1){
            btn.innerHTML = `Like! ${EMPTY_HEART}`
        } else {
            btn.innerHTML = `Liked! ${FULL_HEART}`
            break
        }
    }
    getAllBooks()
}