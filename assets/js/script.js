document.addEventListener('DOMContentLoaded', async function () {
    // Dynamically load the header and footer
    document.getElementById("header-placeholder").innerHTML = await fetch('header.html').then(response => response.text());
    document.getElementById("footer-placeholder").innerHTML = await fetch('footer.html').then(response => response.text());

    // Now that the header is loaded, add event listeners
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('overlay');

    // Toggle menu and overlay on hamburger click
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Close menu when clicking outside (on overlay)
    overlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
    });
});
