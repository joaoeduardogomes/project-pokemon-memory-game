function changeCardColors(cards) {
    cards.forEach(card => {
        const cardFront = card.querySelector(".card-front");

        if (!cardFront.dataset.type2) {
            cardFront.style.backgroundImage = `linear-gradient(to top left, var(--color-${cardFront.dataset.type1}) 50%, #fff 50%)`;
            cardFront.style.borderColor = `var(--color-${cardFront.dataset.type1}) #fff #fff var(--color-${cardFront.dataset.type1})`;
        } else {
            cardFront.style.backgroundImage = `linear-gradient(to top right, var(--color-${cardFront.dataset.type1}) 50%, var(--color-${cardFront.dataset.type2}) 50%)`;
            cardFront.style.borderColor = `var(--color-${cardFront.dataset.type1}) var(--color-${cardFront.dataset.type1}) var(--color-${cardFront.dataset.type2}) var(--color-${cardFront.dataset.type2})`;
        }
    });
}

function checkForMatch(flippedCards) {
    const [card1, card2] = flippedCards;
    const front1 = card1.querySelector(".card-front");
    const front2 = card2.querySelector(".card-front");

    if (front1.dataset.pokemonName === front2.dataset.pokemonName) {
        setTimeout(() => {
            card1.classList.add("match");
            card2.classList.add("match");
        }, 1000)

        flippedCards.length = 0;
    } else {
        // Wait and then flip back mismatched cards
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");

            flippedCards.length = 0;
        }, 1000);
    }
}

let flippedCards = [];

// Add event listener for cards when they're ready
document.addEventListener("cardsReady", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            // Prevent flipping more than 2 cards or flipping the same card twice
            if (flippedCards.length === 2 || card.classList.contains("flipped")) return;

            card.classList.add("flipped");
            flippedCards.push(card);

            if (flippedCards.length === 2) checkForMatch(flippedCards);
        });
    });

    changeCardColors(cards);
});
