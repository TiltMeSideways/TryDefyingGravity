document.addEventListener("DOMContentLoaded", function (){

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let animationId;

    let posY = 50;
    let posX = canvas.width/2;
    let velocityY = 1;
    let velocityX = 0;
    const gravity = 0.5;
    //bounce factor removed for keeping height and Y velocity.
    const horizontalSpeed = 10;
    const steppingStone = {
        posX: canvas.width / 2 + 200,
        posY: canvas.height - 50,
        width: 50,
        height: 10,
};

    function drawBall () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            applyGravity(canvas.height - 20, gravity);
            //Gavity only on this ball, apply to others if needed.
            handleCollision();
            ctx.beginPath();
            ctx.arc(posX, posY, 20 , 0, Math.PI * 2);
            ctx.fillStyle = posX > canvas.width / 2 ? "blue" : "red";
            ctx.fill();
            ctx.closePath();
}

    const applyGravity = (floorLevel, gravity) => {
            velocityY += gravity;
            posY += velocityY;
            //const floorLevel = canvas.height - 20;

        if (posY > floorLevel) {
            posY = floorLevel;
            velocityY = -velocityY;
            //velocityY set to reverse so that the bounce maintains height
    }
}

    function drawSteppingStone() {
        ctx.beginPath();
        ctx.rect(steppingStone.posX, steppingStone.posY, steppingStone.width, steppingStone.height);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
}

    function drawSteppingStone2() {
        ctx.beginPath();
        ctx.rect(steppingStone.posX - 500, steppingStone.posY, steppingStone.width, steppingStone.height);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
}

    function handleCollision(){
        if(
        (posX + 20 > steppingStone.posX &&
        posX - 20 < steppingStone.posX + steppingStone.width &&
        posY + 20 > steppingStone.posY &&
        posY - 20 < steppingStone.posY + steppingStone.height) ||
        (posX + 20 > steppingStone.posX - 500 &&
        posX - 20 < steppingStone.posX - 500 + steppingStone.width &&
        posY + 20 > steppingStone.posY &&
        posY - 20 < steppingStone.posY + steppingStone.height)
    ){
        velocityY = -velocityY -0.5;
    }
}



    

    function horizontalMovement(){
        posX += velocityX;
        
        if(posX < 20) {
            posX = 20;
        } else if (posX > canvas.width - 20){
            posX = canvas.width - 20;
    }
}
    function handleKeyPress(e) {
        switch (e.key) {
            case "ArrowLeft":
                velocityX = -horizontalSpeed;
                break;
            case "ArrowRight":
                velocityX = horizontalSpeed;
                break;
    }
}

    function handleKeyRelease(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            velocityX = 0;
        }
}

    const animate = () => {
        drawBall();
        horizontalMovement();
        drawSteppingStone();
        drawSteppingStone2();
        animationId = requestAnimationFrame(animate);
}

    function startAnimation(){
        canvas.style.display = "block";
        playButton.style.display = "none";
        document.addEventListener("keydown", handleKeyPress);
        document.addEventListener("keyup", handleKeyRelease);
        animate();
}

    function stopAnimation(){
        canvas.style.display = "none";
        playButton.style.display = "block";
        document.removeEventListener("keydown", handleKeyPress);
        document.removeEventListener("keyup", handleKeyRelease);
        cancelAnimationFrame(animationId);
}

    document.getElementById("playButton").addEventListener("click", startAnimation);
    canvas.addEventListener("click",stopAnimation);

});
