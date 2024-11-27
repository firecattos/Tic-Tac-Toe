function Gameboard(){
    //const rows=3, columns=3;    //Defined just for ease of creating custom games if needed
    let gameArr=[];

    const createBoard = ()=>{
        for (let i = 0; i < 3; i++) {
            gameArr[i] = [];
            for (let j = 0; j < 3; j++) {
                //gameArr[i].push(Position());
                gameArr[i].push(" ");
            }
        }
        //console.log("Created grid");
    };

    const printBoard= ()=>{
        for(let cell of gameArr)
            console.log(cell.join(" | "));
    };

    const clearBoard= ()=>{
        gameArr=[];
        createBoard();
    };

    const setValue= (a, b, player)=>{
        if(gameArr[a][b]!=" "){
            //console.log("Cell already full!");
            return false;//call again for  (?)
        }
        gameArr[a][b]=player;
        return true;
    };

    const isFull= ()=> {
        //console.log("isFull.");

        return gameArr.every((row)=>row.every((cell)=>cell!=" "))
    };

    const getGameArr= ()=>{ return gameArr; };

    return {createBoard, printBoard, clearBoard, setValue, isFull, getGameArr};
}

function Players(){
    let players=[];
    let activePlayer=null;
    const createPlayers = () => {
        players = [
            {
                value: "X",
                victories: 0
            },
            {
                value: "O",
                victories: 0
            }
        ];
        activePlayer=players[0];
        //console.log("Players created.");
    };

    const changePlayer=()=>{
        if(activePlayer.value==="X") activePlayer=players[1];
        else if(activePlayer.value==="O") activePlayer=players[0];
        //else activePlayer=players[0];
    };

    const currentPlayer= ()=>{ return activePlayer; }

    const incrementVictories= (id)=>players[id].victories++;
    /*const incrementVictories= (id)=>{
        players[id].victories++;
        console.log("Inside incrementVictories");
    }*/

    const getVictories= (value)=>{
        if(value==="X") return players[0].victories;
        else if(value==="O") return players[1].victories;
    };

    const resetVictories= ()=>{
        players.forEach(function(player){
            player.victories=0;
        });
    };

    const resetPlayer= ()=>{
        activePlayer=null;
        createPlayers();
    }

    return {createPlayers, changePlayer, currentPlayer, incrementVictories, getVictories, resetVictories, resetPlayer};
}

function Game(gameboard, players){
    let winner="";
    //const gameArr=gameboard.getGameArr;

    const newGame= ()=>{
        players.resetVictories();
        newBoard();
    };

    const newBoard= ()=>{
        winner="";
        gameboard.clearBoard();
        players.resetPlayer();

        gameboard.printBoard();
    }

    const checkDraw= ()=>{
        /*console.log("checkDraw.");
        console.log("gameboard.isFull: "+gameboard.isFull());
        console.log("winner status: "+winner);*/

        if(gameboard.isFull() && winner===""){
            console.log("It's a draw!");
            return true;
        }
    };

    const checkWinner= (gameArr)=>{
        //console.log("checkWinner.");
        
        for(let rows=0; rows<3; rows++)    //Checks rows for a winner
            if(gameArr[rows][0]!=" " && gameArr[rows][0]===gameArr[rows][1] && gameArr[rows][1]===gameArr[rows][2]) winner=gameArr[rows][0];
        for(let cols=0; cols<3; cols++) //Check cols for a winner
            if(gameArr[0][cols]!=" " && gameArr[0][cols]===gameArr[1][cols] && gameArr[1][cols]===gameArr[2][cols]) winner=gameArr[0][cols];
        //Checks diagonals for a winner
        if(gameArr[0][0]!=" " && gameArr[0][0]===gameArr[1][1] && gameArr[1][1]===gameArr[2][2]) winner=gameArr[0][0];
        if(gameArr[0][2]!=" " && gameArr[0][2]===gameArr[1][1] && gameArr[1][1]===gameArr[2][0]) winner=gameArr[0][2];
        switch(winner){
            case "":
                return false;
            case "X":
                console.log("X wins!");
                players.incrementVictories(0);
                //console.log("Total X wins: "+players.getVictories("X"))
                winner="";
                return true;
            case "O":
                console.log("O wins!");
                players.incrementVictories(1);
                winner="";
                return true;
        }
    };

    const startGame= ()=>{
        let isOver=false;
        while(!isOver){
            let currentPlayer=players.currentPlayer().value;
            console.log(`${currentPlayer}'s turn.`);
            let row=takeInput("row");
            let col=takeInput("column");
            let valid=gameboard.setValue(row, col, currentPlayer);
            if(!valid){
                while(!valid){
                    console.log("Position already taken!");
                    row=takeInput("row");
                    col=takeInput("column");
                    valid=gameboard.setValue(row, col, currentPlayer);
                }
            }
            
            gameboard.printBoard();

            isOver=checkWinner(gameboard.getGameArr());
            if(!isOver) isOver=checkDraw(gameboard.getGameArr());
            //console.log("isOver value: "+isOver);
            players.changePlayer();
        }
    };

    function takeInput(sel){
        let inp=(parseInt(prompt(`Enter ${sel} number (1-3): `)))-1;
        while(inp<0 || inp>2 || isNaN(inp)) {
            inp=(parseInt(prompt("Invalid input, try again (1-3): ")))-1;
        }
        return inp;
    }

    /*const getWinner= ()=>{ //for testing only, do not include
        return winner;
    };*/

    return {newGame, newBoard, startGame, checkDraw, checkWinner/*, getWinner*/};
}

const gameboard=Gameboard();
const players=Players();

gameboard.createBoard();
players.createPlayers();
const game=Game(gameboard, players);
game.newGame();