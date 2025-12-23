# 🌿 Crisis to Calm

A mindful breathing tool for your terminal. Designed to help developers reset, refocus, and track their mental well-being during long coding sessions.

<img width="3400" height="3400" alt="Box Breathing Graphic" src="https://github.com/user-attachments/assets/bc7da522-a52a-4c8c-89c2-af5418dd3a5e" />


## Features
- **Square Breathing:** Follow the 4-step box breathing method (Inhale, Hold, Exhale, Hold).
- **Themes:** Multiple visual modes like `--ocean`, `--forest`, `--space`, and more!
- **Gamification:** Earn "Breaths," track your daily streak, and level up from **Baby Breather** to **Zen Legend**.
- **Deep Focus:** A distraction-free mode that hides the cursor and uses system beeps to bring you back to the presentation.
- **Wellness Check:** A post-session check-in to provide mental health resources if you're feeling stressed.

## Installation

### Using NPM (Recommended)
- Prerequisite: Node.js
```bash
npm install -g crisis-to-calm
```
or
```bash
npm i -g crisis-to-calm
```

### From source
- Clone the repository
- Enter directory
```bash
cd crisis-to-calm
```
- Install dependencies
```bash
npm install
```
- Link command
```bash
npm link
```

### Using .exe file
- Navigate to releases and download calm.exe
- To run the default version, open calm.exe
- To run with flags:
  - Navigate to the folder where calm.exe is located
  - Type `.\calm.exe` and add any flags (ex. `--forest --6 --deep`)
  - Run

## Usage

Simply type `calm` to start a standard session, or use flags to customize your experience:

### Configuration Flags

| Flag | Description |
| --- | --- |
| `--[number]` | Set breath length in seconds (e.g., `--6`, `--10`). Default is 4. |
| `--deep` | Enter Deep Focus mode (hides cursor, audio cues). |
| `--random` | Picks a random theme for your session. |
| `--stats` | View your Rank, Streak, and total breaths taken. |
| `--help` | Display the manual. |
| `--reset` | Delete all progress and start fresh. |

### Visual Themes

Choose a theme that matches your current vibe:

| Theme | Flag | Icon |
| --- | --- | --- |
| Forest | `--forest` | ♣ |
| Ocean | `--ocean` | ~ |
| Mountain | `--mountain` | ▲ |
| Space | `--space` | * | 
| Happy | `--happy` | Ü |
| Surprised | `--surprised` | ö |
| Rainbow | `--rainbow` | • (Animated)|

---

## Ranks & Progression

Your progress is saved locally within the project directory in ```stats.json``` (created automatically when. Take breaths to unlock new titles and surprise corresponding emojis :

* **Baby Breather** (0 breaths)
* **Novice Breather** (50 breaths)
* **Calm Novice** (100 breaths)
* **Calm Apprentice** (250 breaths)
* **Steady Hand** (500 breaths)
* **Breath Royalty** (1,000 breaths)
* **Breath Master** (2,500 breaths)
* **Calm Sage** (5,000 breaths)
* **Zen Legend** (10,000 breaths)

## Future Goals & Possible Contributions
- Add more themes!
- Make a "seconds breathed" counter
- Add celebrations for streak milestones!
- Make the default personalizable
- Add data tracking mood before and after use
- MacOS and Linux compatibility

## License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.
