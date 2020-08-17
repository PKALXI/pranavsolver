var green = "#9bff99";
var red = "#f25f55";
var purple = "rgb(255, 140, 255)";
var blue = "#98d1fa";

var rows = 8;
var endId = 64;
var startId = 1;

// prevents right clicking
document.addEventListener('contextmenu', e => e.preventDefault());

//prevent inspect
document.onkeydown = function(e) {
  if(event.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}

function solveMaze() {
    var containsYellow = hasYellow();

    console.log(containsYellow);

    if(containsYellow){
      alert("This maze needs to be reset! Don't worry I'll reset the maze!");
      resetMaze();
      return "";
    }

    //create the matrix
    var maze = [];

    //create interval
    for(var i = 0; i < rows; i++){
      maze[i] = [0,0,0,0,0,0,0,0];
    }


    //fill it
    var count = 1;
    var oi = 0;
    var j = 0;
    for(var i = 1; i < 65; i++){
      //console.log(document.getElementById(i.toString()).style.backgroundColor);
      if(document.getElementById(i.toString()).style.backgroundColor != "rgb(155, 255, 153)"){
        maze[oi][j] = count;
      }else{
        maze[oi][j]= -1;
      }
      j++;
      if(j == 8){
        j = 0;
        oi++;
      }

      count++;
    }

    //print it
    console.log(maze);

    //possible moves
    var moves = [
      [-1,0],
      [1,0],
      [0,1],
      [0,-1]
    ];

    //create adjacency list
    var adjList = {};

    for(var row = 0; row < 8; row++){
      for(var col = 0; col < 8; col++){
        if(maze[row][col] == -1){
          console.log(true);
          continue;
        }

        var curNode = maze[row][col];
        var neighbours = [];

        for(var count = 0; count < 4; count++){
          var curMove = moves[count];
          var nRow = row + curMove[0];
          var nCol = col + curMove[1];

          if ((nRow >= 0 && nRow < maze.length) && (nCol >= 0 && nCol < maze[0].length)) {
            if (maze[nRow][nCol] != -1) {
              neighbours.push([nRow, nCol]);
            }//end of if checking if spot is not a wall
          }//end of if statement checking if spot is in bounds
        }

        adjList[curNode] = neighbours;
      }
    }

    //Breadth first search
    var visited = [];

    var prev = [];

    //setup visited
    for(var num = 0; num < (rows*rows); num++){
      visited[num] = [false,false,false,false,false,false,false,false];
    }

    for(var c = 0; c < (rows*rows); c++){
      prev.push(0);
    }

    var queue = [];


    queue.push([0,0]);

    var solved = false;

    while(queue.length > 0){
      var nodeCoor = queue.splice(0,1)[0];
      var node = maze[nodeCoor[0]][nodeCoor[1]];
      visited[nodeCoor[0]][nodeCoor[1]] = true;

      if(nodeCoor[0] == 7 && nodeCoor[1] == 7){
        solved = true;
        break;
      }

      var adj = adjList[node];

      for(var count = 0; count < adj.length; count++){
        var n = adj[count];
        if(!visited[n[0]][n[1]]){
          visited[n[0]][n[1]] = true;
          queue.push(n);
          prev[(maze[n[0]][n[1]])-1] = node-1;
        }
      }
    }

    if(!solved){
      alert("This maze is impossible! Don't worry I'll reset the maze!");
      resetMaze();
      return "";
    }

    //retrace steps
    var endNode = maze[7][7];

    document.getElementById(endNode.toString()).style.backgroundColor = "#98d1fa";
    var previous = endNode-1;
    var kunu = false;
    while(true){
      var node = prev[previous];
      try{
        document.getElementById((node+1).toString()).style.backgroundColor = "#98d1fa";
      }catch(err){
        kunu = true;
      }


      if(node == 0){
        kunu = true;
      }else{
        previous = node;
      }
      if(kunu){
        break;
      }
    }
    document.getElementById("1").style.backgroundColor = "#98d1fa";
}

function clicked(num){
  if(document.getElementById(num.toString()).style.backgroundColor== "white"){
    document.getElementById(num.toString()).style.backgroundColor = "#9bff99";
  }else{
    document.getElementById(num.toString()).style.backgroundColor = "white";
  }
}

function resetMaze(){
  document.getElementById("1").style.backgroundColor = "#f25f55";
  document.getElementById("64").style.backgroundColor = "#ff8cff";
  for(var i = 2; i < 64; i++){
    document.getElementById(i.toString()).style.backgroundColor = "white";
  }
}

function hasYellow(){
  for(var i = 1; i < 65; i++){
    if(document.getElementById(i.toString()).style.backgroundColor == "rgb(152, 209, 250)"){
      return true;
    }
  }
  return false;
}