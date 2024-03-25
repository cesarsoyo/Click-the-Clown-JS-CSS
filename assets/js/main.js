document.body.style.backgroundImage = "url('./assets/imgs/clowns-background.gif')";
document.body.style.backgroundRepeat = "repeat"
document.body.style.backgroundSize = "25%"

let mute = false
let beginButton = document.querySelector('#begin-btn')
beginButton.innerHTML = 'Démarrer'
let scoreContainer = document.querySelector('#score')
let score = 0
let scoreLimit;
let interv;
let interbomb;
let isMoving = false;
let audioClick = document.querySelector("#audio-click");
audioClick.src = './assets/music/sound-click.mp3'
let audioSound = document.querySelector("#audio");


let audioBomb = document.querySelector('#audio-click-bomb')
audioBomb.src = './assets/music/laugh-bomb.mp3'

let audioImpossible = document.querySelector('#audio-impossible')
audioImpossible.src = './assets/music/music-speedup.mp3'

let congratImage = document.querySelector('#congrat-gif')
congratImage.style.display = 'none'


function loadingPage() {
    beginButton.style.display = "none"
    let loading = document.querySelector('#loadingGif')
    loading.src = "./assets/imgs/clown-loading.gif"
    loading.style.display = ""
    let divBarLoading = document.querySelector('.container-loading')
    divBarLoading.style.display = ""
    let barLoading = document.querySelector('#bar-loading');
    barLoading.style.width = "0%"
    barLoading.style.display = "block"
    setTimeout(() => {
        barLoading.style.width = "100%";
    }, 100);
    barLoading.innerHTML = "loading..."
    setTimeout(() => {
        menu()
    }, 1100);
}


function menu() {
    backPage()
    audioSound.playbackRate = 1;
    document.querySelector('.container-loading').style.display = "none"
    document.querySelector('#loadingGif').style.display = "none"
    document.querySelector('#close-page').style.display = "none"
    document.querySelector('#clown-gif').style.display = 'none'
    document.querySelector('#level-title').style.display = 'none'
    document.querySelector('#bomb-gif').style.display = 'none'
    scoreContainer.style.display = 'none'
    congratImage.style.display = 'none'


    document.body.style.backgroundImage = "url('./assets/imgs/clowns-background.gif')";
    document.body.style.backgroundRepeat = "repeat"
    document.body.style.backgroundSize = "25%"

    score = 0




    let menu = document.querySelector('#container-menu')
    menu.style.display = ""
    let playImage = document.querySelector('#toPlay-image')
    playImage.src = './assets/imgs/play-icon.svg'
    let playText = document.querySelector('#toPlay')
    playText.innerHTML = "Commencer"

    let adjustImage = document.querySelector('#toAdjust-image')
    adjustImage.src = "./assets/imgs/adjust-icon.svg"
    let adjustText = document.querySelector('#toAdjust')
    adjustText.innerHTML = 'Options'

    let exitImage = document.querySelector('#toExit-image')
    exitImage.src = './assets/imgs/exit-icon.svg'
    let exitText = document.querySelector('#toExit')
    exitText.innerHTML = 'Quitter'
}

function menuAdjust() {
    let backImage = document.querySelector('#toBack')
    backImage.src = './assets/imgs/back-icon.svg'
    backImage.style.display = ""


    let buttonsMenu = document.querySelectorAll('.btn-menu');
    buttonsMenu.forEach(function (btn) {
        btn.style.display = "none";
    });
    document.querySelector('#btn-volume-container').style.display = "flex"
    document.querySelector('#title-toChallenge').style.display = "flex"
    document.querySelector('#btn-challenge-container').style.display = "flex"

    let volumeImage = document.querySelector('#toVolume-image')
    volumeImage.src = "./assets/imgs/volume-icon.svg"
    let volumeText = document.querySelector('#toVolume')
    volumeText.innerHTML = "Volume"
    volumeAdjust()

    let levelTitle = document.querySelector('#toChallenge')
    levelTitle.innerHTML = 'Niveaux de difficulté'
    let levelImage = document.querySelectorAll('.toChallenge-image')
    levelImage.forEach((el) => el.src = './assets/imgs/levels-icon.svg')
    let levelTextOne = document.querySelector('#challengeOne')
    levelTextOne.innerHTML = '1. Easy peasy'
    let levelTextTwo = document.querySelector('#challengeTwo')
    levelTextTwo.innerHTML = '2. Macho'
    let levelTextThree = document.querySelector('#challengeThree')
    levelTextThree.innerHTML = '3. Extra piquant'
    let levelTextFour = document.querySelector('#challengeFour')
    levelTextFour.innerHTML = '4. Impossible'
}

function backPage() {
    let buttonsMenuTwo = document.querySelectorAll('.btn-menuTwo');
    buttonsMenuTwo.forEach(function (btn) {
        btn.style.display = "none";
    });


    document.querySelector('#toBack').style.display = "none"

    let buttonsMenu = document.querySelectorAll('.btn-menu');
    buttonsMenu.forEach(function (btn) {
        btn.style.display = "";
    });


}

