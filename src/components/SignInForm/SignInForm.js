import React, {Component} from 'react';

class SignInForm extends Component{
    constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      status:0
    }
  }
    onEmailChange =(event)=>{
        this.setState({signInEmail: event.target.value})
        this.setState({status : 0})
    }
    onPasswordChange =(event)=>{
        this.setState({signInPassword: event.target.value})
        this.setState({status : 0})
    }
    onSubitSignIn = () => {
        fetch('https://intense-headland-36577.herokuapp.com/signin' ,
		{
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
        .then(response => response.json())
        .then(data =>{
            if(data.id){
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }else{
                this.setState({status: 1})
            }
        })
        
        
    } 
    render(){
        const {onRouteChange}=this.props;
        return(
        
            <article className='"br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6"
                                 htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                 type="email" name="email-address"  id="email-address"
                                 onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6"
                                 htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                 type="password" name="password"  id="password"
                                 onChange={this.onPasswordChange}/>
                            </div>
                            {this.state.status===1
                            ?<p style={{color: "white"}}>Wrong email or password</p>
                            :<p></p>
                            }            
                        </fieldset>
                        
                        <div className="">
                            <input onClick={this.onSubitSignIn}
                             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                              type="submit"
                               value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <p  onClick={() => onRouteChange('register')}
                             className="f6 link dim black db pointer">Register</p>
                        </div>
                
                    </div>
                </main>
            </article>
               
    );



    }
    


}
export default SignInForm;