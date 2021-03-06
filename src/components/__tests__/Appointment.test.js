import React from "react";
import { fireEvent } from "@testing-library/react";
import Application from "components/Application";
import Appointment from 'components/Appointment'
import Form from "components/Appointment/Form";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);


describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });
  

  it("validates that the student name is not blank", () => {

    const onSave = jest.fn();

    const { getByText } = render (<Form onSave={onSave} interviewers={interviewers} />)

    const saveBtn = getByText(/save/i);

    fireEvent.click(saveBtn)

  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });



  
  it("calls onSave function when the name is defined", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
  
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        name="Lydia Miller-Jones"
        interviewer={1}
      />
    );
  
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });
});














