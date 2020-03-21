import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form (props) {

    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [name, setName] = useState(props.name || "");
    const [error, setError] = useState("");

    const reset = () => {
        setName("");
        setInterviewer(null)
    };

    const cancel = () => {
        reset()
        props.onCancel()
    }
    
    function validate() {
        if (name === "") {
            setError("Student name field cannot be blank")
        }

        if (!interviewer) {
            setError("Interviewer must be selected")
        }
        
        setError(null)
        props.onSave(name, interviewer)
    }


    return(
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
            <form autoComplete="off" onSubmit={event => event.preventDefault()}>
            <input
                className="appointment__create-input text--semi-bold"
                name="name"
                type="text"
                placeholder="Enter Student Name"
                value={name}
                onChange={(event) => {setName(event.target.value)}}
            /*
                This must be a controlled component
            */
            />
            </form>
                <InterviewerList 
                interviewers={props.interviewers} 
                value={interviewer} 
                onChange={setInterviewer} 
                />
            </section>
                <section className="appointment__card-right">
                <section className="appointment__actions">
                <Button onClick={ cancel } danger>Cancel</Button>
                <Button onClick={() => validate()} confirm>Save</Button>
                </section>
            </section>
        </main>
    )
}