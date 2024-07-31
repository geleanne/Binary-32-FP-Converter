// separate js file for computation functions

// convert the integer part of a decimal number to binary
function integerToBinary(integerPart) {
  let binary = "";
  let num = parseInt(integerPart, 10);

  if (num === 0) return "00000000";

  while (num > 0) {
    binary = (num % 2) + binary;
    num = Math.floor(num / 2);
  }
  
  // Pad the binary string to 8 bits
  while (binary.length < 8) {
    binary = "0" + binary;
  }

  trialQuickPrint('Converting to Binary : ' + binary);
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
    return { normalizedBinary: "", exponent: 0 };
  }

  const [integerPart, fractionalPart] = binaryEquivalent.split(".");
  let normalizedBinary = "";
  let exponent = 0;

  if (integerPart && integerPart !== "0") {
    const firstOneIndex = integerPart.indexOf("1");
    exponent = integerPart.length - firstOneIndex - 1;
    normalizedBinary = `1.${integerPart.slice(firstOneIndex + 1)}${fractionalPart || ""}`;
  } else if (fractionalPart) {
    const firstOneIndex = fractionalPart.indexOf("1");
    exponent = -(firstOneIndex + 1);
    normalizedBinary = `1.${fractionalPart.slice(firstOneIndex + 1)}`;
  }

  const exponentInput = document.getElementById("exponent-input");
  const inputExponent = parseInt(exponentInput.value, 10);
  const finalExponent = inputExponent + exponent;

  const mantissaValue = document.getElementById("mantissa-input").value;
  if (mantissaValue.startsWith("-")) {
    normalizedBinary = "-" + normalizedBinary;
  }
  
  if (finalExponent < -126) {
    const shiftAmount = -126 - finalExponent;
    normalizedBinary = `0.${"0".repeat(Math.max(0, shiftAmount - 1))}${normalizedBinary.replace(".", "")}`;
    exponent = -126;
  } else if (finalExponent > 127) {
    normalizedBinary = binaryEquivalent;
  } else if (mantissaValue.startsWith("-0") && inputExponent === 0 || mantissaValue.startsWith("0") && inputExponent === 0) {
    normalizedBinary = "0.0";
  }

  trialQuickPrint("This is normBin: " + normalizedBinary);
  trialQuickPrint("Exponent shift count: " + exponent);
  normalizedBinaryOutput.textContent = normalizedBinary;

  return { normalizedBinary, exponent }; // return both normalized binary string and exponent
}

// handle the final exponent output
function computeFinalExponent() {
  const exponentInput = document.getElementById("exponent-input");
  const finalExponentOutput = document.getElementById("final-exponent");
  const inputExponent = parseInt(exponentInput.value, 10);

  const { normalizedBinary, exponent } = computeNormalizedBinary();
  let finalExponent = inputExponent + exponent;  

  trialQuickPrint("Exponent : " + inputExponent);

  if (isNaN(finalExponent)) {
    finalExponent = 0;
  } else if (finalExponent < -126) {
    finalExponent = -126;
  } else if (finalExponent > 127) {
    finalExponent = inputExponent;
  } else if (inputExponent === 0 && normalizedBinary === "0.0" || normalizedBinary === "-0.0") {
    finalExponent = 0;
  }

  trialQuickPrint("Final Exponent : " + finalExponent);
  finalExponentOutput.textContent = finalExponent;
}


// print the sign bit (0 = + or 1 = -) once the COMPUTE button is clicked
function computeSignBit() {
  const mantissaInput = document.getElementById("mantissa-input");
  const signBitOutput = document.getElementById("sign-bit");
  const mantissaValue = mantissaInput.value;

  // Handle special cases for sNaN and qNaN
  if (mantissaValue === "snan" || mantissaValue === "qnan") {
    signBitOutput.textContent = "x";
    return "x";
  }

  if (!mantissaValue) {
    signBitOutput.textContent = "";
    return;
  }

  const signBit = mantissaValue.startsWith("-") ? 1 : 0;
  signBitOutput.textContent = signBit;

  return signBit;
}

