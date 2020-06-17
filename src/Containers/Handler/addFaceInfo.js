export const addFaceInfo = ( ages, genders, culturals ) => {
    let infoArr = [];
    // push the person's info into arr
    ages.forEach((ag, i) => infoArr.push({'age': ages[i].name, 'agePercent': ages[i].value}));
    genders.forEach((gen, i) => {
        infoArr[i].gender = genders[i].name; 
        infoArr[i].genderPercent = genders[i].value
    })
    culturals.forEach((cul, i) => {
        infoArr[i].cultural = culturals[i].name; 
        infoArr[i].culturalPercent = culturals[i].value
    });
    return infoArr;
}

// ps. 如果 genders、culturals 也用 push 的話 => 
// 會在 infoArr 裡新增另一 obj，而不是在先前 push 的 ages 的個人 obj 裡新增成新屬性