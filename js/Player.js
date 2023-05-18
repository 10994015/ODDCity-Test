const createPlayer = (imgSrc)=>{
    const image = new Image();
    image.src = imgSrc
    return image
}
class Player{
    constructor(){
        this.speed = 8
        this.position = {
            x:2800,
            y:500,
            
        }
        this.absolute = {
            x:2800,
            y:500,
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.image = createPlayer('./images/player/spriteStandRight.png');
        this.move = false
        this.width = 66*1
        this.height = 250*1
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.gravity = 1
        this.frames = 0;
        this.sprites = {
            stand:{
                right:createPlayer('./images/player/spriteStandRight.png'),
                left:createPlayer('./images/player/spriteStandLeft.png'),
                cropWidth:100,
                width:66*1
            },
            run:{
                right:createPlayer('./images/player/spriteRunRight.png'),
                left:createPlayer('./images/player/spriteRunLeft.png'),
                cropWidth:225,
                width:127.875*1
            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 100

        this.idx = 0
    }

    draw(){
        // c.fillStyle = "red"
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.currentSprite,this.currentCropWidth*this.frames,0,this.currentCropWidth,400, this.position.x, this.position.y, this.width, this.height)

    }
    update(){
        this.draw();
        this.idx ++ 
        if(this.idx%12 === 0){
            this.frames++;
        }
        
        if(this.frames>0 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
            this.frames=0
        }else if(this.frames>15 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)){
            this.frames=0
        }
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.sides.bottom = this.position.y + this.height
        if(this.sides.bottom + this.velocity.y < canvas.height - 50){
            this.velocity.y += this.gravity
        }else this.velocity.y =  0
    }
}