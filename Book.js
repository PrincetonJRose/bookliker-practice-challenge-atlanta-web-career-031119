class Book {
    constructor(id, title, description, img_url, users = []){
    this.id = id
    this.title = title
    this.description = description
    this.img_url = img_url
    this.users = users
    }

    makeLi =()=> {
        const EMPTY_HEART = '♡'
        const FULL_HEART = '♥'

        let div = document.querySelector("#show-panel")
        div.innerHTML = ''
        
        let btn = document.createElement('button')
        btn.dataset.id = this.id
        btn.className = "button"
        for (let user of this.users){
            if (user.id != 1){
                btn.innerHTML = `Like! ${EMPTY_HEART}`
            } else {
                btn.innerHTML = `Liked! ${FULL_HEART}`
                break
            }
        }
        btn.addEventListener('click', changeLikeStatus)

        let h1 = document.createElement('h1')
        h1.innerText = this.title

        let p = document.createElement('p')
        p.innerText = this.description

        let img = document.createElement('img')
        img.src = this.img_url

        let ul = document.createElement('ul')
        for (let user of this.users){
            let userLi = document.createElement('li')
            userLi.id = user.username
            userLi.innerText = user.username
            ul.appendChild(userLi)
        }
        let p2 = document.createElement('p')
        p2.innerHTML = "<strong>Users who liked this book:</strong>"


        div.appendChild(h1)
        div.appendChild(img)
        div.appendChild(p)
        div.appendChild(btn)
        div.appendChild(p2)
        div.appendChild(ul)
    }
}