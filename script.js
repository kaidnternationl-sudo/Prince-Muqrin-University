// DOM Elements
const form = document.getElementById('applicationForm');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');
const currentYearSpan = document.getElementById('currentYear');
const diplomaFileInput = document.getElementById('diplomaFile');
const fileNameSpan = document.getElementById('fileName');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Show selected file name
diplomaFileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
        fileNameSpan.textContent = `الملف المحدد: ${this.files[0].name}`;
        fileNameSpan.style.color = '#2d5c3d';
        fileNameSpan.style.fontWeight = '600';
    } else {
        fileNameSpan.textContent = '';
    }
});

// Validation functions
function validateFullName() {
    const fullName = document.getElementById('fullName').value.trim();
    const errorElement = document.getElementById('fullNameError');
    
    if (!fullName) {
        errorElement.textContent = 'الاسم الكامل مطلوب';
        return false;
    }
    
    // Check if name has at least 3 parts (first, middle, last)
    const nameParts = fullName.split(' ').filter(part => part.length > 0);
    if (nameParts.length < 3) {
        errorElement.textContent = 'يرجى إدخال الاسم ثلاثي على الأقل';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validateIdNumber() {
    const idNumber = document.getElementById('idNumber').value.trim();
    const errorElement = document.getElementById('idNumberError');
    
    if (!idNumber) {
        errorElement.textContent = 'رقم الهوية/الإقامة مطلوب';
        return false;
    }
    
    // Check if it's a valid Saudi ID or Iqama number (10 digits)
    const idRegex = /^[0-9]{10}$/;
    if (!idRegex.test(idNumber)) {
        errorElement.textContent = 'يرجى إدخال رقم هوية/إقامة صحيح (10 أرقام)';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const errorElement = document.getElementById('emailError');
    
    if (!email) {
        errorElement.textContent = 'البريد الإلكتروني مطلوب';
        return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = 'يرجى إدخال بريد إلكتروني صحيح';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validateMobile() {
    const mobile = document.getElementById('mobile').value.trim();
    const errorElement = document.getElementById('mobileError');
    
    if (!mobile) {
        errorElement.textContent = 'رقم الجوال مطلوب';
        return false;
    }
    
    // Saudi mobile number validation (starts with 05)
    const mobileRegex = /^05[0-9]{8}$/;
    if (!mobileRegex.test(mobile)) {
        errorElement.textContent = 'يرجى إدخال رقم جوال سعودي صحيح (يبدأ بـ 05)';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validateMajor() {
    const majorSelected = document.querySelector('input[name="major"]:checked');
    const errorElement = document.getElementById('majorError');
    
    if (!majorSelected) {
        errorElement.textContent = 'يرجى اختيار التخصص';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validateDiplomaIssuer() {
    const diplomaIssuer = document.getElementById('diplomaIssuer').value.trim();
    const errorElement = document.getElementById('diplomaIssuerError');
    
    if (!diplomaIssuer) {
        errorElement.textContent = 'اسم جهة الحصول على الدبلوم مطلوب';
        return false;
    }
    
    if (diplomaIssuer.length < 3) {
        errorElement.textContent = 'يرجى إدخال اسم جهة صحيح';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validateGPA() {
    const gpaInput = document.getElementById('gpa');
    const gpa = parseFloat(gpaInput.value);
    const errorElement = document.getElementById('gpaError');
    
    if (!gpaInput.value) {
        errorElement.textContent = 'معدل الدبلوم التراكمي مطلوب';
        return false;
    }
    
    if (isNaN(gpa) || gpa < 0 || gpa > 5) {
        errorElement.textContent = 'يرجى إدخال معدل صحيح (من 0 إلى 5)';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

function validateDiplomaFile() {
    const diplomaFile = diplomaFileInput.files[0];
    const errorElement = document.getElementById('diplomaFileError');
    
    if (!diplomaFile) {
        errorElement.textContent = 'رفع شهادة الدبلوم مطلوب';
        return false;
    }
    
    // Check file type
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(diplomaFile.type)) {
        errorElement.textContent = 'يرجى رفع ملف PDF فقط';
        return false;
    }
    
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (diplomaFile.size > maxSize) {
        errorElement.textContent = 'الملف كبير جداً. الحد الأقصى 5 ميجابايت';
        return false;
    }
    
    errorElement.textContent = '';
    return true;
}

// Real-time validation
document.getElementById('fullName').addEventListener('blur', validateFullName);
document.getElementById('idNumber').addEventListener('blur', validateIdNumber);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('mobile').addEventListener('blur', validateMobile);
document.getElementById('diplomaIssuer').addEventListener('blur', validateDiplomaIssuer);
document.getElementById('gpa').addEventListener('blur', validateGPA);
diplomaFileInput.addEventListener('change', validateDiplomaFile);

// Validate major when any radio button changes
document.querySelectorAll('input[name="major"]').forEach(radio => {
    radio.addEventListener('change', validateMajor);
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Run all validations
    const isFullNameValid = validateFullName();
    const isIdValid = validateIdNumber();
    const isEmailValid = validateEmail();
    const isMobileValid = validateMobile();
    const isMajorValid = validateMajor();
    const isDiplomaIssuerValid = validateDiplomaIssuer();
    const isGPAValid = validateGPA();
    const isDiplomaFileValid = validateDiplomaFile();
    
    // If all validations pass
    if (isFullNameValid && isIdValid && isEmailValid && isMobileValid && 
        isMajorValid && isDiplomaIssuerValid && isGPAValid && isDiplomaFileValid) {
        
        // Show success modal
        successModal.style.display = 'flex';
        
        // Reset form after successful submission
        setTimeout(() => {
            form.reset();
            fileNameSpan.textContent = '';
            // Clear all error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
        }, 100);
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.error-message:not(:empty)');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Close modal
closeModalBtn.addEventListener('click', function() {
    successModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Format mobile number input
document.getElementById('mobile').addEventListener('input', function(e) {
    // Remove non-digit characters
    let value = e.target.value.replace(/\D/g, '');
    
    // Add 0 at the beginning if it starts with 5
    if (value.startsWith('5')) {
        value = '0' + value;
    }
    
    // Limit to 10 digits
    e.target.value = value.substring(0, 10);
});

// Format ID number input
document.getElementById('idNumber').addEventListener('input', function(e) {
    // Remove non-digit characters
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 10);
});
