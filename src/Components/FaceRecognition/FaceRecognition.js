import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, faceFrame, onMouseHovering }) => {
    const box = faceFrame.map((data, i) => {
      return(
        <div className='bounding-box grow'
             key={i}
             onMouseEnter={() => onMouseHovering(i)}
             style={{ top: faceFrame[i].topRow, right: faceFrame[i].rightCol,
                      bottom: faceFrame[i].bottomRow, left: faceFrame[i].leftCol
              }}
        ></div>
      )
    })
    return(
        <div className='ml4 mb4 absolute'>
          <img src={ imageUrl } alt="" id='inputImg' 
              //  style={{width: '50vw', height:'auto'}}
          />
          {box}
        </div>
    );
}

export default FaceRecognition;