import "components/Appointment/styles.scss";
import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm"
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const ERROR = "ERROR";

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

        props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        // .catch(() => transition(ERROR, true))
    }

    function deleteInterview() {
        transition(DELETE);
        props
        .cancelInterview(props.id)
        .then(() => transition(EMPTY))
        // .catch(() => transition(ERROR, true))
    }

    return (
        <article className="appointment">
            <Header time={props.time} />
            
            {mode === CREATE && (
                <Form
                    interviewers={props.interviewers}
                    onCancel={() => onCancel()}
                    onSave={save}
                />
            )}

            {mode === CONFIRM && (
                <Confirm
                    message={"Would you like to delete?"}
                    onCancel={() => onCancel()}
                    onConfirm={() =>  deleteInterview()}
                />    
            )}


            {mode === EMPTY && <Empty onAdd={onAdd} />}
            {mode === SAVING && <Status message={"Saving"} />}
            {mode === DELETE && <Status message={"Deleting"} />}

                {mode === SHOW && (
                    <Show
                        student={props.interview.student}
                        interviewer={props.interview.interviewer}
                        onDelete={() => transition(CONFIRM)}
                    />
                )}

        </article>
    )
}