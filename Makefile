NODE ?= node

all:
	lessc less/styles.less > dist/styles.css
	browserify . > dist/main.js
	echo "Dist built"