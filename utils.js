module.exports = function stringToAscii(str) {
    let asciiArray = [];
    
    for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      asciiArray.push(charCode);
    }
    
    return asciiArray;
  }
 