import React from "react";
import { render, cleanup, waitForElement, getByText, getAllByTestId, getByAltText, getByPlaceholderText, fireEvent, prettyDOM, queryByText, waitForElementToBeRemoved } from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";

afterEach(cleanup);


describe("Application", () => {
  xit("defaults to Monday and changes the schedule when a new day is selected", () => {

    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });

  });

  xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug, queryByText } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    debug(fireEvent.click(getByText(appointment, "Save")))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      getByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    // console.log(prettyDOM(day));
  });
  afterEach(cleanup);
  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    const { container, debug, queryByText } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const remove = getByAltText(container, "Delete")

    fireEvent.click(getByAltText(container, "Delete"));
    await waitForElement(() => getByText(container, "ARE YOU SURE YOU WANT TO DELETE?"));
    fireEvent.click(getByText(container, "Confirm"));
    expect(getByText(container, "DELETING")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(container, "DELETING"))

    const day = getAllByTestId(container, "day").find(day =>
      getByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });
  afterEach(cleanup);
  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug, queryByText } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    fireEvent.click(getByAltText(container, "Edit"));

    fireEvent.change(getByPlaceholderText(container, /enter student name/i), {
      target: { value: "Stefler BoB" }
    });
    fireEvent.click(getByAltText(container, "Sylvia Palmer"));
    fireEvent.click(getByText(container, "Save"));

    await waitForElementToBeRemoved(() => getByText(container, "Saving"))

    expect(getByText(container, "Stefler BoB")).toBeInTheDocument();

  });

  afterEach(cleanup);





  /* test number five */




  xit("shows the save error when failing to save an appointment", async() => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "STEFLER BOB" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    
    await waitForElement(() => getByText(appointment, "There was an error saving"));

    expect(getByText(appointment, "There was an error saving")).toBeInTheDocument();

  });
  afterEach(cleanup);
  it("shows the save error when failing to save an appointment", () => {
    axios.delete.mockRejectedValueOnce();
  });

  afterEach(cleanup);
  it("shows the save error when failing to delete an appointment", async() => {

    const { container, debug, queryByText } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const remove = getByAltText(container, "Delete")

    fireEvent.click(getByAltText(container, "Delete"));
    await waitForElement(() => getByText(container, "ARE YOU SURE YOU WANT TO DELETE?"));
    fireEvent.click(getByText(container, "Confirm"));

    expect(getByText(container, "DELETING")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(container, "DELETING"))
    // console.log(prettyDOM(container));


    expect(getByText(container, "There was an error Deleting")).toBeInTheDocument();
  });


});
