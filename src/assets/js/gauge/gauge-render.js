window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gaugeCanvas');
    const valueElement = document.getElementById('gaugeValue');
    if (!canvas || !valueElement) return;

    // Make canvas clickable to redirect
    canvas.style.cursor = 'pointer';
    canvas.addEventListener('click', () => {
        window.location.href = 'creditscore.html';
    });

    // Ensure canvas is centered
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height * 2) / 2 - 10;
    const centerX = width / 2;
    const centerY = height;
    const startAngle = Math.PI;
    const endAngle = 0;

    function getColor(score) {
        const clamped = Math.max(0, Math.min(score, 1));
        const r = Math.round(255 * (1 - clamped));
        const g = Math.round(255 * clamped);
        return `rgb(${r}, ${g}, 0)`;
    }

    function drawGauge(percentage, score) {
        ctx.clearRect(0, 0, width, height);

        // Background arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineWidth = 20;
        ctx.strokeStyle = '#eee';
        ctx.stroke();

        // Foreground arc (drawed in small segments to simulate gradient)
        const segments = 100;
        for (let i = 0; i < segments * percentage; i++) {
            const segStart = startAngle + (i / segments) * Math.PI;
            const segEnd = startAngle + ((i + 1) / segments) * Math.PI;
            const colorVal = i / segments;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, segStart, segEnd);
            ctx.strokeStyle = getColor(colorVal);
            ctx.stroke();
        }

        // Needle
        const needleAngle = startAngle + percentage * Math.PI;
        const needleLength = radius - 10;
        const needleX = centerX + Math.cos(needleAngle) * needleLength;
        const needleY = centerY + Math.sin(needleAngle) * needleLength;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(needleX, needleY);
        ctx.strokeStyle = '#120052';
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    function easeInOutSine(t) {
        return -(Math.cos(Math.PI * t) - 1) / 2;
    }

    function animateGauge(score) {
        let direction = 1;
        const maxScore = 1000;
        const duration = 1500;
        let startTimestamp = null;

        function loop(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            let t = Math.min(elapsed / duration, 1);
            const eased = easeInOutSine(t);
            const currentScore = direction > 0 ? eased * score : score - (eased * score);
            const percentage = currentScore / maxScore;
            drawGauge(percentage, currentScore);
            valueElement.textContent = Math.round(currentScore);

            if (t < 1) {
                requestAnimationFrame(loop);
            } else {
                direction *= -1;
                setTimeout(() => {
                    const newScore = Math.floor(Math.random() * (900 - 250 + 1)) + 250;
                    animateGauge(newScore);
                }, 1000);
            }
        }

        requestAnimationFrame(loop);
    }

    // INITIAL RANDOM VALUE
    const simulatedScore = Math.floor(Math.random() * (900 - 250 + 1)) + 250;
    animateGauge(simulatedScore);
});
