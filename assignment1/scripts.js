document.addEventListener('DOMContentLoaded', () => {
    const gradientCanvas = document.getElementById('gradient-canvas');
    const gradientSelector = document.getElementById('gradient-selector');
    const colorCodeElement = document.getElementById('color-code');
    const ctx = gradientCanvas.getContext('2d');

    const gradients = {
        "linear-gradient(to right, #ff7e5f, #feb47b)": ["#ff7e5f", "#feb47b"],
        "linear-gradient(to right, #6a11cb, #2575fc)": ["#6a11cb", "#2575fc"],
        "linear-gradient(to right, #ff9a9e, #fecfef)": ["#ff9a9e", "#fecfef"],
        "linear-gradient(to right, #a18cd1, #fbc2eb)": ["#a18cd1", "#fbc2eb"],
        "linear-gradient(to right, #fad0c4, #ffd1ff)": ["#fad0c4", "#ffd1ff"]
    };

    function drawGradient(colors) {
        const gradient = ctx.createLinearGradient(0, 0, gradientCanvas.width, 0);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);
    }

    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }

    function getColorAtPosition(x, y) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        return {
            rgb: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`,
            hex: rgbToHex(pixel[0], pixel[1], pixel[2])
        };
    }

    gradientSelector.addEventListener('change', (event) => {
        const selectedGradient = event.target.value;
        drawGradient(gradients[selectedGradient]);
    });

    gradientCanvas.addEventListener('click', (event) => {
        const rect = gradientCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const selectedColor = getColorAtPosition(x, y);
        document.body.style.backgroundColor = selectedColor.rgb;
        colorCodeElement.textContent = `Selected Color: ${selectedColor.hex}`;
    });

    // Initial draw
    drawGradient(gradients[gradientSelector.value]);
});
