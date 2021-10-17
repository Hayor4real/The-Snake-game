const grid = document.querySelector(".grid") 
const startButton = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
const message = document.getElementById("message")

circles = [] 
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0


function createGrid(){
   for (let i = 0; i < width*width; i++) {
     const circle = document.createElement("div")

     circle.classList.add("circle")

     grid.appendChild(circle)
     circles.push(circle)
   }
}
createGrid() 

currentSnake.forEach(index => circles[index].classList.add("snake"))

function startGame() {
    currentSnake.forEach(index => circles[index].classList.remove("snake"))
    circles[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApples ()
    currentSnake.forEach(index => circles[index].classList.add('snake'))
   timerId = setInterval(move, intervalTime)
   message.style.display = "none"
}



function move() {
      if (
         (currentSnake[0] + width >= 100 && direction === width) ||
         (currentSnake[0] % width === width - 1 && direction === 1) ||
         (currentSnake[0] % width === 0 && direction === -1) ||
         (currentSnake[0] - width  < 0 && direction === -width) ||
         circles[currentSnake[0] + direction].classList.contains('snake')
      ) 
      
      
     return (clearInterval(timerId),
            (message.style.display = "block")
     
     );

    const tail = currentSnake.pop()
    circles[tail].classList.remove("snake")

    currentSnake.unshift(currentSnake[0] + direction)
     
    if (circles[currentSnake[0]].classList.contains("apple")){
        circles[currentSnake[0]].classList.remove("apple") 

        circles[tail].classList.add("snake")

        currentSnake.push(tail)
    
        generateApples()
     score++
     scoreDisplay.textContent = score  
     clearInterval(timerId)
     intervalTime = intervalTime * speed
     timerId = setInterval(move, intervalTime)
    }

circles[currentSnake[0]].classList.add("snake")
 
}


function generateApples(){
  do {
    appleIndex = Math.floor(Math.random() * circles.length)
  } while (circles[appleIndex].classList.contains("snake"))
  circles[appleIndex].classList.add('apple')
}

generateApples()


document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            direction = -width
            break
        case 'ArrowRight':
            direction = 1
            break
        case 'ArrowDown':
            direction = width
            break
        case 'ArrowLeft':
            direction = -1
            break

}
})
startButton.addEventListener("click", startGame)