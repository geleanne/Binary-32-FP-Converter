// separate js file for computation functions

// print the sign bit (0 = + or 1 = -) once the COMPUTE button is clicked
function computeSignBit() {
  const mantissaInput = document.getElementById("mantissa-input");
  const signBitOutput = document.getElementById("sign-bit");
  const mantissaValue = mantissaInput.value;

  if (!mantissaValue) {
    signBitOutput.textContent = "";
    return;
  }

  const signBit = mantissaValue.startsWith("-") ? 1 : 0;
  signBitOutput.textContent = signBit;
}

// convert the integer part of a decimal number to binary
function integerToBinary(integerPart) {
  let binary = "";
  let num = parseInt(integerPart, 10);

  if (num === 0) return "0";

  while (num > 0) {
    binary = (num % 2) + binary;
    num = Math.floor(num / 2);
  }
  trialQuickPrint(binary);
  return binary;
}

// convert the fractional part of a decimal number to binary
function fractionalToBinary(fractionalPart) {
  let binary = "";
  let num = parseFloat("0." + fractionalPart);
  let precision = fractionalPart.length;

  while (precision > 0) {
    num *= 2;
    if (num >= 1) {
      binary += "1";
      num -= 1;
    } else {
      binary += "0";
    }
    precision--;
  }
  return binary;
}

// handle the conversion process (combined integerToBinary and fractionalToBinary)
function convertDecimalToBinary(decimalNumber) {
  const absoluteValue = decimalNumber.startsWith("-")
    ? decimalNumber.slice(1)
    : decimalNumber;

  if (absoluteValue.includes(".")) {
    const [integerPart, fractionalPart] = absoluteValue.split(".");
    const integerBinary = integerToBinary(integerPart);
    const fractionalBinary = fractionalToBinary(fractionalPart);
    return `${integerBinary}.${fractionalBinary}`;
  } else {
    return integerToBinary(absoluteValue);
  }
}

// normalize the binary representation
function computeNormalizedBinary() {
  const binaryEquivalentOutput = document.getElementById("binary-equivalent");
  const normalizedBinaryOutput = document.getElementById("normalized-binary");
  const binaryEquivalent = binaryEquivalentOutput.textContent;

  if (!binaryEquivalent) {
    normalizedBinaryOutput.textContent = "";
    return 0;
  }

  const [integerPart, fractionalPart] = binaryEquivalent.split(".");
  let normalizedBinary = "";
  let exponent = 0;

  if (integerPart && integerPart !== "0") {
    const firstOneIndex = integerPart.indexOf("1");
    exponent = integerPart.length - firstOneIndex - 1;
    normalizedBinary = `1.${integerPart.slice(firstOneIndex + 1)}${
      fractionalPart || ""
    }`;
  } else if (fractionalPart) {
    const firstOneIndex = fractionalPart.indexOf("1");
    exponent = -(firstOneIndex + 1);
    normalizedBinary = `1.${fractionalPart.slice(firstOneIndex + 1)}`;
  }
  trialQuickPrint("This is normBin: " + normalizedBinary);

  normalizedBinaryOutput.textContent = normalizedBinary;
  return normalizedBinary; // return the exponent count for the computeFinalExponent()
}

// handle the final exponent output
function computeFinalExponent() {
  const exponentInput = document.getElementById("exponent-input");
  const finalExponentOutput = document.getElementById("final-exponent");
  const inputExponent = parseInt(exponentInput.value, 10);
  const normalizedExponent = computeNormalizedBinary();
  const finalExponent = inputExponent + normalizedExponent;

  finalExponentOutput.textContent = finalExponent;
}

// compute the E' value
function computeEPrime() {
  const finalExponentOutput = document.getElementById("final-exponent");
  const ePrimeOutput = document.getElementById("e-prime");
  const finalExponent = parseInt(finalExponentOutput.textContent, 10);

  if (!isNaN(finalExponent)) {
    const ePrime = finalExponent + 127;
    eprimeToBinary = integerToBinary(ePrime);
    trialQuickPrint(ePrime);    
    ePrimeOutput.textContent = eprimeToBinary;
  } else {
    ePrimeOutput.textContent = "";
  }
}

// significand Fractional Part
function computeSPF() {
    // get decimal Part of normalized binary
    const significandPF = document.getElementById("significand");
    let normBin = computeNormalizedBinary();
    trialQuickPrint('Carried: ' + normBin);

    let decimalPart = normBin.split(".")[1];
    var ctr = decimalPart.length;

    trialQuickPrint("Fract Part Raw : " + decimalPart);
    trialQuickPrint("Count decimal num : " + ctr);

    while(ctr < 24){
        decimalPart += '0';
        ctr++;
    }
    trialQuickPrint('Final Count' + ctr);
    trialQuickPrint('Count Final Decimal : ' + decimalPart.length)
    trialQuickPrint('Complete 24 SFP : ' + decimalPart);
    significandPF.textContent = decimalPart;
}


//Fomrats binary by xxxx xxxx
function separateFormatBinary(bin) {
    let formattedBinary = "";
    for (let i = 0; i < bin.length; i += 4) {
      if (i > 0) {
        formattedBinary += " ";
      }
      formattedBinary += bin.substring(i, i + 4);
    }
    trialQuickPrint("Divide it : " + formattedBinary);
    return formattedBinary;
  }

function trialQuickPrint(n) {
  console.log(n);
}




