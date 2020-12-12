import React, { useState } from "react";
import useVisualMode from '../../hooks/useVisualMode'
import { getInterviewersForDay } from "../../helpers/selectors";
import Status from "./Status";
import Form from './Form'
import Confirm from './Confirm'
import "./styles.scss";
import Show from './Show'
import Header from './Header'
import Empty from './Empty'
import Error from './Error'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CANCEL = "CANCEL";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition("SAVE");
    props.bookInterview(props.id, interview)

      .then((res) => {
        transition(SHOW);

      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      })
  }
// IS THIS SUPPOSED TO TAKE IN A PARAM????? COMPASS USESES "event"
  const delInterview = () => {
    transition(CANCEL, true)
    props.cancelInterview(props.id, props)
      .then((res) => {
        transition(EMPTY)
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      })
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {/* STATUS MESSAGES!!!!!!! */}
      {mode === SAVE && (
        <Status
          message={"Saving"}
        />
      )}

      {mode === CANCEL && (
        <Status
          message={"DELETING"}
        />
      )}
      {/* ################# */}

      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={"ARE YOU SURE YOU WANT TO DELETE?"}
          onCancel={back}
          onConfirm={delInterview}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message={"There was an error saving"}
          onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message={"There was an error Deleting"}
          onClose={back}
        />
      )}


    </article>
  );
}




// {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />}
