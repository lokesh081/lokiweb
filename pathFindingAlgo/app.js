
var canvas = document.getElementById('main');
var blockSize = 25;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var container = document.getElementsByClassName('container');
//console.log(container);
var rows = Math.round(container[0].getBoundingClientRect().height/blockSize)    ;
var cols = Math.round(container[0].getBoundingClientRect().width/blockSize);
var startNode = false;
var endnode = false; 
var grid = new Array(rows);
var openSet = [];
var closedSet = [];
var path = [];
var start = undefined;
var end = undefined;
console.log(rows);



window.onload = function(){
   init();
   CreateCanvas();

   setInterval(setContent,100);
}

function setContent(){

    var Cbox = document.getElementById('contentBox');

    if(startNode){
        Cbox.innerHTML = "Select your End Node";
    }

    if(endnode){
        Cbox.innerHTML = "Draw walls";
    }

}

function CreateCanvas(){

let start = null
let end = null
let move = null
let isHold = false

    for(var i=0; i < rows; i++){

        var RowDiv = document.createElement('div');
        RowDiv.className = `row row${i}`;
       // console.log(i);
    
        for(var j=0; j < cols; j++){
    
            var ColDiv = document.createElement('div');
            ColDiv.className = 'col';
            ColDiv.setAttribute("data-i", i);
            ColDiv.setAttribute("data-j", j);
            ColDiv.setAttribute("data-path", '_');
            ColDiv.setAttribute("onclick", "setNode(this)");
            RowDiv.appendChild(ColDiv);
          //  console.log(j);
        }
        canvas.appendChild(RowDiv);
    }


    document.addEventListener('mousedown', e => {
        isHold = true
        start = e
    })
    document.addEventListener('mouseup', e => {
        isHold = false
        end = e
        console.log({start, end, move})
    })
    document.addEventListener('mousemove', e => {
        if (isHold) {

            var x = Math.round((e.clientX - container[0].getBoundingClientRect().x)/blockSize) - 1;
            var y = Math.round((e.clientY - container[0].getBoundingClientRect().y)/blockSize) - 1;

            if((x >= 0 && y >= 0) && (x < cols && y <= rows) && startNode && endnode){

                var element = document.querySelector(`[data-i="${y}"][data-j="${x}"]`);

                if(!element.className.includes('obstacle')){
                    element.classList.add('obstacle');
                    console.log(x,y);
                }  
            }
            
        }
    })
    
}

function setNode(element){
    //console.log(element);

    

    if(!endnode){
        if(startNode){
            element.setAttribute('id','endnode');
            element.setAttribute("data-path", 'x');
            endnode = true;
        }else{
            element.setAttribute('id','startnode');
            element.setAttribute("data-path", '0');
            startNode = true;
        }
    }   
}

async function Gclear(){
    console.log('clear');
    startNode = false;
    endnode = false;
    openSet = [];
    closedSet=[];
    var Cbox = document.getElementById('contentBox');

    Cbox.innerHTML = 'Select your Start node';

    canvas.innerHTML = '';

    init();
    CreateCanvas();
    

    
}

async function getPath(){

    console.log('gpath');
    var solve = [];
    var d = 0;
    var rows = document.getElementsByClassName('row');
    var startEle = document.getElementById('startnode');
    var endEle = document.getElementById('endnode');
    var obstacles = document.querySelectorAll('.obstacle');

    for(var i=0; i<rows.length; i++){
        var row = [];
        for(var j=0; j<rows[i].children.length; j++){
            var value = rows[i].children[j].getAttribute('data-path');
            row.push(value);
        }
        solve.push(row);
    }
    
    obstacles.forEach((element)=>{
        this.x = element.getAttribute('data-i');
        this.y = element.getAttribute('data-j');

        grid[this.x][this.y].wall = true;
    });

    for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid[i].length; j++){
            if(!grid[i][j].wall){
                grid[i][j].CheckDiagnalWall();
            }
        }
    }

   console.log(grid);
   await AstarAlgo(grid[startEle.getAttribute('data-i')][startEle.getAttribute('data-j')],grid[endEle.getAttribute('data-i')][endEle.getAttribute('data-j')]);

   

    
}

