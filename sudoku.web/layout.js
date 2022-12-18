
const sudokuWrapper = document.querySelector('#sudoku-wrapper');
const squares = 9*9;

for(var i = 0; i<squares ; i++){
    const element = document.createElement("input");
    element.setAttribute('max','9');
    element.setAttribute('min','0');
    element.setAttribute('type','number');

    if( ((i%9==0 || i%9==1 || i%9==2) && i < 21) ||
        ((i%9==6 || i%9==7 || i%9==8) && i < 27) || 
        ((i%9==3 || i%9==4 || i%9==5) && (i > 27 && i < 53)) ||
        ((i%9==0 || i%9==1 || i%9==2) && i > 53) ||
        ((i%9==6 || i%9==7 || i%9==8) && i > 53)
     ){
        element.classList.add("odd");
    }

    sudokuWrapper.appendChild(element);
}

