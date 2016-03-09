var Carousel = require('./carouselstuff/carousel.jsx');
var Ease = require('ease-functions');
var images = require('./images');

var DashboardHistory = React.createClass({
    getInitialState: function () {
        console.log('dashboard history', this.props.articles);
        return {
            width: 400,
            layout: 'classic',
            ease: 'linear',
            duration: 400
        };
    },
    componentWillMount: function () {
        this.onSides = function (event) {
            this.setState( {images: this.state.all_info.slice(0, event.target.value) });
        }.bind(this);
        this.onLayout = function (event) {
            this.setState({layout: event.target.value});
        }.bind(this);
        this.onDuration = function (event) {
            this.setState({duration: parseInt(event.target.value) });
        }.bind(this);
        this.onEase = function (event) {
            this.setState({ease:  event.target.value});
        }.bind(this);
    },
    render: function () {
        return (
            <div className="carouselhistory">
            	<h1>Saved Articles</h1>
                <Carousel all_info={this.props.articles}
                		  width={this.state.width}
                          ease={this.state.ease}
                          duration={this.state.duration}
                          layout={this.state.layout}/>
            </div>
        );
    }
});

module.exports = DashboardHistory; 