function exitMenu() {
    document.querySelector('#container-menu').style.display = "none"
    beginButton.style.display = ""
    let audioSound = document.querySelector("#audio");
    audioSound.pause()
}


function volumeAdjust() {
    let volumeClick = document.querySelector('#audio-click')
    let audioSound = document.querySelector("#audio");

    let volumeSlider = document.querySelector('#volumeSlider')

    audioSound.volume = volumeSlider.value / 100;
    volumeClick.volume = volumeSlider.value / 100;
    audioBomb.volume = volumeSlider.value / 100
    audioImpossible.volume = volumeSlider.value / 100

    if (volumeSlider.value < 0.1) {
        document.querySelector('#toVolume-image').src = './assets/imgs/novolume-icon.svg'
        document.querySelector('#toVolume-image').style.width = '23px'
        document.querySelector('#toVolume-image').style.padding = '4px'
    } else {
        document.querySelector('#toVolume-image').src = './assets/imgs/volume-icon.svg'
        document.querySelector('#toVolume-image').style.width = '30px'
    }

    document.querySelector('#volumeSlider').addEventListener("change", () => {
        volumeAdjust()
    })
}



function noVolume() {
    mute = !mute
    let volumeClick = document.querySelector('#audio-click')
    let audioSound = document.querySelector("#audio");
    let volumeSlider = document.querySelector('#volumeSlider')
    let volumeImage = document.querySelector('#toVolume-image')
    if (mute === true) {
        volumeImage.src = './assets/imgs/novolume-icon.svg'
        volumeImage.style.width = '23px'
        volumeImage.style.padding = '4px'

        volumeSlider.value = 0
        audioSound.volume = 0
        volumeClick.volume = 0
        audioBomb.volume = 0
        audioImpossible.volume = 0

    } else if (mute === false) {
        volumeImage.src = './assets/imgs/volume-icon.svg'
        volumeImage.style.width = '30px'

        volumeSlider.value = 100
        audioSound.volume = 1
        volumeClick.volume = 1
        audioBomb.volume = 1
        audioImpossible.volume = 1
    }
}


function gameEasy() {
    scoreLimit = 7
    changeBackground("none", "linear-gradient(166deg, rgba(0,241,255,1) 6%, rgba(41,123,243,1) 100%)", "no-repeat")
    document.querySelector('#container-menu').style.display = 'none'
    document.querySelector('#clown-gif').style.display = ''
    document.querySelector('#level-title').style.display = 'none'
    scoreContainer.style.display = ''

    let closePage = document.querySelector('#close-page')
    closePage.src = './assets/imgs/close-windows.png'
    closePage.style.display = "block"

    let titleLevel = document.querySelector('#level-title')
    document.querySelector('#level-title').style.display = ""
    titleLevel.innerHTML = 'Niveau : Easy Peasy (gagne 7 points)'
    clearInterval(interv)
    clearInterval(interbomb)

    interv = setInterval(clownMoving, 2200)

    document.querySelector('#clown-gif').addEventListener('click', () => scoreInc(scoreLimit));

}


function gameMacho() {
    scoreLimit = 10
    changeBackground("none", "currentColor", "no-repeat",)
    document.querySelector("#audio").playbackRate = 1.2;
    document.body.style.animation = "wheelHueColor 2.5s infinite"
    document.querySelector('#container-menu').style.display = 'none'
    document.querySelector('#clown-gif').style.display = ''
    document.querySelector('#level-title').style.display = 'none'
    scoreContainer.style.display = ''

    let closePage = document.querySelector('#close-page')
    closePage.src = './assets/imgs/close-windows.png'
    closePage.style.display = "block"

    let titleLevel = document.querySelector('#level-title')
    document.querySelector('#level-title').style.display = ""
    titleLevel.innerHTML = 'Niveau : Macho (gagne 10 points)'
    clearInterval(interv)
    clearInterval(interbomb)

    interv = setInterval(clownMoving, 1000)

    document.querySelector('#clown-gif').addEventListener('click', () => scoreInc(scoreLimit));

}

function gameSpicy() {
    scoreLimit = 7
    changeBackground("none", "currentColor", "no-repeat",)
    document.querySelector("#audio").playbackRate = 1.2;
    document.body.style.animation = "wheelHueColor 2.5s infinite"
    document.querySelector('#container-menu').style.display = 'none'
    document.querySelector('#clown-gif').style.display = ''
    document.querySelector('#level-title').style.display = 'none'
    scoreContainer.style.display = ''

    let closePage = document.querySelector('#close-page')
    closePage.src = './assets/imgs/close-windows.png'
    closePage.style.display = "block"

    let titleLevel = document.querySelector('#level-title')
    document.querySelector('#level-title').style.display = ""
    titleLevel.innerHTML = 'Niveau : Extra piquant (gagne 7 points)'
    clearInterval(interbomb)
    clearInterval(interv)

    interv = setInterval(clownMoving, 700)
    interbomb = setInterval(bombMoving, 650)

    document.querySelector('#clown-gif').addEventListener('click', () => scoreInc(scoreLimit));
    document.querySelector('#bomb-gif').addEventListener('click', scoreDec);

}

