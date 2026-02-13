
document.addEventListener("DOMContentLoaded", () => {
    // 1. Tab Interactivity
    const tabImplements = document.querySelectorAll('.block-tabs li');
    
    tabImplements.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from siblings
            const parent = this.parentElement;
            parent.querySelectorAll('li').forEach(t => t.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            // In a real app, this would filter products. 
            // For now, we simulate a loading effect or console log.
            console.log("Filtered by:", this.innerText);
        });
    });

    // 2. Countdown Timer Logic
    const countdownElement = document.querySelector('.countdown strong');
    if(countdownElement) {
        // Set target date (e.g., 5 days from now)
        let timeInSeconds = (5 * 24 * 60 * 60) + (12 * 60 * 60) + (45 * 60) + 20;

        setInterval(() => {
            timeInSeconds--;
            if (timeInSeconds < 0) timeInSeconds = 0;

            const days = Math.floor(timeInSeconds / (24 * 3600));
            const hours = Math.floor((timeInSeconds % (24 * 3600)) / 3600);
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = timeInSeconds % 60;

            countdownElement.innerText = 
                `${String(days).padStart(2, '0')} : ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
        }, 1000);
    }

    // 3. Price Slider Mockup
    const rangeInput = document.querySelector('.range-input');
    const maxPriceLabel = document.querySelectorAll('.price-labels span')[1];
    
    if(rangeInput && maxPriceLabel) {
        rangeInput.addEventListener('input', function() {
            maxPriceLabel.innerText = `$${this.value}.00`;
        });
    }

    // 4. Wishlist Toggle (Preserved from previous logic)
    // Note: The new HTML doesn't explicitly use heart icons in buttons but we can add logic if needed.
    // Assuming simple hover effects are handled by CSS.
    
    console.log("Fashion JS interactions initialized.");
});