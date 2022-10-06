import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreatePerson from "../Components/Person/CreatePerson";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { fetchRequest } from '../Utils/fetchAPI';

const projectList = [
    {
        projectId: 1,
        projectName: 'Test',
        persons: [
            {
                personCountry: 'India',
                personId: 1,
                personName: 'Shivangi'
                },
                {
                    personCountry: 'USA',
                    personId: 2,
                    personName: 'Janki'
                }
            ]
        },
    ];

    jest.mock("../Utils/fetchAPI", () => ({
        fetchRequest: jest.fn(),
    }));

    describe('Create Person Component', () => {
        test('Should render the Create Person text', () => {
            render(<CreatePerson projectList={projectList} />);
            const personDetailsText = screen.getByText("Create Person");
            expect(personDetailsText).toBeInTheDocument();
        });

        test('Should Add Person', async() => {
            const mockCallback = jest.fn();

            render(<CreatePerson projectList={projectList} />);
            const addPersonBtn = screen.getByTestId("ADD_PERSON_BUTTON");
            const personNameNode = screen.getByTestId("PERSON_NAME").querySelector("input");
            const personCountryNode = screen.getByTestId("PERSON_COUNTRY").querySelector("input");
            const projectMenu = screen.getByTestId("PROJECT_MENU");
            console.log('projectMenu: ', projectMenu);

            if (personNameNode) {
            await userEvent.type(personNameNode, "Shivangi");
        }
        if (personCountryNode) {
            await userEvent.type(personCountryNode, "India");
        }

        userEvent.click(screen.getByRole(screen.getByTestId("PROJECT_LIST"), "button"));
        await waitFor(() => userEvent.click(screen.getByText(/brazil/i)));
        expect(screen.getByRole("heading")).toHaveTextContent(/brazil/i);
        // const checkbox = screen.getByRole('checkbox');
        // expect(checkbox).not.toBeChecked();

        // await userEvent.click(addPersonBtn);

        // const mockData = {
        //     personName: "Shivangi",
        //     personCountry: "India",
        //     projectIds: []
        // };

        // expect(fetchRequest).toBeCalledTimes(1);
        // expect(fetchRequest).toBeCalledWith(
        //     "https://localhost:7124/api/Person",
        //     "POST",
        //     mockData
        // );
    });
}) 