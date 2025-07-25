// Smooth scroll for anchor links and button active effect
document.querySelectorAll('.glass-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        document.querySelectorAll('.glass-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        this.blur();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => this.classList.remove('active'), 600);
        }
    });
    btn.addEventListener('mouseup', function() { this.blur(); });
    btn.addEventListener('mouseleave', function() { this.blur(); });
});

// Navbar hide/reveal on scroll (Harvard style)
let lastScrollTop = 0;
const navbar = document.getElementById('mainNavbar');
window.addEventListener('scroll', function() {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 80) {
        navbar.classList.add('navbar-hide');
        navbar.classList.remove('navbar-show');
    } else {
        navbar.classList.remove('navbar-hide');
        navbar.classList.add('navbar-show');
    }
    lastScrollTop = st <= 0 ? 0 : st;
});
window.addEventListener('DOMContentLoaded', () => {
    navbar.classList.add('navbar-show');
});

// --- YouTube Data API (live subscriber count & username) ---
// Replace with your YouTube Data API v3 key and channel ID
const apiKey = 'YOUR_YOUTUBE_API_KEY';
const channelId = 'UCg9p8t4wD8JzC3b6Qm1C2pA'; // Example, replace with your real channel ID

async function updateYouTubeProfile() {
    try {
        const resp = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);
        if (!resp.ok) return;
        const data = await resp.json();
        if (data.items && data.items.length > 0) {
            const channel = data.items[0];
            document.getElementById('ytUsername').textContent = channel.snippet.title;
            document.getElementById('ytSubs').textContent = `${channel.statistics.subscriberCount} subscribers`;
            document.querySelector('.yt-slide-pfp').src = channel.snippet.thumbnails.default.url;
        }
    } catch (e) {
        // Fallback: do nothing if API fails
    }
}
updateYouTubeProfile();
setInterval(updateYouTubeProfile, 300000); // update every 5 minutes
