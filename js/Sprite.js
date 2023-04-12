class Backgruond{
    constructor({position, imageSrc}){
        this.position = position
        this.image = new Image()
        this.image.onload = ()=>{
            this.loaded = true
        }
        this.image.src = imageSrc
        this.loaded = false

        this.width = 14.374 * canvas.height
        this.height = canvas.height
    }

    draw(){
        if(!this.loaded) return
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

class Interaction {
    constructor({x, y, w, h, name}){
        this.position = {
           x, y
        }
        this.width = w
        this.height = h
        this.name = name
    }
    draw(){
        c.fillStyle = 'rgba(0,0,255,.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Room{
    constructor({image}){
        this.width = canvas.height *0.8 * 1.844
        this.height = canvas.height *0.8
        this.position = {
           x: (canvas.width -this.width) / 2 ,
           y: (canvas.height -this.height) / 2
        }
        this.image = image
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

class Dynamic{
    constructor({x, y, w, h, image}){
        this.width = w
        this.height = h
        this.position = {
           x,y
        }
        this.image = image
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

class Shared{
    constructor({x, y, w, h, image}){
       
        this.position = {
           x,y
        }
        this.image = image
        this.bigWidth = w*1.1
        this.oldWidth = w
        this.bigHeight = h*1.1
        this.oldHeight = h
        this.width = this.oldWidth
        this.height = this.oldHeight
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
    
}