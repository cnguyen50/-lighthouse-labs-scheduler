import "components/Appointment/styles.scss";
import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

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

    return (
        <article className="appointment">
            <Header time={props.time} />
            {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}

            {mode === CREATE && (
                <Form
                    interviewers={[]}
                    onCancel={onCancel}
                />
            )}

            {mode === EMPTY && <Empty onAdd={onAdd} />}
            
                {mode === SHOW && (
                    <Show
                        student={props.interview.student}
                        interviewer={props.interview.interviewer}
                    />
                )}

        </article>
    )
}