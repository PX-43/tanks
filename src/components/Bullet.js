let p5 = null;

class Bullet {

    constructor(p, x, y, angle, bulletDi, gunWidth, getScrollX, getScrollY, parentId) {
        p5 = p;
        this.angle = angle;
        this.getScrollX = getScrollX;
        this.getScrollY = getScrollY;
        this.initx = x + this.getScrollX();
        this.inity = y + this.getScrollY();
        this.bulletRadius = gunWidth;
        this.mustRemoveBullet = false;
        this.bulletVelocity = 20;
        this.currentBulletDi = bulletDi;
        this.parentId = parentId;
    }


    detectEdgeBullet() {
        return this.bulletRadius > 1500;
    }


    move() {
        this.bulletRadius += this.bulletVelocity;

        if (this.bulletRadius > 1200 && this.currentBulletDi > 1) {
            this.currentBulletDi -= 1
        }

        const bulletXPos = (this.initx + Math.cos(this.angle) * this.bulletRadius) - this.getScrollX();
        const bulletYPos = (this.inity + Math.sin(this.angle) * this.bulletRadius) - this.getScrollY();
        this.mustRemoveBullet = this.detectEdgeBullet(bulletXPos, bulletYPos);

        p5.stroke(0, 110, 225);
        p5.fill(0, 130, 255);
        p5.circle(bulletXPos, bulletYPos, this.currentBulletDi);
    }

}

export default Bullet;