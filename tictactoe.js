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

    const printBoard= ()=>{     //used in console version
        for(let cell of gameArr)
            console.log(cell.join(" | "));
    };

    const clearBoard= ()=>{
        gameArr=[];
        gridCols.forEach((cell)=>{
            cell.textContent="";
        });
        createBoard();
    };

    //const setValue= (a, b, player)=>{ careful about what to remove
    const setValue= (e, player)=>{
        /*console.log("Col id: " + e.target.id);
        console.log("Row id: " + e.currentTarget.id);*/
        /*console.log("typeof a "+typeof(a));
        console.log("a: "+a);*/
        //if(gameArr[a][b]!=" "){
        let row=parseInt(e.currentTarget.id[3]);
        let col=parseInt(e.target.id[3]);
        //console.log("Row: "+row+"; col: "+col);
        if(gameArr[row][col]!=" "){
            //console.log("Cell already full!");

            e.target.classList.add("wrongCell");
            setTimeout(() => {
                e.target.classList.remove("wrongCell");
            }, 200);

            return false;
        }
        gameArr[row][col]=player;
        e.target.textContent=player;
        return true;
    };

    const isFull= ()=> {
        //console.log("isFull.");

        return gameArr.every((row)=>row.every((cell)=>cell!=" "));
    };

    const getGameArr= ()=>{ return gameArr; };

    return {createBoard, printBoard, clearBoard, setValue, isFull, getGameArr};
}

function Players(){
    let players=[];
    let activePlayer/*=null*/;
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

    //const incrementVictories= (id)=>players[id].victories++;
    const incrementVictories= (id)=>{
        players[id].victories++;
        if(id===0) victoriesX.textContent=parseInt(victoriesX.textContent)+1;
        else victoriesO.textContent=parseInt(victoriesO.textContent)+1;
        //console.log("Inside incrementVictories");
    }

    const getVictories= (value)=>{  //clean maybe
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
        if(currentPlayerDisplay.textContent!="") currentPlayerDisplay.textContent=activePlayer.value;
    }

    return {createPlayers, changePlayer, currentPlayer, incrementVictories, getVictories, resetVictories, resetPlayer};
}

