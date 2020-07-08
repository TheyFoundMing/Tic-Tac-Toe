
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
        gameBoard.innerHTML = '';
        document.querySelector('#winner').innerText = '';
        currentTurn = 'X';

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
                box.classList.add('hover');
                box.classList.add(`${y}${x}`);
                box.addEventListener('click', pick);
                box.addEventListener('mouseover', hoverIn);
                box.addEventListener('mouseout', hoverOut);

                gameBoard.appendChild(box);
            }
        }

    }

    function pick (e) {
        let classes = e.target.classList;
        let position = classes.item(classes.length -1).split('');
        let x = position.pop();
        let y = position.pop();        

        classes.remove('hover');

        currentArray[y][x] = currentTurn;
        e.target.removeEventListener('click', pick);
        e.target.removeEventListener('mouseover', hoverIn);
        e.target.removeEventListener('mouseout', hoverOut);

        e.target.innerText = currentTurn;

        checkWinner();
        changeTurn();
    }

    function checkWinner() {

        for (let i=0; i<3; i++) {
            if (allSame(currentArray[i])) return gameWin();     // works 
            if (allSame([currentArray[0][i], currentArray[1][i], currentArray[2][i]])) return gameWin();
        }

        if (allSame([currentArray[0][0], currentArray[1][1], currentArray[2][2]])) return gameWin();
        if (allSame([currentArray[0][2], currentArray[1][1], currentArray[2][0]])) return gameWin();

        if (!hasMoves()) {
            gameTie();
        }
    }

    function allSame(list) {
        // console.log(`what it gets ${list}`);

        if (list.includes('')) return false;

        if (list[0] == list[1] && list[1] == list[2]) {
            winner = list[0];
            return true;
        }

        return false; 
    }

    function hasMoves() {
        for (let y=0; y<3; y++) {
           for (let x=0; x<3; x++) {
            if (currentArray[y][x] === '') return true;
           }
        }
        return false;
    }

    function gameWin() {
        let results = document.querySelector('#winner');
        let boxes = document.querySelectorAll('.box');
        boxes.forEach(function(box) {
            box.removeEventListener('mouseover', hoverIn);
            box.removeEventListener('mouseout', hoverOut);
            box.removeEventListener('click', pick);
        })
        
        if (winner == 'X') {
            results.innerText = 'Player One wins!';
        } else {
            results.innerText = 'Player Two wins!';
        }

    }

    function gameTie() {
        let boxes = document.querySelectorAll('.box');
        boxes.forEach(function(box) {
            box.removeEventListener('mouseover', hoverIn);
            box.removeEventListener('mouseout', hoverOut);
            box.removeEventListener('click', pick);
        })

        document.querySelector('#winner').innerText = "It's a tie!";
    }

    function hoverIn(e) {
        e.target.innerText = currentTurn;
    }

    function hoverOut(e) {
        e.target.innerText = '';
    }

    return { newGame, allSame, hasMoves }

})()

GameBoard.newGame()
document.querySelector('#new-game').addEventListener('click', GameBoard.newGame);
