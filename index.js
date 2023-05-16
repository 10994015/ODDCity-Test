const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width =16 * 90
canvas.height = 9 *90

let globalClick = false //全局可以按
let isTeaching = true //教學
const CG = {
    cool:{
        isPeace:true
    },
    occupy:{
        isPeace:true
    },
    hoard:{
        isPeace:true
    },
    network:{
        isPeace:true
    },
    noisy:{
        isPeace:true
    },
    delay:{
        isPeace:true
    },
}
//好:1 壞:0
const getCG = {
    cool:[],
    occupy:[],
    hoard:[],
    network:[],
    noisy:[],
    delay:[],
}
let occupyInteractiveBtn = false

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
const phone = new Interaction({x:1320, y:50, w:308/4.5, h:492/4.5, name:'phone',image: createImage('./images/buttons/phone.png'), multiple:1.05, isShow:true, isEnlarge:false})
const interactions = [
    new Interaction({x:2973, y:481, w:147, h:218, name:'cool', isShow:false}),
    new Interaction({x:3750, y:450, w:60, h:60, name:'occupy', image: createImage('./images/buttons/in2f.png'), multiple:1.05, isShow:false, }),
    new Interaction({x:4170, y:500, w:455, h:225, name:'hoard', isShow:false}),
    new Interaction({x:4170, y:200, w:455, h:225, name:'network', isShow:false}),
    new Interaction({x:4895, y:200, w:455, h:225, name:'noisy', isShow:false}),
    new Interaction({x:4895, y:500, w:455, h:225, name:'delay', isShow:false}),

]
const talks = [
    new Talk({x:3780 -3318/15, y:350, w:3318/15, h:1604/15, name:'occupy', image: createImage('./images/talks/enter2f_.png'),isShow:false, direction:1650}),
]
const dynamics = [
    
]        
let gameStart = false
const bus = new Bus({x:200, y:461, w:1024, h:825/2.7, image:createImage('./images/bus3.png')})
const cool = new Room({image:createImage('./images/cool.png')});
const occupy = new Room({image:createImage('./images/occupy.png')});
const hoard = new Room({image:createImage('./images/hoard.png')})
const network = new Room({image:createImage('./images/network.png')})
const noisy = new Room({image:createImage('./images/noisy.png')})
const delay = new Room({image:createImage('./images/delay.png')})

let playerTalkX = canvas.width-(canvas.width-canvas.height*0.8*1.844)/2
let playerTalkXY= canvas.height-(canvas.height-canvas.height*0.8)/2
let mesterTalkX = (canvas.width-canvas.height*0.8*1.844)/2 + 100
let mesterTalkY = 355

