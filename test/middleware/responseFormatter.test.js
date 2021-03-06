'use strict';

var formatter = require('../../app/middleware/responseFormatter');

describe('responseFormatter', function() {
	var res;
	var req = { url: 'url', session: {} };
	var next;

	beforeEach(function() {
		next = sinon.spy();
		res = {
			results: ['r1', 'r2', 'r3'],
			total: 20,
			returned: 9,
			status: 201
		};
		res.send = sinon.spy();
	});

	it('exists', function() {
		expect(formatter).to.not.equal(null);
	});

	it('calls res.send once', function() {
		formatter(req, res, next);
		expect(res.send.calledOnce).to.equal(true);
	});

	it('doesnt call next', function() {
		formatter(req, res, next);
		expect(next.called).to.equal(false);
	});

	it('maps the req.url to the href', function() {
		formatter(req, res, next);
		expect(res.send.args[0][1]).to.have.property('href')
			.and.to.equal('url');
	});

	it('maps the res.results to the results', function() {
		formatter(req, res, next);
		expect(res.send.args[0][1]).to.have.property('results')
			.and.to.deep.equal(['r1', 'r2', 'r3']);
	});

	it('maps the res.total to the total', function() {
		formatter(req, res, next);
		expect(res.send.args[0][1]).to.have.property('total')
			.and.to.equal(20);
	});

	it('maps the res.returned to the returned', function() {
		formatter(req, res, next);
		expect(res.send.args[0][1]).to.have.property('returned')
			.and.to.equal(9);
	});

	it('calls res.send with a 200 status if no status is set', function() {
		res.status = undefined;
		formatter(req, res, next);
		expect(res.send.args[0][0]).to.equal(200);
	});

	it('calls res.send with proper params', function() {
		formatter(req, res, next);
		expect(res.send).to.have.been.calledWith(res.status, {
			href: 'url',
			results: ['r1', 'r2', 'r3'],
			total: 20,
			session: {},
			returned: 9
		});
	});

});