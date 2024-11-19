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

    const cardBack = document.createElement("div")
    cardBack.classList.add("card-back")
    const circle = document.createElement("div")
    circle.classList.add("circle")

    const cardFront = document.createElement("div")
    cardFront.classList.add("card-front")

    const cardImg = document.createElement("img")
    cardImg.classList.add("cardImg")

    cardFront.append(cardImg)
    cardBack.append(circle)
    card.append(cardBack, cardFront)

    return { card, cardBack, cardFront, cardImg }
}

async function addValuesToCard({ card, cardFront, cardImg }) {
    try {
        const data = await getPokemonData(randomPokemonName())
        //console.log(data)

        cardFront.dataset.pokemonName = data.name
        cardFront.dataset.type1 = data.type1
        cardFront.dataset.type2 = data.type2 
        cardImg.src = data.image

        cardsArray.push(card)
        cardsArray.push(card.cloneNode(true))

    } catch (error) {
        console.error('Error fetching data:', error)
    }
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

    // Notify that cards are ready
    document.dispatchEvent(new Event("cardsReady"));
}

showData()
