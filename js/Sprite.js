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
    constructor({x, y, w, h, name, image=null, multiple=1, isShow=true, isEnlarge=false}){
        this.position = {
           x, y
        }
        this.oldWidth = w
        this.oldHeight = h
        this.bigWidth = w*multiple
        this.bigHeight = h*multiple
        this.width = w
        this.height = h
        this.name = name
        this.image = image
        this.loaded = false
        this.show = isShow
        this.enlarge = isEnlarge
        if(this.image !== null){
            this.image.onload = ()=>{
                this.loaded = true
            }
        }
        
        
    }
    draw(){
        if(this.image === null){
            c.fillStyle = 'rgba(0,0,255,.5)'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }else{
            if(!this.loaded) return
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        }
        
        

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
        this.calc = 0;
        this.run = true
        this.divisor = 5
        this.currentCropWidth = 10752/4
    }
    draw(){
        if(!this.loaded) return
        c.drawImage(this.image, this.currentCropWidth*this.frames,0,this.currentCropWidth, 825, this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        if(this.run){
            this.calc++
            if(this.calc%this.divisor === 0){
                this.frames ++ ;
            }
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
    constructor({x, y, w, h, image, isPeople=false, isEnlarge=false, isShow=true, isTalk=false,multiple=1.1, name=null, text="", color="#000", isTypewriter=false}){
       
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
        this.text = text
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
        this.isTypewriter = isTypewriter
        this.num = 0;
        this.step = 0
        this.twoStep = 25
        this.threeStep = 50
        this.color = color

        if(this.text.split('').length <=24){
            this.addHeight = 45
        }else if(this.text.split('').length <=48){
            this.addHeight = 40
        }else{
            this.addHeight = 36
        }

        
    }
    draw(){
        if(!this.loaded) return
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

        if(!this.talk) return
        if(this.isTypewriter){
            if(this.step < this.text.split('').length){
                this.num++
            }else{
                this.isTypewriter = false
            }
            if(this.num%5===0){
                if(this.step <24){
                    this.step++
                }
                if(this.step >= 24 && this.twoStep <49){
                    this.twoStep++
                }
                if(this.twoStep >= 49 && this.threeStep <73){
                    this.threeStep++
                }
            }
        }
        c.fillStyle = this.color
        c.font = "bold 18px sans-serif"
        let text = this.text.split('').slice(0,this.step)
        let showText = text.join('')
        c.fillText(showText, this.position.x+30, this.position.y+this.addHeight)

        
        if(this.step >= 24){
            let two_text = this.text.split('').slice(24,this.twoStep)
            let two_showText = two_text.join('')
            c.fillText(two_showText, this.position.x+30, this.position.y+this.addHeight+23) 
        }
        if(this.twoStep >= 49){
            let three_text = this.text.split('').slice(49,this.threeStep)
            let three_showText = three_text.join('')
            c.fillText(three_showText, this.position.x+30, this.position.y+this.addHeight+46) 
        }
    }
}

class Button{
    constructor({image, w, h, x, y, name=null, multiple=1.05}){
        this.width = w
        this.height = h
        this.oldWidth = w
        this.oldHeight = h
        this.bigWidth = w*multiple
        this.bigHeight = h*multiple
        this.position = {
            x,y
        }
        this.name = name
        this.multiple = multiple
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
class Talk{
    constructor({image, w, h, x, y, name=null, isShow=false}){
        this.width = w
        this.height = h
        this.position = {
            x,y
        }
        this.show = isShow
        this.name = name
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