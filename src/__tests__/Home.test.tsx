import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from '../Components/Home';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

describe('Home Component', () => {
    test('Should render the Person button', () => {
        render(<Home />, { wrapper: BrowserRouter });
        const signInText = screen.getByText("Person");
        expect(signInText).toBeInTheDocument();
    });

    test('Should render the Project button', () => {
        render(<Home />, { wrapper: BrowserRouter });
        const signInText = screen.getByText("Project");
        expect(signInText).toBeInTheDocument();
    });

    test('Should redirect to the Person list on click of the button', async() => {
        render(<Home />, { wrapper: BrowserRouter });
        const personBtn = screen.getByTestId('PERSON_BUTTON');
        await userEvent.click(personBtn);
        expect(window.location.pathname).toBe("/personList");
    });

    test('Should redirect to the Project list on click of the button', async() => {
        render(<Home />, { wrapper: BrowserRouter });
        const projectBtn = screen.getByTestId('PROJECT_BUTTON');
        await userEvent.click(projectBtn);
        expect(window.location.pathname).toBe("/projectList");
    });
});
