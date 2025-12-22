# 🌿 Crisis to Calm

A mindful breathing tool for your terminal. Designed to help developers reset, refocus, and track their mental well-being during long coding sessions.

## Features
- **Square Breathing:** Follow the 4-step box breathing method (Inhale, Hold, Exhale, Hold).
- **Themes:** Multiple visual modes like `--ocean`, `--forest`, `--space`, and more!
- **Gamification:** Earn "Breaths," track your daily streak, and level up from **Baby Breather** to **Zen Legend**.
- **Deep Focus:** A distraction-free mode that hides the cursor and uses system beeps to bring you back to the presentation.
- **Wellness Check:** A post-session check-in to provide mental health resources if you're feeling stressed.

## Installation

### Using NPM (Recommended)
```bash
npm install -g crisis-to-calm

```

## Usage

Simply type `calm` to start a standard session, or use flags to customize your experience:

### Configuration Flags

| Flag | Description |
| --- | --- |
| `--[number]` | Set breath length in seconds (e.g., `--6`, `--10`). Default is 4. |
| `--deep` | Enter Deep Focus mode (hides cursor, system beeps). |
| `--random` | Picks a random theme for your session. |
| `--stats` | View your Rank, Streak, and total breaths taken. |
| `--help` | Display the manual. |
| `--reset` | Delete all progress and start fresh. |

### Visual Themes

Choose a theme that matches your current vibe:

* `--forest` ♣
* `--ocean` ~
* `--mountain` ▲
* `--space` * 
* `--happy` Ü
* `--surprised` ö
* `--rainbow` • (Animated!)

---

## Ranks & Progression

Your progress is saved locally in your home directory (`~/.crisis-to-calm-stats.json`). Take breaths to unlock new titles:

* **Baby Breather** (0 breaths)
* **Novice Breather** (50 breaths)
* **Calm Novice** (100 breaths)
* **Calm Apprentice** (250 breaths)
* **Steady Hand** (500 breaths)
* **Breath Royalty** (1,000 breaths)
* **Breath Master** (2,500 breaths)
* **Calm Sage** (5,000 breaths)
* **Zen Legend** (10,000 breaths)

## License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

```
