describe('cryptography', function() {
	var crypto = require('../../app/lib/cryptography');

	it('should compare two hashes correctly', function() {
		var hash = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';
		var result = crypto.compare(hash,'password')
		expect(result).to.be.true;
	});

	it('should encrypt bare text', function() {
		var baretext = 'mytext';
		var result = crypto.encrypt(baretext);
		expect(baretext).to.not.equal(result);
	})

	it('should decrypt text correctly', function(){
		var baretext = 'mytext';
		var result = crypto.encrypt(baretext);
		var unencrypted = crypto.decrypt(result);
		expect(baretext).to.equal(unencrypted);
	})

	it('should generate salt', function() {
		var salt = crypto.generateSalt();
		expect(salt).to.not.equal(undefined);
	});
});