var bombLocations = [];
var size = 6;
var bombnumber = 6;
var stat = null;
var overScore =0;
var firstClick = true;
//This handles the order of creating elements
function go(){
    makeDiv("div1");
    reader();
    randomizer();
    makeGrid();
    
}

//Reads the size and number of bomb inputs
function reader(){
    size = document.getElementById("gsize").value;
    bombnumber = document.getElementById("bsize").value;
}

//Prints grid to page
function makeGrid(){
    for(y=0;y<size;y++){
        for(x=0;x<size;x++){
            //Makes #
            var a = document.createElement("a");
            var b = document.createTextNode("# ");
            a.appendChild(b);
            document.getElementById("div1").appendChild(a);
            a.setAttribute("onmousedown", "input(this ,"+x+","+y+",event)");
            
            //maskes spaces
            /**var space = document.createElement("a");
            var spacer = document.createTextNode(" ");
            space.appendChild(spacer);
            document.getElementById("div1").appendChild(space);**/
            
        }
        var d = document.createElement("br");
        document.getElementById("div1").appendChild(d);
    }
}

//Gets clicks
function input(a , x,  y, e){
    //window.alert(e);
    if(stat == null){
        if(e.button == 0){
    a.innerHTML=checkBombs(a,x,y);
    final();
        }else if(e.button == 2){
             a.innerHTML="? ";
        }
    }
}

//Creates bomb positions and puts them in bombLocations[]
function randomizer(){
    for(a=0;a<bombnumber;a++){
    var x = Math.random()* size;
    var y = Math.random()* size;
    x= Math.floor(x)
    y= Math.floor(y);
    for(var i=0;i < bombLocations.length;i++){
        if(bombLocations[i] == x && bombLocations[i+1] ==y){
            var x = Math.random()* size;
            var y = Math.random()* size;
            x= Math.floor(x)
            y= Math.floor(y);
        }
    }
    bombLocations.push(x);
    bombLocations.push(y);
    }
    checker();
}

//When element is clicked this descides what number should appear
function checkBombs(a1,x,y){
    var score = 0 ;
    for(var a=0;a<bombLocations.length;a+=2){
        var bombx = bombLocations[a];
        var bomby = bombLocations[a+1];
        if(bombLocations[a]==x && bombLocations[a+1]==y){
            if(firstClick == false){
            stat = false;
            return("X");
            }else{
                //if this is the first click and there is a bomb
                reroll(x,y, bombx,bomby);
                firstClick = false;
                bombx = bombLocations[a];
                bomby = bombLocations[a+1];
                checker();
                //window.alert("done");
            }
        }
        if((bombx == x+1 || bombx == x-1 || bombx == x) && (bomby == y+1 || bomby == y-1 || bomby == y)){
            
            score++;
        }
        
    }
    
    if(a1.innerHTML == "# " || a1.innerHTML == "? "){
        overScore++;
    }
    firstClick = false;
    return(score +  " ");
}

//checks to see if youve won or lost
function final(){
    if(overScore == (size * size) - bombnumber){
        stat = true;
    }
    if(stat == false){
       makeDiv("Loose1");
        makeText("Loose1", true);
    }else if(stat == true){
       makeDiv("Win1");
        makeText("Win1",false);
    }
    
}

//General purpose maker of divs
function makeDiv(a){
    var div1 = document.createElement("div");
    div1.setAttribute("id",a);
    div1.setAttribute("oncontextmenu", "return false;");
    document.body.appendChild(div1);
}

//This creates winning or loosing text
function makeText(a,n){
        var text = document.createElement("P");
    if(n){
    var words = document.createTextNode("OH NO! You found a bomb");
    }else{
        var words = document.createTextNode("You Win!");
    }
    text.appendChild(words);
    document.getElementById(a).appendChild(text);
}

//Called when a challange option is pressed
function load(g,b){
    document.getElementById("gsize").value=g;
    document.getElementById("bsize").value=b;
}

//called when go button is pressed
function reload(){
    reset();  
    go();
}

//resets global variables when game is reset
function reset(){
    if(stat == true){
        document.getElementById("Win1").remove();
    }else if(stat == false){
        document.getElementById("Loose1").remove();
    }
    firstClick = true;
    stat = null;
    overScore=0;
    document.getElementById("div1").remove();
    bombLocations.length=0;
}

//When the first move is a bomb this sets it to a number and reassigns that bomb's location
function reroll(x,y,bombx,bomby){
    for(var i=0; i < bombLocations.length;i+=2){
        if(bombx == bombLocations[i] && bomby == bombLocations[i+1]){
            bombLocations[i] = Math.floor(Math.random()* size);
            bombLocations[i+1] = Math.floor(Math.random()* size);
        }
    }
}

//checks if a bomb location is repeated
function checker(){
    var redone = false;
    for(var a =0; a<bombLocations.length;a+=2){
        for(var b=0;b<bombLocations.length;b+=2){
            if(bombLocations[a] == bombLocations[b] && bombLocations[a+1] == bombLocations[b+1] && a != b){
                redone = true;
                bombLocations[b] = Math.floor(Math.random()* size);
                bombLocations[b+1] = Math.floor(Math.random()* size);
                redone = true;
            }
        }
    }
    if(redone == true){
        checker();
    }
}
