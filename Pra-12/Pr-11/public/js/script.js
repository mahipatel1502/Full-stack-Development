// Express.js Project Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Express.js Project Template loaded successfully!');
    
    // Initialize all features
    initializeModal();
    initializeAnimations();
    initializeInteractions();
    
    // Show welcome message
    showWelcomeNotification();
});

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('serverModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Show server information in modal
async function showServerInfo() {
    const modal = document.getElementById('serverModal');
    const serverInfo = document.getElementById('serverInfo');
    
    modal.style.display = 'block';
    serverInfo.innerHTML = 'Loading server information...';
    
    try {
        const response = await fetch('/api/info');
        const data = await response.json();
        
        const formattedInfo = `
🚀 Project: ${data.project}
📦 Version: ${data.version}
👤 Author: ${data.author}
📝 Description: ${data.description}

🛣️  Available Routes:
${data.routes.map(route => `   ${route.method} ${route.path} - ${route.description}`).join('\n')}

⏰ Timestamp: ${new Date(data.timestamp).toLocaleString()}
🌐 Environment: ${getEnvironmentInfo()}
💻 User Agent: ${navigator.userAgent.split(' ')[0]}
        `;
        
        serverInfo.innerHTML = formattedInfo;
    } catch (error) {
        serverInfo.innerHTML = `❌ Error loading server information: ${error.message}`;
    }
}

// Get environment information
function getEnvironmentInfo() {
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isDev ? 'Development' : 'Production';
}

// Refresh page function
function refreshPage() {
    // Add loading animation
    showLoadingAnimation();
    
    setTimeout(() => {
        window.location.reload();
    }, 500);
}

// Show loading animation
function showLoadingAnimation() {
    const body = document.body;
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <i class="fas fa-sync-alt fa-spin"></i>
            <p>Refreshing...</p>
        </div>
    `;
    body.appendChild(loader);
    
    // Add loading styles
    const style = document.createElement('style');
    style.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(102, 126, 234, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(5px);
        }
        .loader-content {
            text-align: center;
            color: white;
            font-size: 1.2rem;
        }
        .loader-content i {
            font-size: 3rem;
            margin-bottom: 20px;
            display: block;
        }
    `;
    document.head.appendChild(style);
}

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.info-card, .step-card, .action-btn');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize interactive features
function initializeInteractions() {
    // Add hover effects to action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to cards
    const cards = document.querySelectorAll('.info-card, .step-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press 'H' to go home
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.altKey) {
            window.location.href = '/home';
        }
        
        // Press 'I' to show server info
        if (e.key.toLowerCase() === 'i' && !e.ctrlKey && !e.altKey) {
            showServerInfo();
        }
        
        // Press 'R' to refresh
        if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.altKey) {
            refreshPage();
        }
        
        // Press Escape to close modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('serverModal');
            if (modal && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        }
    });
}

// Show welcome notification
function showWelcomeNotification() {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('expressTemplateVisited');
    
    if (!hasVisited) {
        setTimeout(() => {
            showNotification('🎉 Welcome to your new Express.js project template!', 'success', 5000);
            localStorage.setItem('expressTemplateVisited', 'true');
        }, 1000);
    }
}

// Generic notification system
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        }
        .notification-success { background: linear-gradient(135deg, #27ae60, #2ecc71); }
        .notification-info { background: linear-gradient(135deg, #667eea, #764ba2); }
        .notification-warning { background: linear-gradient(135deg, #f39c12, #e67e22); }
        .notification-error { background: linear-gradient(135deg, #e74c3c, #c0392b); }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        .notification-close:hover {
            opacity: 1;
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    
    if (!document.querySelector('style[data-notifications]')) {
        style.setAttribute('data-notifications', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close
    if (duration > 0) {
        setTimeout(() => {
            closeNotification(notification);
        }, duration);
    }
}

function closeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Performance monitoring
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`📊 Page load time: ${loadTime}ms`);
        
        // Show performance info if load time is slow
        if (loadTime > 3000) {
            showNotification(`⚠️ Slow load time detected: ${loadTime}ms`, 'warning');
        }
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    logPerformance();
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add some helpful developer tools
console.log(`
🚀 Express.js Project Template Developer Tools
==============================================

Available keyboard shortcuts:
• H - Go to home
• I - Show server info
• R - Refresh page
• ESC - Close modal

Available functions:
• showServerInfo() - Display server information
• refreshPage() - Refresh the page with animation
• showNotification(message, type, duration) - Show custom notification

Project Info:
• Framework: Express.js + Node.js
• Template Engine: EJS
• Styling: Custom CSS with CSS Grid & Flexbox
• Features: Responsive design, animations, notifications

Happy coding! 🎉
`);
