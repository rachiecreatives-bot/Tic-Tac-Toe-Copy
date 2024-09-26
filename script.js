const gameBoard = document.querySelector("#board");
const info = document.querySelector("#info");
let turn;
const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // left to right diagonal
    [2, 4, 6]  // right to left diagonal
];

// create the gameboard
function createGameBoard() {
    const emptyTiles = " ".repeat(9).split("");
    const tileGrid = emptyTiles.map((t) => `<button class="tile"></button>`).join("");
    gameBoard.innerHTML = tileGrid;
    turn = "X";
    info.textContent = `${turn}'s turn`;
    gameBoard.addEventListener("click", handleGameboardClick);
}
createGameBoard();

function restartGame(){
    let seconds = 3;
    const timer = setInterval(() => {
        info.textContent = `Restarting in ${seconds}...`
        seconds--;
        if(seconds < 0 ){
            //clear the interval
            clearInterval(timer);
            //restart the game
            createGameBoard();
        }
 }, 1000)
}

function checkScore() {
    const allTiles = [...document.querySelectorAll(".tile")];
    const tileValues = allTiles.map((t) => t.dataset.value || "");
    console.log("~checkScore ~tileValues:", tileValues);
    // check if any winning combo is achieved
    winningCombos.forEach(combo => {
        const [a, b, c] = combo;
        if (tileValues[a] && tileValues[a] === tileValues[b] &&
             tileValues[a] === tileValues[c]) {
            info.textContent = `${tileValues[a]} wins!`;
            // const jsConfetti = new JSConfetti();
            // jsConfetti.addConfetti({
            //     emojis:["🥳","🎉","🎊", "👏"],
            // });
            setTimeout(restartGame, 1000)
            document.documentElement.style.setProperty("--hue",turn === "X" ? 10 : 200);
        }
    });
    turn = turn === "X" ? "O" : "X";
}



function handleGameboardClick(e) {
    const valueExists = e.target.dataset.value;
    if (!valueExists) {
        e.target.dataset.value = turn;
        e.target.style.setProperty("--hue", turn === "X" ? 10 : 200);
        checkScore();
        if (info.textContent.includes("wins")) {
            gameBoard.removeEventListener("click", handleGameboardClick); // stop the game after win
        } else {
            info.textContent = `${turn}'s turn`;
        }

    }
    
}




