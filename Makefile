REPORTER = spec

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha -R $(REPORTER) --recursive -t 5000 -G