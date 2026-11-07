/**
 * XIVIG Preloader - Elite Architect Edition
 * High-performance progress simulation, dynamic telemetry cycling,
 * and cinematic transition choreography.
 */

export function initPreloader() {
    const percentDisplay = document.getElementById("percent1");
    const progressBar = document.getElementById("bar1");
    const statusText = document.getElementById("preloader-text");
    const loader = document.querySelector(".preloader");

    if (!loader) return;

    let isFinished = false;

    const hideLoader = () => {
        if (isFinished) return;
        isFinished = true;

        loader.classList.add("preloader--ready");

        setTimeout(() => {
            loader.classList.add("preloader--hidden");
            document.body.classList.add("is-loaded");

            // Remove from layout flow after transition completes
            setTimeout(() => {
                loader.style.display = "none";
            }, 550);
        }, 140);
    };

    // --- GLOBAL FAIL-SAFE ---
    // Prevent UI locking on slow connections or runtime errors
    const failSafeTimer = setTimeout(() => {
        if (!isFinished && !loader.classList.contains("preloader--hidden")) {
            console.warn("⚠️ Preloader fail-safe triggered.");
            hideLoader();
        }
    }, 4500);

    const stages = [
        { max: 32, text: "INITIALIZING CORE..." },
        { max: 68, text: "SYNCHRONIZING MODULES..." },
        { max: 92, text: "OPTIMIZING INTERFACE..." },
        { max: 100, text: "SYSTEM READY" }
    ];

    let current = 0;
    const startTime = performance.now();
    const targetDuration = 650; // Snappy, elite response time (~650ms)

    function updateProgress(now) {
        if (isFinished) return;

        const elapsed = now - startTime;
        const progressRatio = Math.min(elapsed / targetDuration, 1);
        
        // Quad-out easing for natural deceleration
        const eased = 1 - Math.pow(1 - progressRatio, 2.5);
        current = Math.min(Math.round(eased * 100), 100);

        if (percentDisplay) {
            percentDisplay.textContent = current < 100 ? `${current.toString().padStart(2, '0')}%` : "100%";
        }

        if (progressBar) {
            progressBar.style.width = `${current}%`;
        }

        if (statusText) {
            const currentStage = stages.find(s => current <= s.max) || stages[stages.length - 1];
            if (statusText.textContent !== currentStage.text) {
                statusText.textContent = currentStage.text;
            }
        }

        if (current >= 100) {
            clearTimeout(failSafeTimer);
            hideLoader();
        } else {
            requestAnimationFrame(updateProgress);
        }
    }

    requestAnimationFrame(updateProgress);
}
