const canvas = document.getElementById("canvas");
let alertStatus = false;

if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;

    let bw = 0;
    const map = new Image();
    map.src = "./assests/mainMap.png";
    function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(map, 0 + bw * 5, 0, 1920 / 2, 1080, 0, 0, 1920 / 1.5, 1080 * 2);
    };
    map.addEventListener("load", drawCanvas);

    let hw = 0;
    let vw = 0;
    let xc = -180 - hw * 5;
    let yc = -50 - 5 * vw;

    const bgmusic = new Audio("./assests/bgmusic.mp3");
    bgmusic.play();

    const rightwalk1 = new Image();
    rightwalk1.src = "./assests/rightwalkkkk.png";
    const rightstand = new Image();
    rightstand.src = "./assests/rightstand.png";
    const rightwalk2 = new Image();
    rightwalk2.src = "./assests/rightwalk2.png";
    const arrRightWalk = [rightwalk1, rightwalk2];

    const leftwalk1 = new Image();
    leftwalk1.src = "./assests/player-left-1.png";
    const leftstand = new Image();
    leftstand.src = "./assests/player-left-stand.png";
    const leftwalk2 = new Image();
    leftwalk2.src = "./assests/player-left-2.png";
    const arrLeftWalk = [leftwalk1, leftwalk2];

    const upwalk1 = new Image();
    upwalk1.src = "./assests/player-up-1.png";
    const upstand = new Image();
    upstand.src = "./assests/player-up-stand.png";
    const upwalk2 = new Image();
    upwalk2.src = "./assests/player-up-2.png";
    const arrUpWalk = [upwalk1, upwalk2];

    const downwalk1 = new Image();
    downwalk1.src = "./assests/player-down-1.png";
    const downstand = new Image();
    downstand.src = "./assests/player-down-stand.png";
    const downwalk2 = new Image();
    downwalk2.src = "./assests/player-down-2.png";
    const arrDownWalk = [downwalk1, downwalk2];

    let walk = rightstand;

    function walking() {
        if (alertStatus === false) {
            if (xc <= 225 && xc >= 190) {
                if (yc === 120) {
                    (document.getElementById("alert")).classList.add("playBarDiv");
                    document.getElementById("alert").innerHTML = "Hit ENTER to fight a wild pokemon";
                    alertStatus = true;
                }
                else {
                    (document.getElementById("alert")).classList.remove("playBarDiv");
                }
            }
        }
        alertStatus = false;
        xc = Math.abs(-180 - hw * 5);
        yc = Math.abs(-50 - 5 * vw);
        ctx.drawImage(walk, -180 - hw * 5, -50 - 5 * vw, 960, 540, 0, 0, 1000, 1000);
        ctx.imageSmoothingEnabled = false;
    }
    walk.addEventListener("load", walking);

    window.onkeydown = function event(event) {
        if (event.key === "ArrowRight" || event.key === "D" || event.key === "d") {
            if (hw < 114) {
                if (colliders[-(-50 - 5 * (vw))][-(-180 - (hw + 1) * 5)] === 1) {
                    hw++;
                    walk = arrRightWalk[Math.abs(hw) % 2];
                    if (60 > hw && hw >= 28) {
                        bw++;
                    }
                }
            }
        }
        else {
            if (event.key === "ArrowLeft" || event.key === "A" || event.key === "a") {
                if (colliders[-(-50 - 5 * (vw))][-(-180 - (hw - 1) * 5)] === 1) {
                    if (60 > hw && hw >= 28) {
                        bw--;
                    }
                    hw--;
                    walk = arrLeftWalk[Math.abs(hw) % 2];
                }
            }
            else {

                if (event.key === "ArrowDown" || event.key === "S" || event.key === "s") {
                    if (colliders[-(-50 - 5 * (vw + 1))][-(-180 - (hw) * 5)] === 1) {
                        vw++;
                        walk = arrDownWalk[Math.abs(vw) % 2];
                    }
                }
                else {
                    if (event.key === "ArrowUp" || event.key === "W" || event.key === "w") {
                        if (colliders[-(-50 - 5 * (vw - 1))][-(-180 - (hw) * 5)] === 1) {
                            vw--;
                            walk = arrUpWalk[Math.abs(vw) % 2];
                        }
                    }
                }
            }
        }
        if (event.key === "Enter") {
            if (xc <= 225 && xc >= 190) {
                if (yc === 120) {
                    window.location.href = "selection.html";
                }
            }
        }
        drawCanvas();
        walking();
    }
    window.onkeyup = function event(event) {
        if (event.key === "ArrowRight" || event.key === "D" || event.key === "d") {
            if (hw < 88) {
                walk = rightstand;
            };
        }
        if (event.key === "ArrowLeft" || event.key === "A" || event.key === "a") {
            walk = leftstand;
        }
        if (event.key === "ArrowUp" || event.key === "W" || event.key === "w") {
            walk = upstand;
        }
        if (event.key === "ArrowDown" || event.key === "S" || event.key === "s") {
            walk = downstand;
        }
        drawCanvas();
        walking();
    };


}

