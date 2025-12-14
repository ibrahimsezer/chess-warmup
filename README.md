![Project Banner](https://github.com/ibrahimsezer/chess-warmup/blob/main/public/banner.png?raw=true)

## 📖 What is this?

**Chess Warmup** is a specialized training tool designed to help chess players improve their board visualization skills. Unlike standard chess games, this application focuses on specific cognitive exercises that build the mental muscle required for calculation and blindfold chess.

### Screenshots

![Main Menu Placeholder](https://github.com/ibrahimsezer/chess-warmup/blob/main/public/screenshots/menu_screen.png?raw=true)
![Gameplay Placeholder](https://github.com/ibrahimsezer/chess-warmup/blob/main/public/screenshots/gameplay.png?raw=true)
![Gameplay Placeholder](https://github.com/ibrahimsezer/chess-warmup/blob/main/public/screenshots/coordinate_finder.png?raw=true)
![Gameplay Placeholder](https://github.com/ibrahimsezer/chess-warmup/blob/main/public/screenshots/ghost_mode.png?raw=true)
![Game Over Placeholder](https://github.com/ibrahimsezer/chess-warmup/blob/main/public/screenshots/timesup.png?raw=true)

## ✨ Features

- **🎨 Color Training**: Quickly identify whether a specific square (e.g., "e4") is light or dark.
- **🎯 Coordinate Training**: Click on the correct square on the board given a coordinate.
- **👁️ Blind Mode**: A challenging mode where pieces or coordinates are hidden, forcing you to rely on memory.
- **🌍 Multi-language Support**: Fully localized in **English (EN)** and **Turkish (TR)**.
- **⚡ Fast & Responsive**: Built for speed to act as a quick warm-up before serious games.

## 🚀 How to Use

### Installation

It is built with **React**, **Vite**, and styled with **Tailwind CSS**.

1. Clone the repository:

    ```bash
    git clone https://github.com/ibrahimsezer/chess-warmup.git
    cd chess-warmup
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

### Game Modes

| Mode | Description | Target Skill |
| :--- | :--- | :--- |
| **Color Guess** | You are given a coordinate (e.g., "a1") and must select if it's **Black** or **White**. | Board Geometry & Color Complex |
| **Coordinate** | A coordinate appears on screen. Click the corresponding square on the board. | Board Geography |
| **Blind Coordinate** | Same as Coordinate mode, but visual aids are removed. | Visualization & Memory |

## 🏗️ Project Structure

The application follows a simple component-based architecture:

```bash
src/
├── App.jsx
├── main.jsx
├── assets/
│   └── ...
├── components/
│   ├── ChessBoard.jsx
│   ├── HUD.jsx
│   └── ...
├── hooks/
│   └── useGameState.js
├── screens/
│   ├── GameScreen.jsx
│   ├── GameOverScreen.jsx
│   └── MenuScreen.jsx
└── utils/
    ├── chessLogic.js
    └── translations.js

```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

---
