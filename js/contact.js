// ============================================
// EMAILJS CONFIGURATION
// ============================================
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'ZZVB7U68ibXdbh2iH',
    SERVICE_ID: 'service_vyfpafb',
    TEMPLATE_ID: 'template_abipxzg'
};

// ImgBB Configuration (FREE - supports up to 16MB)
const IMGBB_API_KEY = 'd0745d84cef26abadbdfc2955211cf8d';

// Initialize EmailJS
emailjs.init({
    publicKey: EMAILJS_CONFIG.PUBLIC_KEY
});

// ============================================
// COMPRESS IMAGE TO UNDER 5MB (if needed)
// ============================================
async function compressImage(file, maxSizeMB = 5) {
    return new Promise((resolve, reject) => {
        // If file is already under max size, return as is
        if (file.size <= maxSizeMB * 1024 * 1024) {
            resolve(file);
            return;
        }
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Calculate new dimensions (max 1200px)
                const maxDimension = 1200;
                if (width > maxDimension || height > maxDimension) {
                    if (width > height) {
                        height = (height * maxDimension) / width;
                        width = maxDimension;
                    } else {
                        width = (width * maxDimension) / height;
                        height = maxDimension;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Compress to 0.8 quality
                canvas.toBlob((blob) => {
                    const compressedFile = new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    
                    // Check if compression worked
                    if (compressedFile.size > maxSizeMB * 1024 * 1024) {
                        // If still too large, compress more
                        canvas.toBlob((blob2) => {
                            const moreCompressedFile = new File([blob2], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                            resolve(moreCompressedFile);
                        }, 'image/jpeg', 0.6);
                    } else {
                        resolve(compressedFile);
                    }
                }, 'image/jpeg', 0.8);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}

// ============================================
// UPLOAD IMAGE TO IMGBB (supports up to 16MB)
// ============================================
async function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMGBB_API_KEY);
    
    const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
    });
    
    const data = await response.json();
    if (data.success) {
        return data.data.url;
    } else {
        throw new Error(data.error.message);
    }
}

// ============================================
// FORM HANDLER - SEND TO OWNER ONLY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('sweetDelightsForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const spinner = document.getElementById('spinner');
    const successMessage = document.getElementById('successMessage');
    const fileInput = document.getElementById('attachment');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    
    // Image preview with 5MB limit
    if (fileInput) {
        fileInput.addEventListener('change', async function(e) {
            if (e.target.files.length > 0) {
                let file = e.target.files[0];
                
                // Check file size (ImgBB supports up to 16MB, but we'll limit to 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('File too large (max 5MB). Please choose a smaller image.');
                    fileInput.value = '';
                    imagePreviewContainer?.classList.remove('active');
                    return;
                }
                
                // Check file type
                if (!file.type.startsWith('image/')) {
                    alert('Please upload an image file (JPEG, PNG, etc.)');
                    fileInput.value = '';
                    imagePreviewContainer?.classList.remove('active');
                    return;
                }
                
                // Show preview
                const reader = new FileReader();
                reader.onload = function(event) {
                    imagePreview.src = event.target.result;
                    imagePreviewContainer?.classList.add('active');
                }
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Remove preview
    const closeBtn = imagePreviewContainer?.querySelector('.preview-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            fileInput.value = '';
            imagePreviewContainer.classList.remove('active');
        });
    }
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading
        if (submitText) submitText.style.display = 'none';
        if (spinner) spinner.style.display = 'inline-block';
        if (submitBtn) submitBtn.disabled = true;
        
        // Add time field
        const now = new Date();
        const formattedTime = now.toLocaleString('en-KE', {
            dateStyle: 'full',
            timeStyle: 'medium',
            timeZone: 'Africa/Nairobi'
        });
        
        try {
            let imageUrl = '';
            
            // Upload image if exists
            if (fileInput && fileInput.files.length > 0) {
                try {
                    console.log('Uploading image to ImgBB...');
                    let imageFile = fileInput.files[0];
                    
                    // Compress if needed
                    if (imageFile.size > 5 * 1024 * 1024) {
                        console.log('Compressing image...');
                        imageFile = await compressImage(imageFile, 5);
                    }
                    
                    imageUrl = await uploadToImgBB(imageFile);
                    console.log('Image uploaded:', imageUrl);
                } catch (uploadError) {
                    console.error('Upload failed:', uploadError);
                    imageUrl = '';
                    alert('Image upload failed, but your inquiry will still be sent.');
                }
            }
            
            // Prepare email data
            const emailData = {
                name: form.querySelector('[name="name"]').value,
                email: form.querySelector('[name="email"]').value,
                phone: form.querySelector('[name="phone"]').value,
                message: form.querySelector('[name="message"]').value,
                time: formattedTime,
                img: imageUrl || ''
            };
            
            console.log('Sending email to owner with data:', emailData);
            
            // Send email to OWNER only
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                emailData
            );
            
            console.log('Success:', response);
            
            // Generate order number
            const orderNum = 'DL' + now.getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
            const orderSpan = document.getElementById('orderNumber');
            if (orderSpan) orderSpan.textContent = orderNum;
            
            // Show success
            if (spinner) spinner.style.display = 'none';
            if (successMessage) successMessage.classList.add('active');
            
            // Reset form
            form.reset();
            if (imagePreviewContainer) imagePreviewContainer.classList.remove('active');
            if (imagePreview) imagePreview.src = '';
            
            // Reset button
            setTimeout(() => {
                if (submitText) submitText.style.display = 'inline-block';
                if (submitBtn) submitBtn.disabled = false;
            }, 3000);
            
            // Hide success message
            setTimeout(() => {
                if (successMessage) successMessage.classList.remove('active');
            }, 8000);
            
        } catch (error) {
            console.error('Error:', error);
            
            if (spinner) spinner.style.display = 'none';
            if (submitText) submitText.style.display = 'inline-block';
            if (submitBtn) submitBtn.disabled = false;
            
            let errorMsg = 'Failed to send message. ';
            if (error.status === 413) {
                errorMsg = 'Image too large. Please use image under 5MB. ';
            } else if (error.text) {
                errorMsg = error.text + ' ';
            }
            alert(errorMsg + 'Please try again or contact us via WhatsApp.');
        }
    });
    
    // Label animations (labels now above inputs)
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        const label = input.previousElementSibling;
        if (label && label.classList.contains('form-label')) {
            if (input.value) {
                label.classList.add('label-active');
            }
            
            input.addEventListener('focus', () => label.classList.add('label-active'));
            input.addEventListener('blur', () => {
                if (!input.value) label.classList.remove('label-active');
            });
        }
    });
});
