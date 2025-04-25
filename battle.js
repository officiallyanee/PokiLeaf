const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false; 

const grass = new Image(); 
grass.src = "./assests/BattleGroundGrass.png"; 
const grassLower = new Image(); 
grassLower.src = "./assests/BattleGroundGrassLower.png"; 

const playBar = new Image(); 
playBar.src = "./assests/PlayBar.png"; 
const playerStand= new Image(); 
playerStand.src = "./assests/battlestand.png";

const battleAudio=new Audio("./assests/battle.mp3");
battleAudio.play();

let gameStatus="dialogue";
let pokemonBattle;
let pokemonBattleFoe;
let turn=pokemonBattle;
let turnMove;
let hp;
let hpFoe;
let battleStatus=true;
let arrScript;
let arrMove=[];
let turnMovePokemon=[0,[],[],[]];
let hpPokemon=[];
let arrMoveFoe=[];
let slopeHp;
let slopeHpPokemon=[];
let slopeHpFoe;
let pokemonBattleArr=[];
let playerThrow= new Image();
const playerThrow1= new Image();
playerThrow1.src = "./assests/battlethrow1.png";
const playerThrow2= new Image();
playerThrow2.src = "./assests/battlethrow2.png";
const playerThrow3= new Image();
playerThrow3.src = "./assests/battlethrow3.png";
const playerThrow4= new Image();    
playerThrow4.src = "./assests/battlethrow4.png";

const throwArr=[playerThrow1,playerThrow2,playerThrow3,playerThrow4];

const pokemonFoe=new Image();
let pokemonArr=JSON.parse(localStorage.getItem("pokemonSelected"));
const pokemon1=new Image();
pokemon1.src=`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/back/${pokemonArr[0]}.png`;
const pokemon2=new Image();
pokemon2.src=`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/back/${pokemonArr[1]}.png`;
const pokemon3=new Image();
pokemon3.src=`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/back/${pokemonArr[2]}.png`;
let pokemon=pokemon1;

const hpBar=new Image();
hpBar.src="./assests/hpBar.png";
const hpBarOpponent=new Image();
hpBarOpponent.src="./assests/hpBarOpponent.png";

window.onload=async function(){
    for(let i=0;i<3;i++){
        pokemonBattleArr[i]=await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonArr[i]}`)).json();
        hpPokemon[i]=pokemonBattleArr[i].stats[0].base_stat;
        slopeHpPokemon[i]=17/pokemonBattleArr[i].stats[0].base_stat;
        for(let j=0;j<4;j++){
            turnMovePokemon[i+1][j+1]= await (await fetch(pokemonBattleArr[i].moves[j].move.url)).json();
        }
    }
    pokemonBattle=pokemonBattleArr[0];
    pokemonBattleFoe=await (await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 15)}`)).json();
    pokemonFoe.src=pokemonBattleFoe.sprites.front_default;
    turn=pokemonBattle;

    for(let i=0;i<4;i++){
        arrMoveFoe[i]=await (await fetch(pokemonBattleFoe.moves[i].move.url)).json();
        arrMove[i]=turnMovePokemon[1][i+1];
    }
    document.getElementById("loader").classList.remove("loader"); 
    document.getElementById("loadingScreen").classList.remove("loadingScreen");  

    hp=hpPokemon[0];
    hpFoe=pokemonBattleFoe.stats[0].base_stat;
    slopeHp=slopeHpPokemon[0];
    slopeHpFoe=17.5/pokemonBattleFoe.stats[0].base_stat;

    arrScript=
