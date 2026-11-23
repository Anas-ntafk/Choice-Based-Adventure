const gameOverScene = (reason, retry) => {
    return {
        title: "Game Over",
        image: "",
        text: `Reason: ${reason}`,
        choices: [
            {text: "Try Again!", next: retry},
            {text: "Back to Title screen", action: "title"}
        ]
    }
} 
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
        image: "assets/scenes/forest-tracks.webp",
        alt: "Hoofprints and boot tracks leading north through a forest",
        text: `Henry follows the tracks and discovers that the armed men were heading north. He also notices that several horses were carrying supplies, suggesting the group intended to stay there for some time.`,
        choices: [
            { text: "Continue north", next: "fortress" }
        ]
    },
    villagers_result: {
        image: "assets/scenes/villagers.webp",
        alt: "A frightened farmer talking to Henry",
        text: `Henry questions the locals. A frightened farmer reveals that the men were carrying the Crown Prince's personal banner, heading north. Maybe they're going to the old abandoned fortress.

More importantly, he overheard them arguing about an upcoming march on the capital.`,
        choices: [
            { text: "Continue north", next: "fortress" }
        ]
    },

}



const titleScreen = document.querySelector('#starting')
const gameScreen = document.querySelector('#gameplay')
const textEl = document.querySelector('#scene-text')
const choicesEl = document.querySelector('#choices')

const startBtn = document.querySelector('#New-game')
const backstoryBtn = document.querySelector('#story')
const resetBtn = document.querySelector('#reset-btn')


let state = {
    screen: 'title',
    screenId: 'start'
}



//buttons
startBtn.addEventListener('click', startGame)
resetBtn.addEventListener('click', resetGame)
backstoryBtn.addEventListener('click', () => {
    window.location.href = "backstory.html"
})







