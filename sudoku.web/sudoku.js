
const submitButton = document.getElementById("solve-button");
const inputArray = [];
var ptr = 0;

submitButton.addEventListener('click',getInput);

function getInput(){
    const inputElements = document.querySelectorAll('input');

    inputElements.forEach(input => {
        if(input.value){
           inputArray.push(parseInt(input.value));
        }else{
            inputArray.push(null);
        }
    });

    var input =  [];

    for(var i = 0; i < 9 ; i++){
        var array = [];
        for(var j = 0; j < 9 ; j++){
            array.push(inputArray[ptr]);
            ptr++;
        }
        input.push(array);
    }
   

  if(solve(input)){

    outputSolution(solve(input));
    var textElement = document.getElementById('text-box');
    textElement.innerHTML = 'Solved :)';

   }else{
    var textElement = document.getElementById('text-box');
    textElement.innerHTML = 'Enter a valid board!';

    console.log('not valid');
}

    
}

//core function

function solve(board){
   if(solved(board)){
    return board;
   }else{
    const posibilities = nextBoards(board);
    const validBoards = KeepValidBoards(posibilities);
    const solution    = searchForSolution(validBoards);
    return solution;
   }
}

function searchForSolution(validBoards){
    if(validBoards.length < 1){
        return false;
    }else{
        var first = validBoards.shift();
        const tryPath = solve(first);

        if(tryPath != false){
            return tryPath;
        }else{
           return searchForSolution(validBoards);
        }
    }
}

function solved(board){
    for(var row=0; row<board.length; row++){
        for(var col=0; col<board[row].length; col++){
            if(board[row][col] == null){
                return false;
            }
        }
    }
    return true;
}

function nextBoards(board){
    var sol = [];
    var firstEmpty = findFirstEmptySquare(board);//x,y
    var row = firstEmpty[0];
    var col = firstEmpty[1];
    if(firstEmpty != null){

        for(var i=1; i<=board.length; i++){
            var newBoard = [...board];
            var newRow = [...newBoard[row]];
            newRow[col] = i;
            newBoard[row] = newRow;
            sol.push(newBoard);
        }
        
    }
    return sol;
}

function findFirstEmptySquare(board){
    for(var row=0; row<board.length; row++){
        for(var col=0; col<board.length; col++){
            if(board[row][col] == null){
                return [row,col];
            }
        }
    }
}

function KeepValidBoards(boards){
    return boards.filter((b) => filterBoard(b));
}

function filterBoard(board){
    return rowGood(board) && colGood(board) && BoxGood(board);
}

function rowGood(board){   
    for(var row=0; row<board.length; row++){

        var res = [];

        for(var col=0; col<board.length; col++){
            if(res.includes(board[row][col])){
                return false;
            }else{
                if(board[row][col] != null){
                    res.push(board[row][col]);
                }
            }
        }
    }
    return true;
}

function colGood(board){   
    for(var col=0; col<board.length; col++){

        var res = [];

        for(var row=0; row<board.length; row++){
            if(res.includes(board[row][col])){
                return false;
            }else{
                if(board[row][col] != null){
                    res.push(board[row][col]);
                }
            }
        }
    }
    return true;
}

function BoxGood(board){
    const Boxcoordinates = [
        [0,0],[0,1],[0,2],
        [1,0],[1,1],[1,2],
        [2,0],[2,1],[2,2],
    ]

    for(var i=0; i<9; i += 3){
        for(var j=0; j<9; j += 3){
            var cur = [];
            for(var k=0; k<9; k++){
                var coordinates = [...Boxcoordinates[k]];
                coordinates[0] += i;
                coordinates[1] += j;

                if(cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false;
                }else{
                    if(board[coordinates[0]][coordinates[1]] != null){
                        cur.push(board[coordinates[0]][coordinates[1]]);
                    }
                }

            }
        }
    }
    return true;
}

function outputSolution(array){
    console.log(array);
    var ptr = 0;
    var inputElements = document.querySelectorAll('input');
    var outputArray = [];

    for(var i = 0 ; i < array.length ; i++){
        for(var j = 0 ; j < array[i].length ; j++){
            outputArray.push(array[i][j]);
        }
    }

    inputElements.forEach( input => {
        input.value = outputArray[ptr];
        ptr++;
    });
}




