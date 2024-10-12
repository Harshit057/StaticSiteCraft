<script>
// Adjust font size based on screen width
function adjustFontSize() {
    const screenWidth = window.innerWidth;
    const container = document.querySelector('.container');

    if (screenWidth < 480) {
        container.style.fontSize = '14px'; // Smaller font for small screens
    } else if (screenWidth < 768) {
        container.style.fontSize = '16px'; // Medium font for medium screens
    } else {
        container.style.fontSize = '18px'; // Default font size for larger screens
    }
}

// Scroll to top button
function createScrollToTopButton() {
    let scrollButton = document.createElement('button');
    scrollButton.innerHTML = 'Top';
    scrollButton.style.position = 'fixed';
    scrollButton.style.bottom = '20px';
    scrollButton.style.right = '20px';
    scrollButton.style.backgroundColor = '#2c3e50';
    scrollButton.style.color = '#fff';
    scrollButton.style.border = 'none';
    scrollButton.style.padding = '10px';
    scrollButton.style.cursor = 'pointer';
    scrollButton.style.display = 'none'; // Hidden by default
    scrollButton.id = 'scrollToTopBtn';
    document.body.appendChild(scrollButton);

    scrollButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show button when the user scrolls down
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        {"}"}
    });
}

// Toggle visibility of sections on mobile (optional)
function toggleSections() {
    const headings = document.querySelectorAll('h2');
    headings.forEach(function (heading) {
        heading.addEventListener('click', function () {
            const nextElement = heading.nextElementSibling;
            if (window.innerWidth < 768) {
                if (nextElement.style.display === 'none') {
                    nextElement.style.display = 'block';
                } else {
                    nextElement.style.display = 'none';
                }
            }
        });
    });
}

// Initial function calls
window.addEventListener('resize', adjustFontSize);
window.addEventListener('load', function () {
    adjustFontSize();
    createScrollToTopButton();
    toggleSections();
});

</script>

