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
        text: `Henry questions the locals. A frightened farmer reveals that the men were carrying the Crown Prince's personal banner, heading north. "Maybe they're going to the old abandoned fortress loacted there" -the farmer said.\nMore importantly, he overheard them arguing about an upcoming march on the capital.`,
        choices: [
            { text: "Continue north", next: "fortress" }
        ]
    },

    fortress: {
        image: "",
        text: "Henry reaches the fortress and spots armed men wearing the Crown Prince's colors. Before he can get closer, a patrol notices him. He quickly hides behind a ruined stone wall as the soldiers begin searching the area.",
        choices: [
            {text: "Pretend to be a lost traveler.", next: "ending_arrested"},
            {text: "Sneak through the woods.", next: "sneak_results"}
        ]
    },

    ending_arrested: {
        title: "Arrested",
        image: "",
        text: `Guard: "Well, well... Aren't you the little coward who follows Prince Matthias around? What brings a frightened little mouse this far from the palace?"

            Henry: "I'm afraid you've mistaken me for someone else."

            Guard: "Oh, I don't think so. I've heard plenty about you."

            The guard orders his men to seize Henry. He is arrested before he can reach the fortress.`,

        choices: [
            {text: "continue", next: "gameover_arrested"}
        ]
    },

    sneak_results: {
        image: "",
        text: `Henry notices that the soldiers standing guard are not of the Royal army perhaps they are mercenaries or something else! Henry crawls through the undergrowth, barely escaping the patrol. He reaches the fortress unnoticed.`,
        choices: [
            {text: "slip inside the fortress", next: "campA"}
        ]
    },

    campA: {
        image: "",
        text:`While sneaking through the fortress grounds, Henry comes across a group of soldiers gathered around a secluded camp. Their hushed voices and suspicious behavior catch his attention. He stays hidden and listens carefully, eventually discovering that they are agents of a neighboring empire.`,
        choices: [
            {text: "continue", next: "campB"}
        ]
    },
    campB: {
        image: "",
        text:`The men discuss their plans to exploit the coming civil war between the princes, weaken the kingdom from within, and seize its territories once the fighting has begun!`,
        choices: [
            {text: "Confront the Soldiers.", next: "ending_dead"},
            {text: "Run and find the Crown Prince!", next: "run_result"}
        ]
    },

    ending_dead: {
        image: "", 
        text: `Unable to contain himself, Henry steps out of hiding and demands an explanation. The soldiers are taken by surprise, but he notices a shadow of a tall figure behind him on the ground. Henry quickly turns ar....`,
        choices: [
            {text: "continue", next: "gameovr_dead"}
        ]
    },

    run_result: {
        image: "",
        text: `Realizing the gravity of what he has uncovered, Henry decides that confronting the soldiers would be foolish. He makes a desperate run through the fortress, hoping to find the Crown Prince before the foreign agents can put their plans into motion.`,
        choices: [
            {text: "Keep running!", next: "firstPrinceFound"}
        ]
    },

}



const titleScreen = document.querySelector('#starting')
const gameScreen = document.querySelector('#gameplay')
const titleEl = document.querySelector('#scene-title')
const textEl = document.querySelector('#scene-text')
const imgEl = document.querySelector('#scene-img')
const choicesEl = document.querySelector('#choices')
const objAEl = document.querySelector('#obj1')
const objBEl = document.querySelector('#obj2')


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
    if (sceneId === 'campB') {
        objBEl.classList.remove('hidden')
    }
    if (sceneId === 'firstPrinceFound') {
        objAEl.classList.add('done')
    }
    if (sceneId === 'ending_saved') {
        objBEl.classList.add('done')
    }
    render()
}

function startGame() {
    state = {screen: 'game', sceneId: 'start'}
    objAEl.classList.remove('hidden')
    render()
}

function resetGame() {
    state = {screen: 'title', sceneId: 'start'}
    objAEl.classList.add('hidden')
    objBEl.classList.add('hidden')
    render()
}

//evemt listeners
startBtn.addEventListener('click', startGame)
resetBtn.addEventListener('click', resetGame)
backstoryBtn.addEventListener('click', () => {
    window.location.href = "backstory.html"
})

render ()





