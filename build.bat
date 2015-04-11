@echo OFF
echo Less
call lessc less/styles.less > dist/styles.css
echo Browserify
call browserify . > dist/main.js
echo Done