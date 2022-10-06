import { render, screen } from "@testing-library/react";
import PersonList from "../Components/Person/PersonList";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { fetchRequest } from '../Utils/fetchAPI';

jest.mock("../Utils/fetchAPI", () => ({
    fetchRequest: jest.fn(),
}));

describe('Person List Component', () => {
    test('Should render the Person details text', () => {
        render(<PersonList />);
        const personDetailsText = screen.getByText("Person Details");
        expect(personDetailsText).toBeInTheDocument();
    });

    test('Should render the Load Persons button', () => {
        render(<PersonList />);
        const personDetailsText = screen.getByText("Load Persons");
        expect(personDetailsText).toBeInTheDocument();
    });

    test('Should show the Progress indicator on click of the button', async() => {
        render(<PersonList />);
        const loadPersonsBtn = screen.getByTestId('LOAD_PERSONS');
        await userEvent.click(loadPersonsBtn);
        const progressIndicator = screen.getByTestId('PROGRESS_INDICATOR');
        expect(progressIndicator).toBeInTheDocument();
    });

    test('Should show the Person list on click of the button', async() => {
        (fetchRequest as jest.Mock).mockResolvedValue([
            {
                personCountry: "India",
                personId: 1,
                personName: 'Shivangi',
            },
        ]);
        render(<PersonList />);
        const loadPersonsBtn = screen.getByTestId('LOAD_PERSONS');
        await userEvent.click(loadPersonsBtn);
        const personList = screen.getByTestId('PERSON_LIST');
        expect(personList).toBeInTheDocument();
    });

    test('Should render Add Person button', () => {
        render(<PersonList />);
        const addPersonBtn = screen.getByTestId('ADD_PERSON');
        expect(addPersonBtn).toBeInTheDocument();
    });

    test('Should render the Add person form', async() => {
        render(<PersonList />);
        const addPersonBtn = screen.getByTestId('ADD_PERSON');
        await userEvent.click(addPersonBtn);

        const createPerson = screen.getByTestId('CREATE_PERSON_WRAPPER');
        expect(createPerson).toBeInTheDocument();
    });
});
