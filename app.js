const gameOverScene = (reason, retry) => {
    return {
        title: "Game Over",
        image: "",
        text: reason,
        choices: [
            {text: "Try Again!", next: retry},
            {text: "Back to Title screen", action: "title"}
        ]
    }
} 

//secnes / events
const scenes = {
    start: {
        image: "",
        text: "After several days of travelling, Henry discovers an abandoned camp near the northern road. The remains suggest that a group of armed men stayed there recently. Among the debris, he finds a broken royal insignia belonging to the Crown Prince.",
        choices: [
            {text: "Follow the tracks into the forest.", next: "tracks_result"},
            {text: "Ask the nearby villagers.", next: "villagers_result"} 
        ]
    },

     tracks_result: {
        image: "",
        text: `Henry follows the tracks and discovers that the armed men were heading north. He also notices that several horses were carrying supplies, suggesting the group intended to stay there for some time.`,
        choices: [
            { text: "Continue north", next: "fortress" }
        ]
    },
    villagers_result: {
        image: "",
        text: `Henry questions the locals. A frightened farmer reveals that the men were carrying the Crown Prince's personal banner, heading north. "Maybe they're going to the old abandoned fortress loacted there" -the farmer said.
        

More importantly, he overheard them arguing about an upcoming march on the capital.`,
        choices: [
            { text: "Continue north", next: "fortress" }
        ]
    },

}



const titleScreen = document.querySelector('#starting')
const gameScreen = document.querySelector('#gameplay')
const titleEl = document.querySelector('#scene-title')
const textEl = document.querySelector('#scene-text')
const imgEl = document.querySelector('#scene-img')
const choicesEl = document.querySelector('#choices')


//buttons
const startBtn = document.querySelector('#New-game')
const backstoryBtn = document.querySelector('#story')
const resetBtn = document.querySelector('#reset-btn')

let state = {
    screen: 'title',
    sceneId: 'start'
}

function render () {
    const inTitle = state.screen === 'title';
    titleScreen.classList.toggle('hidden', !inTitle)
    gameScreen.classList.toggle('hidden', inTitle)

    if (inTitle) {
        document.body.className = 'starting-screen'
    } else {
        document.body.className = 'gameplay-screen'
    }

    if (inTitle) return;

const scene = scenes[state.sceneId];
if (scene.title) {
    titleEl.textContent = scene.title
    titleEl.classList.remove('hidden')
} else {
    titleEl.classList.add('hidden')
}

textEl.textContent = scene.text;

if (scene.image) {
    imgEl.src = scene.image
    imgEl.classList.remove('hidden')
} else {
    imgEl.classList.add('hidden')
}

choicesEl.innerHTML = ''
scene.choices.forEach(choice => {
    const btns = document.createElement('button')
    btns.textContent = choice.text
    btns.addEventListener('click', () => {
        if (choice.action === 'title') {
            resetGame()
        } else {
            goTo(choice.next)
        }
    })
    choicesEl.appendChild(btns)
})
}

function goTo(sceneId) {
    state.sceneId = sceneId
    render()
}

function startGame() {
    state = {screen: 'game', sceneId: 'start'}
    render()
}

function resetGame() {
    state = {screen: 'title', sceneId: 'start'}
    render()
}

//evemt listeners
startBtn.addEventListener('click', startGame)
resetBtn.addEventListener('click', resetGame)
backstoryBtn.addEventListener('click', () => {
    window.location.href = "backstory.html"
})

render ()





