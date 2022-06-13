var after = ''
const subreddit = 'preguntaleareddit' //You can change this value for any subreddit
const aks = 3 //Change this value to change the number of Ask in your output
const nReplys = 3 //Change this value to change the number of replys for ask in your output

function fetchAskreddit(){
    if (document.getElementById('Pregunta')){
        document.getElementById('Pregunta').remove()
    }

    let parentdiv = document.createElement('div')
    parentdiv.id = 'Pregunta'
    fetch(`https://www.reddit.com/r/${subreddit}/.json?after=${after}`)
    .then(response => response.json())
    .then(body =>{
        after = body.data.after
        for(let index = 1; index<aks; index++){
            let url  = body.data.children[index].data.url
            let div = document.createElement('div')
            let title = document.createElement('h2')
            let author = document.createElement('h4')

            fetch(`${url}.json`)
            .then(response => response.json())
            .then(body =>{
                for(let i = 0; i<nReplys; i++){
                    let xReply = document.createElement('h4')
                    let yReply = document.createElement('p')
                    xReply.textContent =  `${body[1].data.children[i].data.author} reply:`
                    yReply.textContent = body[1].data.children[i].data.body
                    div.appendChild(xReply)
                    div.appendChild(yReply)
                }
            })
            
            title.textContent = body.data.children[index].data.title
            author.textContent = `${body.data.children[index].data.author} ask:`
            
            div.appendChild(author)
            div.appendChild(title)   
            parentdiv.appendChild(div)
        }
        document.body.appendChild(parentdiv)
    })
}