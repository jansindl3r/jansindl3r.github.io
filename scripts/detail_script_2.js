
keys = Object.keys(data)
for (key of keys) {
    div = document.getElementsByName(key)[0]
    picKeys = Object.keys(data[key])
    for (picKey of picKeys) {
        const img = document.createElement('img')
        img.src = `../../entries/type/Afrikola/svgs/${picKey}`
        
    }
}



// for (font of fonts) {
//     for (let i=0; i< 30; i++) {
//         const img = document.createElement('img')
//         font.appendChild(img)
//     }
// }
