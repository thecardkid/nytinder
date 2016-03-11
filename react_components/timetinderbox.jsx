var DashboardHistory = require('./dashboardhistory.jsx')

var TimeTinderBox = React.createClass({
  propTypes: {
    articles: React.PropTypes.array.isRequired,
    pageChange: React.PropTypes.func.isRequired,
  },

  render: function(){
    return (
      <div className="timetinder-box">
        <DashboardHistory id={this.props.id} 
          articles={this.props.articles} 
          deleteUserArticle={this.props.deleteUserArticle}
        />
        <div className='centering-div'>
          <button onClick={this.props.pageChange}>Browse TinderNews</button>
        </div>
      </div>
    );
  }
});

module.exports = TimeTinderBox;