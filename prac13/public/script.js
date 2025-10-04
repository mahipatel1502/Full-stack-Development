// Tax Form Calculator JavaScript - Client-side Enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.querySelector('.tax-form');
    const income1Input = document.getElementById('income1');
    const income2Input = document.getElementById('income2');
    const source1Select = document.getElementById('source1');
    const source2Select = document.getElementById('source2');
    const submitBtn = document.querySelector('.btn-primary');

    // Format currency input as user types
    function formatCurrencyInput(input) {
        input.addEventListener('input', function(e) {
            let value = e.target.value;
            
            // Remove all non-numeric characters except decimal point
            value = value.replace(/[^0-9.]/g, '');
            
            // Allow only one decimal point
            const decimalCount = (value.match(/\./g) || []).length;
            if (decimalCount > 1) {
                value = value.substring(0, value.lastIndexOf('.'));
            }
            
            // Limit decimal places to 2
            if (value.includes('.')) {
                const parts = value.split('.');
                if (parts[1] && parts[1].length > 2) {
                    value = parts[0] + '.' + parts[1].substring(0, 2);
                }
            }
            
            // Limit to reasonable number length
            if (value.length > 12) {
                value = value.substring(0, 12);
            }
            
            e.target.value = value;
            validateForm();
        });

        // Add thousands separators on blur (for display only)
        input.addEventListener('blur', function(e) {
            if (e.target.value && !isNaN(e.target.value)) {
                const num = parseFloat(e.target.value);
                if (!isNaN(num)) {
                    // Format for display but keep actual value for form submission
                    const formatted = num.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    e.target.setAttribute('data-display', formatted);
                }
            }
        });

        // Remove formatting on focus for editing
        input.addEventListener('focus', function(e) {
            if (e.target.getAttribute('data-display')) {
                e.target.value = e.target.value.replace(/,/g, '');
            }
        });

        // Add visual feedback
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }

    // Setup select dropdowns with enhanced functionality
    function setupSelectDropdowns() {
        [source1Select, source2Select].forEach(select => {
            select.addEventListener('change', function() {
                validateForm();
                
                // Add visual feedback
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });

            // Add focus/blur effects
            select.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-color)';
                this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
            });

            select.addEventListener('blur', function() {
                this.style.borderColor = 'var(--border-color)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Form validation
    function validateForm() {
        const income1 = income1Input.value.trim();
        const income2 = income2Input.value.trim();
        const source1 = source1Select.value;
        const source2 = source2Select.value;
        
        // Check if all fields are filled
        const hasIncome1 = income1 !== '' && !isNaN(income1) && parseFloat(income1) >= 0;
        const hasIncome2 = income2 !== '' && !isNaN(income2) && parseFloat(income2) >= 0;
        const hasSource1 = source1 !== '';
        const hasSource2 = source2 !== '';
        
        const isValid = hasIncome1 && hasIncome2 && hasSource1 && hasSource2;
        
        // Update submit button state
        submitBtn.disabled = !isValid;
        submitBtn.style.opacity = isValid ? '1' : '0.6';
        submitBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
        
        // Add visual feedback to form fields
        updateFieldValidation(income1Input, hasIncome1);
        updateFieldValidation(income2Input, hasIncome2);
        updateFieldValidation(source1Select, hasSource1);
        updateFieldValidation(source2Select, hasSource2);
        
        return isValid;
    }

    // Update field validation styles
    function updateFieldValidation(field, isValid) {
        if (field.value.trim() === '') {
            // Neutral state for empty fields
            field.style.borderColor = 'var(--border-color)';
            field.style.backgroundColor = 'var(--background-white)';
        } else if (isValid) {
            // Valid state
            field.style.borderColor = 'var(--success-color)';
            field.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
        } else {
            // Invalid state
            field.style.borderColor = 'var(--error-color)';
            field.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
        }
    }

    // Clear form function
    function clearForm() {
        income1Input.value = '';
        income2Input.value = '';
        source1Select.value = '';
        source2Select.value = '';
        
        // Reset field styles
        [income1Input, income2Input, source1Select, source2Select].forEach(field => {
            field.style.borderColor = 'var(--border-color)';
            field.style.backgroundColor = 'var(--background-white)';
        });
        
        // Focus first field
        source1Select.focus();
        
        // Reset validation
        validateForm();
        
        // Add animation effect
        form.style.transform = 'scale(0.98)';
        setTimeout(() => {
            form.style.transform = 'scale(1)';
        }, 200);
    }

    // Add real-time calculation preview (client-side for UX)
    function showCalculationPreview() {
        const income1 = parseFloat(income1Input.value) || 0;
        const income2 = parseFloat(income2Input.value) || 0;
        const total = income1 + income2;
        
        if (total > 0) {
            // Create or update preview element
            let preview = document.querySelector('.calculation-preview');
            if (!preview) {
                preview = document.createElement('div');
                preview.className = 'calculation-preview';
                preview.style.cssText = `
                    background: rgba(37, 99, 235, 0.1);
                    border: 1px solid var(--primary-color);
                    border-radius: 10px;
                    padding: 15px;
                    margin-top: 20px;
                    text-align: center;
                    font-weight: 600;
                    color: var(--primary-color);
                    transition: all 0.3s ease;
                    animation: fadeIn 0.3s ease;
                `;
                form.appendChild(preview);
            }
            
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(total);
            
            preview.innerHTML = `
                <i class="fas fa-calculator"></i>
                Preview Total: ${formatted}
                <small style="display: block; margin-top: 5px; font-size: 0.8rem; opacity: 0.7;">
                    Submit form for detailed tax calculation
                </small>
            `;
        } else {
            // Remove preview if exists
            const preview = document.querySelector('.calculation-preview');
            if (preview) {
                preview.remove();
            }
        }
    }

    // Setup keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Clear form with Escape key
            if (e.key === 'Escape') {
                clearForm();
            }
            
            // Submit form with Ctrl+Enter
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && validateForm()) {
                form.submit();
            }
            
            // Navigate between fields with Tab enhancement
            if (e.key === 'Tab') {
                // Add visual feedback for focused elements
                setTimeout(() => {
                    const focused = document.activeElement;
                    if (focused && (focused.classList.contains('form-input') || focused.classList.contains('form-select'))) {
                        focused.style.transform = 'scale(1.02)';
                        setTimeout(() => {
                            focused.style.transform = 'scale(1)';
                        }, 200);
                    }
                }, 10);
            }
        });
    }

    // Add tooltips for better UX
    function addTooltips() {
        const tooltipElements = [
            {
                element: income1Input,
                text: "Enter your annual income from the first source (e.g., 50000.00)"
            },
            {
                element: income2Input,
                text: "Enter your annual income from the second source (e.g., 25000.00)"
            },
            {
                element: source1Select,
                text: "Select the type of your primary income source"
            },
            {
                element: source2Select,
                text: "Select the type of your secondary income source"
            }
        ];

        tooltipElements.forEach(({ element, text }) => {
            element.setAttribute('title', text);
            
            // Create custom tooltip on hover
            element.addEventListener('mouseenter', function(e) {
                if (window.innerWidth > 768) { // Only on desktop
                    showCustomTooltip(e.target, text);
                }
            });
            
            element.addEventListener('mouseleave', function() {
                hideCustomTooltip();
            });
        });
    }

    // Custom tooltip functions
    function showCustomTooltip(element, text) {
        hideCustomTooltip(); // Remove any existing tooltip
        
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--text-primary);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            z-index: 1000;
            max-width: 200px;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            transform: translateY(-5px);
            transition: all 0.2s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        
        // Show tooltip
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }, 10);
    }

    function hideCustomTooltip() {
        const tooltip = document.querySelector('.custom-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Add loading state for form submission
    function setupFormSubmission() {
        form.addEventListener('submit', function() {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
            submitBtn.disabled = true;
            
            // Add loading overlay
            const overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.8);
                backdrop-filter: blur(2px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--primary-color);
            `;
            overlay.innerHTML = '<i class="fas fa-calculator fa-spin" style="margin-right: 10px;"></i> Processing your tax calculation...';
            document.body.appendChild(overlay);
        });
    }

    // Add smooth scrolling to results
    function scrollToResults() {
        const resultCard = document.querySelector('.result-card');
        if (resultCard) {
            setTimeout(() => {
                resultCard.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        }
    }

    // Initialize all functionality
    function init() {
        // Setup form enhancements
        formatCurrencyInput(income1Input);
        formatCurrencyInput(income2Input);
        setupSelectDropdowns();
        setupKeyboardShortcuts();
        addTooltips();
        setupFormSubmission();
        
        // Initial validation
        validateForm();
        
        // Add calculation preview on input
        income1Input.addEventListener('input', showCalculationPreview);
        income2Input.addEventListener('input', showCalculationPreview);
        
        // Scroll to results if they exist
        scrollToResults();
        
        // Focus first field
        source1Select.focus();
        
        console.log('💰 Tax Form Calculator initialized successfully!');
    }

    // Global clear function for the clear button
    window.clearForm = clearForm;
    
    // Start the application
    init();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .form-input:focus, .form-select:focus {
        transition: all 0.3s ease !important;
    }
    
    .calculation-preview {
        animation: fadeIn 0.3s ease !important;
    }
`;
document.head.appendChild(style);