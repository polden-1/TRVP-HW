import { INTERVIEW_LENGTH_HOURS, INTERVIEW_LENGTH_MINUTES } from "./constants";

export const addTime = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    date.setHours(date.getHours() + INTERVIEW_LENGTH_HOURS);
    date.setMinutes(date.getMinutes() + INTERVIEW_LENGTH_MINUTES);

    const newHours = String(date.getHours()).padStart(2, '0');
    const newMinutes = String(date.getMinutes()).padStart(2, '0');
    const newSeconds = String(date.getSeconds()).padStart(2, '0');

    return `${newHours}:${newMinutes}:${newSeconds}`;
}