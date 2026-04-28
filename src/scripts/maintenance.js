// Maintenance Page Logic

export function initMaintenance() {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirect") || "index.html";

    // Configuration: 15 minutes from now
    const durationInMinutes = 15;
    const targetTime = new Date().getTime() + (durationInMinutes * 60 * 1000);

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance < 0) {
            const pb = document.getElementById("progressBar");
            if (pb) pb.style.width = "100%";
            window.location.href = redirectUrl;
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        // UI Updates
        const updateText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = String(val).padStart(2, '0');
        };

        updateText("days", d);
        updateText("hours", h);
        updateText("minutes", m);
        updateText("seconds", s);

        // Progress Calculation
        const totalDuration = durationInMinutes * 60 * 1000;
        const elapsed = totalDuration - distance;
        const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
        const pb = document.getElementById("progressBar");
        if (pb) pb.style.width = `${progressPercent}%`;
    };

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Handle Subscription Form
    const form = document.querySelector('.subscribe-group');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.innerHTML = '<i class="fa-solid fa-check"></i>';
            btn.style.background = '#10b981'; // Success Green
            e.target.querySelector('input').disabled = true;
        });
    }
}
