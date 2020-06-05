const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")


buttonSearch.addEventListener("click", () => {  //Identifica um click
    modal.classList.remove("hide")              //Remove o hide e libera o modal
})

close.addEventListener("click", () => {        
    modal.classList.add("hide")                 //Aciona o hide e fecha o modal
})