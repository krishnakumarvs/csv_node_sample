var fs = require('fs');
var csv = require('csv');
var util = require('util');

var log_file = fs.createWriteStream('./debug/' + new Date().getTime() + '.log', {
    flags: 'w'
});

console.log = function(d) {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

var log_stdout = process.stdout;

require('dotenv').load();

var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

sample05();


function sample05() {
    try {
        var csvData = [];
        console.log("05 .... ");
        fs.createReadStream("./sample01.csv")
            .pipe(parse({
                delimiter: ':'
            }))
            .on('data', function(csvrow) {
                //console.log(csvrow);
                //do something with csvrow
                var row = csvrow;
                console.log(row);
                console.log(row[0]);
                //csvData.push(csvrow);
            })
            .on('end', function() {
                //do something wiht csvData

                //console.log(csvData);
            });
    } catch (csvRearingException) {
        console.log("err");
        //console.log(csvRearingException);
    }
}

function sample04() {

    var inputFile = 'sample.csv';

    try {
        console.log("Started.. ");
        var parser = parse({
            delimiter: ','
        }, function(err, data) {
            async.eachSeries(data, function(line, callback) {
                // do something with the line
                console.log(line);
                /*doSomething(line).then(function() {
                    // when processing finishes invoke the callback to move to the next one
                    callback();
                });*/
            })
        })
        fs.createReadStream(inputFile).pipe(parser);
    } catch (csvRearingException) {
        console.log(csvRearingException);
    }
}


//sample03();

function sample03() {
    parseXlsx('Spreadsheet.xlsx', '2', function(err, data) {
        if (err) throw err;
        // data is an array of arrays
    });
}

function sample02() {
    var obj = csv();
    //3.
    function Employee(eno, ename, sal) {

        this.EmpNo = eno;
        this.EmpName = ename;
        this.Salary = sal;
    };

    //4.
    var Employees = [];

    //5.
    obj.from.path('./sample.csv').to.array(function(data) {
        for (var index = 0; index < data.length; index++) {
            Employees.push(new Employee(data[index][0], data[index][1], data[index][2]));
        }
        console.log(Employees);
    });
    //6.
    var http = require('http');
    //7.
    var server = http.createServer(function(req, resp) {
        resp.writeHead(200, {
            'content-type': 'application/json'
        });
        resp.end(JSON.stringify(Employees));

    });

    //8.
    server.listen(5050);

}

//startProcess();

function startProcess() {
    //console.log(process.env.PARSE_HOST);
    console.log("Started process");
    console.log(csv);
    csv
        .from.stream(fs.createReadStream(__dirname + '/sample.csv'))
        .to.path(__dirname + '/sample.out')
        .transform(function(row) {
            row.unshift(row.pop());
            return row;
        })
        .on('record', function(row, index) {
            console.log('#' + index + ' ' + JSON.stringify(row));
        })
        .on('end', function(count) {
            console.log('Number of lines: ' + count);
        })
        .on('error', function(error) {
            console.log(error.message);
        });
}