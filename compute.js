// separate js file for computation functions

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

// convert the integer part of a decimal number to binary
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

// convert the fractional part of a decimal number to binary
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

// handle the conversion process (combined integerToBinary and fractionalToBinary)
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

// normalize the binary representation
function computeNormalizedBinary() {
    const binaryEquivalentOutput = document.getElementById('binary-equivalent');
    const normalizedBinaryOutput = document.getElementById('normalized-binary');
    const binaryEquivalent = binaryEquivalentOutput.textContent;

    if (!binaryEquivalent) {
        normalizedBinaryOutput.textContent = '';
        return;
    }

    const [integerPart, fractionalPart] = binaryEquivalent.split('.');
    let normalizedBinary = '';
    let exponent = 0;

    if (integerPart && integerPart !== '0') {
        // Move the point left to get the first "1" on the leftmost side
        const firstOneIndex = integerPart.indexOf('1');
        exponent = integerPart.length - firstOneIndex - 1;
        normalizedBinary = `1.${integerPart.slice(firstOneIndex + 1)}${fractionalPart || ''}`;
    } else if (fractionalPart) {
        // Move the point right to get the first "1" on the leftmost side
        const firstOneIndex = fractionalPart.indexOf('1');
        exponent = -(firstOneIndex + 1);
        normalizedBinary = `1.${fractionalPart.slice(firstOneIndex + 1)}`;
    }

    normalizedBinaryOutput.textContent = normalizedBinary;
}