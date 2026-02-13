// Fashion Page 2 - Main Script

document.addEventListener('DOMContentLoaded', function() {
    
    /* --- Hero Slider --- */
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    
    function showSlide(index) {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active to current
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Auto Advance
    let slideTimer = setInterval(nextSlide, slideInterval);
    
    // Manual Navigation via Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideTimer); // Stop auto-slide on manual interaction
            showSlide(index);
            slideTimer = setInterval(nextSlide, slideInterval); // Restart timer
        });
    });
    
    /* --- Countdown Timer --- */
    function updateCountdown() {
        const now = new Date();
        const endTime = new Date();
        
        // Set end time to end of current day
        endTime.setHours(23, 59, 59, 999);
        
        const timeDiff = endTime - now;
        
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            // Check if elements exist before updating
            const elHours = document.getElementById('hours');
            const elMinutes = document.getElementById('minutes');
            const elSeconds = document.getElementById('seconds');
            
            if (elHours) elHours.textContent = hours.toString().padStart(2, '0');
            if (elMinutes) elMinutes.textContent = minutes.toString().padStart(2, '0');
            if (elSeconds) elSeconds.textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
    
    /* --- Newsletter Modal Gamification --- */
    const modal = document.getElementById('newsletterModal');
    const closeModal = document.getElementById('closeModal');
    const noThanks = document.getElementById('noThanks');
    const timerDisplay = document.getElementById('modalTimerDisplay');
    const customConfirm = document.getElementById('customConfirm');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');
    
    let countdownValue = 5;
    let runawayActive = false;
    let runawayTimer = null;
    
    // Show modal every time after 1 second
    setTimeout(() => {
        if (modal) {
            modal.classList.add('show');
            startCountdown();
        }
    }, 1000);
    
    function startCountdown() {
        if (!timerDisplay || !closeModal) return;
        
        // Reset state
        countdownValue = 5;
        timerDisplay.style.display = 'block';
        closeModal.style.display = 'none';
        timerDisplay.textContent = countdownValue;
        
        const interval = setInterval(() => {
            countdownValue--;
            timerDisplay.textContent = countdownValue;
            
            if (countdownValue <= 0) {
                clearInterval(interval);
                timerDisplay.style.display = 'none';
                closeModal.style.display = 'block'; // Show X
                initRunawayButton();
            }
        }, 1000);
    }
    
    function initRunawayButton() {
        if (!closeModal) return;
        
        // Enable runaway mode
        let canRun = true;
        closeModal.style.transition = 'top 0.2s, right 0.2s'; // smooth move
        
        const runAwayHandler = () => {
            if (!canRun) return;
            
            // Move to random position
            const maxTop = 90; 
            const maxRight = 90;
            
            const randomTop = Math.floor(Math.random() * maxTop);
            const randomRight = Math.floor(Math.random() * maxRight);
            
            closeModal.style.top = randomTop + '%';
            closeModal.style.right = randomRight + '%';
        };
        
        closeModal.addEventListener('mouseenter', runAwayHandler); // PC

        
        // Stop runaway after 10 seconds
        setTimeout(() => {
            canRun = false;
            closeModal.removeEventListener('mouseenter', runAwayHandler);

            closeModal.style.cursor = 'pointer';
        }, 10000);
    }
    
    function showCustomConfirm() {
        if (customConfirm) customConfirm.classList.add('show-confirm');
    }
    
    function hideCustomConfirm() {
        if (customConfirm) customConfirm.classList.remove('show-confirm');
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', showCustomConfirm);
    }
    
    if (noThanks) {
        // Apply same confirm logic to "No Thanks"
        noThanks.addEventListener('click', showCustomConfirm);
    }
    
    // Custom Confirm Logic
    if (confirmYes) {
        confirmYes.addEventListener('click', () => {
            if (modal) modal.classList.remove('show');
            hideCustomConfirm();
        });
    }
    
    if (confirmNo) {
        confirmNo.addEventListener('click', () => {
            hideCustomConfirm();
        });
    }
    


    /* --- Security Measures --- */
    // 1. Disable Right Click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // 2. Disable DevTools Shortcuts (F12, Ctrl+Shift+I, Ctrl+U, etc.)
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'U' || e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
    });

    /* --- Hover Effects & Interactions from Components --- */
    
    // Category Cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Visual feedback
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Product Cards - Add to Cart Logic
    const cartButtons = document.querySelectorAll('.prod-actions a .fa-shopping-cart');
    cartButtons.forEach(btn => {
        btn.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Added to cart!');
        });
    });
    
    // 3. Security: Debugger Loop (Anti-DevTools)
    setInterval(() => {
        // This will pause execution if DevTools is open
        debugger; 
    }, 1000);



    /* --- Sales Notifications --- */
    const notification = document.getElementById('salesNotification');
    const notifyImg = document.getElementById('notifyImg');
    const notifyTitle = document.getElementById('notifyTitle');
    const notifyProduct = document.getElementById('notifyProduct');
    const notifyTime = document.getElementById('notifyTime');

    const fakeData = [
        { name: "Sarah from London", product: "Red Summer Dress", img: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Mike from New York", product: "Running Shoes", img: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Emma from Paris", product: "Designer Handbag", img: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "John from Toronto", product: "Sunglasses", img: "https://randomuser.me/api/portraits/men/12.jpg" },
        { name: "Jessica from Sydney", product: "Winter Coat", img: "https://randomuser.me/api/portraits/women/90.jpg" }
    ];

    if (notification) {
        setInterval(() => {
            const randomItem = fakeData[Math.floor(Math.random() * fakeData.length)];
            const randomTime = Math.floor(Math.random() * 59) + 1;
            
            notifyImg.src = randomItem.img;
            notifyTitle.textContent = randomItem.name;
            notifyProduct.textContent = `Purchased a ${randomItem.product}`;
            notifyTime.textContent = `${randomTime} mins ago`;
            
            notification.classList.add('show-notify');
            
            setTimeout(() => {
                notification.classList.remove('show-notify');
            }, 5000); // Show for 5s
            
        }, 30000); // Every 30s
    }

    /* --- Chat Widget --- */
    const chatBtn = document.getElementById('chatBtn');
    const chatBox = document.getElementById('chatBox');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatBody = document.getElementById('chatBody');

    if (chatBtn && chatBox) {
        chatBtn.addEventListener('click', () => {
            chatBox.classList.add('open');
            chatBtn.style.display = 'none';
        });

        chatClose.addEventListener('click', () => {
            chatBox.classList.remove('open');
            chatBtn.style.display = 'flex';
        });

        // Simple Echo Bot
        function sendMessage() {
            const text = chatInput.value.trim();
            if (text) {
                // User Message
                const userMsg = document.createElement('div');
                userMsg.className = 'chat-message';
                userMsg.style.background = '#dcf8c6';
                userMsg.style.alignSelf = 'flex-end';
                userMsg.textContent = text;
                chatBody.appendChild(userMsg);
                chatInput.value = '';
                chatBody.scrollTop = chatBody.scrollHeight;

                // Bot Reply
                setTimeout(() => {
                    const botMsg = document.createElement('div');
                    botMsg.className = 'chat-message';
                    botMsg.textContent = "Thanks for your message! Our team will get back to you shortly.";
                    chatBody.appendChild(botMsg);
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        }

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    /* --- Reduced Motion Check --- */
    // Override the runaway logic if motion is reduced
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
       // We can simply remove the mouseenter listener from closeModal if it was added
       // But since `runAwayHandler` is scoped inside `initRunawayButton`, we can't easily remove it.
       // However, we can set a global flag or property on the element.
       // A hacky fix: clone the element to strip listeners
       if (closeModal) {
           const newClose = closeModal.cloneNode(true);
           closeModal.parentNode.replaceChild(newClose, closeModal);
           // Re-attach simple close listener
           newClose.addEventListener('click', showCustomConfirm);
           // Update reference (though local var remains old)
           // This works because the initRunawayButton attached to the OLD element.
           // The new element is clean.
       }
    }

    console.log('Fashion Page 2 Scripts Initialized');
});
