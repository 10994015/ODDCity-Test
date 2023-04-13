const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width =16 * 90
canvas.height = 9 *90


let scrollOffset =-2400

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
    new Interaction({x:2889, y:481, w:142, h:218, name:'supermarket'}),
    new Interaction({x:3176, y:177, w:440, h:262, name:'occupy'}),
    new Interaction({x:4010, y:177, w:375, h:262, name:'hoard'}),
]
const dynamics = [
    
]
const bus = new Bus({x:200, y:461, w:2660/2.8, h:837/2.8, image:createImage('./images/bus.png')})
const supermarket = new Room({image:createImage('./images/supermarket.png')});

//occupy
const occupy = new Room({image:createImage('./images/occupy.png')});
const occupys = [
    new Shared({x:235, y:500, w:134.784, h:40, image: createImage('./images/occupys/a1.png')}),
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
    if(backgruond.position.x <= -1300){
        if(busSpeed > 1 ){
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
        console.log(scrollOffset);
    }
    if(scrollOffset > -1500){
        busRun = true
    }
    console.log(scrollOffset);
}, 20)

let busPos = 1.5
function animate(){
    window.requestAnimationFrame(animate)
    backgruond.draw()

    player.velocity.x = 0
    if((keys.right.pressed && player.position.x < 600) || (keys.right.pressed && scrollOffset>= 15400)){
        if(player.position.x < 2500){
            player.velocity.x = player.speed
        }
    }else if(keys.left.pressed && player.position.x >50){
        player.velocity.x = -player.speed
    }else{
        player.velocity.x = 0
        if(keys.right.pressed){
            scrollOffset += player.speed
            backgruond.position.x -= player.speed *0.66
            interactions.forEach(item=>{
                item.position.x -= player.speed *0.66
            })
            
        }else if(keys.left.pressed){
            if(scrollOffset > 0){
                scrollOffset -=player.speed
                backgruond.position.x += player.speed *0.66

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

    bus.draw()
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
            occupy.draw()
        })
    }
    
}

animate()

