// Navigation/header bar on the top of the page. Holds login and search bar

var Navbar = React.createClass({
  propTypes: {
    displayName: React.PropTypes.string.isRequired,
  },
  
  render: function(){
    return (
      <div className="Navbar">
          <ul className="navbar">
            
            <ul className="navbar" style={{float:"right"}}>
              <li className="linav">
                <a>
                  Logged in as <span className='display-name'>{this.props.displayName}</span>
                </a>
              </li>
              <li className="linav logout"><a href="/logout"><i className="fa fa-facebook">Logout</i></a></li>
            </ul>
          </ul>
      </div>
    );
  }
});

module.exports = Navbar;