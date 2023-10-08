function load(){

    populateTiles();
    
    document.getElementById("00").addEventListener("click", function() { move("00");}, null);
    document.getElementById("01").addEventListener("click", function() { move("01");}, null);
    document.getElementById("02").addEventListener("click", function() { move("02");}, null);
    document.getElementById("03").addEventListener("click", function() { move("03");}, null);
    document.getElementById("10").addEventListener("click", function() { move("10");}, null);
    document.getElementById("11").addEventListener("click", function() { move("11");}, null);
    document.getElementById("12").addEventListener("click", function() { move("12");}, null);
    document.getElementById("13").addEventListener("click", function() { move("13");}, null);
    document.getElementById("20").addEventListener("click", function() { move("20");}, null);
    document.getElementById("21").addEventListener("click", function() { move("21");}, null);
    document.getElementById("22").addEventListener("click", function() { move("22");}, null);
    document.getElementById("23").addEventListener("click", function() { move("23");}, null);
    document.getElementById("30").addEventListener("click", function() { move("30");}, null);
    document.getElementById("31").addEventListener("click", function() { move("31");}, null);
    document.getElementById("32").addEventListener("click", function() { move("32");}, null);
    document.getElementById("33").addEventListener("click", function() { move("33");}, null);
}

// function to set/remove locked/adjacent-empty classes from tiles surrounding the empty spot
function setAdjacent() {
    var oldAdjacentsCollection = document.getElementsByClassName("adjacent-empty");
    var oldAdjacents = Array.from(oldAdjacentsCollection);
    var adjacents;
    var tile;
    // clear existing adjacent tiles
    for (i = 0; i<oldAdjacents.length; i++) {
        oldAdjacents[i].classList.remove("adjacent-empty");
        oldAdjacents[i].classList.add("locked");
    }
    adjacents = findAdjacent();
    // set new adjacent tiles
    for (i=0; i<adjacents.length; i++) {
        tile = document.getElementById(adjacents[i]);
        tile.classList.remove("locked");
        tile.classList.add("adjacent-empty");
    }
}

function populateTiles() {
    var numbers = new Array(); // array for random integers
    var num;
    var skipIndex = Math.floor(Math.random() * 16 + 1); // choose empty tile
    var tiles = ["00", "01", "02", "03", "10", "11", "12", "13", 
                "20", "21", "22", "23", "30", "31", "32", "33"]; // ids of tiles

    document.getElementById("table-footer").innerText = "";
    document.getElementById("table-footer").removeEventListener("click", populateTiles);

    // populate numbers[] with integers 1-15 in a random order
    while (numbers.length < 15) {
        num = Math.floor(Math.random() * 15 + 1);
        if (!numbers.includes(num)){
            numbers.push(num);
        }
    }

    //testing
    //numbers = [15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    //skipIndex = 12;

    // populate tiles
    var currentTile;
    for (i=0; i<16; i++) {
        if (i != skipIndex) {
            num = numbers.pop()
            currentTile = document.getElementById(tiles[i]);

            //reset classes
            currentTile.classList.remove("empty");

            //occupied class
            currentTile.classList.add("occupied");
            currentTile.classList.add("locked");

            currentTile.innerText = num;  

        } else {
            currentTile = document.getElementById(tiles[i]);
            currentTile.classList.remove("occupied");
            currentTile.classList.remove("locked");
            currentTile.classList.add("empty");
            currentTile.innerText = "";
        }
    } 
    setAdjacent();
}

// find tiles adjacent to empty spot, return id's of adjacent tiles in an array
function findAdjacent() {
    
    var tiles = ["00", "01", "02", "03", "10", "11", "12", "13", "20", "21", 
                "22", "23", "30", "31", "32", "33"]; // ids of tiles

    skipTile = document.getElementsByClassName("empty")[0].getAttribute("id").toString();
    var potentialAdjacentTiles = new Array();
    var adjacentTiles = new Array();
    
    var row = parseInt(skipTile.charAt(0));
    var col = parseInt(skipTile.charAt(1));

    potentialAdjacentTiles[0] = (row + 1) + skipTile.charAt(1);
    potentialAdjacentTiles[1] = (row - 1) + skipTile.charAt(1);
    potentialAdjacentTiles[2] = skipTile.charAt(0) + (col + 1);
    potentialAdjacentTiles[3] = skipTile.charAt(0) + (col - 1);

    for (i=0; i<4; i++){
        if (tiles.includes(potentialAdjacentTiles[i])){
            adjacentTiles.push(potentialAdjacentTiles[i]);
        }
    }
    return adjacentTiles;
}

// swaps tile with emptyTile
function swap(tile, emptyTile) {
    emptyTile.innerText = tile.innerText;
    emptyTile.classList.remove("empty");
    emptyTile.classList.add("occupied");
    tile.innerText = "";
    tile.classList.remove("occupied");
    tile.classList.remove("locked");
    tile.classList.remove("adjacent-empty");
    tile.classList.add("empty");
    setAdjacent();
}

// event hander for button click
function move( id ) {
    var moveTile = document.getElementById(id);
    var emptyTile = document.getElementsByClassName("empty");

    if (!evaluate()) {  
        // game is ongoing, determine if move is legal
        if (moveTile.classList.contains("locked")) {
            document.getElementById("table-footer").innerText = "Illegal Move!";
        } else if  (moveTile.classList.contains("empty")) {
            document.getElementById("table-footer").innerText = "Click on the tile you would like to move.";
        } else if (moveTile.classList.contains("adjacent-empty")) {
            document.getElementById("table-footer").innerText = "";
            swap(moveTile, emptyTile[0]); // swap tiles
            if (evaluate()) {
                document.getElementById("table-footer").innerText = "Complete! Click here to play again!";
                document.getElementById("table-footer").addEventListener("click", populateTiles, null);
            }
        }
    }
}

// return true if game is complete
function evaluate() {
    var tiles = ["00", "01", "02", "03", "10", "11", "12", "13", "20", "21", 
                "22", "23", "30", "31", "32", "33"]; // ids of tiles

    // first check if bottom right is empty
    if (document.getElementById(tiles[tiles.length-1]).innerText != ""){
        return false;
    } else {
        for (i = 0; i<15; i++) { //check that all tiles are in sequential order
            if (document.getElementById(tiles[i]).innerText != i+1){
                return false;
            }
        }
        return true;
    }
}

//reuse note: get rid of locked/occupied. only adjacent and empty are needed