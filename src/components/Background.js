let p5 = null;
const worldSize = 2000;

let scrollX = 0;
let scrollY = 0;
let xv = 0;
let yv = 0;
let speed = 1;
let dashCooldown = 40;
let dashSpeed = 20;
let angle = 0;
let x = 0;
let y = 0;
let lerpxv = 0;
let lerpyv = 0;

const edgeOffset = 50;

const detectEdge = () => {
    const size = worldSize / 2;

    if (scrollX > size - edgeOffset) {
        scrollX = size - edgeOffset;
        xv = -10
    }

    if (scrollX < -1 * size + edgeOffset) {
        scrollX = -1 * size + edgeOffset;
        xv = 10;
    }

    if (scrollY > size - edgeOffset) {
        scrollY = size - edgeOffset;
        yv = -10;
    }

    if (scrollY < -1 * size + edgeOffset) {
        scrollY = -1 * size + edgeOffset;
        yv = 10;
    }
};

const checkDash = (x_increment, y_increment) =>{

    if (p5.keyIsDown(32) && dashCooldown < 0) {
        dashCooldown = 40;

        xv += x_increment;
        yv += y_increment;
    }
};

const checkForKeyDown = () => {

    if(!p5) return;

    if (p5.keyIsDown(65)) {
        xv -= speed;
        checkDash(-dashSpeed, 0);
    }

    if (p5.keyIsDown(68)) {
        xv += speed;
        checkDash(dashSpeed, 0);
    }

    if (p5.keyIsDown(87)) {
        yv -= speed;
        checkDash(0, -dashSpeed);
    }

    if (p5.keyIsDown(83)) {
        yv += speed;
        checkDash(0, dashSpeed);
    }
};

const mouseClicked = () => {
    xv += Math.cos(angle - Math.PI) * 4;
    yv += Math.sin(angle * -1) * 4;
};

const draw = () => {
    p5.background(255);
    p5.stroke(240);
    p5.strokeWeight(7);
    p5.noFill();

    lerpxv += (xv - lerpxv) / 5;
    lerpyv += (yv - lerpyv) / 5;

    x = p5.width / 2 + lerpxv * 5;
    y = p5.height / 2 + lerpyv * 5;

    angle = Math.atan2(p5.mouseY - y, p5.mouseX - x);

    const distance = Math.floor(p5.height / 8);
    const distanceHalf = distance / 2;

    const initXPos = (0 - scrollX) % distance;
    const initYPos = (0 - scrollY) % distance;

    for(let xi = p5.height / distanceHalf; xi > 0; xi--) {
        p5.line(0, (((distance) * xi) - distance) + initYPos, p5.width, (((distance) * xi) - distance) + initYPos);
    }

    for(let yi = p5.width / distanceHalf; yi > 0; yi--) {
        p5.line(((distance * yi) - distance) + initXPos, 0, ((distance * yi) - distance) + initXPos, p5.height);
    }

    let leftWall = -worldSize / 2 - scrollX + p5.width / 2;
    let rightWall = worldSize / 2 - scrollX + p5.width / 2;
    let topWall = -worldSize / 2 - scrollY + p5.height / 2;
    let bottomWall = worldSize / 2 - scrollY + p5.height / 2;

    p5.stroke(255, 0, 0, 65);
    p5.line(leftWall, bottomWall, rightWall, bottomWall);
    p5.line(leftWall, topWall, rightWall, topWall);
    p5.line(leftWall, bottomWall, leftWall, topWall);
    p5.line(rightWall, bottomWall, rightWall, topWall);

    xv = xv * 0.9;
    yv = yv * 0.9;

    scrollX += xv;
    scrollY += yv;

    detectEdge();
    checkForKeyDown();
    dashCooldown -= 1;
};


const Background = {
    setup: p => {
        p5 = p;
        x = p5.width / 2;
        y = p5.height / 2;
    },
    draw: () => draw(),
    mouseClicked: () => mouseClicked(),
    get scrollX() {return scrollX;},
    get scrollY() {return scrollY;},
    get xv() {return xv;},
    get yv() {return yv;},
    get angle() {return angle;},
    get x() {return x;},
    get y() {return y;},
};
export default Background;