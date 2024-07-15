document.addEventListener("DOMContentLoaded", (event) => {
    const inputType = document.getElementById('input-type');
    const mantissaLabel = document.getElementById('mantissa-label');
    const mantissaInput = document.getElementById('mantissa-input');
    const exponentLabel = document.getElementById('exponent-base');
    const sidebar = document.getElementById('sidebar');
    const container = document.getElementById('container');
    const sidebarToggle = document.getElementById('sidebarToggle');

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
    });

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
});
