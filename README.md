# Tic-Tac-Toe

[Live preview](https://firecattos.github.io/Tic-Tac-Toe/)

This project, developed as part of The Odin Project course, focuses on creating a Tic Tac Toe game using as little global code as possible.

In this project I used an event-driven approach, avoiding loops for structural part of the game and relying on event triggers to act as control points instead. All of this came after an initial version built to work in console, to try out the game logic and familiarize with modular programming and IIFEs.

While implementing UI, I chose to keep a minimalist look. Nonetheless, it provided an opportunity to experiment with CSS's transition property, creating a simple animation when user clicks on an already occupied cell.
To capture the exact cell clicked by the user without redundant code, I used "target" and "currentTarget" properties of the event object, combined with cells ID.

I also had the chance to finally experience a situation where "innerHTML" must be used instead of the preferred "textContent".