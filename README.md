# ACA Study Hub

A mobile-friendly study website for **Advanced Computer Architectures (IPPV131-K2)** oral exam preparation at the University of Debrecen.

## Features

- **Oral Exam Simulator** - Practice professor-style questions with reveal answers, difficulty filtering, and progress tracking
- **Concept Explorer** - Browse topic cards with explanations, diagrams, and key points
- **Flashcards** - Flip cards for comparisons, definitions, and formulas with spaced repetition
- **Practice Problems** - Step-by-step cache calculations, Amdahl's law, and pipeline timing problems
- **Progress Dashboard** - Track completion, study streaks, and weak topics

## Topics Covered

- **Modern Solutions**: Parallelism, Pipelining, Hazards, OoOE, Branch Prediction, Superscalar, VLIW, Vector/SIMD, GPU, Multi-core, FPGA, NUMA, Amdahl's Law
- **Cache**: Locality, Structure, Associativity, Replacement, Write Policies, Address Calculations, Hierarchy, Coherence, MESI Protocol

## Tech Stack

- HTML5 + Vanilla JS (no framework)
- Tailwind CSS via CDN
- localStorage for progress persistence
- GitHub Pages for hosting

## Usage

Open `index.html` in a browser or visit the GitHub Pages URL.

## Structure

```
index.html          # Main SPA entry point
css/custom.css      # Card flip animations, custom styles
js/data.js          # All study content (questions, flashcards, concepts, problems)
js/app.js           # Application logic, rendering, state management
```
