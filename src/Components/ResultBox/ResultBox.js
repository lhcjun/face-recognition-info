import React from "react";
import "./ResultBox.css";

const ResultBox = ({ displayPersonInfo, faceFrame, infoVisible }) => {
  // To get each face's info 
  let personalInfo = [];
  for (let props in displayPersonInfo) {
    personalInfo.push(displayPersonInfo[props]);
  }
  const age = Math.round(personalInfo[0]);
  const agePercent = Math.round(personalInfo[1] * 100) + '%';
  const gender = personalInfo[2];
  const genderPercent = Math.round(personalInfo[3] * 100) + '%';
  const culture = personalInfo[4];
  const culturePercent = Math.round(personalInfo[5] * 100) + '%';
  
  return (
    <div className="format ma4 br3">
        <p className="f3 center pa4">
     
            {/* Initial & Hover */}
            {faceFrame.length > 0 
            ? <p>Hover over the box to see the result</p>
            : <p>
                Want to know more about your customer?<br />
                Just put image link in!
              </p>
            }

            {/* Info Section */}
            <div style={ infoVisible? {display: 'block'} : {display: 'none'} }>
                <div>Age: {age}</div>
                <div>Probability: {agePercent}</div>
                <div>Gender: {gender}</div>
                <div>Probability: {genderPercent}</div>
                <div>Culture: {culture}</div>
                <div>Probability: {culturePercent}</div>
            </div>
        </p>
    </div>
  );
};

export default ResultBox;





// 如果 ... 顯示 歡迎句子
// 如果 不是...  > hover >  顯示 info / 無法取得圖片
