let bkgInstance = null;
const worldSize = 2000;
let p5 = null;
let scrollx = 0;
let scrolly = 0;
let xv = 0;
let yv = 0;

let currentWidth = w - Math.abs(yv * 2) + Math.abs(xv * 1.5)
let currentHeight = h - Math.abs(xv * 2) + Math.abs(yv * 1.5)

const detectEdge = size => {
    if (scrollx > size - currentWidth / 2) {
        scrollx = size - currentWidth / 2;
        xv = -10
    }

    if (scrollx < -1 * size + currentWidth / 2) {
        scrollx = -1 * size + currentWidth / 2;
        xv = 10;
    }

    if (scrolly > size - currentHeight / 2) {
        scrolly = size - currentHeight / 2;
        yv = -10;
    }

    if (scrolly < -1 * size + currentHeight / 2) {
        scrolly = -1 * size + currentHeight / 2;
        yv = 10;
    }
};

class Background {

    constructor(p){
        if (!bkgInstance)
            bkgInstance = this;

        p5 = p;
        return bkgInstance;
    }



    draw(xv, yv){
        p5.background(255);
        p5.stroke(245);
        p5.strokeWeight(7);
        p5.noFill();

        const distance = Math.floor(p5.height / 8);
        const distanceHalf = distance / 2;

        let initxpos = (0 - scrollx) % distance;
        let initypos = (0 - scrolly) % distance;

        for(let x = p5.height / distanceHalf; x > 0; x--) {
            p5.line(0, (((distance) * x) - distance) + initypos, p5.width, (((distance) * x) - distance) + initypos);
        }

        for(let y = p5.width / distanceHalf; y > 0; y--) {
            p5.line(((distance * y) - distance) + initxpos, 0, ((distance * y) - distance) + initxpos, p5.height);
        }

        p5.stroke(255, 0, 0, 65);

        let leftWall = -worldSize / 2 - scrollx + width / 2;
        let rightWall = worldSize / 2 - scrollx + width / 2;
        let topWall = -worldSize / 2 - scrolly + height / 2;
        let bottomWall = worldSize / 2 - scrolly + height / 2;

        p5.line(leftWall, bottomWall, rightWall, bottomWall);
        p5.line(leftWall, topWall, rightWall, topWall);
        p5.line(leftWall, bottomWall, leftWall, topWall);
        p5.line(rightWall, bottomWall, rightWall, topWall);

        scrollx += xv;
        scrolly += yv;
    }
}

export default Background;