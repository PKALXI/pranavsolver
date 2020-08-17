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

async function writeTitle(){
    var title = 'Welcome to Pranav Solver!';

    for(var i = 1; i < title.length;i++){
        document.getElementById("Title").innerHTML  = title.substring(0, i);
        await new Promise(r => setTimeout(r, 100));
    }

    document.getElementById("loader").style.display = "none";
    document.getElementById("button").style.display = "block";
}