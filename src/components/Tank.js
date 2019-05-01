import Bullet from './Bullet';

let x = 0;
let y = 0;
let xv = 0;
let yv = 0;
let lerpxv = 0;
let lerpyv = 0;
let speed = 1;
let dashCooldown = 40;
let dashSpeed = 20;
let w = 100;
let h = 100;
let currentWidth = w;
let currentHeight = h;
let angle = 0;
// gunWidth set to 0 as lerp is used to bounce when shooting
let gunWidth = 0;
let gunHeight = 30;
let gunWidthChange = 0;
let worldSize = 2000;
const bullets = [];
let id = '';

let p5 = null;

class Tank {

    constructor(p, getScrollX, getScrollY){
        p5 = p;
        this.getScrollX = getScrollX;
        this.getScrollY = getScrollY;

        console.log(this.getScrollX);
        this.test  = this.getScrollX();
        console.log(this.test);
    }


    setup() {
        x = p5.width / 2;
        y = p5.height / 2;
    }

    draw() {
        lerpxv += (xv - lerpxv) / 5;
        lerpyv += (yv - lerpyv) / 5;

        x = p5.width / 2 + lerpxv * 5;
        y = p5.height / 2 + lerpyv * 5;

        gunWidth += gunWidthChange;
        gunWidthChange = (gunWidthChange * 0.7) + (100 - gunWidth) / 5;

        angle = Math.atan2(p5.mouseY - y, p5.mouseX - x);

        currentWidth = w - Math.abs(yv * 2) + Math.abs(xv * 1.5);
        currentHeight = h - Math.abs(xv * 2) + Math.abs(yv * 1.5);

        this.checkControls();

        this.updateBullets();

        p5.translate(x, y);
        p5.strokeWeight(7);
        p5.stroke(0, 110, 225);
        p5.fill(0, 130, 255);
        p5.rotate(angle);
        p5.rect(gunWidth / -2 + 40, gunHeight / -2, gunWidth, gunHeight, 25, 25, 25, 25);
        p5.rotate(-1 * angle);
        p5.rect(currentWidth / -2, currentHeight / -2, Math.abs(currentWidth), Math.abs(currentHeight), 50, 50, 50, 50);
    }


     mouseClicked() {
        const b = new Bullet(p5, x, y, angle, gunHeight / 2, gunWidth, this.getScrollX, this.getScrollY, id);
        bullets.push(b);
        gunWidth = 50;
        xv += Math.cos(angle - Math.PI) * 4;
        yv += Math.sin(angle * -1) * 4;
    }


     checkDash(x_increment, y_increment) {

        if (p5.keyIsDown(32) && dashCooldown < 0) {
            dashCooldown = 40;

            xv += x_increment;
            yv += y_increment;
        }
    }

    updateBullets() {

        let counter = 0;
        while(counter < bullets.length) {
            bullets[counter].move();
            if (bullets[counter].mustRemoveBullet) {
                bullets.splice(counter, 1);
                counter--;
            }

            counter++;
        }

    }

    checkControls() {

        if (p5.keyIsDown(65)) {
            xv -= speed;
            this.checkDash(-dashSpeed, 0);
        }

        if (p5.keyIsDown(68)) {
            xv += speed;
            this.checkDash(dashSpeed, 0);
        }

        if (p5.keyIsDown(87)) {
            yv -= speed;
            this.checkDash(0, -dashSpeed);
        }

        if (p5.keyIsDown(83)) {
            yv += speed;
            this.checkDash(0, dashSpeed);
        }
    }

}

export default Tank;