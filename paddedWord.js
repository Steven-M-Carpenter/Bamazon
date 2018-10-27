
var PaddedWord = function (val, tgt, char, dir) {
    this.padded = function () {
        if ((val !== null) && (typeof val !== 'undefined')) {
            // console.log("***** val = " + val);
            strVal = val.toString();
            valLen = strVal.length;
            tgtLen = parseInt(tgt);
            padChar = char;
            padNeeded = tgtLen - valLen;
            paddedVal = strVal;
        } else {
            strVal = "0";
            valLen = strVal.length;
            tgtLen = parseInt(tgt);
            padChar = char;
            padNeeded = tgtLen - valLen;
            paddedVal = strVal;
        };
        if (dir === "left") {
            for (var i = 0; i < padNeeded; i++) {
                paddedVal = padChar + paddedVal;
            }
        } else {
            for (var i = 0; i < padNeeded; i++) {
                paddedVal = paddedVal + padChar;
            }
        };
        return paddedVal;
    };
};

module.exports = PaddedWord;
