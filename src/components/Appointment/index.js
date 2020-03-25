import "components/Appointment/styles.scss";
import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const EDIT = "EDIT";

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
        .catch(() => transition(ERROR_SAVE, true))
    }

    function deleteInterview() {
        transition(DELETING, true);
        props
        .cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true))
    }
    
    
    return (
        <article className="appointment" data-testid="appointment"> 
            <Header time={props.time} />
            
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onDelete={() => transition(CONFIRM)}
                    onEdit={() => transition(EDIT)}
                />
            )}
            
            {mode === CREATE && (
                <Form
                    interviewers={props.interviewers}
                    onCancel={() => onCancel() }
                    onSave={save}
                />
            )}
            
            {mode === SAVING && <Status message={"Saving"} />}
            {mode === EMPTY && <Empty onAdd={onAdd} />}
            {mode === DELETING && <Status message={"Deleting"} />}



            {mode === CONFIRM && (
                <Confirm
                    message={"Are you sure you would like to delete?"}
                    onCancel={back}
                    onConfirm={() =>  deleteInterview() }
                />    
            )}

            {mode === EDIT && (
                <Form 
                    name={props.interview.student}
                    interviewer={props.interview.interviewer.id}
                    interviewers={props.interviewers}
                    onCancel={() => onCancel() }
                    onSave={save}
                />
            )}


            {mode === ERROR_SAVE && (
                <Error 
                    message={"Could not save appointment!!!!!!"}
                    onClose={back}
                />
            )}

            {mode === ERROR_DELETE && (
                <Error
                    message={"Could not delete appointment"}
                    onClose={back}
                />
            )}

        </article>
    )
}