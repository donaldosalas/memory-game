window.onload = function() {
console.log("hey!");
start();

};


// this callback will add an event listener to change the img.src value to its initial state
function initialImgState (tile) {
    tile.src = "http://images.akamai.steamusercontent.com/ugc/528381602051866207/1F1662D781042BF47C49EE359E1F4FF5A3025F1A/";
    tile.addEventListener("click", imgSrcChanger);

}

function allMatched (state) {
    var congrats = document.getElementsByTagName("h2");
    if(state) {
    congrats[0].innerText = "You matched them all!";
    congrats[0].style.color = "green";
    buttonReset(1);

    } else {
        congrats[0].innerText = "Memory Game!";
        congrats[0].style.color = "black";
    }
}

function scoreCount (state) {
    var score = document.getElementById("score");
    if (state) {
    score.innerText = "Score: "+ matchedTilesCount/2;
    } else {
        score.innerText = "Score: 0";
    }
}

var matchedTilesCount = 0;
var revealedTiles = [];

// this will check to see if the two revealed tiles match
function matchCheck (revealedTiles) {
    window.setTimeout(function() {
    var tile1 = revealedTiles[0];
        tile2 = revealedTiles[1];
        
    if(tile1.src === tile2.src) {
        matchedTilesCount += 2;
        scoreCount(1);
        revealedTiles.splice(0,2);
        if(matchedTilesCount === imgDistribution.length) {
            return allMatched(1);
        }
    }
    else {
        // set both tiles to initial state
        initialImgState(tile1);
        initialImgState(tile2);
        revealedTiles.splice(0,2);
    }
}, 300);
}



// this callback will change the img.src value  
function imgSrcChanger () {

    if(revealedTiles.length < 2) {
    this.src = imgDistribution[this.id];
        this.removeEventListener("click", imgSrcChanger);
        // push the id onto the revealedTiles if there are less than two elements
        revealedTiles.push(this);
    }
    if(revealedTiles.length === 2) {
            matchCheck(revealedTiles);

    }
    // this.addEventListener("click", initialImgState
    // );
}



var imgBucket = ["http://assets.nydailynews.com/polopoly_fs/1.1149155!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/baby-animals.jpg",
"http://funcrisp.com/wp-content/uploads/2015/04/download-high-definition-lovely-baby-animal-wallpapers-beautiful-pig-baby.jpg",
"http://ppcorn.com/us/wp-content/uploads/sites/14/2015/07/baby-kittens-baby-animals-19797164-1600-1200.jpg",
"https://myglobalpetfoods.files.wordpress.com/2014/04/gerbil.jpg",
"http://www.wallpaperlovely.com/wp-content/uploads/Animal-Sea-Animals-257824.jpg",
"http://ndl.mgccw.com/mu3/wallpaper/20140619/17/1403178294648/1479895.jpg",
"http://media1.santabanta.com/full1/Nature/Animals/animals-91a.jpg",
"http://images2.fanpop.com/image/photos/13100000/Black-Panther-animals-13128434-1280-800.jpg"
];

var imgDistribution = [];


function resetImages() {
    var images = document.getElementsByTagName("img");
    var i = 0;

    while(i < images.length) {
        images[i].src = "http://images.akamai.steamusercontent.com/ugc/528381602051866207/1F1662D781042BF47C49EE359E1F4FF5A3025F1A/";         
        i++;
    }
}

function buttonReset(state) {
    var button = document.getElementsByTagName("button");
    
    if(state) {
        button[0].innerText = "New Game?";
        button[0].classList.toggle("btn-success");
    }

    button[0].addEventListener("click", function() {
    imgDistribution.splice(0, imgDistribution.length);
    matchedTilesCount = 0;
    revealedTiles.splice(0, revealedTiles.length);
    resetImages();
    allMatched();
    scoreCount();
    start();
    button[0].innerText = "Reset";
    button[0].classList.remove("btn-success");
    });

}

function start() {    
    for(var j = 0; j <=1; j++) {
        imgBucket.forEach(function(element) {
            var randomNumIndex = Math.floor(Math.random()* (imgDistribution.length));
            imgDistribution.splice(randomNumIndex,0, element);
        });
    }

    var images = document.getElementsByTagName("img");
    var i = 0;

    while(i < images.length) {

        images[i].addEventListener("click", imgSrcChanger);
        images[i].id = i;         
        i++;
    }

    buttonReset();
}







