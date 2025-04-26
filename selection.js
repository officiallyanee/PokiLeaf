let random=Math.floor(Math.random()*3)+1;
let pokemonArr=[];

let pokemonNotSelected=[132, 201, 235, 789, 790]; 
for(let i=0;i<10;i++){
    pokemonArr[i]=(random += Math.floor(Math.random()*100)+1);
    if(pokemonNotSelected.includes(pokemonArr[i])){
        pokemonArr[i]=(random += Math.floor(Math.random()*100)+1)-1;
    }
}
let pokemonNameArr=[];
let pokemonSelection=[];
let pokemonSelected=[];   
 
const bgmusic=new Audio("./assests/bgmusic.mp3");
bgmusic.loop=true;
bgmusic.play();
window.onload=async function(){
    for(let i=0;i<10;i++){
        pokemonNameArr[i]=(await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonArr[i]}`)).json()).species.name.toUpperCase();
        pokemonSelection[i]=false;
        pokemonSelected[i]=0;
    }
    document.getElementById("loader").classList.remove("loader"); 
    document.getElementById("loadingScreen").classList.remove("loadingScreen");  
   
    for (let i = 0; i < pokemonArr.length; i++) {
        document.getElementById("pokemon"+(i+1)).appendChild(document.createElement("img")).src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonArr[i]}.png`;
        document.getElementById("pokemon"+(i+1)).appendChild(document.createElement("p")).innerHTML=pokemonNameArr[i];
        document.getElementById("pokemon"+(i+1)).addEventListener("click",
            function(){
                let count = 0;
                for (let i = 0; i < pokemonSelection.length; i++) {
                    if(pokemonSelection[i]){
                        count++;
                    }
                }
                pokemonSelection[i]=!pokemonSelection[i];
                if(pokemonSelection[i]){
                    if(count<3){
                    document.getElementById("pokemon"+(i+1)).style.backgroundColor="rgb(38, 50, 111)";
                    document.getElementById("pokemon"+(i+1)).style.color=" rgb(255, 255, 255)";
                    pokemonSelected[i]=pokemonArr[i];
                    }
                    else{
                        pokemonSelection[i]=false;
                    }
                }
                else{
                    document.getElementById("pokemon"+(i+1)).style.backgroundColor="  rgb(184, 218, 243)";
                    document.getElementById("pokemon"+(i+1)).style.color="rgb(38, 50, 111)";
                    pokemonSelected[i]=0;
                    count--;
                }
            }
            ,false);
    }
}
window.onkeydown=function event(event){
    if(event.key==="Enter"){
        let pokemonNo=0;
        for (let i = 0; i < pokemonSelected.length; i++) {
            if(pokemonSelected[i]!==0){
                pokemonNo++;
            };
        }
        if(pokemonNo===3){     
            while (pokemonSelected.indexOf(0) !== -1){
                pokemonSelected.splice(pokemonSelected.indexOf(0),1);
            }      
            localStorage.setItem("pokemonSelected",JSON.stringify(pokemonSelected));
            window.location.href="battle.html";
        }
        else{
            alert("Please select 3 pokemon");
        }
    }
}