import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, faceFrame, onMouseHovering }) => {
    const box = faceFrame.map((data, i) => {
      return(
        <div className='bounding-box'
             key={i}
             onMouseEnter={() => onMouseHovering(i)}
             style={{ top: faceFrame[i].topRow, right: faceFrame[i].rightCol,
                      bottom: faceFrame[i].bottomRow, left: faceFrame[i].leftCol
              }}
        ></div>
      )
    })
    return(
        <div>
          <img src={ imageUrl } alt="" id='inputImg' 
               style={{width: '40em', height:'auto'}} className='ml4 mb4'
          />
          {box}
        </div>
    );
}

export default FaceRecognition;