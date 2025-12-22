#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const statsFilePath = path.join(__dirname, 'stats.json');

const themes = { 
  '--forest': { baseHex: '#00FF00', symbol: '♣ ', bg: chalk.hex('#004400') },
  '--ocean':  { baseHex: '#00D4FF', symbol: '~ ', bg: chalk.hex('#003344') },
  '--mountain': { baseHex: '#FF4500', symbol: '▲ ', bg: chalk.hex('#441100') },
  '--space':  { baseHex: '#AAAAAA', symbol: '* ', bg: chalk.hex('#333333') },
  '--happy':  { baseHex: '#FFD700', symbol: 'Ü ', bg: chalk.hex('#443300') },
  '--surprised': { baseHex: '#FF00FF', symbol: 'ö ', bg: chalk.hex('#440044') },
  '--rainbow': { isRainbow: true, baseHex: '#FFFFFF', symbol: '• ', bg: chalk.white.dim },
  'default':  { baseHex: '#FFFFFF', symbol: 'ø ', bg: chalk.gray.dim }
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
];

function updateStats(cyclesCompleted) {
    let stats = { totalBreaths: 0, streak: 0, lastDate: null, rank: "Baby Breather", icon: "🍼" };

    try {
        if (fs.existsSync(statsFilePath)) {
            const fileData = fs.readFileSync(statsFilePath, 'utf8');
            if (fileData.trim()) stats = JSON.parse(fileData);
        }

        const oldRank = stats.rank;
        const today = new Date().toLocaleDateString();
        const breathsEarned = cyclesCompleted * 4;

        // Update totals and streak
        if (breathsEarned > 0) {
            if (!stats.lastDate) {
                stats.streak = 1;
            } else if (stats.lastDate !== today) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                stats.streak = (stats.lastDate === yesterday.toLocaleDateString()) ? stats.streak + 1 : 1;
            }
        }

        stats.totalBreaths += breathsEarned;
        stats.lastDate = today;

        // Level Logic
        const levelData = getLevel(stats.totalBreaths);
        stats.rank = levelData.rank;
        stats.icon = levelData.icon;
        const levelUp = oldRank !== stats.rank;

        // Progress Bar Calculation
        const levels = [
            { name: "Baby Breather", goal: 0 },
            { name: "Novice Breather", goal: 50 },
            { name: "Calm Novice", goal: 100 },
            { name: "Calm Apprentice", goal: 250 },
            { name: "Steady Hand", goal: 500 },
            { name: "Breath Royalty", goal: 1000 },
            { name: "Breath Master", goal: 2500 },
            { name: "Calm Sage", goal: 5000 },
            { name: "Zen Legend", goal: 10000 }
        ];

        const currentIdx = levels.findIndex(l => l.name === stats.rank);
        const nextLevelObj = levels[currentIdx + 1] || null;

        fs.writeFileSync(statsFilePath, JSON.stringify(stats, null, 2));

        // RETURN EVERYTHING
        return { 
            ...stats, 
            levelUp, 
            nextLevelName: nextLevelObj ? nextLevelObj.name : "Max Level", 
            nextLevelGoal: nextLevelObj ? nextLevelObj.goal : stats.totalBreaths 
        };

    } catch (error) {
        return { ...stats, levelUp: false, nextLevelName: "Error", nextLevelGoal: 100 };
    }
};

async function resetStats() {
    console.log(chalk.red.bold("\n⚠️  WARNING: This will delete all your stats, rank, and streaks."));
    process.stdout.write(chalk.white("Are you sure? (y/n): "));

    // Prepare the terminal to listen for one character
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    // Wait for the keypress
    const key = await new Promise(resolve => {
        process.stdin.once('data', (data) => {
            resolve(data.toString().toLowerCase());
        });
    });

    // Immediately return terminal to normal mode
    process.stdin.setRawMode(false);
    process.stdin.pause();

    if (key === 'y') {
        if (fs.existsSync(statsFilePath)) {
            fs.unlinkSync(statsFilePath);
        }
        console.log(chalk.green("\n\n✅ Stats have been reset. Start fresh whenever you're ready."));
    } else {
        console.log(chalk.yellow("\n\nReset cancelled. Your progress is safe."));
    }
};

function getLevel(totalBreaths) {
    if (totalBreaths >= 10000) return { rank: "Zen Legend", icon: "🐉" };
    else if (totalBreaths >= 5000) return { rank: "Calm Sage", icon: "🧘‍♂️" };
    else if (totalBreaths >= 2500) return { rank: "Breath Master", icon: "🌪️" };
    else if (totalBreaths >= 1000) return { rank: "Breath Royalty", icon: "👑" };
    else if (totalBreaths >= 500) return { rank: "Steady Hand", icon: "🌊" };
    else if (totalBreaths >= 250) return { rank: "Calm Apprentice", icon: "🍃" };
    else if (totalBreaths >= 100) return { rank: "Calm Novice", icon: "🌿" };
    else if (totalBreaths >= 50) return { rank: "Novice Breather", icon: "🌱" };
    else return { rank: "Baby Breather", icon: "🍼" }
};

