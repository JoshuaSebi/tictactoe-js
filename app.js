let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let restartBtn = document.querySelector("#restart");
let msgContainer = document.querySelector(".msgWindow");
let msg = document.querySelector("#msg");
//Player X, Player Y
let turn0 = true;

 /* Possible winning combinations
    [ 0 ] [ 1 ] [ 2 ]
    [ 3 ] [ 4 ] [ 5 ]
    [ 6 ] [ 7 ] [ 8 ]
*/

let winPattern = [
    [0,1,2],
    [0,4,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

//Play the game
inputEvt = (box) => {
    console.log("Box clicked");
    if (turn0==true)
    {
        box.innerText="X";
        turn0 =false;
        box.style.color="rgb(150,0,0)";
    }
    else{
        box.innerText="O";
        turn0=true;
        box.style.color="rgb(0, 71, 137)";
    }
    box.disabled = true;
    checkWin();         //Check if player won after each turn
}

showWin = (winner,pattern) => {
    msg.innerHTML = `Congratulations!!!<br>Player ${winner} won.`;
    msgContainer.style.display="flex";

    if (typeof confetti === "function") {
        console.log("Confetti is ready!");
    } else {
        console.log("Confetti is not available.");
    }

    confetti({
        particleCount: 400,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF0000', '#FFD700', '#FF6347'],
        zIndex: 9999
    });

    const duration = 0.75 * 1000; 
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 70,
            origin: { x: 0 },
            colors: ['#FF0000', '#FFD700', '#FF6347'],
            zIndex: 9999
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 70,
            origin: { x: 1 },
            colors: ['#FF0000', '#FFD700', '#FF6347'],
            zIndex: 9999
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

disableBoxes = () => {
    for (box of boxes)
    {
        box.disabled = true;
    }
}

enableBoxes = () => {
    for (box of boxes)
    {
        box.disabled = false;
        box.innerText="";
        msgContainer.style.display="none";
    }
}

checkWin = () => {
    let isdraw=true;
    for (let pattern of winPattern)
    {
        let ox1 = boxes[pattern[0]].innerText;
        let ox2 = boxes[pattern[1]].innerText;
        let ox3 = boxes[pattern[2]].innerText;

        if (ox1!="" && ox2!="" && ox3!="")
        {
            if (ox1===ox2 && ox2===ox3)
            {
                console.log("Winner",ox1);
                disableBoxes();
                showWin(ox1);
                return;
            }
        }
        if (ox1 === "" || ox2 === "" || ox3 === "") {
            isdraw = false;
        }
    }
    if (isdraw == true)
    {
        msg.innerHTML = `It's a Draw!!!`;
        msgContainer.style.display="flex";
        box.style.color="rgb(150, 0, 0)";
    }
};

boxes.forEach((box) => {
    box.addEventListener("click",() => inputEvt(box))
})

//Reset Button
const resetGame = () => {
    turn0=true;
    enableBoxes();
}

restartBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);