// compute the E' value
function computeEPrime() {
  const finalExponentOutput = document.getElementById("final-exponent");
  const ePrimeOutput = document.getElementById("e-prime");
  const finalExponent = parseInt(finalExponentOutput.textContent, 10);
  const exponentInput = document.getElementById("exponent-input").value;
  const exponentValue = parseInt(exponentInput, 10);
  const mantissaValue = document.getElementById("mantissa-input").value;

  let eprimeToBinary = "";

  // Special handling for sNaN and qNaN
  if (mantissaValue === "snan" || mantissaValue === "qnan") {
    ePrimeOutput.textContent = "11111111";
    return "11111111";
  }
  
  if (exponentValue < -126) {
    const ePrime = 0;
    eprimeToBinary = integerToBinary(ePrime);
    ePrimeOutput.textContent = eprimeToBinary;
    trialQuickPrint("Eprime to Binary : 00000000");
  } else if (exponentValue > 127) {
    const ePrime = 255;
    eprimeToBinary = integerToBinary(ePrime);
    ePrimeOutput.textContent = eprimeToBinary;
    trialQuickPrint("Eprime to Binary : 11111111");
  } else if (mantissaValue === "0.0" || mantissaValue === "-0.0" || mantissaValue === "0" || mantissaValue === "-0") {
    const ePrime = 0;
    eprimeToBinary = integerToBinary(ePrime);
    ePrimeOutput.textContent = eprimeToBinary;
    trialQuickPrint("Eprime to Binary : 00000000");
  } else {
    const ePrime = finalExponent + 127;
    trialQuickPrint("Final Exponent : " + finalExponent);
    eprimeToBinary = integerToBinary(ePrime);
    trialQuickPrint("Eprime Length : " + ePrime.toString().length);
    trialQuickPrint("Eprime value : " + ePrime);
    trialQuickPrint("Eprime to Binary : " + eprimeToBinary);
    ePrimeOutput.textContent = eprimeToBinary;
  }

  return ePrimeOutput.textContent;
}

// significand Fractional Part computation
function computeSPF() {
  // Get the significand element
  const significandPF = document.getElementById("significand");
  // const finalExponent = finalExponentOutput.textContent;
  // const ePrime = computeEPrime();

  // Compute normalized binary and extract its components
  const { normalizedBinary } = computeNormalizedBinary();
  trialQuickPrint("Carried: " + normalizedBinary);

  // Extract the decimal part from the normalized binary
  let decimalPart = normalizedBinary.split(".")[1] || "";
  let ctr = decimalPart.length;

  trialQuickPrint("Fract Part Raw: " + decimalPart);
  trialQuickPrint("Count decimal num: " + ctr);

  // if (finalExponent > 127 && ePrime > "11111111" && decimalPart === "0" || decimalPart != "0") {
  //   decimalPart = "00000000000000000000000";
  //   ctr = 23;
  // }

  // Ensure the decimal part has exactly 23 bits
  while (ctr < 23) {
    decimalPart += "0";
    ctr++;
  }

  // Check for special case of positive infinity
  const finalExponentOutput = document.getElementById("final-exponent");
  const finalExponent = parseInt(finalExponentOutput.textContent, 10);
  if (finalExponent > 127) {
    decimalPart = "00000000000000000000000";
  }

  trialQuickPrint("Final Count SPF: " + ctr);
  trialQuickPrint("Count Final Decimal: " + decimalPart.length);
  trialQuickPrint("Complete 23 SFP: " + decimalPart);
  significandPF.textContent = decimalPart;

  return decimalPart;
}

// Function to group by 4 and convert to hex
function groupByFour(num) {
  let group = "";
  let finalHex = "";
  let ctr = 0;

  for (let i = 0; i < num.length; i += 4) {
    let chunk = num.substring(i, i + 4);
    group += chunk; // Group binary by 4

    let hex = createMap(chunk);
    ctr++;
    trialQuickPrint("Ctr : " + ctr);

    finalHex += hex;

    if (ctr == 4) {
      finalHex += " ";
      ctr = 0; // Reset counter after 4 groups
    }

    trialQuickPrint("Group by 4 : " + chunk);
    trialQuickPrint("Converted to Hex : " + hex);
  }
  trialQuickPrint("Divide it : " + finalHex);
  return finalHex;
}

// Quick Console Printing
function trialQuickPrint(n) {
  console.log(n);
}

// Final Answer in Binary
function finalAnswerBinary() {
  const faBinary = document.getElementById("binary-output");

  const mantissaValue = document.getElementById("mantissa-input").value.trim();
  let finalAnswer = "";

  if (mantissaValue === "snan") {
    finalAnswer = "01x xxxx xxxx xxxx xxxx xxxx";
  } else if (mantissaValue === "qnan") {
    finalAnswer = "1xx xxxx xxxx xxxx xxxx xxxx";
  } else {
    finalAnswer =
      computeSignBit() + " " + computeEPrime() + " " + computeSPF();
  }

  trialQuickPrint("Final Answer in Binary : " + finalAnswer);
  faBinary.textContent = finalAnswer;

  return finalAnswer;
}

// number and its equivalent hexadecimal
function createMap(um) {
  let cv = "";
  switch (um) {
    case "0000": cv = "0"; break;
    case "0001": cv = "1"; break;
    case "0010": cv = "2"; break;
    case "0011": cv = "3"; break;
    case "0100": cv = "4"; break;
    case "0101": cv = "5"; break;
    case "0110": cv = "6"; break;
    case "0111": cv = "7"; break;
    case "1000": cv = "8"; break;
    case "1001": cv = "9"; break;
    case "1010": cv = "A"; break;
    case "1011": cv = "B"; break;
    case "1100": cv = "C"; break;
    case "1101": cv = "D"; break;
    case "1110": cv = "E"; break;
    case "1111": cv = "F"; break;
  }
  return cv;
}

