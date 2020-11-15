galleryPics = document.querySelector("#gallery #pics")
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


if (!localStorage["learnt"]) {
    pics = document.querySelector("#gallery #pics")
    nav = document.querySelector("#gallery #nav")
    nav.classList.add("learning")
    pics.onscroll = () => {
        localStorage["learnt"] = true
        nav.classList.remove("learning")
    }
}