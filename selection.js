
let random=Math.floor(Math.random()*3)+1;
let pokemon1=(random += Math.floor(Math.random()*3)+1);
let pokemon2=(random += Math.floor(Math.random()*3)+1);
let pokemon3=(random += Math.floor(Math.random()*3)+1);
let pokemon4=(random += Math.floor(Math.random()*3)+1);
let pokemon5=(random += Math.floor(Math.random()*3)+1);
let pokemon6=(random += Math.floor(Math.random()*3)+1);
let pokemon7=(random += Math.floor(Math.random()*3)+1);
let pokemon8=(random += Math.floor(Math.random()*3)+1);
let pokemon9=(random += Math.floor(Math.random()*3)+1);
let pokemon10=(random += Math.floor(Math.random()*3)+1);
let pokemonName1;
let pokemonName2;
let pokemonName3;
let pokemonName4;
let pokemonName5;
let pokemonName6;
let pokemonName7;
let pokemonName8;
let pokemonName9;
let pokemonName10;
let pokemonArr=[pokemon1,pokemon2,pokemon3,pokemon4,pokemon5,pokemon6,pokemon7,pokemon8,pokemon9,pokemon10];
let pokemonNameArr=[pokemonName1,pokemonName2,pokemonName3,pokemonName4,pokemonName5,pokemonName6,pokemonName7,pokemonName8,pokemonName9,pokemonName10];
let pokemonSelection=[false,false,false,false,false,false,false,false,false,false];
let pokemonSelected=[0,0,0,0,0,0,0,0,0,0];    
 
const bgmusic=new Audio("./assests/bgmusic.mp3");
bgmusic.play();
window.onload=async function(){
    pokemonName1=(await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1}`)).json()).species.name.toUpperCase();
    pokemonName2=(await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2}`)).json()).species.name.toUpperCase();
    pokemonName3=(await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon3}`)).json()).species.name.toUpperCase();
    pokemonName4=(await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon4}`)).json()).species.name.toUpperCase();
    pokemonName5=(await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon5}`)).json()).species.name.toUpperCase();
    pokemonName6=(await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon6}`)).json()).species.name.toUpperCase();
    pokemonName7=(await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon7}`)).json()).species.name.toUpperCase();
    pokemonName8=(await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon8}`)).json()).species.name.toUpperCase();    
    pokemonName9=(await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon9}`)).json()).species.name.toUpperCase();
    pokemonName10=(await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon10}`)).json()).species.name.toUpperCase();
    pokemonNameArr=[pokemonName1,pokemonName2,pokemonName3,pokemonName4,pokemonName5,pokemonName6,pokemonName7,pokemonName8,pokemonName9,pokemonName10];
    
    for (let i = 0; i < pokemonArr.length; i++) {
        console.log( document.getElementsByClassName("pokemon"+(i+1)));
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
                console.log(pokemonSelection);
                console.log(pokemonSelected.length);
                if(pokemonSelection[i]){
                    if(count<3){
                    document.getElementById("pokemon"+(i+1)).style.backgroundColor="rgb(38, 50, 111)";
                    document.getElementById("pokemon"+(i+1)).style.color=" rgb(255, 255, 255)";
                    pokemonSelected[i]=pokemonArr[i+1];
                    }
                    else{
                        pokemonSelection[i]=false;
                    }
                }
                else{
                    document.getElementById("pokemon"+(i+1)).style.backgroundColor="  rgb(184, 218, 243)";
                    document.getElementById("pokemon"+(i+1)).style.color="rgb(38, 50, 111)";
                    pokemonSelected.slice(i,1);
                    count--;
                }
                console.log(pokemonSelected);
            }
            ,false);
    }
}
window.onkeydown=function event(event){
    if(event.key==="Enter"){
        while (pokemonSelected.indexOf(0) !== -1){
            pokemonSelected.splice(pokemonSelected.indexOf(0),1);
        }
        localStorage.setItem("pokemonSelected",JSON.stringify(pokemonSelected));
        window.location.href="battle.html";
    }
}