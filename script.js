document.addEventListener('DOMContentLoaded', () => {
    const navAbout = document.getElementById('nav-about');
    const navWork = document.getElementById('nav-work');
    const aboutSection = document.getElementById('about-section');
    const workSection = document.getElementById('work-section');
    
    const bgAbout = document.getElementById('bg-about');
    const bgWork = document.getElementById('bg-work');

    const passwordContainer = document.getElementById('password-container');
    const workContent = document.getElementById('work-content');
    const passwordInput = document.getElementById('password-input');
    const enterBtn = document.getElementById('enter-btn');
    const errorMessage = document.getElementById('error-message');
    
    // Simple hash-based check (SHA-256 of 'TWG25overview')
    const validHash = '443e3a15ed01a337a14d28f10f6958ac3b2cad3c7ee8f2efa64c904db6649124';
    
    // State to track unlocked status
    let isWorkUnlocked = false;

    // Initialize Background
    bgAbout.classList.add('active');

    // Navigation
    function switchSection(target) {
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (target === 'about') {
            // Update Nav
            navAbout.classList.add('active');
            navWork.classList.remove('active');
            
            // Update Sections
            aboutSection.classList.add('active');
            workSection.classList.remove('active');
            
            // Update Backgrounds
            bgAbout.classList.add('active');
            bgWork.classList.remove('active');
        } else {
            // Update Nav
            navWork.classList.add('active');
            navAbout.classList.remove('active');
            
            // Update Sections
            workSection.classList.add('active');
            aboutSection.classList.remove('active');
            
            // Update Backgrounds
            bgWork.classList.add('active');
            bgAbout.classList.remove('active');
        }
    }

    navAbout.addEventListener('click', (e) => {
        e.preventDefault();
        switchSection('about');
    });

    navWork.addEventListener('click', (e) => {
        e.preventDefault();
        switchSection('work');
    });

    // Simple hash function
    async function hashPassword(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    // Password Logic
    async function checkPassword() {
        const inputHash = await hashPassword(passwordInput.value);
        
        if (inputHash === validHash) {
            // Success
            errorMessage.style.opacity = '0';
            isWorkUnlocked = true;
            
            // Smooth transition: Fade out password container
            passwordContainer.style.opacity = '0';
            
            setTimeout(() => {
                passwordContainer.style.display = 'none';
                workContent.style.display = 'block';
                
                // Trigger reflow to ensure transition works
                void workContent.offsetWidth; 
                
                // Fade in iframe
                workContent.style.opacity = '1';
            }, 500); // Match CSS transition duration
            
        } else {
            // Failure
            errorMessage.style.opacity = '1';
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    enterBtn.addEventListener('click', checkPassword);
    
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
});
