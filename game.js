var colors=[]
var pick_color=document.querySelectorAll(".color-pick");
var color_display=document.querySelector("h1");
var header=document.querySelector(".header");
var result=document.querySelector("#result");
var new_game=document.querySelector("#new_colors");
 //--------------
 //Wyznaczenie losowych wartości RGB
 function randomRGB(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
 }
 function randomColor(n){
    var arr=[];
    for(let i=0; i<n;i++){
        arr[i]=randomRGB();
    }
    return arr;
 }
 //wybor poziomu trudnosci
 var easy=document.querySelector("#easy");
 var hard=document.querySelector("#hard");
 var difficulty_level="hard";
 easy.addEventListener("click",function(){
    difficulty_level="easy";
    hard.classList.remove("level");
    easy.classList.add("level");
    start_game();
 })
 hard.addEventListener("click",function(){
    difficulty_level="hard";
    hard.classList.add("level");
    easy.classList.remove("level");
    start_game();
 })
 new_game.addEventListener("click",function(){
    start_game();
 });

 function start_game(){
    result.textContent="Pick color!";
    if (difficulty_level=="easy"){
        for(let i=3; i<pick_color.length;i++){
            pick_color[i].style.display="none";
        }
    } else if(difficulty_level=="hard"){
        for(let i=3; i<pick_color.length;i++){
            pick_color[i].style.display="show";
        }
    }
 //losowanie kolorów
if(difficulty_level=="hard"){
    colors=randomColor(6);
} else if(difficulty_level=="easy"){
    colors=randomColor(3)
}
//wybranie randomowo jednego koloru
function randomPick(n){
    var random = Math.floor(Math.random()*colors.length);
    return colors[random];
 }
 var correct=randomPick();
 color_display.textContent=correct;
 //-------------
pick_color.forEach(function(inside,index){
    inside.style.opacity="100%";
    //zmiana koloru kwadratów na losowe kolory
    inside.style.backgroundColor= colors[index];
    //dodanie eventu click
    inside.addEventListener("click",function(){
        //sprawdzenie czy color kliknietego kwadratu == color wygrywajacy
        if(inside.style.backgroundColor==correct){
            header.style.backgroundColor=correct;
            for(let i=0; i<pick_color.length;i++){
                pick_color[i].style.backgroundColor=correct;
                pick_color[i].style.opacity="100%";
            }
            new_game.textContent="RESET GAME";
            result.textContent="Correct! Play again?";
        }
        else{
            inside.style.opacity="0%";
            result.textContent="Try Again!"
        }
    })
}) 
}
start_game();