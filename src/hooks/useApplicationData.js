import { useState, useEffect } from "react";
import axios from 'axios';


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState({
      ...state,
      day
    });
  }

  const changeSpots = (add) => {
    const dayobj = state.days.find(d => {
      return d.name === state.day
    });
    return dayobj.spots += add
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {

        if (res.status === 204) {
          const diff = !state.appointments[id].interview ? -1 : 0;
          changeSpots(diff)
          setState({ ...state, appointments });
        }
      })
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        if (res.status === 204) {
          changeSpots(1)
          setState({ ...state, appointments });
        }
      })
  }


  useEffect(() => {
    const daysUrl = 'http://localhost:8001/api/days';
    const apptsUrl = 'http://localhost:8001/api/appointments';
    const interviewersUrl = 'http://localhost:8001/api/interviewers';

    Promise.all([
      axios.get(daysUrl),
      axios.get(apptsUrl),
      axios.get(interviewersUrl)
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }
      ));
    });
  }, [])

  return { state, setDay, bookInterview, cancelInterview }
}