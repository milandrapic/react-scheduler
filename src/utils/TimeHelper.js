
// console.log(date);
// // console.log(date2);
// console.log(date3);
// console.log(totalSeconds);

export const getLocalTime = () => {
    return new Date();
}

export const getLocalTimeAfterMinutes = (minutes) => {
    // current time
    const currentDateTime = new Date();
    // earliest time in ms
    const date0 = new Date(0);
    // end time of pomodoro of 50 minutes
    const endDate = new Date((currentDateTime - date0) + (minutes * 60 * 1000));
    return endDate;
}

export const getLocalTimeAfterSeconds = (seconds) => {
    // current time
    const currentDateTime = new Date();
    // earliest time in ms
    const date0 = new Date(0);
    // end time of pomodoro of 50 minutes
    const endDate = new Date((currentDateTime - date0) + (seconds * 1000));
    return endDate;
}

export const getSecondsBetweenTimes = (time1, time2) => {
    return Math.floor((time2 - time1)/1000);
}
