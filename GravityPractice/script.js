document.addEventListener("DOMContentLoaded", function (){

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let animationId;

    let posX = 50;
    let posY = 50;
    let velocityY = 0;
    let velocityX = 5;
    const gravity = 0.9;
    const bounceFactor = 1; 

    function drawBall(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(posX, posY, 20, 0, Math.PI * 2);
    if(posX > canvas.width / 2) 
    {
        ctx.fillStyle = "blue";
    }
    else {
        ctx.fillStyle = "red";
    }
    ctx.fill();
    ctx.closePath();
}

    function applyGravity(){
        velocityY += gravity;
        posY += velocityY;
        const floorLevel = canvas.height - 20;

    if (posY > floorLevel) {
        posY = floorLevel;
        velocityY *= -bounceFactor;
    }
}

    function horizontalMovement(){
        posX += velocityX;
        
        if(posX < 20 || posX > canvas.width - 20) {
            velocityX *= -bounceFactor;
        }
    }

    function animate(){
        applyGravity();
        horizontalMovement();
        drawBall();
        animationId = requestAnimationFrame(animate);
    }

function startAnimation(){
    canvas.style.display = "block";
    playButton.style.display = "none";
    animate();
}

function stopAnimation(){
    canvas.style.display = "none";
    playButton.style.display = "block";
    cancelAnimationFrame(animationId);
}

document.getElementById("playButton").addEventListener("click", startAnimation);
canvas.addEventListener("click",stopAnimation);



});