[`A WILD ${pokemonBattleFoe.species.name.toUpperCase()} appeared!`,
`Go! ${pokemonBattle.species.name.toUpperCase()}!`,
`What will ${pokemonBattle.species.name.toUpperCase()} do?`,
`Press 1, 2 , 3, 4 to ATTACK! Moves:\n 1. ${pokemonBattle.moves[0].move.name.toUpperCase()}(${arrMove[0].power}/${arrMove[0].accuracy}%)    2. ${pokemonBattle.moves[1].move.name.toUpperCase()}(${arrMove[1].power}/${arrMove[1].accuracy}%)\n 3. ${pokemonBattle.moves[2].move.name.toUpperCase()}(${arrMove[2].power}/${arrMove[2].accuracy}%)    4. ${pokemonBattle.moves[3].move.name.toUpperCase()}(${arrMove[3].power}/${arrMove[3].accuracy}%)`,
`{0} used {1}!`,
`WILD {0} used {1}!`,
`WILD ${pokemonBattleFoe.species.name.toUpperCase()} fainted`,
`${pokemonBattle.species.name.toUpperCase()} gained ${pokemonBattle.base_experience} exp`,
'Attack Failed',
`You lost`,
`Press \n f:FIGHT  s:SWITCH POKEMON  r:RUN`,
`Switch \n a:${pokemonBattleArr[0].species.name.toUpperCase()}  b:${pokemonBattleArr[1].species.name.toUpperCase()}  c:${pokemonBattleArr[2].species.name.toUpperCase()}`,
`Come Back! ${pokemonBattle.species.name.toUpperCase()}!`
];
    document.getElementById("text").innerHTML=arrScript[0];
    drawCanvas();
}

