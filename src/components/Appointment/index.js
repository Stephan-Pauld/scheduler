import React, { useState } from "react";
import useVisualMode from '../../hooks/useVisualMode'
import { getInterviewersForDay } from "../../helpers/selectors";
import Form from './Form'
import "./styles.scss";
import Show from './Show'
import Header from './Header'
import Empty from './Empty'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CANCEL = "CANCEL";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  // console.log(props);

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    transition(SHOW)
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

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

    </article>
  );
}




// {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />}
