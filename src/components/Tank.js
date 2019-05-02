import Bullet from './Bullet';
import { getGuid } from '../utils';
import Background from './Background';

let p5 = null;

class Tank {

    constructor(p){
        p5 = p;

        this.w = 100;
        this.h = 100;
        this.currentWidth = this.w;
        this.currentHeight = this.h;
        this.gunWidth = 0; // gunWidth set to 0 as lerp is used to bounce when shooting
        this.gunHeight = 30;
        this.gunWidthChange = 0;
        this.bullets = [];
        this.id = getGuid();
    }

    draw() {
        this.gunWidth += this.gunWidthChange;
        this.gunWidthChange = (this.gunWidthChange * 0.7) + (100 - this.gunWidth) / 5;

        this.currentWidth = this.w - Math.abs(Background.yv * 2) + Math.abs(Background.xv * 1.5);
        this.currentHeight = this.h - Math.abs(Background.xv * 2) + Math.abs(Background.yv * 1.5);

        this.updateBullets();

        p5.translate(Background.x, Background.y);
        p5.strokeWeight(7);
        p5.stroke(0, 110, 225);
        p5.fill(0, 130, 255);
        p5.rotate(Background.angle);
        p5.rect(this.gunWidth / -2 + 40, this.gunHeight / -2, this.gunWidth, this.gunHeight, 25, 25, 25, 25);
        p5.rotate(-1 * Background.angle);
        p5.rect(this.currentWidth / -2, this.currentHeight / -2, Math.abs(this.currentWidth), Math.abs(this.currentHeight), 50, 50, 50, 50);
    }


     mouseClicked() {
        const b = new Bullet(p5, Background.x, Background.y, Background.angle, this.gunHeight / 2, this.gunWidth, this.id);
         this.bullets.push(b);
         this.gunWidth = 50;
    }

    updateBullets() {
        let counter = 0;
        while(counter < this.bullets.length) {
            this.bullets[counter].move();
            if (this.bullets[counter].mustRemoveBullet) {
                this.bullets.splice(counter, 1);
                counter--;
            }

            counter++;
        }
    }
}

export default Tank;