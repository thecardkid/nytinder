// Navigation/header bar on the top of the page. Holds login and search bar
var Navbar = React.createClass({
  render: function(){
    return (
      <div className="Navbar">
          <ul className="navbar">
            <li className="linav"><a className="navbar-brand"> TimesTinder </a></li>
            <ul className="navbar" style={{float:"right"}}>
              <li className="linav"><a>{this.props.displayName}</a></li>
              <li className="linav"><a href="/logout"><i className="fa fa-facebook">Logout</i></a></li>
            </ul>
          </ul>
      </div>
    );
  }
});

module.exports = Navbar;