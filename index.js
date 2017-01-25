var fs = require('fs');

var log_file = fs.createWriteStream('./debug/' + new Date().getTime() + '.log', {
    flags: 'w'
});

console.log = function(d) {
    log_file.write(d + '\n');
    log_stdout.write(d + '\n');
};

var log_stdout = process.stdout;

require('dotenv').load();

startProcess();

function startProcess() {
    //console.log(process.env.PARSE_HOST);
    console.log("Started process");
}