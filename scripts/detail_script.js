canvases = document.getElementsByClassName('canvas')

var w = window.innerWidth

ratio = 1000/50

for (let c = 0; c < canvases.length; c++) {
    let lastSpace = 0;
    let line = document.createElement('div')
    var lineWidth = 0

    canvases[c].appendChild(line)
    var style = canvases[c].dataset.style
    let keys = Object.keys(images_data[style])
    
    const length = keys.length
    for (let i = 0; i<length; i++) {
        index = Math.round(Math.random()*keys.length) -1 
        const key = keys.splice(index, 1)[0]
        const img = document.createElement('img')
        const picture = document.createElement('div')
        picture.dataset['style'] = images_data[style][key][4]
        img.src = `svgs/${style}/${key}`
        img.style.marginLeft = `${-images_data[style][key][0]/ratio}px`
        img.style.marginRight= `${-images_data[style][key][1]/ratio}px`
        lineWidth += images_data[style][key][2]

        picture.appendChild(img)
        
        spaceWidth = (images_data[style][key][3]/ratio)/2
        // console.log(images_data[style][key])
        // spaceWidth = 0
        
        if (lastSpace > 0) {
            lastSpace += spaceWidth
            space = document.createElement("div")
            space.style.width = `${lastSpace}px`
            line.appendChild(space)
        }

        line.appendChild(picture)
        lastSpace = spaceWidth

        if (line.lastChild && lineWidth/ratio > w) {
            line = document.createElement('div')
            canvases[c].appendChild(line)
            lastSpace = 0
            lineWidth = 0
        } 

    }
}

galleryPics = document.querySelector("#gallery .pics")
var out = true
var x = null
var w = document.body.clientWidth || window.innerWidth 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function move() {
    out = false
    while (!out) {
        await sleep(10)
        shift = -(Math.floor((w/2 - x)/25))
        galleryPics.scroll(galleryPics.scrollLeft+shift, 0)
    }
}

window.onmousemove = (event) => {
    x = event.clientX
}

window.onresize = () => {
    w = document.body.clientWidth || window.innerWidth 
}