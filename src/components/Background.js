let bkgInstance = null;
const worldSize = 2000;
let p5 = null;
let currentWidth = 0;
let currentHeight = 0;
let scrollX = 0;
let scrollY = 0;
let xv = 0;
let yv = 0;

const detectEdge = () => {
    const size = worldSize / 2;

    if (scrollX > size - currentWidth / 2) {
        scrollX = size - currentWidth / 2;
        xv = -10
    }

    if (scrollX < -1 * size + currentWidth / 2) {
        scrollX = -1 * size + currentWidth / 2;
        xv = 10;
    }

    if (scrollY > size - currentHeight / 2) {
        scrollY = size - currentHeight / 2;
        yv = -10;
    }

    if (scrollY < -1 * size + currentHeight / 2) {
        scrollY = -1 * size + currentHeight / 2;
        yv = 10;
    }
};

class background {

    constructor(p){
        if (!bkgInstance)
            bkgInstance = this;

        p5 = p;
        return bkgInstance;
    }



    draw(){
        p5.background(255);
        p5.stroke(245);
        p5.strokeWeight(7);
        p5.noFill();

        const distance = Math.floor(p5.height / 8);
        const distanceHalf = distance / 2;

        const initXPos = (0 - scrollX) % distance;
        const initYPos = (0 - scrollY) % distance;

        for(let x = p5.height / distanceHalf; x > 0; x--) {
            p5.line(0, (((distance) * x) - distance) + initYPos, p5.width, (((distance) * x) - distance) + initYPos);
        }

        for(let y = p5.width / distanceHalf; y > 0; y--) {
            p5.line(((distance * y) - distance) + initXPos, 0, ((distance * y) - distance) + initXPos, p5.height);
        }

        p5.stroke(255, 0, 0, 65);

        let leftWall = -worldSize / 2 - scrollX + p5.width / 2;
        let rightWall = worldSize / 2 - scrollX + p5.width / 2;
        let topWall = -worldSize / 2 - scrollY + p5.height / 2;
        let bottomWall = worldSize / 2 - scrollY + p5.height / 2;

        p5.line(leftWall, bottomWall, rightWall, bottomWall);
        p5.line(leftWall, topWall, rightWall, topWall);
        p5.line(leftWall, bottomWall, leftWall, topWall);
        p5.line(rightWall, bottomWall, rightWall, topWall);

        currentWidth = 100 - Math.abs(yv * 2) + Math.abs(xv * 1.5);
        currentHeight = 100 - Math.abs(xv * 2) + Math.abs(yv * 1.5);

        xv = xv * 0.9;
        yv = yv * 0.9;

        scrollX += xv;
        scrollY += yv;

        detectEdge();
    }
}

let bkg = null;

const Background = {
    setup: p5 => bkg = new background(p5),
    draw: () => bkg.draw(),
};
export default Background;