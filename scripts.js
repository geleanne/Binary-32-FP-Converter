document.addEventListener("DOMContentLoaded", (event) => {
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
        // not yet sure, placeholder muna
        } else if (selectedFormat === 'nan') {
            mantissaLabelText = 'NaN';
            placeholderText = 'Enter NaN value';
            exponentLabelText = 'NaN';
        }

        mantissaLabel.textContent = mantissaLabelText;
        mantissaInput.placeholder = placeholderText;
        exponentLabel.textContent = exponentLabelText;
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

    // event listener for real-time validation of mantissa input
    mantissaInput.addEventListener('input', () => {
        if (isNaN(mantissaInput.value)) {
            mantissaError.textContent = 'Invalid input. Please enter a valid number.';
        } else {
            mantissaError.textContent = '';
        }
    });

    // event listener for real-time validation of exponent input
    exponentInput.addEventListener('input', () => {
        if (isNaN(exponentInput.value)) {
            exponentError.textContent = 'Invalid exponent. Please enter a whole exponent.';
        } else {
            exponentError.textContent = '';
        }
    });
});
