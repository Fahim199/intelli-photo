import React, {Component} from 'react';

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password: '',
            status:0
        }
    }
    validateEmail=(email)=>{
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat)){
            return 1;
        }else{
            return 0;
        }
    }
    onEmailChange =(event)=>{
        this.setState({ email : event.target.value })
        this.setState({status : 0})
    }
    onPasswordChange =(event)=>{
        this.setState({ password : event.target.value })
        this.setState({status : 0})
    }
    onNameChange = (event) =>{
        this.setState({ name : event.target.value })
        this.setState({status : 0})
    }
    
    onSubitRegister = () => {
        if(this.validateEmail(this.state.email))
        {
          fetch('https://intense-headland-36577.herokuapp.com/register' ,
		    {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
                name: this.state.name
			})
		  })
          .then(response => response.json())
          .then(data =>{
            if(data.id){
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }else{
                this.setState({status : 1})
            }
        })}else{
            this.setState({status : 1})
        }        
    }

    render(){
        return(
            
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="text"
                        name="name"
                        id="name"
                        onChange={this.onNameChange}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" name="password" id="password"
                        onChange={this.onPasswordChange} />
                    </div>
                    {this.state.status===1
                            ?<p style={{color: "white"}}>Registration failed</p>
                            :<p></p>
                    }
                    </fieldset>
                    <div className="">
                    <input
                        onClick={this.onSubitRegister}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Register"
                    />
                    </div>
                </div>
                </main>
            </article>
                
        );


    }
}
export default Register;