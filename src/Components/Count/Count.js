import React from 'react';
import './Count.css';

const Count = ({ name, entries }) => {
    return(
        <div className='center f3 ma3'>
            <div className='welcomeFont'>
                {`${name}, 你偵測了 `}
                <span className='num'>{entries}</span>
                {` 張圖片`}
            </div>
            
        </div>
    );
}

export default Count;