class Card {
    constructor(name,status,hidden){
        this.name = name
        this.status = false
        this.hidden = false
    }
}

let result = document.getElementById('result')
function startGame(){
    // reset tất cả mọi thứ về trạng thái ban đầu
    audioBackground.play()
    result.innerHTML = " "
    timer.innerHTML = `00:00:000`
    clearInterval(timerIntervalId); // Xóa bỏ interval cũ nếu có
    minutes = 0
    seconds = 0
    tens = 0
    checkout = 0

    // Tạo các đối tượng ảnh và đẩy vào mảng 2 chiều
    let eightCard = ['bac','cam','den','do','luc','nau','tim','vang']
    let listCardnotRandom =  eightCard.concat(eightCard)
    let nameCards = listCardnotRandom.sort(() => Math.random() - 0.5)
    let count = 0
    for(let i=0; i < 4; i++){
        listCard.push([])
        for(let j=0; j < 4; j++){
            listCard[i][j] = new Card(nameCards[count])
            count++
        }
    }
    showImage()
    timerIntervalId = setInterval(startTimer, 10)
    console.log(nameCards);
}

// Hiển thị các ảnh
let listCard = []
function showImage(){
    let tableCard = `<table>`
    for (let x=0; x < listCard.length; x++){
        tableCard += `<tr>`
        for (let y=0; y < listCard[x].length; y++){
            let srcImg = " "
            if (listCard[x][y].status === true || listCard[x][y].hidden === true){
                srcImg = `image/${listCard[x][y].name}.png`
            } else {
                srcImg = `image/giphy.gif`
            }
            tableCard += `<td class="table"><img src=${srcImg} onclick="clickImage(${x},${y})"></td>`
        }
        tableCard += '</tr>'
    }
    tableCard += '</table>';
    document.getElementById('display').innerHTML = tableCard;
    // Hiển thị ra mảng 2 chiều là bảng gồm 16 ảnh
}

// Tạo đồng hồ bấm giờ
let minutes = 0
let seconds = 0
let tens = 0
let timer = document.getElementById("timer")
let timerIntervalId = null; // Biến lưu trữ ID của interval
function startTimer() {
    tens += 10
	if (tens == 1000) {
		tens = 0;
		seconds++;
		if (seconds == 60) {
			seconds = 0;
			minutes++;
		}
	}
	timer.innerHTML = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
		                (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + ":" + 
		                (tens > 99 ? tens : tens > 9 ? "0" + tens : "00" + tens);
    
}

let checkMatch = []
let checkout = 0
function clickImage(imgx,imgy){
    if (!listCard[imgx][imgy].status && !listCard[imgx][imgy].hidden) {
        listCard[imgx][imgy].status = true
        audioClick.play()
        showImage()
        checkMatch.push(listCard[imgx][imgy])
        if(checkMatch.length === 2){
            if(checkMatch[0].name === checkMatch[1].name){
                checkMatch[0].hidden = true
                checkMatch[1].hidden = true
                checkMatch = []
                checkout++
                if (checkout === 8) {
                    clearInterval(timerIntervalId);
                    console.log(timerIntervalId)
                    result.innerHTML = `Your time was ${minutes}:${seconds}:${tens}`
                    audioBackground.pause()
                }
            } else {
                setTimeout(() => {
                    checkMatch[0].status = false;
                    checkMatch[1].status = false;
                    checkMatch = [];
                    showImage();
                }, 300)
            }
        } else if(checkMatch.length > 2){
            setTimeout(() => {
                checkMatch[0].status = false;
                checkMatch[1].status = false;
                checkMatch = [];
                showImage();
            }, 300)
        }
    }
}


