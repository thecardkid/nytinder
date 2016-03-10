var spring = require('react-motion').spring;

module.exports = React.createClass({
	propTypes: {
		handleClick: React.PropTypes.func.isRequired,
		lines: React.PropTypes.array.isRequired,
		text: React.PropTypes.string.isRequired,
	},

	render: function() {
		var ln = this.props.lines;
		return (
			<div className='box' id={this.props.text.toLowerCase()} onClick={this.props.handleClick}>
    		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
					<line className="top" x1={ln[0][0]} y1={ln[0][1]} x2={ln[0][2]} y2={ln[0][3]}/>
					<line className="left" x1={ln[1][0]} y1={ln[1][1]} x2={ln[1][2]} y2={ln[1][3]}/>
					<line className="bottom" x1={ln[2][0]} y1={ln[2][1]} x2={ln[2][2]} y2={ln[2][3]}/>
					<line className="right" x1={ln[3][0]} y1={ln[3][1]} x2={ln[3][2]} y2={ln[3][3]}/>
				</svg>
				<span>{this.props.text}</span>
			</div>
		)
	}
});