document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('preview');
    
    let currentObjectUrl = null;

    // Handle file selection
    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        // Clean up previous object URL
        if (currentObjectUrl) {
            URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = null;
        }
        
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                imageInput.value = '';
                return;
            }
            
            // Create object URL for the file
            currentObjectUrl = URL.createObjectURL(file);
            previewImage.src = currentObjectUrl;
            previewContainer.classList.add('active');
        } else {
            resetPreview();
        }
    });
});