function gameImpossible() {
    scoreLimit = 4
    changeBackground("none", "currentColor", "no-repeat",)
    document.querySelector("#audio").pause()
    audioImpossible.play()
    audioImpossible.playbackRate = 1.5;
    document.body.style.animation = "wheelHueColor 1s infinite"
    document.querySelector('#container-menu').style.display = 'none'
    document.querySelector('#clown-gif').style.display = ''
    document.querySelector('#level-title').style.display = 'none'
    scoreContainer.style.display = ''

    let closePage = document.querySelector('#close-page')
    closePage.src = './assets/imgs/close-windows.png'
    closePage.style.display = "block"

    let titleLevel = document.querySelector('#level-title')
    document.querySelector('#level-title').style.display = ""
    titleLevel.innerHTML = 'Niveau : Impossible (gagne 4 points)'
    clearInterval(interbomb)
    clearInterval(interv)

    interv = setInterval(clownMoving, 300)
    interbomb = setInterval(bombMoving, 600)


    document.querySelector('#clown-gif').addEventListener('click', () => scoreInc(scoreLimit));
    document.querySelector('#bomb-gif').addEventListener('click', scoreDec);
}



function scoreInc(limit) {

    if (!isMoving && score < limit) {
        audioClick.play()
        score++;
        scoreContainer.textContent = 'Score : ' + score;
        isMoving = true;
    }
    if (score == limit) {
        clearInterval(interv)
        clearInterval(interbomb)
        congratsPlayer()
        scoreContainer.textContent = 'Score : ' + score;
        score = 0
    }
}


function scoreDec() {
    if (!isMoving && score > 0) {
        audioBomb.play()
        score--;
        scoreContainer.textContent = 'Score : ' + score;
        isMoving = true;
    }
}



function clownMoving() {
    let imageClown = document.querySelector('#clown-gif')
    imageClown.src = "./assets/imgs/clown-click.gif"
    imageClown.style.display = ''

    let minHeight = window.innerHeight * 0.1;
    let maxHeight = window.innerHeight * 0.75;
    let minWidth = window.innerWidth * 0.1;
    let maxWidth = window.innerWidth * 0.9;

    let newTop = minHeight + Math.random() * (maxHeight - minHeight);
    let newRight = minWidth + Math.random() * (maxWidth - minWidth);

    imageClown.style.top = newTop + 'px';
    imageClown.style.right = newRight + 'px';
    isMoving = false;
}
// setInterval(clownMoving, 4000)

function bombMoving() {
    let imageBomb = document.querySelector('#bomb-gif')
    imageBomb.src = "./assets/imgs/bomb.gif"
    imageBomb.style.display = ""

    let isVisible = Math.random() < 0.5;

    if (isVisible) {
        imageBomb.style.visibility = 'visible';

        let minHeight = window.innerHeight * 0.1;
        let maxHeight = window.innerHeight * 0.75;
        let minWidth = window.innerWidth * 0.1;
        let maxWidth = window.innerWidth * 0.9;

        let newTop = minHeight + Math.random() * (maxHeight - minHeight);
        let newRight = minWidth + Math.random() * (maxWidth - minWidth);

        imageBomb.style.top = newTop + 'px';
        imageBomb.style.right = newRight + 'px';
        isMoving = false;
    } else {
        imageBomb.style.visibility = 'hidden';
    }
}

function changeBackground(img, col, rep) {
    document.body.style.backgroundImage = img;
    document.body.style.background = col;
    document.body.style.backgroundRepeat = rep;
}


function closePages() {
    clearInterval(interbomb)
    clearInterval(interv)
    document.querySelector('#level-title').style.display = "none"


    document.body.style.backgroundImage = "url('./assets/imgs/clowns-background.gif')";
    document.body.style.backgroundRepeat = "repeat"
    document.body.style.backgroundSize = "25%"

    document.querySelector('#bomb-gif').style.display = "none"
    document.querySelector('#clown-gif').style.display = "none"

    audioImpossible.pause()

    document.querySelector("#audio").play()
    document.querySelector("#audio").playbackRate = 1;
    menu()
}

function congratsPlayer() {
    alert(`Bravo ! Tu as obtenu ${scoreLimit} points`);
    congratImage.style.display = ''
    console.log('rerererererererere');
    congratImage.src = './assets/imgs/congrats.gif'
    setTimeout(menu, 4000)

}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function playSound() {
    audioSound.src = './assets/music/sound-background.mp3'
    audioSound.play();
}