export const addFaceInfo = ( age, gender, cultural ) => {
    let infoArr = [];
    // push the person's info into arr
    age.forEach((age, i) => infoArr.push({'age': age[i].name, 'agePercent': age[i].value}));
    gender.forEach((gender, i) => {
        infoArr.push({'gender': gender[i].name, 'genderPercent': gender[i].value})
    });
    cultural.forEach((cultural, i) => {
        infoArr.push({'cultural': cultural[i].name, 'culturalPercent': cultural[i].value})
    });
    return infoArr;
}

// 注意：因為在 App.js 是 addFaceInfo(age, gender, cultural) 這樣傳進來，
// 不是從 render { 解構 } = this.state 傳進來的，所以參數不用先用 {} 解構