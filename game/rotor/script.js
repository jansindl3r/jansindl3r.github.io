var python = XMLHttpRequest
const hiScore = document.getElementById("hiScore")
const tabulka = document.getElementById("player-tabulka")
var data 
function writeScores(req){
    hiScore.innerHTML = ""
    data = JSON.parse(req.responseText)

    for (let i=0; i < data.length; i++) {
        wrapper = document.createElement("div")
        div = document.createElement("div")
        div.innerHTML = `${data[i]["username"]}`
        wrapper.appendChild(div)
        div = document.createElement("div")
        div.innerHTML = `${data[i]["score"]}`
        wrapper.appendChild(div)
        hiScore.appendChild(wrapper)
    }
}

//    $.getJSON("http://0.0.0.0:5000/get_scores", function(response){
//        document.body.innerHTML = response
//    })

const req = new python()
const url = "http://rotor.jecool.net/get_scores/"
// const url = "http://192.168.1.162:5000/get_scores"

req.open("GET", url)
req.setRequestHeader('Content-type', 'application/json')
req.setRequestHeader('Accept', 'application/json')
req.send()

req.onreadystatechange = (e) => {
    if (req.readyState == 4 && req.status == 200) {
        hiScore.innerHTML = ""
        writeScores(req)
    }
}

function postScore(player, score) {
    const req = new python()
    // const url = `http://rotor.wz.cz/write_score?username=${player}&score=${score}`
    const url = `http://rotor.jecool.net/write_score/?username=${player}&score=${score}`
    req.open("POST", url)
    req.send()
    req.onreadystatechange = (e) => {
        if (req.readyState == 4 && req.status == 200) {
            data = JSON.parse(req.responseText)
            writeScores(req)
        }
    }
}

const getLetter = () => {
    const letters = ['r', 't', 'a', 'n', 's', 'f']
    return letters[Math.floor(Math.random()*letters.length)]
}

const scoreDiv = document.getElementById("score")
const style = document.getElementById("style")
const message = document.getElementById("message")
const livesDiv = document.getElementById("lives")
const hra = document.getElementById("hra").children[0]

let speed = 4000
let score = 0
let lives = 3
let gained = 0
let scored = false
let over = false

scoreDiv.innerHTML = score
livesDiv.innerHTML = lives   

const setLetter = () => {
    letter = getLetter()
    hra.children[0].innerHTML = letter
    hra.children[1].innerHTML = letter
}

setLetter()

const getCurrentTime = () => {
    hra.children[0].getAnimations()
    currentTime = hra.children[0].getAnimations()[0]["currentTime"]%speed
    return currentTime
}

const callback = (event) => {
    position = getCurrentTime()
    if (over) {
        document.body.removeAttribute('style')
        hra.children[0].style.animationPlayState = "running"
        hra.children[1].style.animationPlayState = "running"
        tabulka.style.display = "None" 
        score = 0
        lives = 3
        scoreDiv.innerHTML = score
        livesDiv.innerHTML = lives
        speed = 4000
        hra.children[0].style.animationDuration = speed/1000+"s"
        hra.children[1].style.animationDuration = speed/1000+"s"
        hra.dataset['content'] = getLetter()
        hra.style.fontSize = "1em"
        over = false
        return
    }
    match = (position > speed-speed*.05 ) | (position < speed*.05)
    if (match){
        gained = 1
        color = "white"
        duration = speed * 0.9
        hra.style.fontSize = `${4000/duration}em`
    }
    else {
        gained = 0
        color = "red"
        duration = speed * 1.15
        lives -= 1
        livesDiv.innerHTML = lives
        hra.parentNode.classList.remove("shake")
        void hra.offsetWidth
        void hra.offsetWidth
        hra.parentNode.classList.add("shake")
        hra.style.fontSize = `${4000/duration}em`
    }
    hra.children[0].style.animationDuration = duration/1000+"s"
    hra.children[1].style.animationDuration = duration/1000+"s"
    ratio = duration/speed
    hra.children[0].getAnimations()[0].currentTime *= ratio
    hra.children[1].getAnimations()[0].currentTime *= ratio
    
    speed = duration
    score += gained
    if (lives == 0) {
        hra.children[0].style.animationPlayState = "paused"
        hra.children[1].style.animationPlayState = "paused"
        over = true
        vals = []
        for (let i = 0; i < data.length; i++) {
            vals.push(data[i]["score"])
        }
        if (score > Math.min(...vals) || vals.length < 3 ) {
            message.style.color = "#fff"
            message.innerHTML = "wunderbar!"
            tabulka.style.display = "block"
        }
        else {
            document.body.style.background = "red"
            message.style.color = "#000"
            message.innerHTML = "busted"
        }
    }
    else {
        message.innerHTML = gained
        message.style.color = color
    }
    scoreDiv.innerHTML = score
    message.classList.remove("message-show")
    void message.offsetWidth
    message.classList.add("message-show")
}
hra.onclick = callback
tabulka.onsubmit = (e) => {
    e.preventDefault()
    player = document.getElementById("player").value
    postScore(player, score)
    tabulka.style.display = "none"
}