let mowerPosition = { x: 0, y: 0 }; // Starting position of the mower
let grassCounter = 0; // Initial grass counter
let gridSize = 10; // Grid size (10x10)
let growInterval; // Variable to store interval for grass regrowth
let upgradeCosts = {
    speed: 50,  // Cost for faster grow speed
    value: 100, // Cost for more valuable grass
    grid: 150,  // Cost for bigger grid
    size: 200   // Cost for bigger mower
};
let regrowSpeed = 1000; // Regrowth time in ms (start with 1000ms)

// Function to create the grid
function createGrid() {
    let grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear the grid
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            let cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.setAttribute('data-x', x);
            cell.setAttribute('data-y', y);
            grid.appendChild(cell);
        }
    }
}

// Function to reset the grass color to dark green after 2 seconds
function regrowGrass() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        if (cell.style.backgroundColor === 'lightgreen') {
            setTimeout(() => {
                cell.style.backgroundColor = '#3e7e42'; // Dark green (unmowed grass)
            }, 2000); // Delay before transitioning back to dark green (2 seconds)
        }
    });
}

// Function to handle mower movement and mowing
function moveMower(direction) {
    const mower = document.getElementById('mower');
    const x = mowerPosition.x;
    const y = mowerPosition.y;
    const grid = document.getElementById('grid');
    const cell = grid.querySelector(`[data-x="${x}"][data-y="${y}"]`);

    // Immediately change the color of the grass to light green when the mower moves over it
    if (cell && cell.style.backgroundColor !== 'lightgreen') {
        cell.style.backgroundColor = 'lightgreen'; // Mowed grass
        grassCounter++; // Increment the grass counter
        document.getElementById('grassCounter').textContent = `Grass Mowed: ${grassCounter}`;
    }

    // Move the mower based on the direction
    if (direction === 'up' && y > 0) mowerPosition.y--;
    if (direction === 'down' && y < gridSize - 1) mowerPosition.y++;
    if (direction === 'left' && x > 0) mowerPosition.x--;
    if (direction === 'right' && x < gridSize - 1) mowerPosition.x++;

    // Update the mower's position on the screen
    mower.style.top = `${mowerPosition.y * 50}px`;
    mower.style.left = `${mowerPosition.x * 50}px`;

    // Call regrowGrass after mowing
    regrowGrass(); // Start the regrowth process
}

// Event listeners for arrow key movements
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') moveMower('up');
    if (event.key === 'ArrowDown') moveMower('down');
    if (event.key === 'ArrowLeft') moveMower('left');
    if (event.key === 'ArrowRight') moveMower('right');
});

// Upgrade 1: Faster grow speed
document.getElementById('upgrade1').addEventListener('click', () => {
    if (grassCounter >= upgradeCosts.speed) {
        grassCounter -= upgradeCosts.speed;
        regrowSpeed = Math.max(500, regrowSpeed - 200); // Speed up regrow (but don't go below 500ms)
        document.getElementById('grassCounter').textContent = `Grass Mowed: ${grassCounter}`;
    }
});

// Create the grid when the page loads
createGrid();

// Regrow grass every 2 seconds
setInterval(regrowGrass, regrowSpeed);
