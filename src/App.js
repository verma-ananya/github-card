import React, {Component} from 'react';
import logo from './logo.svg';
import './Particles.css';
import Particles from 'react-particles-js';
import GithubCard from './github-card';

const particlesOptions = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false,
      }
    },
      size: {
        value: 3,
        random: true,
        anim : {
          speed : 4,
          size_min : 0.3
        }
      },
      line_linked : {
        enable: false, 
      },
      move : {
        random : true,
        speed : 1,
        direction : "top",
        out_mode : "out",
      }
    },
      interactivity : {
        events : {
          onhover : {
            enable : true,
            mode : "bubble",
          },
          onclick : {
            enable : true,
            mode : "repulse"
          }
        },
        modes : {
          bubble : {
            distance : 250,
            duration : 2,
            size : 0,
            opacity : 0
          },
          repulse : {
            distance : 400,
            duration : 4
          }
        }
      }
};

function App() {
  return (
    <div className="App">
        <GithubCard />
        <Particles className="particles" params={particlesOptions} height="95%" width="95%"/>;    
    </div>
  );
}

export default App;

