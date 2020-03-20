import React from "react";
import "./ResultBox.css";

const ResultBox = ({ displayPersonInfo, faceFrame, infoVisible, detectError, imageUrl, inputMethod }) => {
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
    <div className="format ma4 br3 min-wid">
        <div className="f4 center ph4 pv1 resultFont">
        
            {/* 1. Initial & Hover > Info Section */}
            {faceFrame.length > 0 
            ? 
            (infoVisible
                  /* 2. Hover & Info Section  */
                ?   <div style={ infoVisible? {display: 'block'} : {display: 'none'} }>
                      <p>偵測資訊 & 可能性</p>
                      <p>
                        年齡： <span className='b'>{age}</span> → {agePercent}    
                      </p>
                      <p>
                        性別： <span className='b'>{gender}</span> → {genderPercent}
                      </p>
                      <p>
                        文化： <span className='b'>{culture}</span> → {culturePercent}
                      </p>
                    </div>
                : <p>請將滑鼠移動到藍框上</p>
            )
            : 
            (detectError
              /* 3. Initial & Error  */
              ? 
                (imageUrl.length === 0
                  /* 4. Error type: no image submitted  */
                  ? <p>請放入圖片 url</p>
                  : (inputMethod === 'file'
                      /* 5. local file detecting  */
                    ? <p>
                        裝置內上傳的圖片需多處理幾秒鐘<br/>
                        請耐心稍後
                      </p>
                    : <div>
                        <p>
                        處理中...
                        </p>
                        <p>
                          若圖片處理許久仍未顯示<br/>
                          請檢查圖片連結是否有誤
                        </p>
                        <p>
                          若圖片顯示但無法偵測<br/>
                          請確保圖片中有臉部
                        </p>
                      </div>
                    )
                )
              : <div>
                  <p>
                    想要更了解你的客層？
                  </p>
                  <p>
                    放入圖片 url 或從裝置上傳<br />
                    以取得年齡、性別、文化資訊
                  </p>
                </div>
              )
            }   
        </div>
    </div>
  );
};

export default ResultBox;

