function roll(target)  {
    const hidden = target.parentNode.children[1]
    target.parentNode.classList.toggle('rolled')
    if (hidden.hasAttribute("style")) {
        hidden.removeAttribute("style")
    }
    else {
        hidden.style.height = hidden.scrollHeight + "px";
    }
}
