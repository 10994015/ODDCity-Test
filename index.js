const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width =16 * 90
canvas.height = 9 *90


let scrollOffset =-2400
let isStart = false
const player = new Player()

const createImage = (imgSrc)=>{
    const image = new Image();
    image.src = imgSrc
    return image
}

const backgruond = new Backgruond({
    position:{
        x:0, y:0
    },
    image :createImage('./images/bg.png'),
})

const interactions = [
    new Interaction({x:2973, y:481, w:147, h:218, name:'supermarket'}),
    new Interaction({x:3269, y:177, w:451, h:262, name:'occupy'}),
    new Interaction({x:4010, y:177, w:375, h:262, name:'hoard'}),
]
const dynamics = [
    
]        
const bus = new Bus({x:200, y:461, w:1024, h:825/2.7, image:createImage('./images/bus.png')})
const supermarket = new Room({image:createImage('./images/supermarket.png')});

let playerTalkX = canvas.width-(canvas.width-canvas.height*0.8*1.844)/2
let playerTalkXY= canvas.height-(canvas.height-canvas.height*0.8)/2
let mesterTalkX = (canvas.width-canvas.height*0.8*1.844)/2 + 100
let mesterTalkY = 355
//occupy
const occupy = new Room({image:createImage('./images/occupy.png')});
const occupys = [
    new Shared({x:950, y:355, w:383/2, h:774/2, image: createImage('./images/occupys/sitdown.png'), isPeople:true, isEnlarge:true, nmae:'sitdown'}),
    new Shared({x:235, y:480, w:134.784, h:40, image: createImage('./images/occupys/a1.png'),}),
    new Shared({x:290, y:535, w:91/2.8, h:137/2.8, image: createImage('./images/occupys/b1.png')}),
    new Shared({x:20, y:255, w:223, h:795, image: createImage('./images/occupys/people1.png'), isPeople:true, name:'people'}),
    new Shared({x:playerTalkX-(2378/4.5), y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/1.png'), isTalk:true, isEnlarge:true, multiple:1, name:'1'}),
    new Shared({x:playerTalkX-(2378/4.5), y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10A.png'), isTalk:true, isEnlarge:true, multiple:1, name:'3A'}),
    new Shared({x:playerTalkX-(2378/4.5), y:playerTalkXY-630/4.5*2, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/3B.png'), isTalk:true, isEnlarge:true, multiple:1, name:'3B'}),
    new Shared({x:playerTalkX-(2378/4.5), y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/5A.png'), isTalk:true, isEnlarge:true, multiple:1, name:'5A'}),
    new Shared({x:playerTalkX-(2378/4.5), y:playerTalkXY-630/4.5*2, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/5B.png'), isTalk:true, isEnlarge:true, multiple:1, name:'5B'}),
    new Shared({x:playerTalkX-(2378/4.5), y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/7.png'), isTalk:true, isEnlarge:true, multiple:1, name:'7'}),
    new Shared({x:playerTalkX-(2378/4.5), y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10A.png'), isTalk:true, isEnlarge:true, multiple:1, name:'10A'}),
    new Shared({x:playerTalkX-(2378/4.5), y:playerTalkXY-630/4.5*2, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10B.png'), isTalk:true, isEnlarge:true, multiple:1, name:'10B'}),
    new Shared({x:playerTalkX-(2378/4.5), y:playerTalkXY-630/4.5*3, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10C.png'), isTalk:true, isEnlarge:true, multiple:1, name:'10C'}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/4.png'), isTalk:true, isEnlarge:true, multiple:1, name:'4'}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/6A.png'), isTalk:true, isEnlarge:true, multiple:1, name:'6A'}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/6B.png'), isTalk:true, isEnlarge:true, multiple:1, name:'6B'}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/8.png'), isTalk:true, isEnlarge:true, multiple:1, name:'8'}),
]


let isRoomOpen = false;

const roomOpen = {
    supermarket:false,
    occupy:false,
}

const keys = {
    right:{
        pressed:false
    },
    left:{
        pressed:false
    },
    up:{
        pressed:false
    }
}
let busRun = false;
let openAnim = null
let busSpeed = 10
openAnim = setInterval(()=>{
    if(backgruond.position.x <=  -935){
        if(busSpeed > 2 ){
            busSpeed = busSpeed - 0.05
        }
    }
    scrollOffset += busSpeed
    backgruond.position.x -= busSpeed
    
    player.position.x -= busSpeed
    interactions.forEach(item=>{
        item.position.x -= busSpeed
    })
    if(backgruond.position.x <= -2400){
        clearInterval(openAnim)
        scrollOffset = 0
        isStart = true
        bus.run = false
    }
    if(scrollOffset > -1500){
        busRun = true
    }
}, 0)

let busPos = 1.5
function animate(){
    window.requestAnimationFrame(animate)
    backgruond.draw()

    player.velocity.x = 0
    if((keys.right.pressed && player.position.x < 600) || (keys.right.pressed && scrollOffset>= 15400)){
        if(player.position.x < 1295){
            player.velocity.x = player.speed
        }
    }else if(keys.left.pressed && player.position.x >50){
        player.velocity.x = -player.speed
    }else{
        player.velocity.x = 0
        if(keys.right.pressed){
            scrollOffset += player.speed
            bus.position.x -= player.speed *0.66
            backgruond.position.x -= player.speed *0.66
            interactions.forEach(item=>{
                item.position.x -= player.speed *0.66
            })
            
        }else if(keys.left.pressed){
            if(scrollOffset > 0){
                scrollOffset -=player.speed
                backgruond.position.x += player.speed *0.66
                bus.position.x += player.speed *0.66
                interactions.forEach(item=>{
                    item.position.x += player.speed *0.66
                })
            }
        }
    }

    interactions.forEach(interaction=>{
        interaction.draw()
    })
    dynamics.forEach(dynamic=>{
        dynamic.draw()
    })

    bus.update()
    if(busRun){
       if(bus.position.x > -600){
        bus.position.x -= 1.6
       }
        
    }
    player.draw()
    player.update()

    if(roomOpen.supermarket && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        supermarket.draw()
    }
    if(roomOpen.occupy && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        occupy.draw()
        occupys.forEach(occupy=>{
            if(occupy.show){
                occupy.draw()
            }
        })
    }
    
}

animate()

