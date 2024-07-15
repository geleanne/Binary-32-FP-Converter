// Print the sign bit (0 = + or 1 = -) once the COMPUTE button is clicked
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

// Function to convert the integer part of a decimal number to binary
function integerToBinary(integerPart) {
    let binary = '';
    let num = parseInt(integerPart, 10);

    if (num === 0) return '0';

    while (num > 0) {
        binary = (num % 2) + binary;
        num = Math.floor(num / 2);
    }
    return binary;
}

// Function to convert the fractional part of a decimal number to binary
function fractionalToBinary(fractionalPart) {
    let binary = '';
    let num = parseFloat('0.' + fractionalPart);
    let precision = fractionalPart.length;

    while (precision > 0) {
        num *= 2;
        if (num >= 1) {
            binary += '1';
            num -= 1;
        } else {
            binary += '0';
        }
        precision--;
    }
    return binary;
}

// Function to handle the conversion process
function convertDecimalToBinary(decimalNumber) {
    const absoluteValue = decimalNumber.startsWith('-') ? decimalNumber.slice(1) : decimalNumber;

    if (absoluteValue.includes('.')) {
        const [integerPart, fractionalPart] = absoluteValue.split('.');
        const integerBinary = integerToBinary(integerPart);
        const fractionalBinary = fractionalToBinary(fractionalPart);
        return `${integerBinary}.${fractionalBinary}`;
    } else {
        return integerToBinary(absoluteValue);
    }
}
