#!/usr/bin/env node

import chalk from 'chalk';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const message = [
    "Take a second to just be here.",
    "Let go of all your worries and stress.",
    "The code will still be there when you're done.",
    "Just take a moment for yourself.",
    "You deserve a moment of peace and calm.",
    "Breathe in, breathe out, and let go of all your thoughts.",
    "You are not alone in this, and you are strong.",
    "Take a moment to breathe, and let go of all your worries.",
    "You are capable of handling whatever comes your way.",
    "You are more than your productivity",
    "Your brain is a muscle, and it needs rest too.",
    "Remember, you are not defined by your to-do list.",
    "You are more than just a collection of tasks and deadlines.",
    "You are doing a great job.",
    "It's ok to git checkout of work for a moment.",
    "Sometimes a system needs a RESTART. So do you."
]

function drawBox(size) {
    const maxSize = 10; 
    const sideMargin = 10; // Increase this number to move the box further right
    let display = "\n".repeat(2); // Top margin

    const offset = Math.floor((maxSize - size) / 2);

    for (let row = 0; row < maxSize; row++) {
        // This line adds the margin to the left of the box
        display += " ".repeat(sideMargin); 
        
        for (let col = 0; col < maxSize; col++) {
            const isInsideRow = row >= offset && row < offset + size;
            const isInsideCol = col >= offset && col < offset + size;

            if (isInsideRow && isInsideCol) {
                display += chalk.white("* "); 
            } else {
                display += chalk.gray(". "); 
            }
        }
        display += "\n";
    }

    display += "\n"; 
    console.log(display);
}

async function startBreathing() {
    console.clear();
    console.log(chalk.cyan("Ready? Let's take a moment for yourself.\n"));
    await sleep(2000);

    for (let i = 0; i < 4; i++) { // Repeat the breathing cycle 4 times
        let randomMessage = message[Math.floor(Math.random() * message.length)];
        console.clear();
        console.log(chalk.green("Step 1: Inhale..."));
        for (let size = 1; size <= 10; size++) {
            console.clear();
            console.log(chalk.green("Step 1: Inhale..."));
            drawBox(size);
            console.log(chalk.cyan.bold(randomMessage));
            await sleep(400); // Wait half a second between "frames"
        }

        for (let sec = 4; sec > 0; sec--) { // Repeat the hold step 4 times
            console.clear();
            console.log(chalk.blue(`Step 2: Hold... (${sec}s)`));
            drawBox(10);
            console.log(chalk.cyan.bold(randomMessage));
            await sleep(1000); // Wait one second between each hold step
        }

        console.clear();
        console.log(chalk.yellow("Step 3: Exhale..."));
        for (let size = 10; size >= 1; size--) {
            console.clear();
            console.log(chalk.yellow("Step 3: Exhale..."));
            drawBox(size);
            console.log(chalk.cyan.bold(randomMessage));
            await sleep(400); // Wait half a second between "frames"
        }

        for (let sec = 4; sec > 0; sec--) { // Repeat the hold step 4 times
            console.clear();
            console.log(chalk.blue(`Step 4: Hold... (${sec}s)`));
            drawBox(1);
            console.log(chalk.cyan.bold(randomMessage));
            await sleep(1000); // Wait one second between each hold step
        }
    }

    console.clear();
    console.log(chalk.magenta("Great job. You are ready to go back now."));
}

startBreathing();