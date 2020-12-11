


const getAppointmentsForDay = function (state, day) {
  const dayobj = state.days.find(d => {
    return d.name === day
  });
  if (!state.day || dayobj === undefined) {
    return []
  }
  const appointments = dayobj.appointments.map(id => {
    return state.appointments[id]
  })
  return appointments;
}


const getInterview = function (state, interview) {
  if (interview !== null) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }
  return null;
}


const getInterviewersForDay = function (state, dayOfweek) {
  const arr = [];
  for (const day of state.days) {
    if (day.name === dayOfweek){
      for (const elem of day.appointments) {
        if (state.appointments[elem].interview !== null) {
          const interviewerId = state.appointments[elem].interview.interviewer
          arr.push(state.interviewers[interviewerId])
        }
      }
    }
  }
  return arr;
}


module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
}