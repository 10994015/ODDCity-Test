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
    }
}
//好:1 壞:0
const getCG = {
    cool:[],
    occupy:[],
    hoard:[],
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
const phone = new Interaction({x:1320, y:50, w:308/4.5, h:492/4.5, name:'phone',image: createImage('./images/buttons/phone.png'), multiple:1.05, isShow:true})
const interactions = [
    // new Interaction({x:2973, y:481, w:147, h:218, name:'supermarket', isShow:false}),
    new Interaction({x:2973, y:481, w:147, h:218, name:'cool', isShow:false}),
    new Interaction({x:3750, y:450, w:60, h:60, name:'occupy', image: createImage('./images/buttons/in2f.png'), multiple:1.05, isShow:false, }),
    new Interaction({x:4170, y:500, w:455, h:225, name:'hoard', isShow:false}),
]
const talks = [
    new Talk({x:3780 -3318/15, y:350, w:3318/15, h:1604/15, name:'occupy', image: createImage('./images/talks/enter2f_.png'),isShow:false, direction:1650}),
]
const dynamics = [
    
]        
const bus = new Bus({x:200, y:461, w:1024, h:825/2.7, image:createImage('./images/bus3.png')})
const cool = new Room({image:createImage('./images/cool.png')});

let playerTalkX = canvas.width-(canvas.width-canvas.height*0.8*1.844)/2
let playerTalkXY= canvas.height-(canvas.height-canvas.height*0.8)/2
let mesterTalkX = (canvas.width-canvas.height*0.8*1.844)/2 + 100
let mesterTalkY = 355
//occupy
const occupy = new Room({image:createImage('./images/occupy.png')});
//hoard
const hoard = new Room({image:createImage('./images/hoard.png')})
let startNav = true;
let getOff = false;
const starts = [
    new Interaction({x:2650, y:330, w:6110/13, h:1641/13, name:'start01',image: createImage('./images/starts/talk/01.png'), multiple:1, isShow:false  }),
    new Interaction({x:2650+6110/13 - 80, y:330+1641/13-75, w:112/2, h:68/2, name:'start01Btn',image: createImage('./images/buttons/chk.png'), multiple:1.05, isShow:false, isEnlarge:true  }),
    new Interaction({x:2650, y:330, w:6110/13, h:1641/13, name:'start02',image: createImage('./images/starts/talk/02.png'), multiple:1, isShow:false  }),
    new Interaction({x:2650+6110/13 - 80, y:380, w:333/6, h:202/6, name:'skip',image: createImage('./images/buttons/Skip.png'), isEnlarge: false, multiple:1.05, isShow:false  }),
    new Interaction({x:2650+6110/13 - 80 - 333/6 -20, y:380, w:333/6, h:202/6, name:'chk2',image: createImage('./images/buttons/chk.png'), isEnlarge: false, multiple:1.05, isShow:false  }),
    new Interaction({x:2650, y:330, w:6110/13, h:1641/13, name:'start03',image: createImage('./images/starts/talk/03.png'), multiple:1, isShow:false  }),
    new Interaction({x:2650, y:330, w:6110/13, h:1641/13, name:'start04',image: createImage('./images/starts/talk/04.png'), multiple:1, isShow:false  }),
    new Interaction({x:3100, y:330, w:3318/13, h:1639/13, name:'start05',image: createImage('./images/starts/talk/05.png'), multiple:1, isShow:false  }),


    new Interaction({x:3300, y:330, w:6110/13, h:1641/13, name:'start07',image: createImage('./images/starts/talk/07.png'), multiple:1, isShow:false  }),
    new Interaction({x:3300, y:50, w:6110/13, h:1641/13, name:'start08',image: createImage('./images/starts/talk/08.png'), multiple:1, isShow:false  }),
    new Interaction({x:2900, y:330, w:6110/13, h:1641/13, name:'start09',image: createImage('./images/starts/talk/09.png'), multiple:1, isShow:false  }),
    new Interaction({x:2900, y:330, w:6110/13, h:1641/13, name:'start10',image: createImage('./images/starts/talk/010.png'), multiple:1, isShow:false  }),
]


// const skip = new Interaction({x:20, y:650, w:333/4.5, h:202/4.5, name:'skip',image: createImage('./images/buttons/Skip.png'), isEnlarge: true, multiple:1.05, isShow:true  })
const cools = [
    new Shared({x:280, y:190, w:300/2.9, h:125/2.9, image: createImage('./images/cool/cup.png'),name:'cup'}),
    new Shared({x:160, y:170, w:316/1.8, h:679/1.8, image:createImage('./images/cool/people1.png'), isPeople:true, name:'people', isShow:true}),
    new Shared({x:50, y:450, w:316/1.1, h:679/1.1, image:createImage('./images/cool/people1.png'), isPeople:true, name:'talkPeople', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/1.png'), isTalk:true, isEnlarge:true, multiple:1.02, name:'1', isShow:true,}),
    new Shared({x:playerTalkX-(2378/4.5)-175, y:playerTalkXY-630/4.5 - 630/4.5 - 10, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/001.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'001', isShow:true,}),
    new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:3149/4.5, h:484/4.5, image: createImage('./images/cool/talk/1001.png'), isTalk:true, isEnlarge:false, multiple:1, name:'1001', isShow:false ,}),
    new Shared({x:canvas.width/2 - (3149/4.5)/2  + 30, y:canvas.height/2 - (484/4.5) - 60, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/002.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'002', isShow:false,}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/3.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'3', isShow:false,}),

    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/4A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'4A', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/4B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'4B', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-40, y:playerTalkXY-630/4.5*3+15, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/003.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'003', isShow:false}),
    
    
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/6.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'6', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/8.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'8', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/10A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10A', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/10B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10B', isShow:false}),

    
    
    
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'5A', isShow:false, text:"沒有...", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'5B', isShow:false, text:"我又沒有...打擾到別人...", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'7', isShow:false, text:"因為這邊...很涼爽...，外面...很熱...", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'9', isShow:false, text:"冷氣很貴...不想浪費錢...", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'11A', isShow:false, text:"啊...會這樣嗎...那好吧 .等等就...離開", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5 +140, w:2378/4.5, h:630/4.5, image: createImage('./images/cool/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'11B', isShow:false, text:"...我很喜歡這裡...所以...我不走...", isTypewriter:true }),

    
    new Shared({x:mesterTalkX - 30, y:mesterTalkY-630/4.5 , w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/004.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'004', isShow:false,}),

    new Shared({x:canvas.width/2 - (398/1)/2 , y:canvas.height/2 - (232/1)/2  , w:398/1, h:232/1, image: createImage('./images/goodend.png'), isEnlarge:false, multiple:1, name:'end', isShow:false,}),

    new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (484/4.5) - 100, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/005.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'005', isShow:false,}),
    new Shared({x:canvas.width/2 - (3149/4.5)/2 , y:canvas.height/2 - (484/4.5) - 100, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/006.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'006', isShow:false,}),
    new Shared({x:canvas.width -2378/4.8 - 80  , y:80, w:2378/4.8, h:639/4.8, image: createImage('./images/cool/talk/06.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'06', isShow:false,}),

    new Shared({x:canvas.width/2 - (112/2)/2 + 300, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk', isShow:false ,}),

]
const occupys = [
    new Shared({x:235, y:480, w:134.784, h:40, image: createImage('./images/occupys/a1.png'),}),
    new Shared({x:290, y:535, w:91/2.8, h:137/2.8, image: createImage('./images/occupys/b1.png')}),
    new Shared({x:395, y:490, w:258/2.8, h:126/2.8, image: createImage('./images/occupys/c1.png')}),
    new Shared({x:455, y:680, w:132/2.6, h:103/2.6, image: createImage('./images/occupys/d1.png')}),
    new Shared({x:570, y:550, w:110/2.4, h:113/2.4, image: createImage('./images/occupys/e1.png')}),
    new Shared({x:670, y:538, w:654/3.4, h:178/3.2, image: createImage('./images/occupys/f1.png')}),
    new Shared({x:835, y:460, w:122/2.7, h:233/2.7, image: createImage('./images/occupys/g1.png')}),
    new Shared({x:880, y:530, w:259/2.7, h:138/2.7, image: createImage('./images/occupys/h1.png')}),
    new Shared({x:1030, y:415, w:331/2.9, h:158/2.8, image: createImage('./images/occupys/i1.png')}),
    new Shared({x:1120, y:680, w:134/2.9, h:89/2.8, image: createImage('./images/occupys/j1.png')}),
    new Shared({x:950, y:355, w:383/2, h:774/2, image: createImage('./images/occupys/sitdown.png'), isPeople:true, isEnlarge:true, name:'sitdown', multiple:1.05}),
    new Shared({x:20, y:255, w:223, h:795, image: createImage('./images/occupys/people1.png'), isPeople:true, name:'people', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/1.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'1', isShow:false,}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/3A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'3A', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/3B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'3B', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/5A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'5A', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/5B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'5B', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/7.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'7', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10A', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10B', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*3-30, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10C.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10C', isShow:false}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'2', isShow:false, text:"啊林北就累了！這裡不就是給人休息的逆？", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'4', isShow:false ,text:"你管老子那麼多幹嘛！", isTypewriter:true}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'6A', isShow:false , text:"但林北實在累到快昏倒，天氣熱、腳又酸，偏偏這條街上可以休息德地方少的可憐餒", isTypewriter:true}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'6B', isShow:false ,text:"洗勒考喔！是在趕狗出去喔！", isTypewriter:true}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'8', isShow:false ,text:"賀啦！也算是多虧這家店，林北才有地方休息，林北會盡量不影響其他人啦！", isTypewriter:true}),
    new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (482/4.5)/2, w:3149/4.5, h:485/4.5, image: createImage('./images/occupys/talk/9.png'), isTalk:true, isEnlarge:false, multiple:1, name:'9', isShow:false ,}),
    new Shared({x:canvas.width/2 - (112/2)/2 + 300, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk', isShow:false ,}),


    new Shared({x:canvas.width/2 - (398/1)/2 , y:canvas.height/2 - (232/1)/2  , w:398/1, h:232/1, image: createImage('./images/goodend.png'), isEnlarge:false, multiple:1, name:'end', isShow:false,}),

]

const hoards = [
    new Shared({x:891, y:549, w:508/2.93, h:372/2.93, image: createImage('./images/hoards/inter/1.png'), name:'inter1', multiple:1}),
    new Shared({x:373, y:324, w:990/2.9, h:519/2.9, image: createImage('./images/hoards/inter/2.png'), name:'inter2', multiple:1}),
    new Shared({x:757, y:385, w:312/2.7, h:341/2.7, image: createImage('./images/hoards/inter/3.png'), name:'inter3', multiple:1}),
    new Shared({x:1107, y:375, w:540/2.8, h:730/2.8, image: createImage('./images/hoards/inter/4.png'), name:'inter4', multiple:1}),
    new Shared({x:160, y:490, w:1295/2.85, h:647/2.85, image: createImage('./images/hoards/inter/5.png'), name:'inter5', multiple:1}),
    new Shared({x:615, y:562, w:802/2.9, h:391/2.9, image: createImage('./images/hoards/inter/6.png'), name:'inter6', multiple:1}),
    new Shared({x:932, y:346, w:518/2.9, h:400/2.9, image: createImage('./images/hoards/inter/7.png'), name:'inter7', multiple:1}),
    new Shared({x:380, y:117, w:919/2.9, h:208/2.9, image: createImage('./images/hoards/inter/8.png'), name:'inter8', multiple:1}),
    new Shared({x:765, y:420, w:753/1.8, h:450/1.8, image: createImage('./images/hoards/hold.png'), name:"hold"}),

    new Shared({x:891 + (508/2.93)/2, y:549 + (372/2.93)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter1', isShow:false,}),
    new Shared({x:373 + (990/2.9)/2, y:324 + (519/2.9)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter2', isShow:false,}),
    new Shared({x:757 + (312/2.7)/2, y:385 + (341/2.7)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter3', isShow:false,}),
    new Shared({x:1107 + (540/2.8)/2,y:375 + (730/2.8)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter4', isShow:false,}),
    new Shared({x:160 + (1295/2.85)/2, y:490 + (647/2.85)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter5', isShow:false,}),
    new Shared({x:615 + (802/2.9)/2, y:562 + (391/2.9)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter6', isShow:false,}),
    new Shared({x:932 + (518/2.9)/2, y:346 + (400/2.9)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter7', isShow:false,}),
    new Shared({x:380 + (919/2.9)/2, y:117 + (208/2.9)/2, w:418/9, h:418/9, image: createImage('./images/buttons/ok.png'), name:'ok-inter8', isShow:false,}),



    new Shared({x:865, y:490, w:391/2, h:209/2, image: createImage('./images/hoards/s1.png'), name:'s1', isEnlarge:false, multiple:1.05, }),
    new Shared({x:1050, y:590, w:177/1.3, h:135/1.3, image: createImage('./images/hoards/a1.png'), name:'a1', isEnlarge:false, multiple:1.05, }),
    new Shared({x:760, y:605, w:222, h:61, image: createImage('./images/hoards/b1.png'), name:'b1', isEnlarge:false, multiple:1.05, }),
    new Shared({x:930, y:560, w:257/1.6, h:234/1.6, image: createImage('./images/hoards/c1.png'), name:'c1', isEnlarge:false, multiple:1.05}),
    new Shared({x:865, y:625, w:99, h:72, image: createImage('./images/hoards/d1.png'), name:'d1', isEnlarge:false, multiple:1.05}),
    new Shared({x:825, y:555, w:222/1.1, h:61/1.1, image: createImage('./images/hoards/e1.png'), name:'e1', isEnlarge:false, multiple:1.05}),
    new Shared({x:1000, y:460, w:259/1.6, h:256/1.6, image: createImage('./images/hoards/f1.png'), name:'f1', isEnlarge:false, multiple:1.05}),
    new Shared({x:940, y:480, w:165/1.8, h:198/1.8, image: createImage('./images/hoards/g1.png'), name:'g1', isEnlarge:false, multiple:1.05}),
    new Shared({x:880, y:550, w:69/1.1, h:33/1.1, image: createImage('./images/hoards/h1.png'), name:'h1', isEnlarge:false, multiple:1.05}),


    new Shared({x:540, y:420, w:1303/4.6, h:644/4.6, image: createImage('./images/hoards/talk/1.png'), isTalk:false, isEnlarge:true, multiple:1.02, name:'1'}),
    new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:3149/4.5, h:484/4.5, image: createImage('./images/hoards/talk/2.png'), isTalk:true, isEnlarge:false, multiple:1, name:'2', isShow:false ,}),


    new Shared({x:840, y:300, w:393/1.9, h:749/1.9, image: createImage('./images/hoards/people1.png'), name:"smallPeople", isEnlarge:false, isShow:false, multiple:1}),
    new Shared({x:20, y:355, w:393/1.1, h:749/1.1, image: createImage('./images/hoards/people1.png'), isPeople:true, name:'people', isShow:false}),

    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/4.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'4', isShow:false,}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/6A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'6A', isShow:false,}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/6B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'6B', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/8.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'8', isShow:false,}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/10A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10A', isShow:false,}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/10B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10B', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/12.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'12', isShow:false,}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/16A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'16A', isShow:false,}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/16B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'16B', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*3-30, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/16C.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'16C', isShow:false}),

    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'3', isShow:false, text:"謝謝你！", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'5', isShow:false, text:"我要放箱子的時候不小心摔了一跤...", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'7', isShow:false, text:"這些東西對我來說很重要！", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'9', isShow:false, text:"這些都是我寶貴的回憶!像這件衣服是我太太生前最喜歡的款式,還有這個雜誌和飲料是...", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'11', isShow:false, text:"說實話,我想整理也沒有辦法·東西這麼多我一個人根本收拾不來,只能一直堆積、越來越亂。", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'13', isShow:false, text:"好啊!你可不能偷偷丟掉我的東西。", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/hoards/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'15', isShow:false, text:"Wow!原來我家是長這樣!好久沒有乾淨的床可以睡覺了。", isTypewriter:true }),

    new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:3149/4.5, h:484/4.5, image: createImage('./images/hoards/talk/14.png'), isTalk:true, isEnlarge:false, multiple:1, name:'14', isShow:false ,}),
    new Shared({x:canvas.width/2 - (1417/4.5)/2, y:canvas.height/2 - (484/4.5)/2, w:1417/4.5, h:484/4.5, image: createImage('./images/hoards/talk/finish.png'), isTalk:true, isEnlarge:false, multiple:1, name:'finish', isShow:false ,}),



    new Shared({x:canvas.width/2 - (112/2)/2 + 300, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk', isShow:false ,}),
    new Shared({x:canvas.width/2 - (112/2)/2 + 110, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk2', isShow:false ,}),

    new Shared({x:canvas.width/2 - (398/1)/2 , y:canvas.height/2 - (232/1)/2  , w:398/1, h:232/1, image: createImage('./images/goodend.png'), isEnlarge:false, multiple:1, name:'end', isShow:false,}),


]
const buttons = {
    close: new Button({x:(canvas.width - ( canvas.height*0.8*1.844 ))/2 + canvas.height*0.8*1.844 - 10,y:(canvas.height - canvas.height *0.8)/2 - 50, w:418/9, h:418/9, image: createImage('./images/buttons/close.png'), name:"close", multiple:1.05}),
    // in2f:  new Button({x: 3750, y:450, w:60, h:60, name:'in2f', isMove:true, image: createImage('./images/buttons/in2f.png'),}),
}

let isRoomOpen = false;

const roomOpen = {
    cool:false,
    occupy:false,
    hoard:false,
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
    talks.forEach(talk=>{
        talk.position.x -= busSpeed
    })
    starts.forEach(start=>{
        start.position.x -= busSpeed
    })
    if(backgruond.position.x <= -2400){
        clearInterval(openAnim)
        scrollOffset = 0
        isStart = true
        bus.run = false

        // 顯示第一句對話
        startNav = true;
        starts.filter(start=> start.name==='start01')[0].show = true;
        starts.filter(start=> start.name==='start01Btn')[0].show = true;
        
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
            starts.forEach(start=>{
                start.position.x -= player.speed *0.66
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
                starts.forEach(start=>{
                    start.position.x += player.speed *0.66
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
        starts.forEach(start=>{
            if(start.show) start.draw();
        })
    }
    

    bus.update()
    if(busRun){
       if(bus.position.x > -600){
        bus.position.x -= 1.6
       }
        
    }
    if(getOff ){
        player.draw()
        player.update()
    }
    

    if(getOff && !isTeaching){
        phone.draw() 
    }

    if(roomOpen.cool && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        cool.draw()
        buttons.close.draw()
        cools.forEach(cool=>{
            if(cool.show){
                cool.draw()
            }
        })
    }
    if(roomOpen.occupy && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        occupy.draw()
        buttons.close.draw()
        occupys.forEach(occupy=>{
            if(occupy.show){
                occupy.draw()
            }
        })
    }
    if(roomOpen.hoard && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        hoard.draw()
        buttons.close.draw()
        hoards.forEach(hoard=>{
            if(hoard.show){
                hoard.draw()
            }
        })
    }

    // if(isTeaching && getOff){
    //     skip.draw()
    // }

    
}

animate()

