const cells = document.querySelectorAll(".cell");
const statusMsg = document.querySelector("#statusMsg");
const restartButton = document.querySelector("#restartButton");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let cellFill = Array(9).fill("");
let currentPlayer = "X";
let running = false;

gameRules();

function gameRules(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusMsg.textContent = `It's ${currentPlayer}'s turn`;
    running = true;
    
}

function cellClicked(){
    const idIndex = this.getAttribute("idIndex");

    if(cellFill[idIndex] != "" || !running){
        return;
    }

    updateCell(this, idIndex);
    winCheck();
}

function updateCell(cell, index){
    cellFill[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusMsg.textContent = `It's ${currentPlayer}'s turn`;
}

function winCheck(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = cellFill[condition[0]];
        const cellB = cellFill[condition[1]];
        const cellC = cellFill[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusMsg.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!cellFill.includes("")){
        statusMsg.textContent = `It's a Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    cellFill = Array(9).fill("");
    statusMsg.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
