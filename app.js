let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let restartBtn = document.querySelector("#restart");
let msgContainer = document.querySelector(".msg-container");
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
    }
    else{
        box.innerText="O";
        turn0=true;
    }
    box.disabled = true;
    checkWin();         //Check if player won after each turn
}

showWin = (winner) => {
    msg.innerText = `Winner is Player ${winner}`;
    msgContainer.style.display="flex";
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
            }
        }
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