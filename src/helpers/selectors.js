export function getAppointmentsForDay(state, name) {
    const filteredDays = state.days.filter(day => day.name === name);
    if (filteredDays.length === 0) {
        return [];
    }

    return filteredDays[0].appointments.map(
    appointment => state.appointments[appointment]);
}

export function getInterview(state, interview) {
    if (interview) 
        return { 
            student: interview.student,
            interviewer: state.interviewers[interview.interviewer]
        };
    return null;
}

export function getInterviewersForDay(state, name) {
    const match = state.days.filter(day => day.name === name);
    if (match.length === 0 || match === undefined) {
        return [];
    }   
    return match[0].interviewers.map(id => state.interviewers[id]);
}