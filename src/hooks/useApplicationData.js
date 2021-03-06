import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });

    function reload() {
        Promise.all([
            Promise.resolve(axios.get("/api/days")),
            Promise.resolve(axios.get("/api/appointments")),
            Promise.resolve(axios.get("/api/interviewers"))
        ]).then((all) => {
            setState(prev => ({
                ...prev,
                days: all[0].data,
                appointments: all[1].data,
                interviewers: all[2].data
            }))
        }).catch(() => {
            console.log("error")
        })
    }

    useEffect(() => {
        reload();
    }, [])

    const setDay = day => setState(prev => ({ ...prev, day }))

    function bookInterview(id, interview) {
        
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
    
        const appointments = {
            ...state.appointments,
            [id]: appointment
        }
    
        return axios.put(`/api/appointments/${id}`, appointment)
            .then(() => {
                reload()
                setState({ ...state, appointments })
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

        return axios.delete(`/api/appointments/${id}`)
            .then(() => {
                reload();
                setState({ ...state, appointments })
            })
    }
    return { setDay, cancelInterview, bookInterview, state }

}