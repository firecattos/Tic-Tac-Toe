function Gameboard(){
    const rows=3, columns=3;    //Defined just for ease of creating custom games if needed
    let gameArr=[];

    const createBoard = ()=>{
        for (let i = 0; i < rows; i++) {
            gameArr[i] = [];
            for (let j = 0; j < columns; j++) {
                //gameArr[i].push(Position());
                gameArr[i].push("");
            }
        }
        console.log("Created grid");
    };

    const printBoard= ()=>{
        for(let cell of gameArr)
            console.log(cell.join(" | "));
    };

    const clearBoard= ()=>gameArr=[];

    const setValue= (a, b, player)=>{
        if(gameArr[a][b]!=""){
            console.log("Cell already full!");
            return;//call again for input
        }
        gameArr[a][b]=player.value;
    };

    const isFull= ()=> {return gameArr.every((row)=>row.every((cell)=>cell!=""))}; 

    return {createBoard, printBoard, clearBoard, setValue, isFull};
}

function Players(){
    const players=[
        {
            value:"X",
            victories:0
        },
        {
            value:"O",
            victories:0
        }
    ];
    let activePlayer="";

    const changePlayer=()=>{
        if(activePlayer.value==="X") activePlayer=players[1];
        else if(activePlayer.value==="O") activePlayer=players[0];
        else activePlayer=players[0];
    };

    const incrementVictories= (id)=>players[id].victories++;

    const getVictories= (value)=>{
        if(value==="X") return players[0].victories;
        else if(value==="O") return players[1].victories;
    };

    const resetVictories= ()=>{
        players.forEach(function(player){
            player.victories=0;
        });
    };

    return {changePlayer, incrementVictories, getVictories, resetVictories};
}

function Game(){
    let winner="";
    const checkDraw= ()=>{
        return (isFull() && winner==="");
    };

    const checkWinner= (gameArr)=>{
        for(let rows=0; rows<3; rows++)    //Checks rows for a winner
            if(gameArr[rows][0]!="" && gameArr[rows][0]===gameArr[rows][1] && gameArr[rows][1]===gameArr[rows][2]) winner=gameArr[rows][0];
        for(let cols=0; cols<3; cols++) //Check cols for a winner
            if(gameArr[0][cols]!="" && gameArr[0][cols]===gameArr[1][cols] && gameArr[1][cols]===gameArr[2][cols]) winner=gameArr[0][cols];
        //Checks diagonals for a winner
        if(gameArr[0][0]!="" && gameArr[0][0]===gameArr[1][1] && gameArr[1][1]===gameArr[2][2]) winner=gameArr[0][0];
        if(gameArr[0][2]!="" && gameArr[0][2]===gameArr[1][1] && gameArr[1][1]===gameArr[2][0]) winner=gameArr[0][2];
        switch(winner){
            case "":
                return;
            case "X":
                incrementVictories(0);
                winner="";
                return;
            case "O":
                incrementVictories(1);
                winner="";
                return;
        }
    };

    return {checkDraw, checkWinner};
}

const game=Gameboard();