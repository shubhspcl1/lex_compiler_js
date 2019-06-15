var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Online Lex Compiler!' });
});

router.post('/', function(req, res, next){
	var code = req.body.code;
	var input = req.body.input;
	fs.writeFile('new.l', code, function(error){
		if(error) throw error;
		else{
			exec('lex new.l', function(error, stderr, stdout){
				if(error) throw error;
				else{
					exec('gcc lex.yy.c -ll', function(error, stderr, stdout){
						if(error) throw error;
						else{
							fs.writeFile('input.txt', input, function(error){
								if(error) throw error;
								else{
									exec('./a.out < input.txt', function(error, stderr, stdout){
										if(error) throw error;
										else{
											console.log(stdout);
											console.log(stderr);
											res.send(stderr);
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

module.exports = router;
