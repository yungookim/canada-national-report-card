// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animateNumbers(entry.target);
            // Optional: Stop observing once visible if you want it to happen only once
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function animateNumbers(section) {
    const numbers = section.querySelectorAll('.big-number');
    numbers.forEach(num => {
        const text = num.innerText;
        // Extract prefix, number, and suffix
        const match = text.match(/^([^\d.,]*)([\d.,]+)(.*)$/);
        if (!match) return;

        const prefix = match[1];
        const value = parseFloat(match[2].replace(/,/g, ''));
        const suffix = match[3];

        if (isNaN(value)) return;

        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutQuart)
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = start + (value - start) * ease;

            // Format usually keeps decimals if original had them
            const decimals = (match[2].split('.')[1] || '').length;
            num.innerText = prefix + current.toFixed(decimals) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                num.innerText = text; // Ensure final value is exact string
            }
        }

        requestAnimationFrame(update);
    });
}

document.querySelectorAll('section').forEach((section, index) => {
    // Add staggered delay based on index for initial load
    section.style.transitionDelay = `${index * 100}ms`;
    observer.observe(section);
});

// Add smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sparkline Generation
function renderSparklines() {
    document.querySelectorAll('.card[data-trend]').forEach(card => {
        const container = card.querySelector('.chart-container');
        if (!container) return;

        const dataStr = card.getAttribute('data-trend');
        const data = dataStr.split(',').map(n => parseFloat(n.trim()));

        if (data.length < 2) return;

        // Dimensions
        const width = 200;
        const height = 80;
        const padding = 10;

        // Calculate data range
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1; // Avoid division by zero

        // Generate points
        const points = data.map((value, index) => {
            const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
            // Invert Y because SVG coordinates go top-down
            const y = height - padding - ((value - min) / range) * (height - 2 * padding);
            return `${x},${y}`;
        });

        // Generate Path Command
        // Start 'Move To' first point
        let pathD = `M ${points[0]}`;
        // 'Line To' subsequent points
        for (let i = points.length - 1; i >= 0; i--) {
            // Simple straight lines for now, could be curved (C) for smoother look
        }
        // Re-do loop correctly
        pathD = `M ${points[0]}`;
        for (let i = 1; i < points.length; i++) {
            pathD += ` L ${points[i]}`;
        }

        // Create SVG
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "sparkline");
        svg.setAttribute("viewBox", `0 0 ${width} 100`);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("class", "line");
        path.setAttribute("d", pathD);
        svg.appendChild(path);

        // Add points
        points.forEach(point => {
            const [cx, cy] = point.split(',');
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("class", "point");
            circle.setAttribute("cx", cx);
            circle.setAttribute("cy", cy);
            circle.setAttribute("r", "4");
            svg.appendChild(circle);
        });

        // Add year labels
        const startLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        startLabel.setAttribute("x", padding);
        startLabel.setAttribute("y", height + 15); // Below the chart
        startLabel.setAttribute("class", "year-label start");
        startLabel.textContent = "2023";
        svg.appendChild(startLabel);

        const endLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        endLabel.setAttribute("x", width - padding);
        endLabel.setAttribute("y", height + 15);
        endLabel.setAttribute("class", "year-label end");
        endLabel.textContent = "2025";
        svg.appendChild(endLabel);

        container.appendChild(svg);
    });
}

// Initialize
renderSparklines();