function Spot(i,j){

    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.wall = false;
    this.diagonal = true;
    this.previous = undefined;
    this.neighbours = new Array();
    

    function show(){
        var ele = document.querySelector(`[data-i=${i}][data-j=${j}]`);
        ele.className += ' show';
    }

    this.getNeighbours  = function(){

        if(j > 0){
            this.neighbours.push(grid[i][j-1]);
        }
        if(j < cols-1){
            this.neighbours.push(grid[i][j+1]);
        }
        if(i > 0){
            this.neighbours.push(grid[i-1][j]);
        }
        if(i < rows-1){
            this.neighbours.push(grid[i+1][j]);
        }

   

        //top left
        if(i > 0 && j > 0){
            this.neighbours.push(grid[i-1][j-1]);
        }
        //top right
        if(i > 0 && j < cols - 1){
            this.neighbours.push(grid[i-1][j+1]);
        }

        //bottom left
        if(i < rows -1 && j > 0){
            this.neighbours.push(grid[i+1][j-1]);
        }

        //bottom right
        if(i < rows -1 && j < cols - 1){
            this.neighbours.push(grid[i+1][j+1]);
        }
    

        
    }

    this.CheckDiagnalWall = function(){
        if(!this.wall){
            //top left

            if((i > 0 && j > 0) && (grid[i-1][j].wall && grid[i][j-1].wall)){
                grid[i-1][j-1].wall = true;
            }

            //top right

            if((i > 0 && j < cols - 1) && grid[i-1][j].wall && grid[i][j+1].wall ){
                grid[i-1][j+1].wall = true;
            }

            //bottom left

            if((i < rows -1 && j > 0) && (grid[i+1][j].wall && grid[i][j-1].wall)){
                grid[i+1][j-1].wall = true;
            }

            //bottom right

            if((i < rows -1 && j < cols - 1) && (grid[i][j+1].wall && grid[i+1][j].wall)){
                grid[i+1][j+1].wall = true;
            }

        }
    }
}

function init(){

    for(var i=0; i<grid.length; i++){ 
        grid[i] = new Array(cols);
    }

    for(var i=0; i<grid.length; i++){
        for(var j = 0;j<grid[i].length; j++){
            grid[i][j] = new Spot(i,j);
        }
    }


    for(var i=0; i<grid.length; i++){
        for(var j = 0;j<grid[i].length; j++){
            grid[i][j].getNeighbours();
        }
    }
    console.log(grid);
    //AstarAlgo();
}

async function AstarAlgo(start,end){

    this.start = start;
    this.end   = end; 

    openSet.push(start);

    while(openSet.length > 0){

        //console.log('working');
        var winner = 0;

        for(var i=0; i<openSet.length; i++){
            if(openSet[i].f < openSet[winner].f){
                winner = i;
            }
        }


        var current = openSet[winner];

        if(current == end ){

            return;
            console.log(path);
        }

        removeFromArray(openSet,current);
        closedSet.push(current);

        var neighbours = current.neighbours;

        for(var i=0; i<neighbours.length; i++){

            var neighbour = neighbours[i];
            
            if(!closedSet.includes(neighbours[i]) && !neighbour.wall){

                var tempG = current.g + 1;
                var betterPath = false;

                if(openSet.includes(neighbour)){

                    if(neighbour.g > tempG){
                        neighbour.g = tempG;
                        betterPath = true;
                    }
                   }else{
                    neighbour.g = tempG;
                    openSet.push(neighbour); 
                    betterPath = true;
                    //console.log(openSet);
                 }

                if(betterPath){

                     neighbour.h = heuristics(neighbour,end);
                     neighbour.f = neighbour.g + neighbour.h;
                     neighbour.previous = current;

                }
            }
        }


        //visuals...

        for(var i=0; i< openSet.length; i++){

            var curI = openSet[i].i;
            var curj = openSet[i].j;

            var element = document.querySelector(`[data-i="${curI}"][data-j="${curj}"]`);

            if(element.className.includes('openset')){
                continue;
            }else{
                element.className += ' openset';
            }
        }

        for(var i=0; i < closedSet.length; i++){

            var curI = closedSet[i].i;
            var curj = closedSet[i].j;

            var element = document.querySelector(`[data-i="${curI}"][data-j="${curj}"]`);

            if(element.className.includes('path')){
                element.className.replace('path',' ');
            }
            
            if(element.className.includes('closedSet')){

               continue;

            }else{

                element.className += ' closedSet';

            }
            

        }

        //pathh

            path = [];
            var temp = current;
            path.push(current);

            while(temp.previous){
                temp = temp.previous;
                path.push(temp);
            }

            for(var k =0; k < path.length; k++){

                var i = path[k].i;
                var j = path[k].j;
        
                var element = document.querySelector(`[data-i="${i}"][data-j="${j}"]`); 
                element.className = 'col path';
        
            }


        await wait();

    }


    //visuals
        //console.log(openSet);
        //console.log(closedSet);



    
    
}

function removeFromArray(openSet,current){
    for(var i=0; i<openSet.length; i++){
        if(openSet[i] == current){
            openSet.splice(i,1);
        }
    }
}

function heuristics(a,b){
    return (Math.sqrt(Math.pow((b.i - a.i),2) + Math.pow(( b.j - a.j),2)));
}

function wait() {
    return new Promise((resolve) => setTimeout(resolve,-500));
  }