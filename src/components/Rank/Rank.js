import React from 'react';
import './Rank.css';
const Rank =({ name, entries})=>{
    return(
        <div>
           <div className='white f3'>
               {`${name}, the number of images you analyzed is...`}
           </div>
           <div className='white f1'>
               {entries}
           </div>
        </div>
    );


}
export default Rank;