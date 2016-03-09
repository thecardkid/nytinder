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
        <Navbar/>
        <DashboardHistory articles={this.props.articles}/>
      </div>
    );
  }
});

// Navigation/header bar on the top of the page. Holds login and search bar
var Navbar = React.createClass({
  render: function(){
    return (
      <div className="Navbar">
          <ul className="navbar">
            <li className="linav"><a className="navbar-brand"> TimesTinder </a></li>
            <ul className="navbar" style={{float:"right"}}>
              <li className="linav"><a href="/logout"><i className="fa fa-facebook">Logout</i></a></li>
            </ul>
          </ul>
      </div>
    );
  }
});

module.exports = TimeTinderBox;