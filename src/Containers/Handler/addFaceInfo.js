export const addFaceInfo = ( age, gender, cultural ) => {
    let infoArr = [];
    // push the person's info into arr
    age.forEach((ag, i) => infoArr.push({'age': age[i].name, 'agePercent': age[i].value}));
    gender.forEach((gen, i) => {
        infoArr[i].gender = gender[i].name; 
        infoArr[i].genderPercent = gender[i].value
    })
    cultural.forEach((cul, i) => {
        infoArr[i].cultural = cultural[i].name; 
        infoArr[i].culturalPercent = cultural[i].value
    });
    return infoArr;
}

// 注意：因為在 App.js 是 addFaceInfo(age, gender, cultural) 這樣傳進來，
// 不是從 render { 解構 } = this.state 傳進來的，所以參 數不用先用 {} 解構

// 注意：如果 gender、cultural 也用 push 的話 => 
// 會在 [] 裡新增 obj，而不是在先前 push 的 age 的個人 obj 裡新增成新屬性