const fs = require('fs');
const helperFunctions = require('./helperFunctions')
const md5 = require('md5');

let lineReader

let lines = []

// just load a line from results end make them into an array
if (!fs.existsSync("./results")) {
    console.log("file doesn't exists")
} else {
    console.log("file exists")
    lineReader = require('readline').createInterface({
        input: require('fs').createReadStream("./results")
      });
    lineReader.on('line', function (line) {
        lines.push(line)
    });
    setTimeout(function(err, results) {
        console.log(lines.length)
        console.log("*" + lines[0] + "*")
        console.log(lines.indexOf('ty,outlaws,printouts'))
        console.log(lines.indexOf('ty,printouts,outlaws'))
        console.log(lines.indexOf('printouts,outlaws,ty'))
        console.log(lines.indexOf('printouts,ty,outlaws'))
        console.log(lines.indexOf('outlaws,printouts,ty'))
        console.log(lines.indexOf('outlaws,ty,printouts'))


        console.log(lines.indexOf('stout,yawls,printout'))
        console.log(lines.indexOf('stout,printout,yawls'))
        console.log(lines.indexOf('printout,yawls,stout'))
        console.log(lines.indexOf('printout,stout,yawls'))
        console.log(lines.indexOf('yawls,printout,stout'))
        console.log(lines.indexOf('yawls,stout,printout'))

        console.log(lines.indexOf("a,s,n,i,o,o's,l,p,r,t,tut,ty,u,w"))
    }, 1000)
    // const wordExp = /?\n\n/g;
    // var contents = fs.readFileSync("./results", 'utf8');
    // const wordList = contents.match(wordExp)
    
}