let startNav = true;
let getOff = false;
const starts = {
    start01: new Interaction({x:2650, y:330, w:6110/13, h:1641/13, name:'start01',image: createImage('./images/starts/talk/01.png'), multiple:1, isShow:false  }),
    start01Btn: new Interaction({x:2650+6110/13 - 80, y:330+1641/13-75, w:112/2, h:68/2, name:'start01Btn',image: createImage('./images/buttons/chk.png'), multiple:1.05, isShow:false, isEnlarge:true  }),
    start02: new Interaction({x:2650, y:330, w:6110/13, h:1641/13, name:'start02',image: createImage('./images/starts/talk/02.png'), multiple:1, isShow:false  }),
    skip: new Interaction({x:2650+6110/13 - 80, y:380, w:333/6, h:202/6, name:'skip',image: createImage('./images/buttons/Skip.png'), isEnlarge: false, multiple:1.05, isShow:false  }),
    chk2: new Interaction({x:2650+6110/13 - 80 - 333/6 -20, y:380, w:333/6, h:202/6, name:'chk2',image: createImage('./images/buttons/chk.png'), isEnlarge: false, multiple:1.05, isShow:false  }),
    start03: new Interaction({x:2650, y:330, w:6110/13, h:1641/13, name:'start03',image: createImage('./images/starts/talk/03.png'), multiple:1, isShow:false  }),
    start04: new Interaction({x:2650, y:330, w:6110/13, h:1641/13, name:'start04',image: createImage('./images/starts/talk/04.png'), multiple:1, isShow:false  }),
    start05: new Interaction({x:3100, y:330, w:3318/13, h:1639/13, name:'start05',image: createImage('./images/starts/talk/05.png'), multiple:1, isShow:false  }),


    start07: new Interaction({x:3300, y:330, w:6110/13, h:1641/13, name:'start07',image: createImage('./images/starts/talk/07.png'), multiple:1, isShow:false  }),
    start08: new Interaction({x:3300, y:165, w:6110/13, h:1641/13, name:'start08',image: createImage('./images/starts/talk/08.png'), multiple:1, isShow:false  }),
    start09: new Interaction({x:2900, y:330, w:6110/13, h:1641/13, name:'start09',image: createImage('./images/starts/talk/09.png'), multiple:1, isShow:false  }),
    start10: new Interaction({x:2900, y:330, w:6110/13, h:1641/13, name:'start10',image: createImage('./images/starts/talk/010.png'), multiple:1, isShow:false  }),
}
// const skip = new Interaction({x:20, y:650, w:333/4.5, h:202/4.5, name:'skip',image: createImage('./images/buttons/Skip.png'), isEnlarge: true, multiple:1.05, isShow:true  })
const cools = {
    cup: new Shared({x:280, y:190, w:300/2.9, h:125/2.9, image: createImage('./images/cool/cup.png'),name:'cup'}),
    people: new Shared({x:160, y:170, w:316/1.8, h:679/1.8, image:createImage('./images/cool/people1.png'), isPeople:true, name:'people', isShow:true}),
    talkPeople: new Shared({x:50, y:450, w:316/1.1, h:679/1.1, image:createImage('./images/cool/people1.png'), isPeople:true, name:'talkPeople', isShow:false}),
    talk1: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/1.png'), isTalk:true, isEnlarge:true, multiple:1.02, name:'1', isShow:true,}),
    talk001: new Shared({x:playerTalkX-(2378/4.5)-175, y:playerTalkXY-630/4.5 - 630/4.5 - 10, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/001.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'001', isShow:true,}),
    talk1001: new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:3149/4.5, h:484/4.5, image: createImage('./images/cool/talk/1001.png'), isTalk:true, isEnlarge:false, multiple:1, name:'1001', isShow:false ,}),
    talk002:new Shared({x:canvas.width/2 - (3149/4.5)/2  + 30, y:canvas.height/2 - (484/4.5) - 60, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/002.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'002', isShow:false,}),
    talk3: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/3.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'3', isShow:false,}),

    talk4A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/4A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'4A', isShow:false}),
    talk4B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/4B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'4B', isShow:false}),
    talk003: new Shared({x:playerTalkX-(2378/4.5)-40, y:playerTalkXY-630/4.5*3+15, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/003.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'003', isShow:false}),
    
    
    talk6: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/6.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'6', isShow:false}),
    talk8: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/8.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'8', isShow:false}),
    talk10A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/10A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10A', isShow:false}),
    talk10B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/10B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10B', isShow:false}),

    
    
    
    response5A: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'5A', isShow:false, text:"沒有...", isTypewriter:true }),
    response5B: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'5B', isShow:false, text:"我又沒有...打擾到別人...", isTypewriter:true }),
    response7: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'7', isShow:false, text:"因為這邊...很涼爽...，外面...很熱...", isTypewriter:true }),
    response9: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'9', isShow:false, text:"冷氣很貴...不想浪費錢...", isTypewriter:true }),
    response11A: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'11A', isShow:false, text:"啊...會這樣嗎...那好吧 .等等就...離開", isTypewriter:true }),
    response11B: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'11B', isShow:false, text:"...我很喜歡這裡...所以...我不走...", isTypewriter:true }),

    
    talk004: new Shared({x:mesterTalkX - 30, y:mesterTalkY-630/4.5 , w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/004.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'004', isShow:false,}),

    end: new Shared({x:canvas.width/2 - (398/1)/2 , y:canvas.height/2 - (232/1)/2  , w:398/1, h:232/1, image: createImage('./images/goodend.png'), isEnlarge:false, multiple:1, name:'end', isShow:false,}),

    talk005: new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (484/4.5) - 100, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/005.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'005', isShow:false,}),
    talk006: new Shared({x:canvas.width/2 - (3149/4.5)/2 , y:canvas.height/2 - (484/4.5) - 100, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/006.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'006', isShow:false,}),
    talk06: new Shared({x:canvas.width -2378/4.8 - 80  , y:80, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/06.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'06', isShow:false,}),

    chk: new Shared({x:canvas.width/2 - (112/2)/2 + 300, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk', isShow:false ,}),

}
const occupys = {
    a1: new Shared({x:235, y:480, w:134.784, h:40, image: createImage('./images/occupys/a1.png'),}),
    b1: new Shared({x:290, y:535, w:91/2.8, h:137/2.8, image: createImage('./images/occupys/b1.png')}),
    c1: new Shared({x:395, y:490, w:258/2.8, h:126/2.8, image: createImage('./images/occupys/c1.png')}),
    d1: new Shared({x:455, y:680, w:132/2.6, h:103/2.6, image: createImage('./images/occupys/d1.png')}),
    e1: new Shared({x:570, y:550, w:110/2.4, h:113/2.4, image: createImage('./images/occupys/e1.png')}),
    f1: new Shared({x:670, y:538, w:654/3.4, h:178/3.2, image: createImage('./images/occupys/f1.png')}),
    g1: new Shared({x:835, y:460, w:122/2.7, h:233/2.7, image: createImage('./images/occupys/g1.png')}),
    h1: new Shared({x:880, y:530, w:259/2.7, h:138/2.7, image: createImage('./images/occupys/h1.png')}),
    i1: new Shared({x:1030, y:415, w:331/2.9, h:158/2.8, image: createImage('./images/occupys/i1.png')}),
    j1: new Shared({x:1120, y:680, w:134/2.9, h:89/2.8, image: createImage('./images/occupys/j1.png')}),
    sitdown: new Shared({x:950, y:355, w:383/2, h:774/2, image: createImage('./images/occupys/sitdown.png'), isPeople:true, isEnlarge:true, name:'sitdown', multiple:1.05}),
    people: new Shared({x:20, y:255, w:223, h:795, image: createImage('./images/occupys/people1.png'), isPeople:true, name:'people', isShow:false}),
    talk1: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/1.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'1', isShow:false,}),
    talk3A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/3A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'3A', isShow:false}),
    talk3B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/3B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'3B', isShow:false}),
    talk5A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/5A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'5A', isShow:false}),
    talk5B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/5B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'5B', isShow:false}),
    talk7: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/7.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'7', isShow:false}),
    talk10A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10A', isShow:false}),
    talk10B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10B', isShow:false}),
    talk10C: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*3-30, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10C.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10C', isShow:false}),
    response2: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'2', isShow:false, text:"啊林北就累了！這裡不就是給人休息的逆？", isTypewriter:true }),
    response4: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'4', isShow:false ,text:"你管老子那麼多幹嘛！", isTypewriter:true}),
    response6A: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'6A', isShow:false , text:"但林北實在累到快昏倒，天氣熱、腳又酸，偏偏這條街上可以休息德地方少的可憐餒", isTypewriter:true}),
    response6B: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'6B', isShow:false ,text:"洗勒考喔！是在趕狗出去喔！", isTypewriter:true}),
    response8: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'8', isShow:false ,text:"賀啦！也算是多虧這家店，林北才有地方休息，林北會盡量不影響其他人啦！", isTypewriter:true}),
    response9: new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (482/4.5)/2, w:3149/4.5, h:485/4.5, image: createImage('./images/occupys/talk/9.png'), isTalk:true, isEnlarge:false, multiple:1, name:'9', isShow:false ,}),
    chk: new Shared({x:canvas.width/2 - (112/2)/2 + 300, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk', isShow:false ,}),


    end: new Shared({x:canvas.width/2 - (398/1)/2 , y:canvas.height/2 - (232/1)/2  , w:398/1, h:232/1, image: createImage('./images/goodend.png'), isEnlarge:false, multiple:1, name:'end', isShow:false,}),

}

const hoards = {
    inter1: new Shared({x:891, y:549, w:508/2.93, h:372/2.93, image: createImage('./images/hoards/inter/1.png'), name:'inter1', multiple:1}),
    inter2: new Shared({x:373, y:324, w:990/2.9, h:519/2.9, image: createImage('./images/hoards/inter/2.png'), name:'inter2', multiple:1}),
    inter3: new Shared({x:757, y:385, w:312/2.7, h:341/2.7, image: createImage('./images/hoards/inter/3.png'), name:'inter3', multiple:1}),
    inter4: new Shared({x:1107, y:375, w:540/2.8, h:730/2.8, image: createImage('./images/hoards/inter/4.png'), name:'inter4', multiple:1}),
    inter5: new Shared({x:160, y:490, w:1295/2.85, h:647/2.85, image: createImage('./images/hoards/inter/5.png'), name:'inter5', multiple:1}),
    inter6: new Shared({x:615, y:562, w:802/2.9, h:391/2.9, image: createImage('./images/hoards/inter/6.png'), name:'inter6', multiple:1}),
    inter7: new Shared({x:932, y:346, w:518/2.9, h:400/2.9, image: createImage('./images/hoards/inter/7.png'), name:'inter7', multiple:1}),
    inter8: new Shared({x:380, y:117, w:919/2.9, h:208/2.9, image: createImage('./images/hoards/inter/8.png'), name:'inter8', multiple:1}),
    hold: new Shared({x:765, y:420, w:753/1.8, h:450/1.8, image: createImage('./images/hoards/hold.png'), name:"hold"}),

    inter1Ok: new Shared({x:891 + (508/2.93)/2, y:549 + (372/2.93)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter1', isShow:false,}),
    inter2Ok: new Shared({x:373 + (990/2.9)/2, y:324 + (519/2.9)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter2', isShow:false,}),
    inter3Ok: new Shared({x:757 + (312/2.7)/2, y:385 + (341/2.7)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter3', isShow:false,}),
    inter4Ok: new Shared({x:1107 + (540/2.8)/2,y:375 + (730/2.8)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter4', isShow:false,}),
    inter5Ok: new Shared({x:160 + (1295/2.85)/2, y:490 + (647/2.85)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter5', isShow:false,}),
    inter6Ok: new Shared({x:615 + (802/2.9)/2, y:562 + (391/2.9)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter6', isShow:false,}),
    inter7Ok: new Shared({x:932 + (518/2.9)/2, y:346 + (400/2.9)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter7', isShow:false,}),
    inter8Ok: new Shared({x:380 + (919/2.9)/2, y:117 + (208/2.9)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter8', isShow:false,}),



    s1: new Shared({x:865, y:490, w:391/2, h:209/2, image: createImage('./images/hoards/s1.png'), name:'s1', isEnlarge:false, multiple:1.05, }),
    a1: new Shared({x:1050, y:590, w:177/1.3, h:135/1.3, image: createImage('./images/hoards/a1.png'), name:'a1', isEnlarge:false, multiple:1.05, }),
    b1: new Shared({x:760, y:605, w:222, h:61, image: createImage('./images/hoards/b1.png'), name:'b1', isEnlarge:false, multiple:1.05, }),
    c1: new Shared({x:930, y:560, w:257/1.6, h:234/1.6, image: createImage('./images/hoards/c1.png'), name:'c1', isEnlarge:false, multiple:1.05}),
    d1: new Shared({x:865, y:625, w:99, h:72, image: createImage('./images/hoards/d1.png'), name:'d1', isEnlarge:false, multiple:1.05}),
    e1: new Shared({x:825, y:555, w:222/1.1, h:61/1.1, image: createImage('./images/hoards/e1.png'), name:'e1', isEnlarge:false, multiple:1.05}),
    f1: new Shared({x:1000, y:460, w:259/1.6, h:256/1.6, image: createImage('./images/hoards/f1.png'), name:'f1', isEnlarge:false, multiple:1.05}),
    g1: new Shared({x:940, y:480, w:165/1.8, h:198/1.8, image: createImage('./images/hoards/g1.png'), name:'g1', isEnlarge:false, multiple:1.05}),
    h1: new Shared({x:880, y:550, w:69/1.1, h:33/1.1, image: createImage('./images/hoards/h1.png'), name:'h1', isEnlarge:false, multiple:1.05}),


    talk1: new Shared({x:540, y:420, w:1303/4.6, h:644/4.6, image: createImage('./images/hoards/talk/1.png'), isTalk:false, isEnlarge:true, multiple:1.02, name:'1'}),
    talk2: new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:3149/4.5, h:484/4.5, image: createImage('./images/hoards/talk/2.png'), isTalk:true, isEnlarge:false, multiple:1, name:'2', isShow:false ,}),


    smallPeople: new Shared({x:840, y:300, w:393/1.9, h:749/1.9, image: createImage('./images/hoards/people1.png'), name:"smallPeople", isEnlarge:false, isShow:false, multiple:1}),
    people: new Shared({x:20, y:355, w:393/1.1, h:749/1.1, image: createImage('./images/hoards/people1.png'), isPeople:true, name:'people', isShow:false}),

    talk4: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/4.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'4', isShow:false,}),
    talk6A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/6A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'6A', isShow:false,}),
    talk6B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/6B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'6B', isShow:false}),
    talk8: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/8.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'8', isShow:false,}),
    talk10A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/10A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10A', isShow:false,}),
    talk10B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/10B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10B', isShow:false}),
    talk12: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/12.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'12', isShow:false,}),
    talk16A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/16A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'16A', isShow:false,}),
    talk16B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/16B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'16B', isShow:false}),
    talk16C: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*3-30, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/16C.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'16C', isShow:false}),

    response3: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'3', isShow:false, text:"謝謝你！", isTypewriter:true }),
    response5: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'5', isShow:false, text:"我要放箱子的時候不小心摔了一跤...", isTypewriter:true }),
    response7: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'7', isShow:false, text:"這些東西對我來說很重要！", isTypewriter:true }),
    response9: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'9', isShow:false, text:"這些都是我寶貴的回憶!像這件衣服是我太太生前最喜歡的款式,還有這個雜誌和飲料是...", isTypewriter:true }),
    response11: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'11', isShow:false, text:"說實話,我想整理也沒有辦法·東西這麼多我一個人根本收拾不來,只能一直堆積、越來越亂。", isTypewriter:true }),
    response13: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'13', isShow:false, text:"好啊!你可不能偷偷丟掉我的東西。", isTypewriter:true }),
    response15: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'15', isShow:false, text:"Wow!原來我家是長這樣!好久沒有乾淨的床可以睡覺了。", isTypewriter:true }),

    talk14: new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:3149/4.5, h:484/4.5, image: createImage('./images/hoards/talk/14.png'), isTalk:true, isEnlarge:false, multiple:1, name:'14', isShow:false ,}),
    finish: new Shared({x:canvas.width/2 - (1417/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:1417/4.5, h:484/4.5, image: createImage('./images/hoards/talk/finish.png'), isTalk:true, isEnlarge:false, multiple:1, name:'finish', isShow:false ,}),



    chk: new Shared({x:canvas.width/2 - (112/2)/2 + 300, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk', isShow:false ,}),
    chk2: new Shared({x:canvas.width/2 - (112/2)/2 + 110, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk2', isShow:false ,}),

    end: new Shared({x:canvas.width/2 - (398/1)/2 , y:canvas.height/2 - (232/1)/2  , w:398/1, h:232/1, image: createImage('./images/goodend.png'), isEnlarge:false, multiple:1, name:'end', isShow:false,}),
}
const networks = {
    computer: new Shared({x:940, y:108, w:751/4.2, h:418/4.2, image: createImage('./images/network/computer.png'), name:'computer', isShow:true, isEnlarge:false, multiple:1}),

    smallPeople: new Shared({x:750, y:150, w:306/1.8, h:860/1.8, image: createImage('./images/network/people1.png'), name:"smallPeople", isEnlarge:true, isShow:true, multiple:1}),
    people: new Shared({x:0, y:300, w:306/1.1, h:860/1.1, image: createImage('./images/network/people1.png'), isPeople:true, name:'people', isShow:false}),

    talk2: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/2.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'2', isShow:false,}),
    talk4: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/4.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'4', isShow:false,}),
    talk6: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/6.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'6', isShow:false,}),
    talk8A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/8A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'8A', isShow:false,}),
    talk8B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/8B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'8B', isShow:false}),
    talk10: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/10.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10', isShow:false,}),
    talk11A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/11A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'11A', isShow:false,}),
    talk11B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/11B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'11B', isShow:false}),
    talk13A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/13A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'13A', isShow:false,}),
    talk13B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/13B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'13B', isShow:false}),

    response1: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'1', isShow:false, text:"...", isTypewriter:true }),
    response3: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'3', isShow:false, text:"看有沒有漏掉的訊息。", isTypewriter:true }),
    response5: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'5', isShow:false, text:"...", isTypewriter:true }),
    response7: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'7', isShow:false, text:"蛤你剛剛說什麼？", isTypewriter:true }),
    response9A: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'9A', isShow:false, text:"可是不時常確認手機訊息會讓我很焦慮。", isTypewriter:true }),
    response9B: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'9B', isShow:false, text:"社交恐懼並不代表是邊緣人好嗎！", isTypewriter:true }),
    response11: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'11', isShow:false, text:"社交恐懼並不代表是邊緣人好嗎！", isTypewriter:true }),
    response12: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'12', isShow:false, text:"這和使用手機有什麼關係？", isTypewriter:true }),
    response14: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'14', isShow:false, text:"蛤啊！聽起來好恐怖，那該怎麼辦？", isTypewriter:true }),

    talk15: new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:3149/4.5, h:484/4.5, image: createImage('./images/network/talk/15.png'), isTalk:true, isEnlarge:false, multiple:1, name:'15', isShow:false ,}),

    web: new Shared({x:canvas.width/2 - (1200/1.1)/2, y:canvas.height/2 - (650/1.1)/2, w:1200/1.1, h:650/1.1, image: createImage('./images/network/web/web1.png'), name:'web', isShow:false, isEnlarge:false, multiple:1}),
    left: new Shared({x:canvas.width/2 - (1200/1.1)/2 + 25, y:canvas.height/2 - (418/8)/2 + 20, w:418/8, h:418/8, image: createImage('./images/network/left.png'), isEnlarge:false, multiple:1, name:'left', isShow:false ,}),
    right: new Shared({x:canvas.width/2 - (1200/1.1)/2 + 1200/1.1 - 25 - (418/8), y:canvas.height/2 - (418/8)/2 + 20, w:418/8, h:418/8, image: createImage('./images/network/right.png'), isEnlarge:false, multiple:1, name:'right', isShow:false ,}),
    
    web2btn1: new Shared({x:1060, y:373, w:75/1.2, h:76/1.2, image: createImage('./images/network/web2btn1.png'), isTalk:true, isEnlarge:false, multiple:1, name:'web2btn1', isShow:false ,}),
    web2btn2: new Shared({x:1060, y:482, w:75/1.2, h:76/1.2, image: createImage('./images/network/web2btn2.png'), isTalk:true, isEnlarge:false, multiple:1, name:'web2btn2', isShow:false ,}),
    web2btn3: new Shared({x:1060, y:591, w:75/1.2, h:76/1.2, image: createImage('./images/network/web2btn3.png'), isTalk:true, isEnlarge:false, multiple:1, name:'web2btn3', isShow:false ,}),
    web3btn: new Shared({x:400, y:521, w:176/1.2, h:58/1.2, image: createImage('./images/network/web3btn.png'), isTalk:true, isEnlarge:false, multiple:1, name:'web3btn', isShow:false ,}),
    web4btn: new Shared({x:660, y:501, w:281/1.2, h:89/1.2, image: createImage('./images/network/web4btn.png'), isTalk:true, isEnlarge:false, multiple:1, name:'web4btn', isShow:false ,}),
    web5btn: new Shared({x:234, y:455, w:120/1.2, h:53/1.2, image: createImage('./images/network/web5btn.png'), isTalk:true, isEnlarge:false, multiple:1, name:'web5btn', isShow:false ,}),
    web6btn: new Shared({x:885, y:370, w:251/1, h:76/1, image: createImage('./images/network/web6btn.png'), isTalk:true, isEnlarge:false, multiple:1, name:'web6btn', isShow:false ,}),
    goback: new Shared({x:canvas.width/2 - (145/1.2)/2, y:600, w:145/1.2, h:52/1.2, image: createImage('./images/network/goback.png'), isTalk:true, isEnlarge:false, multiple:1, name:'goback', isShow:false ,}),

    chk: new Shared({x:canvas.width/2 - (112/2)/2 + 300, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk', isShow:false ,}),

    end: new Shared({x:canvas.width/2 - (398/1)/2 , y:canvas.height/2 - (232/1)/2  , w:398/1, h:232/1, image: createImage('./images/goodend.png'), isEnlarge:false, multiple:1, name:'end', isShow:false,}),

}
const noisys = {
    wall1: new Shared({x:440, y:127, w:275/2.9, h:104/2.9, image: createImage('./images/noisy/wall1.png'), name:'wall1', multiple:1, isEnlarge:false}),
    wall2: new Shared({x:543, y:230, w:275/2.9, h:104/2.9, image: createImage('./images/noisy/wall2.png'), name:'wall2', multiple:1, isEnlarge:false}),
    wall3: new Shared({x:595, y:178, w:275/2.9, h:104/2.9, image: createImage('./images/noisy/wall3.png'), name:'wall3', multiple:1, isEnlarge:false}),
    wall4: new Shared({x:750, y:127, w:275/2.9, h:104/2.9, image: createImage('./images/noisy/wall4.png'), name:'wall4', multiple:1, isEnlarge:false}),
    wall5: new Shared({x:750, y:230, w:275/2.9, h:104/2.9, image: createImage('./images/noisy/wall5.png'), name:'wall5', multiple:1, isEnlarge:false}),
    wall6: new Shared({x:1062, y:127, w:275/2.89, h:104/2.89, image: createImage('./images/noisy/wall6.png'), name:'wall6', multiple:1, isEnlarge:false}),
    wall7: new Shared({x:1111, y:178, w:275/2.89, h:104/2.89, image: createImage('./images/noisy/wall7.png'), name:'wall7', multiple:1, isEnlarge:false}),

    walltalk1:new Shared({x:450, y:127 + 104/2.9 +10, w:1882/4, h:518/4, image: createImage('./images/noisy/talk/wall1.png'), name:'walltalk1', multiple:1, isEnlarge:false, isShow:false}),
    walltalk1chk: new Shared({x:740, y:127 + 104/2.9 +10 + 518/4/2 , w:112/1.6, h:68/1.6, image: createImage('./images/buttons/chk.png'), name:'walltalk1chk', multiple:1.02, isEnlarge:false, isShow:false}),
    walltalk1cancel: new Shared({x:820, y:127 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/cancel.png'), name:'walltalk1cancel', multiple:1.02, isEnlarge:false, isShow:false}),

    walltalk2: new Shared({x:553, y:230 + 104/2.9 +10, w:1882/4, h:518/4, image: createImage('./images/noisy/talk/wall1.png'), name:'walltalk2', multiple:1, isEnlarge:false, isShow:false}),
    walltalk2chk: new Shared({x:843, y:230 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/chk.png'), name:'walltalk2chk', multiple:1.02, isEnlarge:false, isShow:false}),
    walltalk2cancel: new Shared({x:923, y:230 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/cancel.png'), name:'walltalk2cancel', multiple:1.02, isEnlarge:false, isShow:false}),

    walltalk3: new Shared({x:605, y:178 + 104/2.9 +10, w:1882/4, h:518/4, image: createImage('./images/noisy/talk/wall1.png'), name:'walltalk3', multiple:1, isEnlarge:false, isShow:false}),
    walltalk3chk: new Shared({x:895, y:178 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/chk.png'), name:'walltalk3chk', multiple:1.02, isEnlarge:false, isShow:false}),
    walltalk3cancel: new Shared({x:975, y:178 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/cancel.png'), name:'walltalk3cancel', multiple:1.02, isEnlarge:false, isShow:false}),

    walltalk4: new Shared({x:760, y:127 + 104/2.9 +10, w:1882/4, h:518/4, image: createImage('./images/noisy/talk/wall1.png'), name:'walltalk4', multiple:1, isEnlarge:false, isShow:false}),
    walltalk4chk: new Shared({x:1050, y:127 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/chk.png'), name:'walltalk4chk', multiple:1.02, isEnlarge:false, isShow:false}),
    walltalk4cancel: new Shared({x:1130, y:127 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/cancel.png'), name:'walltalk4cancel', multiple:1.02, isEnlarge:false, isShow:false}),

    walltalk5: new Shared({x:760, y:230 + 104/2.9 +10, w:1882/4, h:518/4, image: createImage('./images/noisy/talk/wall1.png'), name:'walltalk5', multiple:1, isEnlarge:false, isShow:false}),
    walltalk5chk: new Shared({x:1050, y:230 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/chk.png'), name:'walltalk5chk', multiple:1.02, isEnlarge:false, isShow:false}),
    walltalk5cancel: new Shared({x:1130, y:230 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/cancel.png'), name:'walltalk5cancel', multiple:1.02, isEnlarge:false, isShow:false}),

    walltalk6: new Shared({x:1062 - 1882/4 + 80, y:127 + 104/2.9 +10, w:1882/4, h:518/4, image: createImage('./images/noisy/talk/wall2.png'), name:'walltalk6', multiple:1, isEnlarge:false, isShow:false}),
    walltalk6chk: new Shared({x:1062 - 1882/4 + 80 + 290, y:127 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/chk.png'), name:'walltalk6chk', multiple:1.02, isEnlarge:false, isShow:false}),
    walltalk6cancel: new Shared({x:1062 - 1882/4 + 80 + 370, y:127 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/cancel.png'), name:'walltalk6cancel', multiple:1.02, isEnlarge:false, isShow:false}),

    walltalk7: new Shared({x:1111 - 1882/4 + 80, y:178 + 104/2.9 +10, w:1882/4, h:518/4, image: createImage('./images/noisy/talk/wall2.png'), name:'walltalk7', multiple:1, isEnlarge:false, isShow:false}),
    walltalk7chk: new Shared({x:1111 - 1882/4 + 80 + 290, y:178 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/chk.png'), name:'walltalk7chk', multiple:1.02, isEnlarge:false, isShow:false}),
    walltalk7cancel: new Shared({x:1111 - 1882/4 + 80 + 370, y:178 + 104/2.9 +10 + 518/4/2, w:112/1.6, h:68/1.6, image: createImage('./images/buttons/cancel.png'), name:'walltalk7cancel', multiple:1.02, isEnlarge:false, isShow:false}),

    smallPeople: new Shared({x:1110, y:200, w:518, h:432, image: createImage('./images/noisy/smallPeople.png'), name:"smallPeople", isEnlarge:true, isShow:true, multiple:1, frmaeNum:3}),
    people: new Shared({x:0, y:300, w:306/1.1, h:860/1.1, image: createImage('./images/noisy/people1.png'), isPeople:true, name:'people', isShow:false}),
    talk1A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/noisy/talk/1A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'1A', isShow:false,}),
    talk1B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/noisy/talk/1B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'1B', isShow:false}),
    talk3: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/noisy/talk/3.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'3', isShow:false,}),
    talk4A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/noisy/talk/4A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'4A', isShow:false,}),
    talk4B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/noisy/talk/4B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'4B', isShow:false}),
    
    response2A: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'2A', isShow:false, text:"不是我弄的...我一直都很安靜，但周圍總是有咚咚咚的聲音", isTypewriter:true }),
    response2B: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'2B', isShow:false, text:"乾你啥事？這是我的房間，我愛幹嘛就幹嘛！", isTypewriter:true }),
    response5A: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'5A', isShow:false, text:"原來如此，我馬上處理！", isTypewriter:true }),
    response5B: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'5B', isShow:false, text:"所以呢？難道你要幫我處理嗎？", isTypewriter:true }),
    response7A: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'7A', isShow:false, text:"這樣我就不會被鄰居投訴了～謝謝你的發現！", isTypewriter:true }),
    response7B: new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'7B', isShow:false, text:"謝謝你的雞婆~我是不會付什麼修繕費的喔。", isTypewriter:true }),

    talk6: new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:3149/4.5, h:484/4.5, image: createImage('./images/noisy/talk/6.png'), isTalk:true, isEnlarge:false, multiple:1, name:'6', isShow:false ,}),
    
    chk: new Shared({x:canvas.width/2 - (112/2)/2 + 300, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk', isShow:false ,}),

    // new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/2.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'2', isShow:false,}),
    A: new Shared({x:canvas.width/2 - (1485/4)/2 , y:canvas.height/2 - (484/4)/2  , w:1485/4, h:484/4, image: createImage('./images/noisy/talk/A.png'), isEnlarge:false, multiple:1, name:'A', isShow:false,}),
    B: new Shared({x:canvas.width/2 - (1485/4)/2 , y:canvas.height/2 - (484/4)/2  , w:1485/4, h:484/4, image: createImage('./images/noisy/talk/B.png'), isEnlarge:false, multiple:1, name:'B', isShow:false,}),
    end: new Shared({x:canvas.width/2 - (398/1)/2 , y:canvas.height/2 - (232/1)/2  , w:398/1, h:232/1, image: createImage('./images/goodend.png'), isEnlarge:false, multiple:1, name:'end', isShow:false,}),
}
const delays = {
    count: new Shared({x:150, y:670, w:300/3.5, h:137/3.5, image: createImage('./images/delays/talk/0-4.png'), name:'count', multiple:1, isEnlarge:false, isShow:false}),
    CG1: new Shared({x:155, y:100, w:147/1.9, h:182/1.9, image: createImage('./images/delays/CG1.png'), name:'CG1', multiple:1.2, isEnlarge:false, isShow:false}),
    CG2: new Shared({x:830, y:140, w:164/1.9, h:207/1.9, image: createImage('./images/delays/CG2.png'), name:'CG2', multiple:1.2, isEnlarge:false, isShow:false}),
    battery1: new Shared({x:170, y:549, w:70/1.8, h:26/1.8, image: createImage('./images/delays/battery1.png'), name:'battery1', multiple:1.2, isEnlarge:false, isShow:false}),
    battery2: new Shared({x:500, y:591,  w:97/1.8, h:34/1.8, image: createImage('./images/delays/battery2.png'), name:'battery2', multiple:1.2, isEnlarge:false, isShow:false}),
    battery3: new Shared({x:815, y:620,  w:97/1.8, h:36/1.8, image: createImage('./images/delays/battery3.png'), name:'battery3', multiple:1.2, isEnlarge:false, isShow:false}),
    battery4: new Shared({x:1135, y:635,  w:77/1.8, h:29/1.8, image: createImage('./images/delays/battery4.png'), name:'battery4', multiple:1.2, isEnlarge:false, isShow:false}),
    a1: new Shared({x:420, y:560,  w:529/2, h:176/2, image: createImage('./images/delays/a1.png'), name:'a1', multiple:1.05, isEnlarge:false, isShow:false}),
    b1: new Shared({x:795, y:585,  w:149/1.8, h:112/1.8, image: createImage('./images/delays/b1.png'), name:'b1', multiple:1.05, isEnlarge:false, isShow:false}),
    c1: new Shared({x:1172, y:578,  w:152/1.8, h:138/1.8, image: createImage('./images/delays/c1.png'), name:'c1', multiple:1.05, isEnlarge:false, isShow:false}),
    d1: new Shared({x:795, y:522,  w:146/1.8, h:114/1.8, image: createImage('./images/delays/d1.png'), name:'d1', multiple:1.05, isEnlarge:false, isShow:false}),
    a2: new Shared({x:760, y:335,  w:512/1.9, h:165/1.9, image: createImage('./images/delays/a2.png'), name:'a2', multiple:1.05, isEnlarge:false, isShow:false}),
    b2: new Shared({x:1135, y:209,  w:108/2.05, h:143/2.05, image: createImage('./images/delays/b2.png'), name:'b2', multiple:1.05, isEnlarge:false, isShow:false}),
    c2: new Shared({x:345, y:209,  w:113/1.9, h:148/1.9, image: createImage('./images/delays/c2.png'), name:'c2', multiple:1.05, isEnlarge:false, isShow:false}),
    d2: new Shared({x:1195, y:209,  w:113/2.05, h:142/2.05, image: createImage('./images/delays/d2.png'), name:'d2', multiple:1.05, isEnlarge:false, isShow:false}),


    people: new Shared({x:0, y:300, w:394/1.1, h:840/1.1, image: createImage('./images/delays/people1.png'), isPeople:true, name:'people', isShow:false}),
    talk1: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/delays/talk/1.png'), isTalk:true, isEnlarge:true, multiple:1.02, name:'1', isShow:true,}),
    talk4: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/delays/talk/4.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'4', isShow:false,}),
    talk6: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/delays/talk/6.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'6', isShow:false,}),
    talk8A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/delays/talk/8A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'8A', isShow:false,}),
    talk8B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/delays/talk/8B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'8B', isShow:false}),
    talk8C: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*3-30, w:2378/4.5, h:630/4.5, image: createImage('./images/delays/talk/8C.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'8C', isShow:false}),

    talk9: new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:3149/4.5, h:484/4.5, image: createImage('./images/delays/talk/9.png'), isTalk:true, isEnlarge:false, multiple:1, name:'9', isShow:false ,}),
    talk11: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/delays/talk/11.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'11', isShow:false,}),
    talk13A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/delays/talk/13A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'13A', isShow:false,}),
    talk13B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/delays/talk/13B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'13B', isShow:false}),
    talk16A: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/delays/talk/16A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'16A', isShow:false,}),
    talk16B: new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/delays/talk/16B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'16B', isShow:false}),



    response2: new Shared({x:mesterTalkX+5, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'2', isShow:false, text:"我馬上就到了！等我一下！", isTypewriter:true }),
    talk3: new Shared({x:canvas.width/2 - (2412/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:2412/4.5, h:484/4.5, image: createImage('./images/delays/talk/3.png'), isTalk:true, isEnlarge:false, multiple:1, name:'3', isShow:false,}),
    response5: new Shared({x:mesterTalkX+5, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'5', isShow:false, text:"抱歉阿，今天路上剛好塞車。", isTypewriter:true }),
    talk7: new Shared({x:canvas.width/2 - (2412/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:2412/4.5, h:484/4.5, image: createImage('./images/delays/talk/7.png'), isTalk:true, isEnlarge:false, multiple:1, name:'7', isShow:false,  }),
    response10: new Shared({x:mesterTalkX+5, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'10', isShow:false, text:"啊！你怎麼在這？", isTypewriter:true }),
    response12: new Shared({x:mesterTalkX+5, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'12', isShow:false, text:"喔...", isTypewriter:true }),
    response14A: new Shared({x:mesterTalkX+5, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'14A', isShow:false, text:"對不起！我怕你覺得我不守時，就撒了謊...", isTypewriter:true }),
    response14B: new Shared({x:mesterTalkX+5, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'14B', isShow:false, text:"你就多等我一會啦！又不會少塊肉...", isTypewriter:true }),
    response15: new Shared({x:mesterTalkX+5, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'15', isShow:false, text:"原諒我好嗎？", isTypewriter:true }),
    response17A: new Shared({x:mesterTalkX+5, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'17A', isShow:false, text:"我會的！非常抱歉！", isTypewriter:true }),
    response17B: new Shared({xresponse:mesterTalkX+5, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/network/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'17B', isShow:false, text:"(聳肩)真小氣...", isTypewriter:true }),

    chk: new Shared({x:canvas.width/2 - (112/2)/2 + 300, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk', isShow:false ,}),

    end: new Shared({x:canvas.width/2 - (398/1)/2 , y:canvas.height/2 - (232/1)/2  , w:398/1, h:232/1, image: createImage('./images/goodend.png'), isEnlarge:false, multiple:1, name:'end', isShow:false,}),
}
const buttons = {
    close: new Button({x:(canvas.width - ( canvas.height*0.8*1.844 ))/2 + canvas.height*0.8*1.844 - 10,y:(canvas.height - canvas.height *0.8)/2 - 50, w:418/9, h:418/9, image: createImage('./images/buttons/close.png'), name:"close", multiple:1.05}),
    // in2f:  new Button({x: 3750, y:450, w:60, h:60, name:'in2f', isMove:true, image: createImage('./images/buttons/in2f.png'),}),
}

let isRoomOpen = false;
const roomOpen = {
    cool:false,
    occupy:false,
    hoard:false,
    network:false,
    noisy:false,
    delay:false,
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
let beginningBool = true
setTimeout(()=>{
    beginnings.loading.show = false
    beginnings.chk1.show = true
    beginnings.chk1.enlarge = true
}, 1000)
const beginnings = {
    model: new Shared({x:canvas.width/2 - (2078/5)/2, y:canvas.height/2 - (2121/5)/2, w:2078/5, h:2121/5, image: createImage('./images/beginning/model1.png'), isTalk:true, isEnlarge:false, multiple:1, name:'model', isShow:true ,}),
    loading: new Shared({x:canvas.width/2 - (414/1.2)/2, y:canvas.height/2 + 80, w:414/1.2, h:232/1.2, image: createImage('./images/loading.gif'), isEnlarge:false, multiple:1.05, name:'loading', isShow:true ,}),
    chk1: new Shared({x:canvas.width/2 - (112/2)/2, y:canvas.height/2 + 150, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1.05, name:'chk1', isShow:false ,}),
    chk2: new Shared({x:canvas.width/2 - (112/2)/2, y:canvas.height/2 + 150, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1.05, name:'chk2', isShow:false ,}),
    people2: new Shared({x:350, y:280, w:624/2.8, h:1603/2.8, image: createImage('./images/beginning/people2.png'), isPeople:true, name:'people2', isShow:false, multiple:1.1}),
    people1: new Shared({x:860, y:280, w:669/2.8, h:1567/2.8, image: createImage('./images/beginning/people1.png'), isPeople:true, name:'people1', isShow:false, multiple:1.1}),
}
// startFn()
function startFn(){
    bus.start = true
    busAudio.loop = true
    busAudio.play()
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
        talks.forEach(talk=>{
            talk.position.x -= busSpeed
        })
        Object.keys(starts).forEach(start=>{
            starts[start].position.x -= busSpeed
        })
        if(backgruond.position.x <= -2400){
            clearInterval(openAnim)
            scrollOffset = 0
            isStart = true
            bus.run = false
            // 顯示第一句對話
            startNav = true;
            starts.start01.show = true;
            starts.start01Btn.show = true;
            busAudioStart = false
            busAudio.pause()
            busAudio.currentTime = 0
            playBgm()
        }
        if(scrollOffset > -1500){
            busRun = true
            if(scrollOffset > -500){
                bus.divisor = 40
            }else{
                bus.divisor = 15
            }
        }
    }, 0)
}

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
            talks.forEach(talk=>{
                talk.position.x -= player.speed *0.66
            })
            Object.keys(starts).forEach(start=>{
                starts[start].position.x -= player.speed *0.66
            })
            Object.keys(beginnings).forEach(beginning=>{
                beginnings[beginning].position.x -= player.speed *0.66
            })
            
        }else if(keys.left.pressed){
            if(scrollOffset > 0){
                scrollOffset -=player.speed
                backgruond.position.x += player.speed *0.66
                bus.position.x += player.speed *0.66
                interactions.forEach(item=>{
                    item.position.x += player.speed *0.66
                })
                talks.forEach(talk=>{
                    talk.position.x += player.speed *0.66
                })
                Object.keys(starts).forEach(start=>{
                    starts[start].position.x += player.speed *0.66
                })
                Object.keys(beginnings).forEach(beginning=>{
                    beginnings[beginning].position.x += player.speed *0.66
                })
            }
        }
    }

    interactions.forEach(interaction=>{
        if(interaction.show===false) return
        interaction.draw()
    })
    talks.forEach(talk=>{
        if(talk.show) talk.draw()
    })
    dynamics.forEach(dynamic=>{
        dynamic.draw()
    })
    if(startNav){
        Object.keys(starts).forEach(start=>{
            if(starts[start].show) starts[start].draw();
        })
    }
    
    if(bus.start){
        bus.update()
        if(busRun){
           if(bus.position.x > -600){
            bus.position.x -= 1.6
           }
        }
    }else{
        bus.draw()
    }
    
    if(getOff ){
        player.draw()
        player.update()
    }
    

    if(getOff){
        phone.draw() 
    }

    if(roomOpen.cool && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        cool.draw()
        buttons.close.draw()
        Object.keys(cools).forEach(cool=>{
            if(cools[cool].show){
                cools[cool].draw()
            }
        })
    }
    if(roomOpen.occupy && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        occupy.draw()
        buttons.close.draw()
        Object.keys(occupys).forEach(occupy=>{
            if(occupys[occupy].show){
                occupys[occupy].draw()
            }
        })
    }
    if(roomOpen.hoard && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        hoard.draw()
        buttons.close.draw()
        Object.keys(hoards).forEach(hoard=>{
            if(hoards[hoard].show){
                hoards[hoard].draw()
            }
        })
    }

    if(roomOpen.network && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        network.draw()
        buttons.close.draw()
        Object.keys(networks).forEach(net=>{
            if(networks[net].show){
                networks[net].draw()
            }
        })
    }

    if(roomOpen.noisy && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        noisy.draw()
        buttons.close.draw()
        Object.keys(noisys).forEach(noisy=>{
            if(noisys[noisy].show){
                if(noisys[noisy].frmaeNum > 1){
                    noisys[noisy].update()
                }else{
                    noisys[noisy].draw()
                }
            }
        })
    }
    if(roomOpen.delay && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        delay.draw()
        buttons.close.draw()
        Object.keys(delays).forEach(delay=>{
            if(delays[delay].show){
                delays[delay].draw()
            }
        })
    }

    if(!bus.start){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        Object.keys(beginnings).forEach(beginning=>{
            if(beginnings[beginning].show){
                beginnings[beginning].draw()
            }
        })
    }
    
}

animate()

