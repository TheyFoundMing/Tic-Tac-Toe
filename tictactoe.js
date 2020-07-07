
function Player (name, marker) {
    return {name, marker};
}

const GameBoard = (function () {

    let gameBoard = document.querySelector('#gameboard');

    let playerOne = Player('Mika', 'X');
    let playerTwo = Player('Steven', 'O');
    let currentTurn = 'X';
    let currentArray;

    let winner;

    function changeTurn() {
        currentTurn = (currentTurn == 'X') ? 'O' : 'X';
    }

    function newGame() {
        console.log('Starting new round!');
        gameBoard.innerHTML = '';

        let arrayAll = [];

        for (let i=0; i<3; i++) {
            arrayAll.push(['', '', '']);
        }

        currentArray = arrayAll;
        render();
    }

    function render() {
        for (let y=0; y<3; y++) {       // y column
            for (let x=0; x<3; x++) {       // x row
                let box = document.createElement('div');
                box.classList.add('box');
                box.classList.add(`${y}${x}`);
                box.addEventListener('click', pick);
                gameBoard.appendChild(box);
            }
        }

    }

    function pick (e) {
        let classes = e.target.classList;
        let position = classes.item(classes.length -1).split('');
        let x = position.pop();
        let y = position.pop();        

        currentArray[y][x] = currentTurn;
        e.target.innerText = currentTurn;
        e.target.removeEventListener('click', pick);

        checkWinner();
        changeTurn();
    }

    function checkWinner() {

        console.log(currentArray);

        for (let i=0; i<3; i++) {
            // if (allSame(currentArray[i])) return gameWin();     // works 
            console.log(`${currentArray[0][i]},${currentArray[1][i]},${currentArray[2][i]}`)
            if (allSame(currentArray[0][i], currentArray[1][i], currentArray[2][i])) return gameWin();
        }

        // if (allSame(currentArray[0][0], currentArray[1][1], currentArray[2][2])) return gameWin();
        // if (allSame(currentArray[0][2], currentArray[1][1], currentArray[2][0])) return gameWin();
    }

    function allSame(list) {
        console.log(list);

        // if (list.includes('')) return false;

        if (list[0] == list[1] && list[1] == list[2]) {
            winner = list[0];
            return true;
        }

        return false; 
    }

    function hasMoves() {
        console.log(currentArray);
        for (let y=0; y<3; y++) {
           for (let x=0; x<3; x++) {
            if (currentArray[y][x] === '') return true;
           }
        }
        return false;
    }

    function gameWin() {
        let boxes = document.querySelectorAll('.box');
        boxes.forEach(box => box.removeEventListener('click', pick))
        console.log(`Congrats, you won!`);
    }

    function gameTie() {
        console.log(`Congrats, you won!`);

    }

    return { newGame, allSame, hasMoves }

})()

GameBoard.newGame()
document.querySelector('#new-game').addEventListener('click', GameBoard.newGame);
