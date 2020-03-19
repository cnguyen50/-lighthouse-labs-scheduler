export function getAppointmentsForDay(state, day) {
    const days = state.days;
    let result = [];
    let arr = [];

    for (let el of days) {
        if (el.name === day) {
            if (days.length === 0) {
                return result;
            }
            result = el.appointments;

            for (let item of result) {
                arr.push(state.appointments[item])
            }
        }
    }
    return arr;
}