import P5 from 'p5';
import Background from './components/Background';
import Tank from './components/Tank';

const game = p => {
    let canvas;
    let tank;

    p.preload = () => {};

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        Background.setup(p);
        tank = new Tank(p);
    };

    p.draw = () => {
        Background.draw();
        tank.draw();
    };

    p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);

    p.keyPressed = () => {};

    p.mouseClicked = () => {
        Background.mouseClicked();
        tank.mouseClicked();
    }

};

new P5(game);
