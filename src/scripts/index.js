import { pokemonNamesArray } from "./pokemonNames.js"

const sortedNames = []
const cardsArray = []

function getPokemonData(pokemonName) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => saveData(data))
}


function saveData(data) {
    const name = data.name
    const type1 = data.types[0].type.name
    const type2 = data.types[1] ? data.types[1].type.name : ""
    const image = data.sprites.other["official-artwork"].front_default

    return { name, type1, type2, image }
}

function randomPokemonName() {
    let sortedName

    do {
    const randomIndex = Math.floor(Math.random() * pokemonNamesArray.length)
    sortedName = pokemonNamesArray[randomIndex].toLowerCase()
    } while (sortedNames.includes(sortedName))

    sortedNames.push(sortedName)
    return sortedName
}

function createCard() {
    const card = document.createElement("div")
    card.classList.add("card")

    const cardImg = document.createElement("img")
    cardImg.classList.add("cardImg")

    card.append(cardImg)

    return { card, cardImg }
}

async function addValuesToCard({ card, cardImg }) {
    try {
        const data = await getPokemonData(randomPokemonName())
        console.log(data)

        card.dataset.pokemonName = data.name
        card.dataset.type1 = data.type1
        card.dataset.type2 = data.type2 
        cardImg.src = data.image

        cardsArray.push(card)
        cardsArray.push(card.cloneNode(true))

    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

function changeBackgroundColor() {
    cardsArray.forEach(card => {
        if (!card.dataset.type2) {
            card.style.backgroundImage = `linear-gradient(to top left, var(--color-${card.dataset.type1}) 50%, #fff 50%)`

            card.style.borderColor = `var(--color-${card.dataset.type1}) #fff #fff var(--color-${card.dataset.type1})`
        }
        else {
            card.style.backgroundImage = `linear-gradient(to top right, var(--color-${card.dataset.type1}) 50%, var(--color-${card.dataset.type2}) 50%)`

            card.style.borderColor = `var(--color-${card.dataset.type1}) var(--color-${card.dataset.type1}) var(--color-${card.dataset.type2}) var(--color-${card.dataset.type2})`
        }
    })
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


async function showData() {
    while (cardsArray.length < 16) {
        const cardElements = createCard()
        await addValuesToCard(cardElements)
    }
    
    const shuffledCardsArray = shuffleArray(cardsArray)

    const fragment = document.createDocumentFragment()
    for (const card of shuffledCardsArray) {
        fragment.append(card)
    }
    document.querySelector("main").appendChild(fragment)
    changeBackgroundColor()
}

showData()