// Binary to Hex
function finaAnswrHex() {
  const faHex = document.getElementById("hex-output");
  let faBin = finalAnswerBinary();
  let result = faBin.replace(/\s+/g, ""); // Remove spaces
  let ctr = result.length;

  trialQuickPrint("Carried FAB : " + faBin);
  trialQuickPrint(
    "No space count :" + ctr + "\n See result no space : " + result
  );
  result = groupByFour(result).replace(/\s+/g, ""); // Remove spaces from grouped hex

  faHex.textContent = "0x" + result;
}

// handles special case for NaN
function computeNaNSpecialCase() {
  const mantissaValue = mantissaInput.value.trim();
  const selectedFormat = inputType.value;
      
  if (selectedFormat === 'nan') {
    if (mantissaValue === 'snan') {
      document.getElementById('sign-bit').textContent = 'x';
      document.getElementById('e-prime').textContent = '1111 1111';
      document.getElementById('significand').textContent = '01x xxxx xxxx xxxx xxxx xxxx';
      document.getElementById('special-case').textContent = 'sNaN';
    } else if (mantissaValue === 'qnan') {
      document.getElementById('sign-bit').textContent = 'x';
      document.getElementById('e-prime').textContent = '1111 1111';
      document.getElementById('significand').textContent = '1xx xxxx xxxx xxxx xxxx xxxx';
      document.getElementById('special-case').textContent = 'qNaN';
    }
  }
}

// handles special case for infinity
// function computeInfinitySpecialCase() {
//   const finalExponentOutput = document.getElementById("final-exponent");
//   const ePrimeOutput = document.getElementById("e-prime");
//   const signBitOutput = document.getElementById("sign-bit");
  
//   const finalExponent = parseInt(finalExponentOutput.textContent, 10);
//   const ePrime = ePrimeOutput.textContent.trim().replace(/\s+/g, "");
//   const signBit = parseInt(signBitOutput.textContent.trim());

//   let specialCase = "";

//   if (ePrime === "11111111") {
//     if (finalExponent === 0) {
//       specialCase = signBit === 0 ? "Positive Infinity" : "Negative Infinity";
//     } else {
//       specialCase = "NaN";
//     }
//   }

//   document.getElementById("special-case").textContent = specialCase;
//   trialQuickPrint("Infinity Special Case: " + specialCase);
// }

// special case field
function printSpecialCase() {
  const specialCaseOutput = document.getElementById("special-case");
  const mantissaValue = document.getElementById("mantissa-input").value.trim();
  const exponentValue = parseInt(document.getElementById("exponent-input").value.trim(), 10);

  let specialCase = "";
  let signBit = "";
  let ePrime = "";
  let significandPF = "";

  if (mantissaValue === "snan") {
    specialCase = "sNaN";
    signBit = "x"; // The sign bit remains undefined (x) for sNaN
    ePrime = "11111111"; // E' for NaN
    significandPF = "01x xxxx xxxx xxxx xxxx xxxx"; // Hardcoded significand for sNaN
  } else if (mantissaValue === "qnan") {
    specialCase = "qNaN";
    signBit = "x"; // The sign bit remains undefined (x) for qNaN
    ePrime = "11111111"; // E' for NaN
    significandPF = "1xx xxxx xxxx xxxx xxxx xxxx"; // Hardcoded significand for qNaN
  } else if (mantissaValue === "0" && exponentValue === 0) {
    specialCase = "Zero";
  // } else if (mantissaValue === "Infinity" || mantissaValue === "-Infinity") {
  //   specialCase = mantissaValue === "Infinity" ? "Positive Infinity" : "Negative Infinity";
  } else {
    const signBit = computeSignBit();
    const { normalizedBinary, exponent } = computeNormalizedBinary();
    const ePrime = computeEPrime();
    const significandPF = computeSPF();

    if (ePrime === "11111111" && significandPF === "00000000000000000000000") {
      specialCase = signBit === 0 ? "Positive Infinity" : "Negative Infinity";
    // } else if (ePrime === "11111111" && normalizedBinary.indexOf("1") !== -1) {
    //   specialCase = "NaN";
    } else if (ePrime === "00000000" && normalizedBinary.indexOf("1") === -1) {
      specialCase = signBit === 0 ? "Positive Zero" : "Negative Zero";
    } else if (ePrime === "00000000" && normalizedBinary.indexOf("1") !== -1) {
      specialCase = "Denormalized";
    }
  }

  specialCaseOutput.textContent = specialCase;
  trialQuickPrint("Special Case: " + specialCase);
}
