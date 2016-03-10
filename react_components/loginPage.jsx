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
		console.log('Logging in as', this.state.username)
		if (this.state.username.length < 5 || this.state.username.length > 20) {
			this.setState({
				errorMessage: 'Username must be between 5 and 20 characters.'
			});
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
		return (
			<div>
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