export function initPreloader() {
    const percentDisplay = document.getElementById("percent1");
    const progressBar = document.getElementById("bar1");
    const loader = document.querySelector(".preloader"); // Matches your new HTML class

    if (!loader) return;

    // --- GLOBAL FAIL-SAFE ---
    // Force hide loader after 3 seconds no matter what
    setTimeout(() => {
        if (!loader.classList.contains("preloader--hidden")) {
            console.warn("Preloader fail-safe triggered.");
            loader.classList.add("preloader--hidden");
            document.body.classList.add('is-loaded');
            setTimeout(() => loader.style.display = "none", 600);
        }
    }, 3000);

    let current = 0;
    // We'll simulate a smooth 1.5s load for the 'Elite' feel
    const timer = setInterval(() => {
        current += Math.floor(Math.random() * 5) + 1; // Randomized steps look more natural

        if (current >= 100) {
            current = 100;
            clearInterval(timer);

            // Apply the BEM hidden modifier
            loader.classList.add("preloader--hidden");

            // Add a class to body to enable scrolling
            document.body.classList.add('is-loaded');

            // Clean up DOM after transition finishes
            setTimeout(() => {
                loader.style.display = "none";
            }, 600);
        }

        if (percentDisplay) percentDisplay.textContent = `${current}%`;
        if (progressBar) progressBar.style.width = `${current}%`;
    }, 30);
}