import React from 'react';
import './ImageLink.css';

const ImageLink = ( {onInputChange, onPictureSubmit, onInputMethodChange, methodText, inputMethod} ) => {
    return(
            <div className='pa3 br3 shadow-5 form ml4 linkBox mt4 pb2'>
                {inputMethod === 'search'
                ? <input type='search' className='pa2 urlFont inputBox' 
                       placeholder='Image Link' 
                       onChange = {onInputChange}
                  />
                : <input type='file' className='pa2 pb1 fileFont inputFile'
                       onChange = {onInputChange}
                  />
                }
                <a href={onPictureSubmit} 
                   className='grow link ph3 pv2 dib urlFont detBtn'
                   onClick = {onPictureSubmit}
                >Detect</a>
                <button className='methodBtn mt1'
                        onClick={onInputMethodChange}
                >Submit by {methodText}</button>       
            </div>
    );
}

export default ImageLink;