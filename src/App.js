import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignInForm from './components/SignInForm/SignInForm';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: 'e19573ee02d348aeb22358ff58f4e7cf'
});

const particlesInit = (main) => {
  console.log(main);
};
const particlesLoaded = (container) => {
  console.log(container);
};
const particleOptions = {
  
  fpsLimit: 120,
  interactivity: {
    events: {
      
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      
      repulse: {
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}

class App extends Component {
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl:'',
      box : {},
      route: 'signin'
    }
  }
  onInputChange= (event)=>{
    this.setState({input : event.target.value});
  }
  calculateFaceRegion = (data)=>{
    const faceRegion= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width =Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: faceRegion.left_col*width,
      topRow : faceRegion.top_row *height,
      rightCol: width - (faceRegion.right_col *width),
      bottomRow: height - (faceRegion.bottom_row *height)
    }
  }
  displayFaceBox = (box) =>{
    this.setState({ box: box});
  }
  onButtonSubmit = () =>{
    this.setState({ imageUrl : this.state.input} );
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,this.state.input)  
      .then(response => this.displayFaceBox(this.calculateFaceRegion(response)))
      .catch(err=> console.log(err));
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  
  
  render(){
    const { isSignedIn, imageUrl, route, box } = this.state;
    return(  
      <div className='App'>
        <Particles className='particle'
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particleOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <SignInForm onRouteChange={this.onRouteChange}/>
             : <Register  onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
