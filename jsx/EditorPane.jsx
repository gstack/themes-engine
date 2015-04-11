var ace = require('brace');
var React = require('react');

require('brace/theme/monokai');
require('brace/mode/less');

class AceEditor extends React.Component {

	constructor(props)
	{
		super(props);
	}

	getDefaultProps() {
    	return {
      		name   : 'brace-editor',
    	}
	};

	onChange() {
		var value = this.editor.getValue();
	    if (this.props.onChange) {
	      this.props.onChange(value);
	    }
	}

	componentDidMount() {
		var self = this;
		this.editor = ace.edit(this.props.name);
		this.editor.getSession().setMode('ace/mode/less');
		this.editor.setTheme('ace/theme/monokai');
		this.editor.on('change', this.onChange.bind(this));
	}
	
	render() {
		return (
			<div id={this.props.name} className="ace-editor"></div>
		);
	}

}

module.exports = AceEditor;