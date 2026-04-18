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

    const currentPage = (() => {
        const page = window.location.pathname.split('/').pop();
        return page && page.length > 0 ? page : 'index.html';
    })();

    function setActiveNavLinks(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const links = Array.from(container.querySelectorAll('a.nav-link[href]'));
        links.forEach(link => {
            const href = (link.getAttribute('href') || '').split('#')[0].split('?')[0];
            const isActive = href === currentPage;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    setActiveNavLinks('header');
    setActiveNavLinks('#mobileNav');

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
                titlesSection.classList.add('is-hovered');
                // If it's dark mode, we might want to keep it subtle
                if (document.body.classList.contains('dark-mode')) {
                    titlesSection.style.opacity = '0.9';
                }
            });

            card.addEventListener('mouseleave', () => {
                titlesSection.style.background = '';
                titlesSection.style.opacity = '1';
                titlesSection.classList.remove('is-hovered');
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
                    { text: "Branching", next: "branching" },
                    { text: "Lore", next: "lore" },
                    { text: "Characters", next: "characters" }
                ]
            },
            branching: {
                text: "Interactive narratives require choices with consequence. My scripts are built to handle multiple player paths without losing thematic focus.",
                choices: [
                    { text: "Lore", next: "lore" },
                    { text: "Characters", next: "characters" },
                    { text: "Restart", next: "start" }
                ]
            },
            lore: {
                text: "A world without history is just a set. I build lore bibles that establish logic, factions, and timelines that feel lived-in.",
                choices: [
                    { text: "Dialogue", next: "branching" },
                    { text: "Characters", next: "characters" },
                    { text: "Restart", next: "start" }
                ]
            },
            characters: {
                text: "Characters are the heart of any game. I design backstories and voice tones that resonate with players.",
                choices: [
                    { text: "Dialogue", next: "branching" },
                    { text: "Lore", next: "lore" },
                    { text: "Restart", next: "start" }
                ]
            }
        };

        function updateDialogue(stepKey) {
            const step = steps[stepKey];
            dialogueBox.innerHTML = `<p class="dialogue-text">${step.text}</p>`;
            dialogueChoices.innerHTML = '';
            step.choices.forEach(choice => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-secondary dialogue-choice-btn';
                btn.innerText = choice.text;
                btn.onclick = () => updateDialogue(choice.next);
                dialogueChoices.appendChild(btn);
            });
        }

        updateDialogue('start');
    }

    const projectTitle = document.getElementById('project-title');
    if (projectTitle) {
        const projectGenre = document.getElementById('project-genre');
        const projectRole = document.getElementById('project-role');
        const projectChallenge = document.getElementById('project-challenge');
        const projectSolution = document.getElementById('project-solution');
        const systemCaption = document.getElementById('system-caption');
        const systemNodes = [
            document.getElementById('system-node-1'),
            document.getElementById('system-node-2'),
            document.getElementById('system-node-3'),
            document.getElementById('system-node-4')
        ];
        const galleryItems = [
            document.getElementById('gallery-item-1'),
            document.getElementById('gallery-item-2'),
            document.getElementById('gallery-item-3'),
            document.getElementById('gallery-item-4')
        ];

        const projects = {
            aether: {
                title: "Aether's Fall",
                genre: 'Epic Fantasy RPG',
                role: 'Lead Narrative Designer @ Ironbound Interactive',
                challenge: 'The client needed a narrative system that could support 40+ hours of gameplay while maintaining consistent character arcs across hundreds of player choices. The world required a deep sense of history and factional conflict that felt systemic rather than scripted.',
                solution: 'I architected a modular branching system where player choices were tracked across three main narrative pillars: Morality, Faction Loyalty, and Personal Relationships. This allowed for dynamic dialogue barks and quest variations that felt tailored to each player’s unique journey.',
                nodes: ['Player Choice', 'Faction State', 'Dialogue Variants', 'Quest Outcome'],
                caption: 'A simplified visualization of the branching logic used in the main campaign.',
                gallery: ['Lore Bible Map Excerpt', 'Dialogue Script Snippet', 'Quest Flow Chart', 'Character Design Sheet']
            },
            neon: {
                title: 'Neon Syndicate',
                genre: 'Cyberpunk Narrative Sim',
                role: 'Senior Writer @ Cyberia Labs',
                challenge: 'NPC interactions felt transactional—players exhausted dialogue options and moved on, with little sense of relationship shift or continuity. The team needed character depth without bloating production time.',
                solution: 'I built a voice-tone guide system and relationship-based dialogue framework so conversations could adapt to trust, fear, and loyalty. This created repeatable character logic that scaled across the cast.',
                nodes: ['First Contact', 'Relationship State', 'Tone Shift', 'New Choice Set'],
                caption: 'A simplified view of how relationship state drives dialogue tone and options.',
                gallery: ['Voice Tone Guide Page', 'Branching Dialogue Sample', 'Bark Library Excerpt', 'Relationship Matrix']
            },
            echoes: {
                title: 'Echoes of Eldoria',
                genre: 'Tactical Strategy',
                role: 'Lore Architect @ Mythos Games',
                challenge: 'The world history was fragmented across multiple writers and documents, creating contradictions in factions, geography, and timeline events. This risked rework as content scaled.',
                solution: 'I consolidated canon into a searchable lore bible with timeline rules, faction doctrine, and “canon locks” that prevented contradictions. Writers could ship faster with fewer continuity breaks.',
                nodes: ['Canon Rule', 'Timeline Event', 'Faction Doctrine', 'Quest Beat'],
                caption: 'A simplified view of how canon locks keep the timeline and factions consistent.',
                gallery: ['Timeline Sheet Excerpt', 'Faction Doctrine Page', 'Location Canon Card', 'Quest Continuity Checklist']
            },
            breach: {
                title: 'The Final Breach',
                genre: 'Sci-Fi Horror',
                role: 'Narrative Designer @ Dark Meridian',
                challenge: 'The story needed to stay terrifying while still giving players agency—choices had to matter without reducing tension or breaking pacing in high-stakes sequences.',
                solution: 'I wrote scene-by-scene escalation beats with moral consequence hooks and designed an adaptive “pressure” system so dialogue and encounters reacted to player decisions without losing horror momentum.',
                nodes: ['Signal', 'Pressure Level', 'Moral Choice', 'Survival Outcome'],
                caption: 'A simplified view of how pressure and choices reshape scenes and outcomes.',
                gallery: ['Scene Escalation Board', 'Choice Consequence Map', 'Horror Tone Guide', 'Adaptive Encounter Notes']
            },
            starfall: {
                title: 'Starfall Station',
                genre: 'Sci-Fi Live-Ops',
                role: 'Narrative Systems Writer',
                challenge: 'Seasonal updates shipped fast, but story continuity kept breaking between patches. Players also needed meaningful callbacks that acknowledged what they had already done.',
                solution: 'I created a modular season framework with recap payloads, state rules, and reusable beat templates. This kept the live narrative coherent while still reacting to player progress.',
                nodes: ['Season Beat', 'Player State', 'Recap Payload', 'Content Drop'],
                caption: 'A simplified view of season beats, state rules, and recap payloads.',
                gallery: ['Season Beat Template', 'Recap Payload Example', 'Live Ops Timeline', 'Hub Dialogue Rotation']
            }
        };

        const params = new URLSearchParams(window.location.search);
        const key = (params.get('project') || 'aether').toLowerCase();
        const data = projects[key] || projects.aether;

        projectTitle.textContent = data.title;
        if (projectGenre) projectGenre.textContent = data.genre;
        if (projectRole) projectRole.textContent = data.role;
        if (projectChallenge) projectChallenge.textContent = data.challenge;
        if (projectSolution) projectSolution.textContent = data.solution;
        if (systemCaption) systemCaption.textContent = data.caption;
        systemNodes.forEach((nodeEl, idx) => {
            if (!nodeEl) return;
            nodeEl.textContent = data.nodes[idx] || '';
            nodeEl.style.display = data.nodes[idx] ? '' : 'none';
        });
        galleryItems.forEach((itemEl, idx) => {
            if (!itemEl) return;
            itemEl.textContent = data.gallery[idx] || '';
            itemEl.style.display = data.gallery[idx] ? '' : 'none';
        });

        document.title = `${data.title} | Inkwell`;
    }

    // Password Visibility Toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const container = toggle.closest('.password-field-container');
            const input = container ? container.querySelector('input') : null;
            if (input) {
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                toggle.classList.toggle('bi-eye', !isPassword);
                toggle.classList.toggle('bi-eye-slash', isPassword);
            }
        });
    });
});
