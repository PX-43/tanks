import p5 from 'p5';

const game = p => {
    let canvas;

    p.preload = () => {};

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {

    };

    p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);

    p.keyPressed = () => {

    };

    p.mouseClicked = () => {}

};

new p5(game);
