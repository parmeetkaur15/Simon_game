 var start=false;
var color=["green","red","yellow","blue"];
var gameseq=[];
var userseq=[];
var level=0;
$(document).keypress(function()
{
    if(start===false)
    {
       
        $("h1").text("Level "+level);
        nextseq();
        start=true;
    }
   
});
function nextseq()
{
    userseq=[];
    level++;
    $("h1").text("Level "+level);
    var randomno = Math.floor(Math.random()*4);
    var randomclr=color[randomno];
    gameseq.push(randomclr);
    $("#"+randomclr).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomclr);

}
function playsound(nameclr)
{
    var audio = new Audio("sounds/" + nameclr + ".mp3");
    audio.play();
}
$(".grid").click(function() {
    var chooseclr=$(this).attr("id");
    userseq.push(chooseclr);
    playsound(chooseclr);
    animatepress(chooseclr);
    checkseq(userseq.length-1);
});
function checkseq(currentlevel)
{
    if(gameseq[currentlevel]===userseq[currentlevel])
    {
        if(gameseq.length===userseq.length)
        {
            setTimeout(function() {
                nextseq();
            },1000);
        }
    }
    else{
        playsound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over,Press any key to restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        startover();
    }
}
function startover()
{
    level=0;
    gameseq=[];
    start=false;
}
function animatepress(chooseclr)
{
    $("#"+chooseclr).addClass("pressed");
    setTimeout(function() {
    $("#"+chooseclr).removeClass("pressed");
    },100);
}