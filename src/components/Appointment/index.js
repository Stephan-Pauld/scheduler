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

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CANCEL = "CANCEL";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE)
    props.bookInterview(props.id, interview)
    setTimeout(() => {
      transition(SHOW)
    }, 1000);

  }
  const delInterview = () => {

    transition(CANCEL)
    props.cancelInterview(props.id, props)
    setTimeout(() => {
      transition(EMPTY)
    }, 1000);
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
          bookInterview={props.bookInterview}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          bookInterview={props.bookInterview}
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


    </article>
  );
}




// {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />}
