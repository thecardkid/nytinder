// Component to control the login page

var loginPage = React.createClass({

	propTypes: {
		onUserLogin: React.PropTypes.func.isRequired,
	},

	getInitialState: function() {
	    return {
	     	username: '',
	     	errorMessage: '',
	    };
	},

	handleUserLogin: function() {
		if (this.state.username.length < 5 || this.state.username.length > 20) {
			this.setState({
				errorMessage: 'Username must be between 5 and 20 characters.'
			});
			return;
		}
		this.props.onUserLogin(this.state.username);
		// handles login with site account
	},

	handleUserInfoChange: function(ev) {
		this.setState({
			username: ev.target.value,
		});
	},

	render: function() {
		var images = Array.apply(null, {length: 42}).map(function(elem, i) {
			return <td><img key={'td'+i} src={'img/medium/'+(i+1)+'.jpg'}/></td>
		});

		var rows = Array.apply(null, {length: 6}).map(function(elem, i) {
			return <tr key={'tr'+i}>{images.slice(7*(i), 7*(i+1))}</tr>
		})

		return (
			<div>
				<div id='login-background-grid'>
					<table id='login-images'>
						<tbody>
							{rows}
						</tbody>
					</table>
				</div>
				<div id='login-site-title'>
					<h1>Tinder Times</h1>
				</div>
				<div id='login-form'>
					<div id='login-error-message'>
						{this.state.errorMessage}
					</div>
					<br/>
					<input className='login-username'
								type='text'
								onChange={this.handleUserInfoChange} 
								value={this.userId} 
								placeholder='Your username'/>
					<br/>
					<div>
						<div className='login-button'>
							<a id='login-facebook' href="/auth/facebook">Login with Facebook</a>
						</div>
						<div className='login-button'>
							<button id='login-create-user' onClick={this.handleUserLogin}>Log In</button>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = loginPage;