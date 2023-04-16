class Backgruond{
    constructor({position, image}){
        this.position = position
        this.image = image
        this.image.onload = ()=>{
            this.loaded = true
        }
        this.loaded = false

        this.width = 17.5185 * canvas.height -150
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
        this.loaded = false
        this.image.onload = ()=>{
            this.loaded = true
        }
    }
    draw(){
        if(!this.loaded) return
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
        this.loaded = false
        this.image.onload = ()=>{
            this.loaded = true
        }
    }
    draw(){
        if(!this.loaded) return
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

class Bus{
    constructor({x, y, w, h, image}){
        this.width = w
        this.height = h
        this.position = {
           x,y
        }
        this.image = image
        this.loaded = false
        this.image.onload = ()=>{
            this.loaded = true
        }
        this.frames = 0
        this.run = false
        this.currentCropWidth = 10752/4
    }
    draw(){
        if(!this.loaded) return
        c.drawImage(this.image, this.currentCropWidth*this.frames,0,this.currentCropWidth, 825, this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        if(this.run){
            this.frames ++ ;
            if(this.frames>=4){
                this.frames = 0
            }
        }else{
            this.frames = 0
        }
        
        this.draw();
    }
}

class Shared{
    constructor({x, y, w, h, image, isPeople=false, isEnlarge=false, isShow=true, isTalk=false,multiple=1.1, name=null}){
       
        this.position = {
           x,y
        }
        this.image = image
        this.bigWidth = w*multiple
        this.oldWidth = w
        this.bigHeight = h*multiple
        this.oldHeight = h
        this.width = this.oldWidth
        this.height = this.oldHeight

        this.oldPosX  = x
        this.oldPosY = y

        this.loaded = false
        this.image.onload = ()=>{
            this.loaded = true
        }

        this.name = name
        this.enlarge = isEnlarge
        this.show = isShow
        this.dragging = false
        this.isPeople = isPeople
        this.talk = isTalk
    }
    draw(){
        if(!this.loaded) return
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
    
}