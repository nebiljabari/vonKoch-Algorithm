// >>>  number of iterations  <<<
let iteration = 4, time = 1;

/* ###  ###  ###  ###  ###  ### ###  ###  ### */

const canvas = document.getElementById('canvasID');
const ctx = canvas.getContext('2d');

class VonKochClass {
  constructor() {
    // canvas width: 600px, height: 400px
    this.middle = 200, this.length = 200, this.init = 0,
    this.start = 0, this.end = 600, this.degrees = [-60, 120, -60];
  }
  line(ctx) {
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(this.start, this.middle);
    ctx.lineTo(this.end, this.middle);

    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
  shape(ctx) { // we use the shape: __/\__ has patern
    // note: -174 intersection point between 2 segments of 200px
    ctx.beginPath();

    ctx.moveTo(this.start, this.init);
    ctx.lineTo(this.length, this.init);
    ctx.lineTo(this.length + (this.length/2), -174);
    ctx.lineTo(this.length * 2, this.init);
    ctx.lineTo(this.end, this.init);

    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }
  loopThree(ctx) {
    for (let i = 0; i < 3; i++) {
      this.begin(ctx, 600, -200, this.degrees[i]);
      this.loopOne(ctx);
      this.loopTwo(ctx);
    }
  }
  loopTwo(ctx) {
    for (let i = 0; i < 3; i++) {
      this.begin(ctx, 600, -200, this.degrees[i]);
      this.loopOne(ctx);
    }
  }
  loopOne(ctx) {
    for (let i = 0; i < 3; i++) {
      this.begin(ctx, 600, -200, this.degrees[i]);
    }
  }
  startup(ctx, iter) {
    this.begin(ctx, 0, iter, 0);
    this.loopOne(ctx);
  }
  begin(ctx, x, y, degrees) {
      ctx.translate(x, (200 * Math.pow(3, y) ));
      ctx.rotate((Math.PI/180)* degrees);
      this.shape(ctx);
  }
}

const VonKochCurve = new VonKochClass();

/* function handling :
  - the method call,
  - the screen refrech (need to not overlap every draw),
  - the scale (to generate the fractal iteration principal)
  and it's called every 2s to create an animation (depending of the iteration number)

  note: the save, restore func are needed to reboot everytime the context (ctx)
  context = initial parameters of the canvas
            (exemple: the ref point for rotation by default 0, 0 (top-left corner)) */
            
function fractal(iter, time) {
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(1/ Math.pow(3, iter), 1/ Math.pow(3, iter));

    if (iter == 0) VonKochCurve.begin(ctx, 0, iter, 0);

    else if (iter == 1) {
      VonKochCurve.startup(ctx, iter);
    }
    else if (iter == 2) {
      VonKochCurve.startup(ctx, iter);
      VonKochCurve.loopTwo(ctx);
    }
    else if (iter == 3) {
      VonKochCurve.startup(ctx, iter);
      VonKochCurve.loopTwo(ctx);
      VonKochCurve.loopThree(ctx);
    }

    ctx.restore();
  }, (time * 2000));
}

// *** init ***
VonKochCurve.line(ctx);

//loop to create the number of iteration wanted with time increase within
for (let i = 0; i < iteration; i++) {
  fractal(i, time);
  time +=1;
}