async function drawHpBar(){
    for(let i=0;i<100;i++){
        setTimeout(()=>{         
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
            ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
            ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(pokemon1,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(pokemonFoe,240-200*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
            ctx.drawImage(hpBar,0,0, 104, 37,850-i*4.2,300, 300,140);
            ctx.drawImage(hpBarOpponent,0,0, 100, 29,-350+i*4.2,25, 300,120);
        },5*i)
    }
    await new Promise ((resolve)=>{setTimeout(()=>document.getElementById("text").innerHTML=arrScript[2],2250);resolve()});
      
    setTimeout(()=>{
        document.getElementById("pokemonName").innerHTML=pokemonBattle.species.name.toUpperCase();
        document.getElementById("pokemonNameOpp").innerHTML=pokemonBattleFoe.species.name.toUpperCase();
        document.getElementById("pokemonLv").innerHTML=1;
        document.getElementById("pokemonLvOpp").innerHTML=1;
    },1000);
    await new Promise ((resolve)=>{ 
        setTimeout(()=>document.getElementById("text").style.fontSize="4vh",4500);
        setTimeout(()=>document.getElementById("text").style.whiteSpace="pre-wrap",4500);
        setTimeout(()=>document.getElementById("text").style.lineHeight="100%",4500);
        setTimeout(()=>document.getElementById("text").innerHTML=arrScript[10],4500);
        setTimeout(()=>{
            gameStatus="battle";   
            resolve();
        }
        ,5000);
     });
    console.log(gameStatus)    
}

async function attack(poki){
    if(poki===pokemon){
        for(let i=0;i<25;i++){
            if(i%2===0){
                setTimeout(()=>{
                pokemonFoe.style.opacity=0.5;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
                ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
                ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemon,-710+200*3.2+10, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemonFoe,240-200*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
                ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
                ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
            },5*i);
             
            }
            else{
                setTimeout(()=>{
                pokemonFoe.style.opacity=0.5;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
                ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
                ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemonFoe,240-200*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
                ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
                ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
            },5*i);
             
            };     
            if(i%2===1){
                setTimeout(()=>{
                pokemonFoe.style.opacity=0.1;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
                ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
                ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemon,-710+200*3.2-10, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemonFoe,240-200*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
                ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
                ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
            },5*(i+0.5));      
            }
            else{
                setTimeout(()=>{
                pokemonFoe.style.opacity=0.5;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
                ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
                ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemonFoe,240-200*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
                ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
                ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
            },5*(i+0.5));
             
            };  
            }
            setTimeout(()=>{
                pokemonFoe.style.opacity=0.1;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
                ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
                ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemon,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemonFoe,240-200*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
                ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
                ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
            },130);
    
}  
else{
    for(let i=0;i<25;i++){
        if(i%2===0){
            setTimeout(()=>{
            pokemonFoe.style.opacity=0.5;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
            ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
            ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(pokemon,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(pokemonFoe,240-200*3.2+10, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
            ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
            ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
        },5*i);
         
        }
        else{
            setTimeout(()=>{
            pokemonFoe.style.opacity=0.5;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
            ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
            ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(pokemon,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
            ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
        },5*i);
         
        };     
        if(i%2===1){
            setTimeout(()=>{
            pokemonFoe.style.opacity=0.1;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
            ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
            ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(pokemon,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(pokemonFoe,240-200*3.2-10, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
            ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
            ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
        },5*(i+0.5));      
        }
        else{
            setTimeout(()=>{
            pokemonFoe.style.opacity=0.5;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
            ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
            ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(pokemon,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
            ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
        },5*(i+0.5));
         
        };  
        }
        setTimeout(()=>{
            pokemonFoe.style.opacity=0.1;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
            ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
            ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(pokemon,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(pokemonFoe,240-200*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
            ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
            ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
        },130);
}
}

async function faint(poki){
    if(poki===pokemonFoe){
        for(let i=0;i<9;i++){
            if(i%2===0){
                setTimeout(()=>{
                pokemonFoe.style.opacity=0.5;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
                ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
                ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemon,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
                ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
            },5*i*i);
            }
            };     
            if(i%2===1){
                setTimeout(()=>{
                pokemonFoe.style.opacity=0.1;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
                ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
                ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemon,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemonFoe,240-200*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
                ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
                ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
            },5*i*i);      
            } 
            setTimeout(()=>{
                pokemonFoe.style.opacity=0.1;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
                ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
                ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(pokemon,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
                ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
                ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
            },130);
    
}  
}

function drawPokemon(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
    ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
    ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
    ctx.drawImage(pokemon,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
    ctx.drawImage(pokemonFoe,240-200*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
    drawHpBar();
}

async function drawCanvas(){
    for(let i=0;i<200;i++){
        setTimeout(()=>{
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(grass, 260-i*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
            ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
            ctx.drawImage(grassLower, -700+i*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
            ctx.drawImage(playerStand, -700+i*3.2, -116, 1920/2, 1080,0, 0, 1920/1.2, 1080*2.5);
            ctx.drawImage(pokemonFoe,240-i*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
        },5*i);
    };
    
    await new Promise ((resolve)=>{setTimeout(()=>document.getElementById("text").innerHTML=arrScript[1],2250);resolve()});
    await new Promise ((resolve)=>{
        setTimeout(pokemonThrow,1000);
        setTimeout(pokemonThrow,1250);
        setTimeout(pokemonThrow,1500);
        setTimeout(pokemonThrow,1750); 
        setTimeout(drawPokemon,2250);
        resolve();
    });
}

function switchPokemon(poki){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
    ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
    ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
    ctx.drawImage(poki,-710+200*3.2, -110, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
    ctx.drawImage(pokemonFoe,240-200*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
    ctx.drawImage(hpBar,0,0, 104, 37,424.2,300, 300,140);
    ctx.drawImage(hpBarOpponent,0,0, 100, 29,65.8,25, 300,120);
}
let i=0;
async function pokemonThrow(){
    await new Promise ((resolve)=>{
    setTimeout(()=>{
        playerThrow=throwArr[i];
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(grass, 260-200*3.2, -40, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.2);
        ctx.drawImage(playBar, 0, 0, 240, 47,0, 3*canvas.height/4, canvas.width, canvas.height/4);
        ctx.drawImage(grassLower, -700+200*3.2, -165, 1920/2, 1080,0, 0, 1920/1.4, 1080*2.5);
        ctx.drawImage(playerThrow, -700+200*3.2+(i+1)*30, -116, 1920/2, 1080,0, 0, 1920/1.2, 1080*2.5);
        ctx.drawImage(pokemonFoe,240-200*3.2, -2, 1920/2, 1080,0, 0, 1920/1.4, 1080*2);
        i++; 
        resolve();
    },10)
}
)}
 
function battle(){ 
    if(turn===pokemonBattle){
        document.getElementById("text").innerHTML=arrScript[4].replace("{1}",turnMove.name).replace("{0}",turn.species.name.toUpperCase());
        if(turnMove.accuracy>Math.random()*100){
            hpFoe-=(turnMove.power)/10;
            attack(pokemonFoe);
            if(hpFoe<0){
                hpFoe=0;
                document.getElementById("hpOpp").style.width=`${17.5-hpFoe*slopeHpFoe}vw`;
                document.getElementById("text").innerHTML=arrScript[6]
                setTimeout(()=>document.getElementById("text").innerHTML=arrScript[7],2000);
                faint(pokemonFoe);
                battleStatus=false;
                setTimeout(()=>window.location.href="map.html",2000);
            }
            else{
                document.getElementById("hpOpp").style.width=`${17.5-hpFoe*slopeHpFoe}vw`;
            }
        }
        else{
            document.getElementById("text").innerHTML=arrScript[8];
        }
        if(battleStatus===true){
        turn=pokemonBattleFoe;
        turnMove=arrMoveFoe[Math.floor(Math.random()*4)];
        setTimeout(battle,2000);
        }
    }
    else{
        if(turn===pokemonBattleFoe){
            document.getElementById("text").innerHTML=arrScript[5].replace("{1}",turnMove.name).replace("{0}",turn.species.name.toUpperCase());
            if(turnMove.accuracy>Math.random()*100){
                if(hp===hpPokemon[0]){
                    hpPokemon[0]-=(turnMove.power)/10;
                }
                if(hp===hpPokemon[2]){
                    hpPokemon[2]-=(turnMove.power)/10;
                }
                if(hp===hpPokemon[1]){
                    hpPokemon[1]-=(turnMove.power)/10;
                }
                hp-=(turnMove.power)/10;
                attack(pokemon);
                if(hp<0){
                    hp=0;
                    if(hpPokemon[0]<0){
                        hpPokemon[0]=0;
                    }
                    if(hpPokemon[2]<0){
                        hpPokemon[2]=0;
                    }
                    if(hpPokemon[1]<0){
                        hpPokemon[1]=0;
                    }
                    document.getElementById("hp").style.width=`${17-hp*slopeHp}vw`;
                    setTimeout(()=>document.getElementById("text").innerHTML="You lost the battle",2000);
                    battleStatus=false;
                    setTimeout(()=>window.location.href="map.html",2000);
                }
                else{
                    document.getElementById("hp").style.width=`${17-hp*slopeHp}vw`;
                }
            }
            else{
                setTimeout(()=>document.getElementById("text").innerHTML=arrScript[8],2000);
            }

            if(battleStatus===true){
            turn=pokemonBattle;
            setTimeout(()=>document.getElementById("text").innerHTML=arrScript[10],3000);
            }
        }
    }
    gameStatus="battle";
} 

window.onkeydown=async function event(e){
    if(battleStatus===true&&gameStatus!=="dialogue"){
        if(gameStatus==="fight"){              
            if(e.key==="1"){
                turnMove=arrMove[0];
                battle();
                gameStatus="dialogue";
            }
            if(e.key==="2"){
                turnMove=arrMove[1];
                battle();
                gameStatus="dialogue";
            }
            if(e.key==="3"){
                turnMove=arrMove[2];
                battle();
                gameStatus="dialogue";
            }
            if(e.key==="4"){
                turnMove=arrMove[3];
                battle();
                gameStatus="dialogue";
            }
        }
        if(e.key==="s"){
            setTimeout(()=>document.getElementById("text").innerHTML=arrScript[11],1000);
            gameStatus="switch";
        }
        if(e.key==="f"){
            setTimeout(document.getElementById("text").innerHTML=`Press 1, 2 , 3, 4 to ATTACK! Moves:\n 1. ${pokemonBattle.moves[0].move.name.toUpperCase()}(${arrMove[0].power}/${arrMove[0].accuracy}%)    2. ${pokemonBattle.moves[1].move.name.toUpperCase()}(${arrMove[1].power}/${arrMove[1].accuracy}%)\n 3. ${pokemonBattle.moves[2].move.name.toUpperCase()}(${arrMove[2].power}/${arrMove[2].accuracy}%)    4. ${pokemonBattle.moves[3].move.name.toUpperCase()}(${arrMove[3].power}/${arrMove[3].accuracy}%)`,2000);
            gameStatus="fight";
        }
        if(e.key==="r"){
            window.location.href="map.html";
        }
        if(gameStatus==="switch"){    
            if(e.key==="a"){
                let name=pokemonBattle.species.name.toUpperCase();
                setTimeout(()=>document.getElementById("text").innerHTML=`Come Back! ${name}!`,1000);
                pokemon=pokemon1;
                pokemonBattle=pokemonBattleArr[0];
                turn=pokemonBattle;
                hp=hpPokemon[0];
                slopeHp=slopeHpPokemon[0];
                arrMove[0]=turnMovePokemon[1][1];
                arrMove[1]=turnMovePokemon[1][2];
                arrMove[2]=turnMovePokemon[1][3];
                arrMove[3]=turnMovePokemon[1][4];
                document.getElementById("hp").style.width=`${17-hp*slopeHp}vw`;
                setTimeout(()=>switchPokemon(pokemon),3000);
                setTimeout(()=>document.getElementById("text").innerHTML=`Go! ${pokemonBattle.species.name.toUpperCase()}!`,3000);
                setTimeout(()=>document.getElementById("pokemonName").innerHTML=`${pokemonBattle.species.name.toUpperCase()}`,3000);
                setTimeout(()=>document.getElementById("text").innerHTML=arrScript[10],4000);
                gameStatus="battle";
            }
            if(e.key==="b"){
                let name=pokemonBattle.species.name.toUpperCase();
                setTimeout(()=>document.getElementById("text").innerHTML=`Come Back! ${name}!`,1000);
                pokemon=pokemon2;
                pokemonBattle=pokemonBattleArr[1];
                turn=pokemonBattle;
                hp=hpPokemon[1];
                slopeHp=slopeHpPokemon[1];
                arrMove[0]=turnMovePokemon[2][1];
                arrMove[1]=turnMovePokemon[2][2];
                arrMove[2]=turnMovePokemon[2][3];
                arrMove[3]=turnMovePokemon[2][4];
                document.getElementById("hp").style.width=`${17-hp*slopeHp}vw`;
                setTimeout(()=>switchPokemon(pokemon),3000);
                setTimeout(()=>document.getElementById("text").innerHTML=`Go! ${pokemonBattle.species.name.toUpperCase()}!`,3000);
                setTimeout(()=>document.getElementById("pokemonName").innerHTML=`${pokemonBattle.species.name.toUpperCase()}`,3000);
                setTimeout(()=>document.getElementById("text").innerHTML=arrScript[10],4000);
                gameStatus="battle";
                
            }
            if(e.key==="c"){
                let name=pokemonBattle.species.name.toUpperCase();
                setTimeout(()=>document.getElementById("text").innerHTML=`Come Back! ${name}!`,1000);
                pokemon=pokemon3;
                pokemonBattle=pokemonBattleArr[2];
                turn=pokemonBattle;
                hp=hpPokemon[2];
                slopeHp=slopeHpPokemon[2];
                arrMove[0]=turnMovePokemon[3][1];
                arrMove[1]=turnMovePokemon[3][2];
                arrMove[2]=turnMovePokemon[3][3];
                arrMove[3]=turnMovePokemon[3][4];
                document.getElementById("hp").style.width=`${17-hp*slopeHp}vw`;
                setTimeout(()=>switchPokemon(pokemon),3000);
                setTimeout(()=>document.getElementById("text").innerHTML=`Go! ${pokemonBattle.species.name.toUpperCase()}!`,3000);
                setTimeout(()=>document.getElementById("pokemonName").innerHTML=`${pokemonBattle.species.name.toUpperCase()}`,3000);
                setTimeout(()=>document.getElementById("text").innerHTML=arrScript[10],4000);
                gameStatus="battle";
            }
        }  
    }
}