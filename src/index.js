import p5 from 'p5';
import Background from './components/Background';

const game = p => {
    let canvas;

    p.preload = () => {};

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        Background.setup(p);
    };

    p.draw = () => {
        Background.draw();
    };

    p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);

    p.keyPressed = () => {

    };

    p.mouseClicked = () => {}

};

new p5(game);
