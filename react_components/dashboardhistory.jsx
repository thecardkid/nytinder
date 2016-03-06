var Carousel = require('./carouselstuff/carousel.jsx');
var Ease = require('ease-functions');
var images = require('./images');

var DashboardHistory = React.createClass({
    getInitialState: function () {
        return {
            images: images.slice(0, 6),
            width: 300,
            layout: 'classic',
            ease: 'linear',
            duration: 400
        };
    },
    componentWillMount: function () {
        this.onSides = function (event) {
            this.setState( {images: images.slice(0, event.target.value) });
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
                <Carousel width={this.state.width}
                          images={this.state.images}
                          ease={this.state.ease}
                          duration={this.state.duration}
                          layout={this.state.layout}/>
            </div>
        );
    }
});

module.exports = DashboardHistory; 

// var DashboardHistory = React.createClass({
//   render: function(){
//     return (
//       <div className="dashboardhistorydiv">
//       	<h1>DASHBOARD</h1>
//       </div>
//     );
//   }
// });

// module.exports = DashboardHistory;