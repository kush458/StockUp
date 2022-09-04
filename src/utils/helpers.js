
/**
 * 
 * @returns total number of days(approx.) passed till the current date
 */
 const getDaysPassed = () => {

    var today = new Date();
    var dd = parseInt(String(today.getDate()).padStart(2, '0'));

    //weeks passed in the current month
    var currMonthWeeks = Math.floor(dd/7);
    var mm = String(today.getMonth() + 1).padStart(2, '0');

    //Weeks passed from the start of this year till the starting of the current month
    var weeksPassed = (parseInt(mm)-1)*4;
    var totalWeeksPassed = weeksPassed + currMonthWeeks;

    //Convert total number of weeks into days, (multiply by 5 to exclude weekends)
    return totalWeeksPassed * 5;
}

/**
 * 
 * @param {number} num The number to be abbreviated
 * @returns returns abbreviated form of a number, eg: 18716963282 is converted to 18.72b
 */
const abbrNum = (num) => {

    //We always want 2 decimal places at the end
    var divideBy = 100; 

    var postFixes = ['t', 'b', 'm', 'k'];

    for(var i=0; i<postFixes.length; i++) {

        var testSize = Math.pow(10, ((postFixes.length - (i))*3));

        if(testSize <= num){

            num = Math.round((num/testSize)*divideBy)/divideBy;

            num+=postFixes[i];

            break;
        }
    }

    return num;
}

/**
 * 
 * @param {number} num The number to add commas to
 * @returns number with commas added according to the international number system
 */
const addCommas = (num) => {

    let strNum = num.toString();
    let newNum = '';

    if(strNum.length <= 3){
      return strNum;
    }

    for(var i=0; i<strNum.length; i++) {
      if((strNum.length-i)%3===0 && (i!==0)){
        newNum = newNum + ',';
      }
      newNum = newNum + strNum.charAt(i);
    }
    
    return newNum;
}

export {getDaysPassed, abbrNum, addCommas}