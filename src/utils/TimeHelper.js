
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

export const getMinutesFromSeconds = (seconds) => {
    return Math.floor(seconds/60);
}

export const getMinutesAndSecondsFromSeconds = (s) => {
    if (s === undefined) return {minutes: 0, seconds: 0};
    const minutes = Math.floor(s/60);
    const seconds = s % 60;
    return {minutes, seconds};
}

export const formatMinutesAndSeconds = (minutes=0, seconds=0) => {
    return `${minutes<10?"0":""}${minutes}:${seconds<10?"0":""}${seconds}`;
}