var after = ''

function fetchAskreddit(){
    if (document.getElementById('Pregunta')){
        document.getElementById('Pregunta').remove()
    }

    let parentdiv = document.createElement('div')
    parentdiv.id = 'Pregunta'
    fetch(`https://www.reddit.com/r/AskReddit/.json?after=${after}`)
    .then(response => response.json())
    .then(body =>{
        after = body.data.after
        for(let index = 0; index<body.data.children.length; index++){
            let url  = body.data.children[index].data.url
            let authorReply = document.createElement('h4')
            let reply = document.createElement('p')
            fetch(`${url}.json`)
            .then(response => response.json())
            .then(body =>{
                authorReply.textContent = `${body[1].data.children[0].data.author} reply:`
                reply.textContent = body[1].data.children[0].data.body
            })
            let div = document.createElement('div')
            let title = document.createElement('h3')
            let author = document.createElement('h4')

            title.textContent = body.data.children[index].data.title
            author.textContent = `${body.data.children[index].data.author} ask:`
            
            div.appendChild(author)
            div.appendChild(title)
            div.appendChild(authorReply)
            div.appendChild(reply)   
            parentdiv.appendChild(div)
        }
        document.body.appendChild(parentdiv)
    })
}