function getRainbowColor(step) {
    // Creates a shifting effect by changing R, G, and B based on the step
    const r = Math.floor(127.5 * (Math.sin(step * 0.5) + 1));
    const g = Math.floor(127.5 * (Math.sin(step * 0.5 + 2) + 1));
    const b = Math.floor(127.5 * (Math.sin(step * 0.5 + 4) + 1));
    
    // Return a Chalk color object with the calculated RGB values
    return chalk.rgb(r, g, b);
};

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
};

function drawBox(size, currentTheme, step = 0) {
    // Use default if theme is missing
    const theme = currentTheme || themes['default'];
    
    //Handle Rainbow colors
    let activeColor, ghostColor;
    if (theme.isRainbow) {
        activeColor = getRainbowColor(step);
        ghostColor = activeColor.dim; // Use the rainbow color but dimmed
    } else {
        const intensity = 1.0 - ((size - 1) * 0.06);
        const rgb = hexToRgb(theme.baseHex || '#FFFFFF');

        activeColor = chalk.rgb(
            Math.floor(rgb.r * intensity),
            Math.floor(rgb.g * intensity),
            Math.floor(rgb.b * intensity)
        );
        ghostColor = theme.bg || chalk.gray.dim; // Use the background color if provided, otherwise default to gray
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
                // Calculated ghostColor
                display += ghostColor(". ");
            }
        }
        display += "\n";
    }

    display += "\n"; 
    console.log(display);
};

async function askWellness() {
    console.log(chalk.bold.cyan("Before you go, how are you feeling now?"));
    console.log(chalk.white("1. Better / Good"));
    console.log(chalk.white("2. Still stressed / Bad"));
    process.stdout.write(chalk.gray("\nPress 1 or 2: "));

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    const key = await new Promise(resolve => {
        process.stdin.once('data', (data) => {
            resolve(data.toString());
        });
    });

    process.stdin.setRawMode(false);
    process.stdin.pause();

    console.log("\n"); // Move to a new line after the keypress

    if (key === '2') {
        console.log(chalk.yellow("I'm sorry you're still feeling this way. ❤️"));
        console.log(chalk.white("Perhaps try another session with ") + chalk.cyan("--deep") + chalk.white(" mode or a longer breath count?"));
        console.log(chalk.white("\nIf you need immediate support, remember these resources:"));
        console.log(chalk.bold.magenta("- Crisis Text Line: Text HOME to 741741"));
        console.log(chalk.bold.magenta("- National Suicide Prevention Lifeline: 988"));
        console.log(chalk.bold("\nYou don't have to carry it all alone."));
    } else {
        console.log(chalk.green("I'm so glad to hear that! ✨"));
        console.log(chalk.white("Take that calm energy with you into the rest of your day."));
    }
    
    console.log(chalk.bold.cyan("\nGoodbye for now!\n"));
}

function displayStats(finalStats) {
    if (finalStats.levelUp) {
        console.log("\n" + "⭐".repeat(20));
        console.log(chalk.bold.yellow(`LEVEL UP: You are now a ${finalStats.rank.toUpperCase()} 🥳!`));
        console.log(chalk.cyan(`Your journey into mindfulness is growing...`));
        console.log("⭐".repeat(20) + "\n");

        process.stdout.write('\x07');
            setTimeout(() => process.stdout.write('\x07'), 200);
            setTimeout(() => process.stdout.write('\x07'), 400);
    }

    console.log(chalk.bold.cyan("\n--- PROGRESS SAVED ---"));
    console.log(chalk.cyan("\nYour stats:"));
    console.log(chalk.cyan(`🌟 Rank: ${finalStats.rank} ${finalStats.icon}`));
    console.log(chalk.cyan(`🧘 Total breaths taken: ${finalStats.totalBreaths}`));
    console.log(chalk.cyan(`🔥 Current Streak: ${finalStats.streak} days`));
    console.log(chalk.cyan("----------------------\n"));

    if (finalStats.nextLevelName && finalStats.nextLevelGoal) {
        const progressPercent = Math.min((finalStats.totalBreaths / finalStats.nextLevelGoal) * 100, 100);
        const bar = "■".repeat(Math.round(progressPercent / 10)) + ".".repeat(10 - Math.round(progressPercent / 10));
        console.log(chalk.magenta(`\nNext Level: ${finalStats.nextLevelName} (${finalStats.nextLevelGoal} breaths)`));
        console.log(chalk.gray(`[${bar}] ${progressPercent.toFixed(1)}%`));
        console.log(chalk.magenta("------------------------\n"));
    }
};

