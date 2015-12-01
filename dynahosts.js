#!/usr/bin/env node
var fs = require('fs'),
    path = require('path'),
    program = require('commander');

var pkg = require( path.join(__dirname, 'package.json') );

program
    .version(pkg.version)
    .option('-d, --dir <dir>', 'set the directory to parse', process.cwd())
    .option('-i, --ip <ip>', 'set the resolving hosts ip', '127.0.0.1')
    .option('-r, --remove', 'remove the hosts file entries')
    .parse(process.argv);

RegExp.quote = function(str) {
    return (str+'').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
};

fs.readFile('/etc/hosts', 'utf8', function( err, data ) {
    if ( err ) throw err;

    var regex = new RegExp('# da:' + RegExp.quote(program.dir) + '([^#]+)# da\n', 'ig');

    fs.readdir(program.dir, function(err, files) {
        if ( err ) throw err;

        var hosts = files.filter(function( file ) {
            var stat = fs.statSync(file);
            return stat.isDirectory();
        });

        var da_entry = '';

        if ( hosts.length && ! program.remove )
        {
            da_entry += '# da:' + program.dir + '\n';
            da_entry += program.ip + ' ' + hosts.join(' ') + '\n';
            da_entry += '# da\n';
        }

        if ( regex.test(data) ) {
            data = data.replace(regex, da_entry);
        } else {
            data += da_entry;
        }


        fs.writeFile('/etc/hosts', data, function( err ) {
            if ( err ) throw err;
            console.log('hosts updated');
        });
    });

});