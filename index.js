#!/usr/bin/env node

import chalk from 'chalk';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const themes = {
  '--forest': { color: chalk.greenBright, symbol: '♣ ', bg: chalk.green.dim },
  '--ocean':  { color: chalk.blue,  symbol: '~ ', bg: chalk.blue.dim },
  '--space':  { color: chalk.gray,  symbol: '* ', bg: chalk.gray.dim },
  '--mountain': { color: chalk.red,   symbol: '▲ ', bg: chalk.red.dim },
  '--happy':  { color: chalk.yellow, symbol: 'Ü ', bg: chalk.yellow.dim },
  '--surprised': { color: chalk.magenta, symbol: 'ö ', bg: chalk.magenta.dim },
  '--rainbow': { isRainbow: true, symbol: '• ', bg: chalk.white.dim },
  'default':  { color: chalk.white, symbol: 'ø ', bg: chalk.gray.dim }
};

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

function getRainbowColor(step) {
    // This creates a shifting effect by changing R, G, and B based on the step
    const r = Math.floor(127.5 * (Math.sin(step * 0.5) + 1));
    const g = Math.floor(127.5 * (Math.sin(step * 0.5 + 2) + 1));
    const b = Math.floor(127.5 * (Math.sin(step * 0.5 + 4) + 1));
    
    // Chalk.rgb(r, g, b) is much more reliable!
    return chalk.rgb(r, g, b);
}

function drawBox(size, currentTheme, step = 0) {
    // 1. Safety check: use default if theme is missing
    const theme = currentTheme || themes['default'];
    
    // 2. Handle Rainbow colors vs Static colors
    let activeColor, ghostColor;
    if (theme.isRainbow) {
        activeColor = getRainbowColor(step);
        ghostColor = activeColor.dim; // Use the rainbow color but dimmed
    } else {
        activeColor = theme.color;
        ghostColor = theme.bg; // This uses the 'bg' you defined in your list
    }

    const maxSize = 10; 
    const sideMargin = 10; 
    let display = "\n".repeat(2); 

    const offset = Math.floor((maxSize - size) / 2);

    for (let row = 0; row < maxSize; row++) {
        display += " ".repeat(sideMargin); 
        
        for (let col = 0; col < maxSize; col++) {
            const isInsideRow = row >= offset && row < offset + size;
            const isInsideCol = col >= offset && col < offset + size;

            if (isInsideRow && isInsideCol) {
                display += activeColor(theme.symbol);
            } else {
                // 3. Use our calculated ghostColor
                display += ghostColor(". ");
            }
        }
        display += "\n";
    }

    display += "\n"; 
    console.log(display);
}

async function startBreathing() {
    const args = process.argv; // Get all command-line arguments
    const timeArg = args.find(arg => /^--\d+$/.test(arg));
    const customSeconds = timeArg ? parseInt(timeArg.replace('--', '')) : 4;
    const frameSpeed = (customSeconds * 1000) / 10;
    const isDeep = args.includes('--deep');
    const themeArg = args.find(a => a.startsWith('--') && a !== '--deep');
    const theme = themes[themeArg] ? themes[themeArg] : themes['default'];
    console.clear();
    console.log(chalk.cyan("Ready? Let's take a moment for yourself.\n"));
    await sleep(2000);

    if (isDeep) {
        process.stdout.write('\x1B[?25l'); // Hide cursor
        
        if (typeof process.stdin.setRawMode === 'function') {
            process.stdin.setRawMode(true);
            process.stdin.resume();
            process.stdin.setEncoding('utf8');

            // Listen for the "Panic Exit" keys manually
            process.stdin.on('data', (key) => {
                if (key === '\u0003') { // This is the code for Ctrl + C
                    // Run cleanup and exit
                    process.stdout.write('\x1B[?25h');
                    process.stdin.setRawMode(false);
                    console.log(chalk.red("\n\nEmergency stop. Returning to normal."));
                    process.exit();
                }
            });
        }
        console.log(chalk.bold.magenta("ENTERING DEEP FOCUS MODE..."));
        await sleep(2000);
    }

    for (let i = 0; i < 4; i++) { // Repeat the breathing cycle 4 times
        let randomMessage = message[Math.floor(Math.random() * message.length)];
        console.clear();
        console.log(chalk.green(`Step 1: Inhale... (${customSeconds}s)`));
        for (let size = 1; size <= 10; size++) {
            console.clear();
            console.log(chalk.green(`Step 1: Inhale... (${customSeconds}s)`));
            drawBox(size, theme, size);
            console.log(chalk.cyan.italic(randomMessage));
            await sleep(frameSpeed); // Wait between each frame
        }

        for (let sec = customSeconds; sec > 0; sec--) { // Repeat the hold step 4 times
            console.clear();
            console.log(chalk.blue(`Step 2: Hold... (${sec}s)`));
            drawBox(10, theme, 10);
            console.log(chalk.cyan.italic(randomMessage));
            await sleep(1000);
        }

        console.clear();
        console.log(chalk.yellow(`Step 3: Exhale... (${customSeconds}s)`));
        for (let size = 10; size >= 1; size--) {
            console.clear();
            console.log(chalk.yellow(`Step 3: Exhale... (${customSeconds}s)`));
            drawBox(size, theme, size);
            console.log(chalk.cyan.italic(randomMessage));
            await sleep(frameSpeed); // Wait between each frame
        }

        for (let sec = customSeconds; sec > 0; sec--) { // Repeat the hold step 4 times
            console.clear();
            console.log(chalk.blue(`Step 4: Hold... (${sec}s)`));
            drawBox(1, theme, 1);
            console.log(chalk.cyan.italic(randomMessage));
            await sleep(1000); // Wait one second between each hold step
        }
    }

    console.clear();

    if (isDeep) {
        process.stdout.write('\x07'); // System Beep
        process.stdout.write('\x1B[?25h'); // Show cursor
        if (typeof process.stdin.setRawMode === 'function') {
            process.stdin.setRawMode(false);
            process.stdin.pause();
        }
        console.log(chalk.magenta("\nDeep Focus complete. The world is waiting for you."));
    } else {
        console.log(chalk.magenta("\nGreat job. You are ready to go back now."));
    }

    process.exit();
}

startBreathing();

process.on('SIGINT', () => {
    // 1. Force the cursor to show back up
    process.stdout.write('\x1B[?25h'); 
    
    // 2. Unlock the keyboard (Turn off Raw Mode)
    if (typeof process.stdin.setRawMode === 'function') {
        process.stdin.setRawMode(false);
    }
    
    console.log(chalk.red("\n\n[EXIT] Emergency stop. Terminal restored."));
    process.exit(); 
});