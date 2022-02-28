import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";

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
      input: ''
    }
  }
  onInputChange= (event)=>{
    console.log(event.target.value);
  }
  render(){
    return(
      <div className='App'>
        <Particles className='particle'
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particleOptions}/>
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange}/>
      </div>
    );
  }
}

export default App;
