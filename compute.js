// print the sign bit (0 = + or 1 = -) once the COMPUTE button is clicked
function computeSignBit() {
    const mantissaInput = document.getElementById('mantissa-input');
    const signBitOutput = document.getElementById('sign-bit');
    const mantissaValue = mantissaInput.value;

    if (!mantissaValue) {
        signBitOutput.textContent = '';
        return;
    }

    const signBit = mantissaValue.startsWith('-') ? 1 : 0;
    signBitOutput.textContent = signBit;
}

// convert decimal to binary
function convertDecimalToBinary(decimalNumber) {
    let binary = '';
    let integerPart = Math.abs(Math.floor(decimalNumber));
    let fractionalPart = Math.abs(decimalNumber) - integerPart;

    // Convert integer part to binary
    while (integerPart > 0) {
        binary = (integerPart % 2) + binary;
        integerPart = Math.floor(integerPart / 2);
    }

    return binary;
}