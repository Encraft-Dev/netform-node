var fs = require('graceful-fs')
var zlib = require('zlib')

exports.timelog = function(dirPath,name,data,zip){
	if (!fs.existsSync(dirPath)){
		    fs.mkdirSync(dirPath);
		}
	var dataout = JSON.stringify(data)

	if (zip){
		zlib.gzip(dataout, function (error, result) {
		   if (error) throw error;
		     fs.writeFile(path.format({dir:dirPath,base:name +".json.gz"}),result, function(err) {
			  if (err) throw err;
			  //console.log(name)
			})//writefile
		});//zlib
	}
	else {
		 fs.writeFile(path.format({dir:dirPath,base:name +".json"}),dataout, function(err) {
		  if (err) throw err;
		  //console.log(name)
		})//writefile
	}
}