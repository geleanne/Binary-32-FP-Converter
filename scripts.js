document.addEventListener("DOMContentLoaded", () => {
    const inputType = document.getElementById('input-type');
    const mantissaLabel = document.getElementById('mantissa-label');    // decimal OR binary OR NaN
    const exponentLabel = document.getElementById('exponent-base');     // base-10 OR base-2
    const mantissaInput = document.getElementById('mantissa-input');    // decimal OR binary input
    const exponentInput = document.getElementById('exponent-input');    // exponent input
    const container = document.getElementById('container');  
    const sidebar = document.getElementById('sidebar');                 // sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');     // sidebar toggle functionality
    const mantissaError = document.getElementById('mantissa-error');    // error message for invalid decimal OR binary input
    const exponentError = document.getElementById('exponent-error');    // error message for invalid exponent input
    const computeButton = document.getElementById('compute');           
    const binaryEquivalentOutput = document.getElementById('binary-equivalent');
    const normalizedBinaryOutput = document.getElementById('normalized-binary'); // normalized binary output

    // event listener for input type change
    inputType.addEventListener('change', function() {
        const selectedFormat = inputType.value;
        let mantissaLabelText = 'Decimal';
        let placeholderText = 'Enter a decimal number';
        let exponentLabelText = 'Exponent (Base-10)';

        if (selectedFormat === 'binary') {
            mantissaLabelText = 'Binary';
            placeholderText = 'Enter a binary number';
            exponentLabelText = 'Exponent (Base-2)';
        } else if (selectedFormat === 'decimal') {
            mantissaLabelText = 'Decimal';
            placeholderText = 'Enter a decimal number';
            exponentLabelText = 'Exponent (Base-10)';
        // placeholder muna since not yet sure for nan
        } else if (selectedFormat === 'nan') {
            mantissaLabelText = 'NaN';
            placeholderText = 'Enter NaN value';
            exponentLabelText = 'NaN';
        }

        mantissaLabel.textContent = mantissaLabelText;
        mantissaInput.placeholder = placeholderText;
        exponentLabel.textContent = exponentLabelText;
        mantissaInput.value = '';
        exponentInput.value = '';
        mantissaError.textContent = '';
        exponentError.textContent = '';
    });

    // event listener for sidebar toggle
    sidebarToggle.addEventListener('click', () => {
        if (sidebar.style.left === "0px") {
            sidebar.style.left = "-200px";
            sidebar.classList.remove('wide');
            container.classList.remove('shifted');
        } else {
            sidebar.style.left = "0px";
            sidebar.classList.add('wide');
            container.classList.add('shifted');
        }
    });

    // validate mantissa and exponent inputs
    const validateInputs = () => {
        const selectedFormat = inputType.value;
        const mantissaValue = mantissaInput.value.trim();
        const exponentValue = exponentInput.value.trim();
        let isValid = true;

        mantissaError.textContent = '';
        exponentError.textContent = '';

        if (mantissaValue === '') {
            mantissaError.textContent = 'Mantissa cannot be empty.';
            isValid = false;
        } else if (selectedFormat === 'binary' && !isValidBinaryInput(mantissaValue)) {
            mantissaError.textContent = 'Invalid binary input.';
            isValid = false;
        } else if (selectedFormat === 'decimal' && isNaN(mantissaValue)) {
            mantissaError.textContent = 'Invalid decimal input.';
            isValid = false;
        } else if (selectedFormat === 'nan' && mantissaValue !== '') {
            mantissaError.textContent = 'NaN should not have any value.';
            isValid = false;
        }

        if (selectedFormat !== 'nan') {
            if (exponentValue === '') {
                exponentError.textContent = 'Exponent cannot be empty.';
                isValid = false;
            } else if (!/^\d+$/.test(exponentValue)) {
                exponentError.textContent = 'Invalid input. Please enter a whole number for exponent.';
                isValid = false;
            }
        } else if (exponentValue !== '') {
            exponentError.textContent = 'NaN should not have any value.';
            isValid = false;
        }

        // clear process outputs on invalid input
        if (!isValid) {
            document.getElementById('binary-equivalent').textContent = '';
            document.getElementById('normalized-binary').textContent = '';
            document.getElementById('final-exponent').textContent = '';
            document.getElementById('sign-bit').textContent = '';
            document.getElementById('e-prime').textContent = '';
            document.getElementById('significand').textContent = '';
            document.getElementById('special-case').textContent = '';
        }

        return isValid;
    };

    // check the binary input validation
    function isValidBinaryInput(value) {
        const binaryRegex = /^[-+]?[01]+(\.[01]+)?$/;
        if (!binaryRegex.test(value)) return false;

        const dotIndex = value.indexOf('.');
        if (dotIndex === -1) return true; 

        // decimal point must not be in the most or least significant bit
        if (dotIndex === 0 || dotIndex === value.length - 1) return false;

        return true;
    }

    // handles the binary equivalent output
    function computeBinaryRepresentation() {
        const mantissaInput = document.getElementById('mantissa-input');
        const mantissaValue = mantissaInput.value.trim();
        const selectedFormat = inputType.value;
    
        let binaryEquivalent = '';
        // if the input is binary, just display the input value on the binary equivalent output
        if (selectedFormat === 'binary') {
            binaryEquivalent = mantissaValue.startsWith('-') || mantissaValue.startsWith('+') ? mantissaValue.slice(1) : mantissaValue;
        } else {
            binaryEquivalent = convertDecimalToBinary(mantissaValue);
        }
        binaryEquivalentOutput.textContent = binaryEquivalent;
    }

    // validation on compute button click
    computeButton.addEventListener('click', (event) => {
        const isValid = validateInputs();

        if (!isValid) {
            event.preventDefault();
        } else {
            computeSignBit();
            computeBinaryRepresentation();
            computeNormalizedBinary();
            // computeFinalExponentandEPrime();
        }
    });
});