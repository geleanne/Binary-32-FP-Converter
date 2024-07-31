# IEEE-754 Binary-32 Floating-Point Converter

The **IEEE-754 Binary-32 Floating-Point Converter** is a web application that allows users to convert between decimal and binary representations, including handling special cases like NaN (Not a Number). The application provides detailed steps of the conversion process and displays the final result in both binary and hexadecimal formats. 

This project is developed by **Group 8** (S14) as a requirement for the CSARCH2 course.

![Static Badge](https://img.shields.io/badge/HTML-CSS-Javascript)
![Static Badge](https://img.shields.io/badge/JavaScript-yellow)
![Static Badge](https://img.shields.io/badge/Vercel-blue)

## Developers
+ Atienza, Marielle Angelene
+ Ong, Barron Brandon Conroy
+ Rivera, Jose Carlos
+ Tolentino, Maxene Allison


## Deployment
The project is deployed using Node.js and Vercel.

You can access the live version here: https://binary-32-fp-converter.vercel.app

## How to Use the Web Application
### Select Input Type
![image](https://github.com/user-attachments/assets/ce788f19-c17b-4bf8-bf2e-8c27f9b49a95)

1. Choose the type of input you want to convert.
    - You can pick between **Decimal** (base-10 exponent), **Binary** (base-2 exponent), or **NaN** from the dropdown menu.
    - Depending on your selection, the input fields and labels will adjust accordingly.

### Enter Mantissa and Exponent
1. **Mantissa Input**
    - For **Decimal**: Enter a decimal number (e.g., 15.75).
    - For **Binary**: Enter a binary number (e.g., 101.01).
    - For **NaN**: Enter qnan or snan.
2. **Exponent Input**
    - For **Decimal**/**Binary**: Enter the exponent (e.g., **5** for 15.75x10^5 or **2** for 101.01x2^2).
3. Both positive (**+**) and negative (**-**) symbols are allowed for the Mantissa and Exponent input.

### Click Compute
![image](https://github.com/user-attachments/assets/d2c20e23-e77a-40b9-9fd6-fb538397833b)
1. After entering the values, press the 'Compute' button to perform the conversion.

2. The application will validate the inputs and perform the conversion.

![image](https://github.com/user-attachments/assets/02f679e3-5243-4461-8972-07015e746e4c)

3. The results will be displayed in the process section, showing:
    - Binary Equivalent
    - Normalized Binary
    - Final Exponent
    - Sign Bit
    - E'
    - Significand Fractional Part
    - Special Case (if any)


### Export Results
![image](https://github.com/user-attachments/assets/81e49304-f648-4ed4-b84f-8a46c8734670)
1. If you wish to save the results, click the 'Export' button.

![image](https://github.com/user-attachments/assets/5cb912bd-2e39-4e84-9116-dd69f9fafd72)

2. If the inputs are valid, a notification will appear indicating that the file is being exported.

![image](https://github.com/user-attachments/assets/dea6cd66-6545-4ec7-8ba7-9a640b8a5bae)

3. The result will be saved as a text file on your local machine.

![image](https://github.com/user-attachments/assets/08880c8c-83dc-43a9-a66e-f3a9bcfce157)

4. The **text file** will include the input values, conversion process, and the binary and hexadecimal outputs.
