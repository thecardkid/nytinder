var loginPage = React.createClass({
	getInitialState: function() {
    return {
     	userId: '',
     	displayName: ''    
    };
	},

	handleUserLogin: function() {
		console.log('Logging in as', this.state.userId)
		// handles login with site account
	},

	handleFacebookLogin: function() {
		console.log('Logging in with facebook.');
		// handles facebook login
	},

	handleUserInfoChange: function(ev) {
		console.log(ev.target.value);
		this.setState({
			userId: ev.target.value,
			displayName: ev.target.value
		});
	},

	render: function() {
		return (
			<div>
				<div id='login-form'>
						<input className='login-username' 
									type='text' 
									onChange={this.handleUserInfoChange} 
									value={this.userId} 
									placeholder='Your username'/>
						<br/>
						<div>
							<div className='login-button'>
								<button id='login-facebook' onClick={this.handleFacebookLogin}>Login with Facebook</button>
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