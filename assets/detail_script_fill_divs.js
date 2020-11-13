
let words = "his armour back and if a could his brown slightly and by into stiff bidding was hardly to it and morning Samsa from found in his into a lay on to off any His many pitifully thin with of of him about".replace('\n', '').split(' ')

const canvas = document.getElementsByClassName("canvas")[0]
let line = document.createElement('div')
canvas.appendChild(line)

let length = words.length

var w = window.innerWidth


for (let i=0; i<length; i++) {
    const div = document.createElement('div')
    div.dataset['content'] = words.splice(Math.floor(Math.random()*length)-1, 1)
    div.innerHTML = div.dataset['content']
    div.style.animationDelay = `-${Math.floor(Math.random()*8)/8}s`
    div.onmouseover = mouseoverCallback
    div.dataset.style = " "

    if (line.lastChild && line.lastChild.getBoundingClientRect().right > w) {
        line = document.createElement("div")
        canvas.appendChild(line)
    } 
    line.appendChild(div)
}


function mouseoverCallback(event) {
    console.log(event.target.getAnimations()[0])
}
