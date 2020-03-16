import React from 'react';
import './ImageLink.css';

const ImageLink = ( {onInputChange, onPictureSubmit} ) => {
    return(
            <div className='pa3 br3 shadow-5 form ml4 linkBox mt4'>
                <input type="search" className='f4 pa2 font' 
                       placeholder='Image Link' 
                       onChange = {onInputChange}
                />
                <button className='grow f4 link ph3 pv2 dib font'
                        onClick = {onPictureSubmit}
                >Detect</button>
            </div>
    );
}

export default ImageLink;