<!DOCTYPE html>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="https://meyerweb.com/eric/tools/css/reset/reset.css">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&family=Roboto:wght@300&display=swap" rel="stylesheet">
        <link rel='stylesheet' type="text/css" href='style.css'>
    </head>

    <body>
        <div id='winner'></div>
        <div id='whole'>
            <div class='player'>
                PLAYER ONE
                <span class='marker'>X</span>
            </div>
    
            <div id='game'>
                <div id='gameboard'></div>
                <button id='new-game'>New Game</button>
            </div>
    
            <div class='player'>
                PLAYER TWO
                <span class='marker'>O</span>
            </div>
        </div>

        <script src="tictactoe.js"></script>
    </body>

</html>