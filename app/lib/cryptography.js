var crypto = require('crypto');
var key = "14k1;2j4;14kj412;3'f/a/";
var algorithm = 'aes256'

exports.compare = function(hashed,unencrypted){
	var hash = crypto.createHash('sha256').update(unencrypted).digest('hex');
  	return hash === hashed;
}

exports.encrypt = function(str) {
	var cipher = crypto.createCipher(algorithm, key);  
	var encrypted = cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
	return encrypted;
}

exports.decrypt = function(str){
	var decipher = crypto.createDecipher(algorithm, key);
	var decrypted = decipher.update(str, 'hex', 'utf8') + decipher.final('utf8');
	return decrypted;
}

exports.generateSalt = function() {
	var salt = crypto.createHash('sha256').update(Date.now().toString()).digest('hex')
	return salt;
}