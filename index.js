var fs = require('fs');

var less = fs.readFileSync('./bower_components/less/dist/less.js', 'utf-8');
var lessEl = document.createElement('script');
lessEl.type = "text/javascript";
lessEl.innerHTML = less;
document.head.appendChild(lessEl);

var styles = fs.readFileSync('./dist/styles.css');
var el = document.createElement('style');
el.innerHTML = styles;
document.head.appendChild(el);

var React = require('react');
var less = window.less;
var CustomizationPane = require('./jsx/CustomizationPane.jsx').CustomizationPane;

function ThemesEngine() {
	this.element = document.createElement("div");
	this.element.className = "wp-themes-engine";
	document.body.appendChild(this.element);
	this.create();
}

ThemesEngine.prototype.create = function() {
	if (this.created) return;

	var pane = <CustomizationPane />;
	React.render(pane, this.element);

	this.created = true;
}

module.exports = {
	ThemesEngine: ThemesEngine
};

window._WPThemes = module.exports;
_WPThemes.engine = new ThemesEngine();

console.log('themes engine here');