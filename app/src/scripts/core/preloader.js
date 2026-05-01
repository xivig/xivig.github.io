export function initPreloader() {
    const percentDisplay = document.getElementById("percent1");
    const progressBar = document.getElementById("bar1");
    const loader = document.querySelector(".preloader");

    if (!loader) return;

    const hideLoader = () => {
        if (!loader.classList.contains("preloader--hidden")) {
            loader.classList.add("preloader--hidden");
            document.body.classList.add('is-loaded');
            // Clean up DOM after transition finishes
            setTimeout(() => {
                loader.style.display = "none";
            }, 600);
        }
    };

    // --- GLOBAL FAIL-SAFE ---
    // Force hide loader after 5 seconds no matter what to prevent hanging UI
    setTimeout(() => {
        if (!loader.classList.contains("preloader--hidden")) {
            console.warn("Preloader fail-safe triggered.");
            hideLoader();
        }
    }, 5000);

    let current = 0;
    // We'll simulate a smooth load
    const timer = setInterval(() => {
        // Increment progress
        current += Math.floor(Math.random() * 8) + 2; 

        if (current >= 100) {
            current = 100;
            clearInterval(timer);
            hideLoader();
        }

        if (percentDisplay) percentDisplay.textContent = `${current}%`;
        if (progressBar) progressBar.style.width = `${current}%`;
    }, 40);
}