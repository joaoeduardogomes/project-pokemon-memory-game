let flippedCards = []

// get the cards when they're ready
document.addEventListener("cardsReady", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
            changeBackgroundColor(card);
        });
    });
});


function changeBackgroundColor(card) {
    console.log(card)

    const cardFront = card.querySelector(".card-front")

    console.log(cardFront)
    
    if (!cardFront.dataset.type2) {
        cardFront.style.backgroundImage = `linear-gradient(to top left, var(--color-${cardFront.dataset.type1}) 50%, #fff 50%)`

        cardFront.style.borderColor = `var(--color-${cardFront.dataset.type1}) #fff #fff var(--color-${cardFront.dataset.type1})`
    }
    else {
        cardFront.style.backgroundImage = `linear-gradient(to top right, var(--color-${cardFront.dataset.type1}) 50%, var(--color-${cardFront.dataset.type2}) 50%)`

        cardFront.style.borderColor = `var(--color-${cardFront.dataset.type1}) var(--color-${cardFront.dataset.type1}) var(--color-${cardFront.dataset.type2}) var(--color-${cardFront.dataset.type2})`
    }
}