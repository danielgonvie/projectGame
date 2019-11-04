class Player {
  constructor(ctx, width, height, image, gameWidth, gameHeight, keys) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = image;

    this.posX = 50;
    this.posY = gameHeight * 0.98 - this.height;
    this.posX0 = 50;
    this.posY0 = gameHeight * 0.98 - this.height;
    this.vx = 8;
    this.vy = 1;
    this.gravity = 0.8;
    this.backForce = 0.8;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.frames = 3;
    this.framesIndex = 0;

    this.size = this.height / 2
    this.newSize = this.height / 2

    this.keys = keys;
    this.bullets = [];
    this.setListeners()
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    )
    /* console.log(this.bullets.length)
    this.clearBullets()
    this.bullets.forEach(bullet => bullet.draw())
    this.animate(framesCounter) */
  }

  move() {
    if (this.posY <= this.posY0) {
      this.posY += this.vy;
      this.vy += this.gravity;
    } else {
      this.vy = 1;
      this.posY = this.posY0;
    }

    if (this.posX >= this.posX0){
      this.posX = this.posX += this.vx
      this.vx -= this.backForce
    } else {
      this.vx = 0;
      this.posX = this.posX0;
    }
    /* this.bullets.forEach(bullet => bullet.move()) */
  }

  /* animate(framesCounter) {
    if(framesCounter % 10 === 0) {
      this.framesIndex++;
 
      if(this.framesIndex > 2) this.framesIndex = 0;
    }
  } */

  setListeners() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case this.keys.W_KEY: //Jump
          if (this.posY >= this.posY0) {
            this.posY -= this.vy;
            this.vy -= 15;
          }
          break;
        case this.keys.S_KEY: //Crouch

          if (this.size === this.newSize ) {
            this.height = this.height / 2;
            this.posY = this.gameHeight * 0.98 - this.height;
            this.posY0 = this.gameHeight * 0.98 - this.height;
            this.newSize = 0;
          }
          break;

          case this.keys.D_KEY: //Tackle
          if (this.posX <= this.posX0 + 5) {
            this.posX += this.vx;
            this.vx += 15;
          }
          break;
          
        }
      })
  

    document.addEventListener('keyup', (e) => {
      switch (e.keyCode) {

        case this.keys.S_KEY: //Crouch Up
          this.height = this.height * 2
          this.posY = this.gameHeight * 0.98 - this.height
          this.posY0 = this.gameHeight * 0.98 - this.height
          this.newSize = this.height / 2
          break;




      }
    })
  }


}