function displayHelp() {
    console.log(chalk.bold.green("\n🌿 CRISIS TO CALM - Manual"));
    console.log(chalk.cyan("A mindful breathing tool for your terminal.\n"));

    console.log(chalk.yellow("Usage:"));
    console.log("  calm [themes] [options]\n");

    console.log(chalk.yellow("Themes:"));
    console.log(`  ${chalk.cyan("--forest")}         Calming Forest theme.`);
    console.log(`  ${chalk.cyan("--ocean")}          Soothing Ocean theme.`);
    console.log(`  ${chalk.cyan("--mountain")}       Peaceful Mountain theme.`);
    console.log(`  ${chalk.cyan("--space")}          Cosmic Space theme.`);
    console.log(`  ${chalk.cyan("--happy")}          Uplifting Happy theme.`);
    console.log(`  ${chalk.cyan("--surprised")}      Distracting Surprised theme.`);
    console.log(`  ${chalk.cyan("--rainbow")}        Fun Rainbow effect theme.`);
    console.log(`  ${chalk.cyan("--random")}         Picks a random theme.`);

    console.log(chalk.yellow("Options:"));
    console.log(`  ${chalk.cyan("--[number]")}   Set breath length in seconds (e.g., --6, --10). Default is 4.`);
    console.log(`  ${chalk.cyan("--deep")}       Enter Deep Focus mode (hides cursor, system beeps).`);
    console.log(`  ${chalk.cyan("--stats")}      View your rank, streak, and total breaths.`);
    console.log(`  ${chalk.cyan("--reset")}      Clear all progress and start fresh.`);
    console.log(`  ${chalk.cyan("--help")}       Show this help menu.\n`);
    console.log(`  ${chalk.cyan("--h")}          Show this help menu.\n`);

    console.log(chalk.magenta("Example:"));
    console.log("  calm --ocean --6 --deep\n");
}

async function startBreathing() {
    const args = process.argv; // Get all command-line arguments
    if (args.includes('--help') || args.includes('-h')) {
        displayHelp();
        process.exit();
    }
    if (args.includes('--reset')) {
        await resetStats();
        process.exit();
    }
    if (args.includes('--stats')) {
        displayStats(updateStats(0)); // Display stats without updating
        process.exit();
    }
    const timeArg = args.find(arg => /^--\d+$/.test(arg));
    const customSeconds = timeArg ? parseInt(timeArg.replace('--', '')) : 4;
    const frameSpeed = (customSeconds * 1000) / 10;
    const isRandom = args.includes('--random'); // Check for random flag
    const isDeep = args.includes('--deep'); // Check for deep flag
    const functionalFlags = ['--deep', '--random', '--stats', '--reset', '--help', '-h'];
    let theme;
    if (isRandom) {
        const themeKeys = Object.keys(themes).filter(k => k !== 'default');
        const randomKey = themeKeys[Math.floor(Math.random() * themeKeys.length)];
        theme = themes[randomKey];
        console.log(chalk.gray(`Random theme selected: ${randomKey}`));
    } else {
        // 2. Find an argument that starts with '--', isn't a number, and isn't a functional flag
        const themeArg = args.find(arg => 
            arg.startsWith('--') && 
            !/^--\d+$/.test(arg) && // Ignore things like --6 or --10
            !functionalFlags.includes(arg)
        );
        theme = themes[themeArg] ? themes[themeArg] : themes['default'];
    }
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
        console.log(chalk.hex(theme.baseHex)(`Step 1: Inhale... (${customSeconds}s)`));
        for (let size = 1; size <= 10; size++) {
            console.clear();
            console.log(chalk.hex(theme.baseHex)(`Step 1: Inhale... (${customSeconds}s)`));
            drawBox(size, theme, size);
            console.log(chalk.hex(theme.baseHex).italic(randomMessage));
            await sleep(frameSpeed); // Wait between each frame
        }

        for (let sec = customSeconds; sec > 0; sec--) { // Repeat the hold step 4 times
            console.clear();
            console.log(chalk.hex(theme.baseHex)(`Step 2: Hold... (${sec}s)`));
            drawBox(10, theme, 10);
            console.log(chalk.hex(theme.baseHex).italic(randomMessage));
            await sleep(1000);
        }

        console.clear();
        console.log(chalk.hex(theme.baseHex)(`Step 3: Exhale... (${customSeconds}s)`));
        for (let size = 10; size >= 1; size--) {
            console.clear();
            console.log(chalk.hex(theme.baseHex)(`Step 3: Exhale... (${customSeconds}s)`));
            drawBox(size, theme, size);
            console.log(chalk.hex(theme.baseHex).italic(randomMessage));
            await sleep(frameSpeed); // Wait between each frame
        }

        for (let sec = customSeconds; sec > 0; sec--) { // Repeat the hold step 4 times
            console.clear();
            console.log(chalk.hex(theme.baseHex)(`Step 4: Hold... (${sec}s)`));
            drawBox(1, theme, 1);
            console.log(chalk.hex(theme.baseHex).italic(randomMessage));
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
        console.log(chalk.magenta("\nDeep Focus complete. Now you can take on the world."));
    } else {
        console.log(chalk.magenta("\nGreat job. You are ready to go back now."));
    }

    const finalStats = updateStats(4); // Save progress

    displayStats(finalStats);

    await askWellness();

    process.exit();
}

startBreathing();

process.on('SIGINT', () => {
    // Force the cursor to show back up
    process.stdout.write('\x1B[?25h'); 
    
    // Unlock the keyboard
    if (typeof process.stdin.setRawMode === 'function') {
        process.stdin.setRawMode(false);
    }
    
    console.log(chalk.red("\n\n[EXIT] Emergency stop. Terminal restored."));
    process.exit(); 
});