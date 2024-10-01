function createPlayer(name,mark){
    return {name,mark}
}
const module=(function (){
    let counter=0;
    const makeBoard=function(){
        let board=["","",""
            ,"","",""
            ,"","",""];
        const clickHandler=function(e){
            const addX=function(e){
                board[e.target.id]="X"
                counter++;
            }
            const addO=function(e){
                board[e.target.id]="O";
                counter++;
            }
            (counter %2 ==0) ? addX(e) : addO(e);
            displayController(game.board);
        }
        return {board,clickHandler}
    }
    const displayController= function(board){
        const boardGrids=document.querySelectorAll("#gameboard>div");
        let i=0;
        boardGrids.forEach((item)=>{
            item.textContent=board[i];
            i++;
        })
        if (checkWin(board)){
            (counter %2 ==0) ? alert(`player 2 wins`) : alert(`player 1 wins`)
        }
        else if (checkTie(board)){
            alert("it's a tie!")
        }
        
    }
    return {makeBoard,displayController}
});
const game=module.makeBoard();
// create players
// add handlers to the various buttons
//change alert to actual display
function checkWin(board){
    const winningCombinations=[
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6]
    ];

    for (let i of winningCombinations){
        const [a,b,c]=i;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];

    }}
}
function checkTie(board){
    let test=true;
    for (let i of board){
        test=test && i;
    };
     return (!test && !checkWin(board)) ? true : false;

}


