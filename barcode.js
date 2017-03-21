"use strict";

function decodeBarcodeFromAreas(areas)
{
    var result = {
        barcode: "123456", 
        message: "No middle guard", 
        checksumValid: false
    };
    
    console.log("Areas: " + areas);
    
    var sumcheck = 0;
    var strToNum = "";
    var leftstringcheck = areas.substr(3,10);
    
    console.log("Left String Check: " + leftstringcheck);
    
    // To flip the barcode in case upside down
    for (var i = 0; i < 7; i++)
        {
            strToNum = Number(leftstringcheck[i]); // or sumcheck += Number(leftstringcheck[i])
            console.log("strToNum: " + strToNum);
            sumcheck += strToNum;
        }
    
    console.log("sumcheck: " + sumcheck);
    // To test first digit left code must be odd, if even flip
    var flipareas; // can oso for (j=0,j<95,j++)
    
    if (sumcheck % 2 === 0)
        {
            flipareas = areas.split("").reverse().join("");
        }
    console.log("FlipAreas: " + flipareas);
//  After done flipping
    // Now to extract left and right string
    var leftStringArray=[];
    var k=0; var x=3;
    while (1)
        {
            leftStringArray[k] = flipareas.substring(x,x+7);
            if (x=38)
                {
                    break;
                }
            x += 7;
            k++;
        }
//Now we do rightstringarray


    var rightStringArray=[];
    var k=0;x=50;
    while (1)
        {
            rightStringArray[k]=flipareas.substring(x,x+7);
            if (x=88)
                {
                    break;
                }
            x+=7;
            k++;
        }
    
    var leftOddArray= ["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"];
    var leftEvenArray=["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"];
    var rightEvenArray=["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"];
    
    var parityLHSObj = {
        "LLLLLL":0,
        "LLGLGG":1,
        "LLGGLG":2,
        "LLGGGL":3,
        "LGLLGG":4,
        "LGGLLG":5,
        "LGGGLL":6,
        "LGLGLG":7,
        "LGLGGL":8,
        "LGGLGL":9
    };
    
    
    var digit1 = "";
    var parityLetter = "";
    var digit2 = "";
    var leftStringArray = "";
    var rightStringArray = "";
    var parityDigit = 0;
    
    for (var i=0;i<6;i++)
        {
            for (var j=0;j<10;j++)
                {
                    if (leftStringArray[i] === leftOddArray[j])
                        {
                            digit1 += j + "";
                            parityLetter += "L" + "";
                        }
                     else if (leftStringArray[i]===leftEvenArray[j])
                         { 
                            digit1 +=j+"";
                            parityLetter += "G"+"";
                         }
                }
        }
    
    console.log("Digit1: " + digit1);
    console.log("ParityLetter: " + parityLetter);
    
        for (var i=0;i<6;i++)
        {
            for (var j=0;j<10;j++)
                {
                    if (rightStringArray[i] === rightEvenArray[j])
                        {
                            digit2 += j + "";
                            
                        }
                }
        } 
    
    if(parityLHSObj.hasOwnProperty(parityLetter))
        {
            console.log(parityLHSObj[parityLetter]);
            parityDigit = parityLHSObj[parityLetter];
        }
    
    console.log("Parity Digit: " + parityDigit);
    
    var barcodeNumber = parityDigit.toString() + digit1 + digit2;
    var barcodeNumCheck = [];
    var checksum = 0;
    
    console.log("Barcode Number: " + barcodeNumber);
    
    for (var i=0; i < barcodeNumber.length ; i++)
        {
            barcodeNumCheck+=barcodeNumber;
            
            if (i%2!==0)
                {
                    barcodeNumCheck[i]=barcodeNumCheck*3;
                }
        }
    
    for (var i=0;i<13;i++)
        {
            checksum+=barcodeNumCheck[i];
            console.log("CheckSum: " + checksum);
        } 
    
    
    if (((Math.ceil(checksum/10))*10 - checksum) === Number(barcodeNumber.substr(12)))
        {
            result.message = "Valid barcode";
        }
    else 
        {
            result.message = "Invalid barcode";
        }
        
    
    
    
    return result;
}


