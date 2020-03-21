import "components/Appointment/styles.scss";
import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    )

    function onAdd() {
        transition(CREATE);
    }

    function onCancel() {
        back();
    }

    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING);

        props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
    }

    return (
        <article className="appointment">
            <Header time={props.time} />
            
            {mode === CREATE && (
                <Form
                    interviewers={props.interviewers}
                    onCancel={onCancel}
                    onSave={save}
                />
            )}

            {mode === EMPTY && <Empty onAdd={onAdd} />}
            {mode === SAVING && <Status message={"Saving"} />}

                {mode === SHOW && (
                    <Show
                        student={props.interview.student}
                        interviewer={props.interview.interviewer}
                    />
                )}

        </article>
    )
}