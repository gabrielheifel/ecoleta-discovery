
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")          // Chama o select estado para o JS

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")    // Acessa o banco de dados(API) de estados

        //.then é um 'entao faça'                           res => ou function(res), mesma coisa 
        .then( res => res.json())                           // função anonima que retorna um valor, no caso, uma resposta JSON 
        .then( function(states) {

            // For para procurar o estado correspondente
            for( const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option> `
            }

        } )
}

populateUFs()       //Chamada da função

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value                  // Pega o valor o id de onde o event foi chamado. No caso, de select[name=uf]

    /* Mostrar o esdado na url do site */
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    /* Seta a caixinha de cidade para option quando muda o estado*/
    citySelect.innerHTML = "<option>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then( res => res.json())
        .then( cities => {

            for(const city of cities){
                citySelect.innerHTML += `<option valeu="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")
    //Ouvidor de eventos
    .addEventListener("change", getCities)                      //Quando um evento mudar, chama a função getCities Passando por referencia  
                                     

// ITENS DE COLETA  

const itensToCollect = document.querySelectorAll(".itens-grid li")  // Chama a lista inteira

for(let item of itensToCollect){                                // Detecta qual item recebeu o evento
    item.addEventListener("click", handleSelectedItem)          // Ao detectar, chama a function
}

const collectedItems = document.querySelector("input[name=items]")//Campo que recebe os itens selecionados

let selectedItems = []                                          //Array

function handleSelectedItem(event){                             // Function recebe o evento

    const itemLi = event.target                                 // Verifica a onde aconteceu o evento

    // Adicionar ou remover uma Class com JS
    // toggle verifica se existe ou nao a class, caso não add, caso sim remove
    itemLi.classList.toggle("selected")                         //Reage ao evento, criando ou removendo uma class que é modificada no CSS

    const itemID = itemLi.dataset.id                            //Recebe valor do data-id que aconteceu o evento

    // Verificar se existem items selecionados(selectedItems[])
    // se sim, pegar os items selecionados

    //alreadySelected recebe o endereço do item dentro do array (selectedItems.findIndex) por causa dessa função
    const alreadySelected = selectedItems.findIndex( item => {  
        const itemFound = item == itemID                // Retorna true se o item do array(item) == ao item clicado(itemID)
        return itemFound
    })

    // se já estiver selecionado, 
    if( alreadySelected >= 0){
        //tirar da seleção (selectedItems[])                    filteredItems é um novo array 
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemID      // Se retornar false, ou seja, se o item do array for igual ao que eu cliquei
            return itemIsDifferent                      // filtra(retira) ele do novo array (filteredItems)
        })

        selectedItems = filteredItems       //Atualiza o array principal com o novo array
    
    // se não estiver selecionado, 
    } else {
        //adicionar a seleção(selectedItems[])
        selectedItems.push(itemID)
    }    

    // atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems
    

}
