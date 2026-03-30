/* Inkwell - Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
            updateThemeIcon(isDarkMode);
        });
    }

    function updateThemeIcon(isDarkMode) {
        if (themeIcon) {
            themeIcon.className = isDarkMode ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        }
    }

    // RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    const html = document.documentElement;

    // Check for saved RTL preference
    const savedRtl = localStorage.getItem('rtl');
    if (savedRtl === 'true') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isRtl = html.getAttribute('dir') === 'rtl';
            if (isRtl) {
                html.removeAttribute('dir');
                html.removeAttribute('lang');
                localStorage.setItem('rtl', 'false');
            } else {
                html.setAttribute('dir', 'rtl');
                html.setAttribute('lang', 'ar');
                localStorage.setItem('rtl', 'true');
            }
        });
    }

    // Typewriter effect (for index.html)
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const text = typewriter.getAttribute('data-text');
        let i = 0;
        const speed = 50;

        function type() {
            if (i < text.length) {
                typewriter.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Shipped Titles Rail Background Hover Effect
    const gameCards = document.querySelectorAll('.game-card');
    const titlesSection = document.getElementById('titles');

    if (gameCards.length > 0 && titlesSection) {
        // Sample key art colors/images for demonstration
        const artBackgrounds = [
            'radial-gradient(circle, #2A1A1A 0%, #000 100%)', // Aether's Fall (Reddish)
            'radial-gradient(circle, #1A2A2A 0%, #000 100%)', // Neon Syndicate (Teal)
            'radial-gradient(circle, #1A1A2A 0%, #000 100%)', // Echoes of Eldoria (Blueish)
            'radial-gradient(circle, #2A2A1A 0%, #000 100%)'  // The Final Breach (Yellowish)
        ];

        gameCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                titlesSection.style.transition = '0.5s';
                titlesSection.style.background = artBackgrounds[index % artBackgrounds.length];
                // If it's dark mode, we might want to keep it subtle
                if (document.body.classList.contains('dark-mode')) {
                    titlesSection.style.opacity = '0.9';
                }
            });

            card.addEventListener('mouseleave', () => {
                titlesSection.style.background = '';
                titlesSection.style.opacity = '1';
            });
        });
    }

    // Dialogue UI Logic (for index.html)
    const dialogueBox = document.getElementById('dialogue-content');
    const dialogueChoices = document.getElementById('dialogue-choices');

    if (dialogueBox && dialogueChoices) {
        const steps = {
            start: {
                text: "Ah, another seeker of stories. What kind of narrative architecture are you looking for?",
                choices: [
                    { text: "Branching Dialogue", next: "branching" },
                    { text: "Lore Systems", next: "lore" },
                    { text: "Character Arcs", next: "characters" }
                ]
            },
            branching: {
                text: "Interactive narratives require choices with consequence. My scripts are built to handle multiple player paths without losing thematic focus.",
                choices: [
                    { text: "Tell me about lore.", next: "lore" },
                    { text: "Let's talk characters.", next: "characters" },
                    { text: "Back to start.", next: "start" }
                ]
            },
            lore: {
                text: "A world without history is just a set. I build lore bibles that establish logic, factions, and timelines that feel lived-in.",
                choices: [
                    { text: "How about dialogue?", next: "branching" },
                    { text: "Character design?", next: "characters" },
                    { text: "Back to start.", next: "start" }
                ]
            },
            characters: {
                text: "Characters are the heart of any game. I design backstories and voice tones that resonate with players.",
                choices: [
                    { text: "Dialogue trees?", next: "branching" },
                    { text: "Lore systems?", next: "lore" },
                    { text: "Back to start.", next: "start" }
                ]
            }
        };

        function updateDialogue(stepKey) {
            const step = steps[stepKey];
            dialogueBox.innerHTML = `<p class="dialogue-text">${step.text}</p>`;
            dialogueChoices.innerHTML = '';
            step.choices.forEach(choice => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-secondary m-1';
                btn.innerText = choice.text;
                btn.onclick = () => updateDialogue(choice.next);
                dialogueChoices.appendChild(btn);
            });
        }

        updateDialogue('start');
    }
});
