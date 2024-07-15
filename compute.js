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

    // convert integer part to binary
    while (integerPart > 0) {
        binary = (integerPart % 2) + binary;
        integerPart = Math.floor(integerPart / 2);
    }

    // ensure at least one zero is printed for integer part
    if (binary === '') {
        binary = '0';
    }

    // convert fractional part to binary
    if (fractionalPart > 0) {
        binary += '.';
        while (fractionalPart > 0) {
            fractionalPart *= 2;
            if (fractionalPart >= 1) {
                binary += '1';
                fractionalPart -= 1;
            } else {
                binary += '0';
            }
        }
    }

    return binary;
}