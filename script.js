// === PDF Export: Capture full page as one canvas and save ===
document.getElementById('download-pdf').addEventListener('click', function () {
    const element = document.getElementById('cv-container');
    document.body.classList.add('making-pdf');

    html2canvas(element, {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: -window.scrollY
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
        pdf.save('CV_Sayed_Maruf.pdf');

        document.body.classList.remove('making-pdf');
    }).catch(err => {
        console.error('PDF generation error:', err);
        document.body.classList.remove('making-pdf');
    });
});

// === Theme Toggle and Accent Color Logic ===
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const colorDots = document.querySelectorAll('.color-dot');
    const body = document.body;

    const applyTheme = (theme, accentColor) => {
        body.classList.toggle('dark-mode', theme === 'dark');
        themeToggle.checked = theme === 'dark';

        if (accentColor) {
            body.dataset.accentColor = accentColor;
        }

        localStorage.setItem('cv-theme', theme);
        if (accentColor) {
            localStorage.setItem('cv-accent-color', accentColor);
        }
    };

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        applyTheme(newTheme, body.dataset.accentColor);
    });

    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const newAccentColor = dot.dataset.color;
            applyTheme(body.classList.contains('dark-mode') ? 'dark' : 'light', newAccentColor);
        });
    });

    // Load saved preferences on startup
    const savedTheme = localStorage.getItem('cv-theme') || 'dark';
    const savedAccentColor = localStorage.getItem('cv-accent-color') || 'blue';
    applyTheme(savedTheme, savedAccentColor);
}); 