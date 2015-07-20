var React = require('react');
var EditorPane = require('./EditorPane.jsx')

class CustomizationRow extends React.Component {
	render() {
		return (
			<div className="inner-row">
			</div>
		);
	}
}

class CustomizationButton extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			color: this.props.color || "green",
			active: false
		};
	}

	click() {
		this.props.onClick(this);
	}
	
	render() {
		var classes = "";
		classes += this.state.color;
		if (this.state.active) 
			classes += " active";
		console.log(classes);
		return (<li className={classes}><a onClick={this.click.bind(this)}>{this.props.name}</a></li>);
	}
}

class CustomizationPane extends React.Component {

  deactivateTabs() {
  	this.refs.editorTab.setState({active: false});
  	this.refs.optionsTab.setState({active: false});
  	this.refs.themesTab.setState({active: false});
  }

  goThemes() {
  	console.log('themes');
  }

  goEditor() {
  	console.log('editor');
  	this.refs.editorTab.setState({active: true});
  }

  goSettings() {
  	console.log('settings');
  }

  tabClicked(e) {
  	this.deactivateTabs();
  	e.setState({active: true});

  	switch (e.props.tab) {
  		case 'editor':
  			this.goEditor();
  			break;
  		case 'themes':
  			this.goThemes();
  			break;
  		case 'options':
  			this.goSettings();
  			break;
  	}
  }

  onThemeUpdate(hi) {
  	console.log(hi);
  	less.render(hi).then(function(out){
  		this.themeEl.innerHTML = out.css;
  	}.bind(this));
  }
  
  render() {
  	this.children = [
  		<CustomizationButton ref="optionsTab" tab="options" name="Customize" color="red" onClick={this.tabClicked.bind(this)} />,
			<CustomizationButton ref="editorTab" tab="editor" name="Editor" color="blue" onClick={this.tabClicked.bind(this)} />,
			<CustomizationButton ref="themesTab" tab="themes" name="Themes" color="green" onClick={this.tabClicked.bind(this)} />
		];
    return (
	    <div className="CustomizationPane">
	    	<div className="inner">
	    		<nav>
			      <div class="container">
			        <ul>
			         {this.children}
			        </ul>
			      </div>
			    </nav>
	    		<div className="content">
	    			<EditorPane ref="editorPane" name="themeeditor" onChange={this.onThemeUpdate.bind(this)} />
	    		</div>
	    	</div>
	    </div>
    );
  }

  componentDidMount() {
  	this.goEditor();
  	this.themeEl = document.createElement('style');
  	this.themeEl.id = "less_theme_el";
  	this.themeEl.type = "text/css";
  	document.head.appendChild(this.themeEl);
  }

}

module.exports = {
	CustomizationPane: CustomizationPane,
	CustomizationRow: CustomizationRow
};