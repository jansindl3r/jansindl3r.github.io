
let words = "daily Man not in amusing cannot still I on Law worlds for minds wisdom many work about it by may now but of disavow his thus knowall Flatland as say critics thinks has This can a who constrains says thing isworking that For all him In part far always hand must It Circularor doing with which without and whicha aristocratic to is facts".replace('\n', '').split(' ')

const canvas = document.getElementsByClassName("canvas")[0]
let line = document.createElement('div')
canvas.appendChild(line)

let length = words.length
let lineCounter = 1

var stopper 

if (h > w) {
    stopper = 5
}
else {
    stopper = 3
}

for (let i=0; i<length; i++) {
    const div = document.createElement('div')
    div.dataset['content'] = words.splice(Math.floor(Math.random()*length)-1, 1)
    div.innerHTML = div.dataset['content']
    div.style.animationDelay = `-${Math.floor(Math.random()*8)/8}s`
    // div.onmouseover = mouseoverCallback
    div.dataset.style = " "

    if (line.lastChild && line.lastChild.getBoundingClientRect().right > w) {
        if (lineCounter == stopper) {
            break
        }
        line = document.createElement("div")
        canvas.appendChild(line)
        lineCounter += 1
    } 
    line.appendChild(div)
}


// function mouseoverCallback(event) {
//     console.log(event.target.getAnimations()[0])
// }
