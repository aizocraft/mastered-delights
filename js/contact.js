// Add this script for form functionality
document.addEventListener('DOMContentLoaded', function() {
    // Image preview functionality
    const fileInput = document.getElementById('attachment');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const previewCloseBtn = imagePreviewContainer.querySelector('.preview-close-btn');

    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                imagePreview.src = event.target.result;
                imagePreviewContainer.classList.add('active');
            }
            
            reader.readAsDataURL(file);
        }
    });

    previewCloseBtn.addEventListener('click', function() {
        fileInput.value = '';
        imagePreviewContainer.classList.remove('active');
    });

    // Form submission handling
    const form = document.getElementById('sweetDelightsForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const spinner = document.getElementById('spinner');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitText.style.display = 'none';
        spinner.style.display = 'block';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(function() {
            // Generate random order number
            const orderNum = 'DL' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
            document.getElementById('orderNumber').textContent = orderNum;
            
            // Show success message
            spinner.style.display = 'none';
            successMessage.classList.add('active');
            form.reset();
            imagePreviewContainer.classList.remove('active');
            
            // Reset form after delay
            setTimeout(function() {
                submitText.style.display = 'block';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });

    // Add floating label functionality for all inputs
    const floatingInputs = document.querySelectorAll('.floating-input');
    
    floatingInputs.forEach(input => {
        // Check if input has value on page load
        if (input.value) {
            input.nextElementSibling.classList.add('floating-label-active');
        }
        
        input.addEventListener('focus', function() {
            this.nextElementSibling.classList.add('floating-label-active');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.nextElementSibling.classList.remove('floating-label-active');
            }
        });
    });
});