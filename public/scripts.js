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
    const exportButton = document.getElementById('export');
    const exportSuccessMessage = document.getElementById('export-success-message');
    const exportErrorMessage = document.getElementById('export-error-message');

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

        if (selectedFormat === 'nan') {
            if (mantissaValue !== 'qnan' && mantissaValue !== 'snan') {
                mantissaError.textContent = 'Input should be "qnan" or "snan".';
                isValid = false;
            }
            if (exponentValue !== '') {
                exponentError.textContent = 'NaN should not have any value.';
                isValid = false;
            }
        } else {
            if (mantissaValue === '') {
                mantissaError.textContent = 'Mantissa cannot be empty.';
                isValid = false;
            } else if (selectedFormat === 'binary' && !isValidBinaryInput(mantissaValue)) {
                mantissaError.textContent = 'Invalid binary input.';
                isValid = false;
            } else if (selectedFormat === 'decimal' && isNaN(mantissaValue)) {
                mantissaError.textContent = 'Invalid decimal input.';
                isValid = false;
            }

            if (selectedFormat !== 'nan') {
                if (exponentValue === '') {
                    exponentError.textContent = 'Exponent cannot be empty.';
                    isValid = false;
                } else if (!/^[+-]?\d+$/.test(exponentValue)) {
                    exponentError.textContent = 'Invalid input. Please enter a whole number for exponent.';
                    isValid = false;
                }
            } else if (exponentValue !== '') {
                exponentError.textContent = 'NaN should not have any value.';
                isValid = false;
            }
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
            document.getElementById("binary-output").textContent = '';
            document.getElementById("hex-output").textContent = '';
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
            exportSuccessMessage.textContent = "";
        } else {
            exportErrorMessage.textContent = "";
            computeSignBit();
            computeBinaryRepresentation();
            computeFinalExponent();
            computeEPrime();
            computeSPF();
            finalAnswerBinary();
            finaAnswrHex();
            printSpecialCase();
            computeNaNSpecialCase();
        }
    });

   // export button functionality
   exportButton.addEventListener("click", function () {
    const binaryOutput = document.getElementById("binary-output").textContent.trim();
    const hexOutput = document.getElementById("hex-output").textContent.trim();
    const selectedFormat = inputType.value;
    const mantissaValue = mantissaInput.value.trim();
    const exponentValue = exponentInput.value.trim();
    const specialCase = document.getElementById('special-case').textContent.trim();
    const binaryEquivalent = binaryEquivalentOutput.textContent.trim();
    const normalizedBinary = document.getElementById('normalized-binary').textContent.trim();
    const finalExponent = document.getElementById('final-exponent').textContent.trim();
    const signBit = document.getElementById('sign-bit').textContent.trim();
    const ePrime = document.getElementById('e-prime').textContent.trim();
    const significand = document.getElementById('significand').textContent.trim();

    if (binaryOutput || hexOutput) {
        // If there are valid outputs
        exportSuccessMessage.textContent = "Exporting... Check your Downloads folder.";
        exportErrorMessage.textContent = "";
        const data = `
Input Type: ${selectedFormat}\n
Mantissa: ${mantissaValue}
Exponent: ${exponentValue}\n
Binary Equivalent: ${binaryEquivalent}
Normalized Binary: ${normalizedBinary}
Final Exponent: ${finalExponent}
Sign Bit: ${signBit}
E Prime: ${ePrime}
Significand: ${significand}
Special Case: ${specialCase}\n
Binary Output: ${binaryOutput}
Hex Output: ${hexOutput}
        `;
        const blob = new Blob([data], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "output.txt";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } else {
        // If there are no valid outputs
        exportErrorMessage.textContent = "Error: No data available for export.";
        exportSuccessMessage.textContent = "";
    }
});
});
