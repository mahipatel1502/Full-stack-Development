// Kids Calculator JavaScript - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.querySelector('.calculator-form');
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationInputs = document.querySelectorAll('input[name="operation"]');
    const calculateBtn = document.querySelector('.calculate-btn');
    const clearBtn = document.querySelector('.clear-btn');

    // Add input validation and formatting
    function setupNumberInputs() {
        [num1Input, num2Input].forEach(input => {
            // Allow only numbers, decimal point, and negative sign
            input.addEventListener('input', function(e) {
                let value = e.target.value;
                
                // Remove any non-numeric characters except decimal point and minus sign
                value = value.replace(/[^0-9.-]/g, '');
                
                // Allow only one decimal point
                const decimalCount = (value.match(/\./g) || []).length;
                if (decimalCount > 1) {
                    value = value.substring(0, value.lastIndexOf('.'));
                }
                
                // Allow minus sign only at the beginning
                if (value.includes('-') && value.indexOf('-') !== 0) {
                    value = value.replace(/-/g, '');
                }
                
                // Limit to reasonable number length
                if (value.length > 10) {
                    value = value.substring(0, 10);
                }
                
                e.target.value = value;
                validateForm();
            });

            // Add visual feedback on focus
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
            });

            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
            });

            // Add number formatting on blur
            input.addEventListener('blur', function() {
                if (this.value && !isNaN(this.value)) {
                    const num = parseFloat(this.value);
                    this.value = num.toString();
                }
            });
        });
    }

    // Form validation
    function validateForm() {
        const num1 = num1Input.value.trim();
        const num2 = num2Input.value.trim();
        const operation = document.querySelector('input[name="operation"]:checked');
        
        const isValid = num1 !== '' && num2 !== '' && operation && 
                       !isNaN(num1) && !isNaN(num2);
        
        calculateBtn.disabled = !isValid;
        calculateBtn.style.opacity = isValid ? '1' : '0.6';
        calculateBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
        
        return isValid;
    }

    // Setup operation button interactions
    function setupOperationButtons() {
        const operationButtons = document.querySelectorAll('.operation-btn');
        
        operationButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove selected class from all buttons
                operationButtons.forEach(btn => btn.classList.remove('selected'));
                // Add selected class to clicked button
                this.classList.add('selected');
                
                // Add animation effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                validateForm();
            });
        });
    }

    // Clear form function
    function clearForm() {
        num1Input.value = '';
        num2Input.value = '';
        
        // Clear operation selection
        operationInputs.forEach(input => {
            input.checked = false;
        });
        
        // Remove selected class from operation buttons
        document.querySelectorAll('.operation-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Focus first input
        num1Input.focus();
        
        // Reset validation
        validateForm();
        
        // Add animation effect
        form.style.transform = 'scale(0.98)';
        setTimeout(() => {
            form.style.transform = '';
        }, 200);
    }

    // Setup clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', clearForm);
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Clear form with Escape key
        if (e.key === 'Escape') {
            clearForm();
        }
        
        // Submit form with Enter key (if valid)
        if (e.key === 'Enter' && validateForm()) {
            form.submit();
        }
        
        // Operation shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '+':
                    e.preventDefault();
                    document.querySelector('input[value="add"]').checked = true;
                    document.querySelector('input[value="add"]').closest('.operation-btn').classList.add('selected');
                    validateForm();
                    break;
                case '-':
                    e.preventDefault();
                    document.querySelector('input[value="subtract"]').checked = true;
                    document.querySelector('input[value="subtract"]').closest('.operation-btn').classList.add('selected');
                    validateForm();
                    break;
                case '*':
                    e.preventDefault();
                    document.querySelector('input[value="multiply"]').checked = true;
                    document.querySelector('input[value="multiply"]').closest('.operation-btn').classList.add('selected');
                    validateForm();
                    break;
                case '/':
                    e.preventDefault();
                    document.querySelector('input[value="divide"]').checked = true;
                    document.querySelector('input[value="divide"]').closest('.operation-btn').classList.add('selected');
                    validateForm();
                    break;
            }
        }
    });

    // Add fun sound effects (optional - using Web Audio API)
    function createBeepSound(frequency = 800, duration = 100) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        } catch (e) {
            // Fallback if Web Audio API is not supported
            console.log('Sound effects not supported');
        }
    }

    // Add sound effects to buttons
    function addSoundEffects() {
        calculateBtn.addEventListener('click', () => createBeepSound(600, 150));
        clearBtn.addEventListener('click', () => createBeepSound(400, 100));
        
        document.querySelectorAll('.operation-btn').forEach(btn => {
            btn.addEventListener('click', () => createBeepSound(500, 80));
        });
    }

    // Add visual feedback for calculations
    function animateResult() {
        const resultCard = document.querySelector('.result-card');
        if (resultCard) {
            resultCard.style.opacity = '0';
            resultCard.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                resultCard.style.transition = 'all 0.5s ease-out';
                resultCard.style.opacity = '1';
                resultCard.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Add helpful tips for kids
    function showTip() {
        const tips = [
            "💡 Tip: You can use Ctrl+Plus (+) to quickly select addition!",
            "🌟 Try using negative numbers too - they work great!",
            "🎯 Remember: You can't divide by zero - it's mathematically impossible!",
            "🚀 Practice makes perfect! Keep calculating!",
            "🎨 Did you know? Math is everywhere around us!"
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        
        // Show tip as a temporary notification
        const tipElement = document.createElement('div');
        tipElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4caf50, #66bb6a);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 300px;
            font-weight: 600;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease-out;
        `;
        tipElement.textContent = randomTip;
        
        document.body.appendChild(tipElement);
        
        // Animate in
        setTimeout(() => {
            tipElement.style.opacity = '1';
            tipElement.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            tipElement.style.opacity = '0';
            tipElement.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(tipElement);
            }, 300);
        }, 4000);
    }

    // Initialize all features
    function init() {
        setupNumberInputs();
        setupOperationButtons();
        validateForm();
        addSoundEffects();
        animateResult();
        
        // Show a helpful tip after 3 seconds
        setTimeout(showTip, 3000);
        
        // Focus the first input
        num1Input.focus();
        
        console.log('🧮 Kids Calculator initialized! Ready for math fun!');
    }

    // Start the calculator
    init();
});

// Global clear function for the clear button in HTML
function clearForm() {
    const event = new CustomEvent('clearForm');
    document.dispatchEvent(event);
    
    // Manual clear if event listener isn't set up yet
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    
    document.querySelectorAll('input[name="operation"]').forEach(input => {
        input.checked = false;
    });
    
    document.querySelectorAll('.operation-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    document.getElementById('num1').focus();
}
