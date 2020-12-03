var problems = [
    new Problem("Which country has the Taj Mahal mausoleum?", ["India", "French", "Pakistan", "Canada"], "India"),
    new Problem("In which continent is the world’s longest river?", ["Asia", "Europe", "Africa", "Australia"], "Africa"),
    new Problem("What is the only major city located on two continents?", ["Marseille", "Istanbul", "Hamburg", "Mumbai"], "Istanbul"),
    new Problem("What is the official language of the Canadian province Quebec?", ["English", "French", "Spanish", "Hebrew"], "French"),
    new Problem("Which country has the most volcanoes?", ["Japan", "Indonesia", "Australia", "Canada"], "Indonesia"),
    new Problem('What country is called "Land of Fire and Ice"?', ["Russia", "Canada", "Greenland", "Iceland"], "Iceland"),
    new Problem("What river flows through Paris?", ["Seine", "Volga", "Main", "Thames"], "Seine"),
    new Problem("Havana is the capital of what country?", ["Spain", "Cuba", "Costa Rica", "Afganistan"], "Cuba"),
    new Problem("Which ocean is Bermuda in?", ["Atlantic", "Pacific", "Indian", "Southern"], "Atlantic"),
    new Problem("What is the highest mountain of Africa?", ["Kilimanjaro", "Kenya", "Everest", "Andes"], "Kilimanjaro"),
    new Problem("In which country is the worlds highest waterfall?", ["Canada", "America", "Venezuela", "Colombia"], "Venezuela"),
    new Problem("Which lake holds by far the largest volume of water in the UK?", ["Loch Ness", "Victoria", "Baikal", "Tangayika"], "Loch Ness"),
    new Problem("In which European city would you find the Spanish Steps?", ["Rome", "Paris", "Marseille", "Madrid"], "Rome"),
    new Problem("Which is the largest cave in the world?", ["Son Doong", "Mammoth", "Jewel", "Wind"], "Son Doong"),
    new Problem("What is the second largest country in the world, by area?", ["China", "Russia", "America", "Canada"], "Canada"),
    new Problem("Where would you find the Valley of the Kings?", ["Egypt", "Venezuela", "Italia", "China"], "Egypt"),
    new Problem("Which country is currently under the sea level?", ["Denmark", "Netherlands", "Norway", "Finland"], "Netherlands"),
    new Problem("Which Turkish city shares its name with a famous superhero?", ["Deadpool", "Shazam", "Flash", "Batman"], "Batman"),
    new Problem("What is the second longest river in the world?", ["Nile", "Mississippi", "Amazon", "Mekong"], "Amazon"),
    new Problem("Which is the largest capital city in the world (by population)?", ["Tokyo", "Beijing", "Washington", "New Delhi"], "Tokyo")
];

picked = [];
while(picked.length != 20){
    var pick = Math.floor(Math.random() * 100);
    if(!picked.includes(problems[pick]) && pick < 20){
        picked.push(problems[pick]);
    }
}

var quiz = new Quiz(picked);
var timer = 180;
var timeRemain = timer;




// --------Timer----------- // 
var idVar;


function myStopFunction() {
    clearInterval(idVar);

    document.getElementById("timer").innerHTML = '';
    document.getElementById("timeLeft").style.visibility = "hidden";
    if(timer == 0) timeRemain = "00:00";
    else {
        timeRemain -= timer;
        var minuteRemain = Math.floor(timeRemain / 60);
        if (minuteRemain / 10 < 1) minuteRemain = "0" + minuteRemain;
        var secondRemain = timeRemain % 60;
        if (secondRemain / 10 < 1) secondRemain = "0" + (secondRemain - 2);
        document.getElementById('timeResult').innerHTML = minuteRemain + ":" + secondRemain;
    }
    
}

function moveTo(value) {
    if (value === "next") 
    {
        quiz.index++;
    } 
    else if (value == "back"){
        quiz.index--;   
    } 
    else {
        quiz.index = parseInt(value);
    }
    quiz.reset();
    quiz.update();
    quiz.show();
}

function showStats(){
    
    document.getElementById("container").innerHTML =
        `<div id="mainContain">
            <p id="font"><b>Your Result</b></p>
            <div id="link">
                <a class="rank" style="text-decoration: none; text-align:center;" href=""><b>Your Ranking</b></a>
            </div>
            <div id="score">
                <h1 id="text"><b>YOUR SCORE</b></h1>
                <div id="scoreBoard"></div>
            </div>

            <div class="timeResult">
                <b style="float: left; margin-left: 80px;">Time</b>
                <div id="timeResult"></div>
            </div>
        </div>`;

    document.getElementById('scoreBoard').innerHTML = quiz.score + "/" + quiz.problems.length;
    myStopFunction();
}

/* ------------------- */

// --------------------------- //

var modal = document.getElementById("myModal");
var button = document.getElementById("myButton");
var close = document.getElementsByClassName("close")[0];

button.onclick = function() {
    modal.style.display = "block";
    pressEnter();
}

close.onclick = function() {
    modal.style.display = "none";
    getStarted();
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function pressEnter(){
    var input = document.getElementById("nameInput");
    input.addEventListener("keyup", function(event){
        if (event.keyCode == 13){
            event.preventDefault();
            document.getElementById("close").click();
        }
    });
}

/* ----------------- */

function getStarted(){
    quiz.userName = document.getElementById("nameInput").value;
    var element = document.getElementById("userName");
    element.innerHTML = "Welcome " + quiz.userName;

    document.getElementById("getName").style.display = "none";
    document.getElementById("qFrame").style.display = "inline-block";
    document.getElementById("questionNavigator").style.display = "inline-block";
    console.log(quiz.userName);
    quiz.show();
    idVar = setInterval(() => {
        if (timer >= 0){
            var minute = Math.floor(timer / 60);
            if (minute / 10 < 1) minute = "0" + minute;
            var second = timer % 60;
            if (second / 10 < 1) second = "0" + second;
            document.getElementById("timer").innerHTML = minute + ":" + second;
            timer -= 1;
        }
        else {
            showStats();
            myStopFunction();
        }
    }, 1000);
}

