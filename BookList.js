class BookList {
    constructor(books = []){
        this.books = books
    }

    displayList =()=> {
        let ul = document.getElementById('list')
        ul.innerHTML = ''

        let p = document.createElement('p')
        p.innerHTML = "Book List:"
        ul.appendChild(p)

        for (let book of this.books){    
            let li = document.createElement('li')
            li.innerText = book.title
            li.addEventListener('mouseover', book.makeLi)
            ul.appendChild(li)
        }
    }
}