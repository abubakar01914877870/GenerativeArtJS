const fontList = require('font-list')
let arr = []
fontList.getFonts()
    .then(fonts => {
        // arr.push(fonts);
        for (let i = 0; i < fonts.length; i++) {
            console.log(fonts[i]);
        }
    })
    .catch(err => {
        console.log(err)
    })

console.log(arr);