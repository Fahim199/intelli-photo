import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import AI from './AI.png';
const Logo =()=>{
    return(
        <div className='ma4 mt0'>
            <Tilt className='tilt br2 shadow-2'>
                <div >
                <img src={AI}/>
                </div>
            </Tilt>
        </div>
    );


}
export default Logo;