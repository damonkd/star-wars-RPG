$(document).ready(function(){


var attacker ="";
var attackerIndex;
var defender ="";
var defenderIndex;
var defeatedCounter = 0;
var names = [];
var availableFlag = 0;



// constructor for a generic player
function Player(name, health, base, attack, counterAttack, image) {
    this.name = name;
    this.health = health;
    this.base = base;
    this.attack = attack;
    this.counterAttack = counterAttack;
    this.image = image;
    //attack method
    this.fight = function(t){
        t -= this.attack;
        this.attack += base;
        return t;
    }
   //counter attack method
    this.defend = function(x){
        x -= counterAttack;
        return x;
    }
  }


  
  //add 4 player objects
  var luke= new Player("Luke Skywalker", 150, 10, 10, 11, "assets/images/luke.jpg");
  var han= new Player("Han Solo", 120, 8, 8, 9, "assets/images/han.jpg");
  var jar= new Player("Jar Jar Binx", 100, 10, 10, 18, "assets/images/jar.jpg");
  var jabba = new Player("Jabba the Hut", 200, 8, 8, 9, "assets/images/jabba.jpg" );

  var names = [han,luke,jar,jabba];
  //console.log(names[0].name);
    
  //initiales game
function refresh(){
  
  availableFlag = 0;
  defeatedCounter = 0;
  $(".you").hide();
  $(".toAttack").hide();
  $(".defender").hide();
  $(".defender").hide();
  $("#restart").hide();
  $(".choose-button").show();
  $("#gameTitle").show();
  
  luke.health = 150;
  luke.attack = 10;

  han.health = 120;
  han.attack = 8;

  jar.health = 100;
  jar.attack = 10;

  jabba.health = 200;
  jabba.attack = 8;

    $("#message").text("");
    $("#messageb").text("");

    $("#lukeDefend").text(luke.health + " HP");
    $("#hanDefend").text(han.health + " HP");
    $("#jarDefend").text(jar.health + " HP");
    $("#jabbaDefend").text(jabba.health + " HP");
    
    $("#lukeAttack").text(luke.health + " HP");
    $("#hanAttack").text(han.health + " HP");
    $("#jarAttack").text(jar.health + " HP");
    $("#jabbaAttack").text(jabba.health + " HP");
    }
refresh();


//choose attacker
$(".choose-button").on("click", function(){

    //console.log(attacker);
    attacker = $(this).attr("data-value");
    //console.log(attacker);
    for(var i = 0; i < names.length; i++){
        if(names[i].name == attacker){
            attackerIndex = i;
        }
    }
    //console.log(attackerIndex);
   
    //show your charactor
    if(attackerIndex==0){
        $("#youhan").show();
    }

    if(attackerIndex==1){
        $("#youluke").show();
    }

    if(attackerIndex==2){
        $("#youjar").show();
    }
    
    if(attackerIndex==3){
        $("#youjabba").show();
    }
    $(".choose-button").hide();

    
    //show charactors left
    if(attackerIndex!=0){
        $("#defendhan").show();
    }

    if(attackerIndex!=1){
        $("#defendluke").show();
    }

    if(attackerIndex!=2){
        $("#defendjar").show();
    }
    
    if(attackerIndex!=3){
        $("#defendjabba").show();
    }
    
    //hide charactors to choose from  and gme title
    $(".choose-button").hide();
    $("#gameTitle").hide();

});


//choose defender
$(".toAttack").on("click", function(){

if(availableFlag==0){

    defender = $(this).attr("data-value");
    for(var i = 0 ; i < names.length; i++){
        if(names[i].name == defender){
            defenderIndex = i;
        }
    }
    console.log(defenderIndex);
    
    //show defender
    if(defenderIndex==0){
        $("#endhan").show();
    }

    if(defenderIndex==1){
        $("#endluke").show();
    }

    if(defenderIndex==2){
        $("#endjar").show();
    }
    
    if(defenderIndex==3){
        $("#endjabba").show();
    }
    
    //hide chosen
    if(defenderIndex==0){
        $("#defendhan").hide();
    }

    if(defenderIndex==1){
        $("#defendluke").hide();
    }

    if(defenderIndex==2){
        $("#defendjar").hide();
    }
    
    if(defenderIndex==3){
        $("#defendjabba").hide();
    }
                //end if statement
                }
    availableFlag++;
//end click event funtion
}); 

$("#fightBtn").on("click", function(){

if(names[defenderIndex].health > 0 && names[attackerIndex].health > 0){

if(defenderIndex!=null && attackerIndex!=null){
    //alert("you clicked me");
    $("#message").text(names[attackerIndex].name + " attacked " + names[defenderIndex].name + " for " + names[attackerIndex].attack) + " damage.";
    $("#messageb").text(names[defenderIndex].name + " counter attacked " + names[attackerIndex].name + " for " + names[defenderIndex].counterAttack) + " damage.";
    names[defenderIndex].health = names[attackerIndex].fight(names[defenderIndex].health);
    
    names[attackerIndex].health = names[defenderIndex].defend(names[attackerIndex].health);
    console.log(names[attackerIndex]);
    console.log(names[defenderIndex]);
    // refresh HP
    $("#lukeDefend").text(luke.health + " HP");
    $("#hanDefend").text(han.health + " HP");
    $("#jarDefend").text(jar.health + " HP");
    $("#jabbaDefend").text(jabba.health + " HP");
    
    $("#lukeAttack").text(luke.health + " HP");
    $("#hanAttack").text(han.health + " HP");
    $("#jarAttack").text(jar.health + " HP");
    $("#jabbaAttack").text(jabba.health + " HP");
}
//enemy defeated choose another
if(names[defenderIndex].health <= 0){
    $("#message").text(names[defenderIndex].name + " defeated")
    $("#messageb").text("choose another enemy")
    $(".defender").hide();
    defeatedCounter++;
    availableFlag = 0;
    }
    //game won
    if(defeatedCounter == 3){
    $("#message").text("You won!");
    $("#messageb").text("press restart to play again");
    $("#restart").show();
    }
    //game lost
    if(names[attackerIndex].health <= 0){
        $("#message").text("You lost!");
        $("#messageb").text("press restart to play again");
        $("#restart").show();
    }

}
    //end click event
}); 

// on click run refresh
$("#restartBtn").on("click", function(){
refresh();
}); 
// basic attack and counter attack function
//luke.health = han.fight(luke.health);
//han.health = luke.defend(han.health);

//jar.health = jabba.fight(jar.health)
//jabba.health = jar.defend(jabba.health)

//console.log(attacker.name);
//console.log(luke);
//console.log(jar);
//console.log(jabba);


//dynamically displays remaining players to fight
function toAttack(){
    for(var j=0; j < names.length; j++){
        if(j != attackerIndex){
        var letterBtn = $("<button>");
        letterBtn.addClass("toFight-button");
        letterBtn.attr("value", names[j].name);
        letterBtn.text(names[j].name);
        //console.log(j);
        //console.log(attackerIndex);
        //console.log(names[j].name);
        $("#toAttack").append(letterBtn);
    
    }
    }}


//doc ready close
});