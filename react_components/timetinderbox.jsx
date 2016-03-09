var DashboardHistory = require('./dashboardhistory.jsx')

var TimeTinderBox = React.createClass({
  propTypes: {
    articles: React.PropTypes.array.isRequired,
  },

  getInitialState: function () {
    return null;
  },

  render: function(){
    console.log('Tinderbox rendering', this.props.articles);
    return (
      <div className="timetinder-box">
        <DashboardHistory id={this.props.id} articles={this.props.articles}/>
      </div>
    );
  }
});

module.exports = TimeTinderBox;