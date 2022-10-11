import deptInfo from './deptInfo.js';
function capitalize(mySentence) {
    return mySentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}
function getDeptName(code) {
    let deptName = "";
    for (let index = 0; index < deptInfo.length; index++) {
        const element = deptInfo[index];
        if (element.DeptID == code) {
            deptName = element.DeptName;
        }
    }
    return deptName
}
export { capitalize, getDeptName }