function Game(gameboard, players){
    let winner="";
    //const gameArr=gameboard.getGameArr;

    const newGame= (isStart)=>{    //remove event listener; change back button; hide status
        gridRows.forEach((row) =>{
            row.removeEventListener("click", gridInterface);
        });
        gameStart.textContent="Start game";
        currentPlayerDisplay.style.visibility="hidden";
        currentPlayerRow.style.visibility="hidden";

        players.resetVictories();
        victoriesX.textContent=0;
        victoriesO.textContent=0;
        drawsCount.textContent=0
        newBoard();
    };

    const newBoard= ()=>{
        winner="";
        gameboard.clearBoard();
        players.resetPlayer();
        gameState.currentPlayer="X";

        //gameboard.printBoard();
    }

    const checkDraw= ()=>{
        /*console.log("checkDraw.");
        console.log("gameboard.isFull: "+gameboard.isFull());
        console.log("winner status: "+winner);*/

        if(gameboard.isFull() && winner===""){
            //console.log("It's a draw!");
            drawsCount.textContent=parseInt(drawsCount.textContent)+1;

            currentPlayerDisplay.style.visibility="hidden";
            playerRowText.textContent="It's a draw!";

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
                //console.log("X wins!");
                players.incrementVictories(0);
                //playerRowText.textContent="&nbsp;wins!";
                playerRowText.innerHTML="&nbsp;wins!";
                winner="";
                return true;
            case "O":
                //console.log("O wins!");
                players.incrementVictories(1);
                //playerRowText.textContent=" wins!";
                playerRowText.innerHTML="&nbsp;wins!";
                winner="";
                return true;
        }
    };

    /*  *Previous console based game*
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
    */

    let gameState={
        valid: undefined,
        currentPlayer: "",
        isOver: false
    };

    const startGame= ()=>{
        gameStart.textContent="Reset board";
        newBoard();
        gameState.currentPlayer = players.currentPlayer().value;
        currentPlayerDisplay.textContent = gameState.currentPlayer;
        currentPlayerDisplay.style.visibility="visible";
        playerRowText.textContent="'s turn";
        currentPlayerRow.style.visibility="visible";
        gridRows.forEach((row) => {
            row.addEventListener("click", gridInterface);
        });
    };

    function gridInterface(e){
        if (e.target.classList.contains("cells")) {
            //e.target indicates column, e.currentTarget indicates row
            //gameState.valid=gameboard.setValue(parseInt(e.currentTarget.id[3]), parseInt(e.target.id[3]), gameState.currentPlayer);
            gameState.valid=gameboard.setValue(e, gameState.currentPlayer);

            //if(gameState.valid) e.target.textContent=gameState.currentPlayer;
            //handleMove(); unified here

            if(gameState.valid){
                gameState.isOver=checkWinner(gameboard.getGameArr());
                //if(gameState.isOver) return;
                if(gameState.isOver) {
                    gridRows.forEach((row) =>{
                        row.removeEventListener("click", gridInterface);
                    });
                    return;
                }
                if(!gameState.isOver) gameState.isOver=checkDraw(gameboard.getGameArr());
                if(gameState.isOver) {
                    gridRows.forEach((row) =>{
                        row.removeEventListener("click", gridInterface);
                    });
                    return;
                }
                players.changePlayer();
                gameState.currentPlayer=players.currentPlayer().value;
                currentPlayerDisplay.textContent = gameState.currentPlayer;
            }
        }
    }

    /*function handleMove(){    //unified, to remove
        if(gameState.valid){
            //console.log("valid is valid");

            //gameboard.printBoard();
            gameState.isOver=checkWinner(gameboard.getGameArr());
            if(!gameState.isOver) gameState.isOver=checkDraw(gameboard.getGameArr());
            if(gameState.isOver) {
                gridRows.forEach((row) =>{
                    row.removeEventListener("click", gridInterface);
                    return;
                });
            }
            players.changePlayer();
            gameState.currentPlayer=players.currentPlayer().value;
            currentPlayerDisplay.textContent = gameState.currentPlayer;
            //console.log("Player changed. value: "+gameState.currentPlayer);
            //if(gameState.valid && !gameState.isOver) startGame(); //change method
            //or else it should repeat without changes to gameboard and players V
        }
    }*/

    /*const getWinner= ()=>{ //for testing only, do not include
        return winner;
    };*/

    return {newGame, newBoard, startGame, checkDraw, checkWinner/*, getWinner*/};
}

const victoriesX=document.querySelector(".playerTotals #X .count");
const drawsCount=document.querySelector(".playerTotals #draws .count");
const victoriesO=document.querySelector(".playerTotals #O .count");

const currentPlayerRow=document.querySelector(".currentPlayerRow");
const currentPlayerDisplay=document.getElementById("currentPlayer");
const playerRowText=document.getElementById("playerRowText");

const gridRows=document.querySelectorAll(".rows");
const gridCols=document.querySelectorAll(".cells");

const gameboard=Gameboard();
const players=Players();

const gameStart=document.getElementById("gameStart");
gameStart.onclick= ()=>game.startGame();
/*const boardReset=document.getElementById("boardReset");
boardReset.onclick= ()=>game.newBoard();*/
const gameReset=document.getElementById("gameReset");
gameReset.onclick= ()=>game.newGame()

gameboard.createBoard();
players.createPlayers();
const game=Game(gameboard, players);
game.newGame(true);
/*
const gameStart=document.getElementById("gameStart");
gameStart.onclick= ()=>game.startGame();
/*const boardReset=document.getElementById("boardReset");
boardReset.onclick= ()=>game.newBoard();*/  /*
const gameReset=document.getElementById("gameReset");
gameReset.onclick= ()=>game.newGame();
*/