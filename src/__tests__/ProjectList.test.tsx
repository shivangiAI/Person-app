import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { fetchRequest } from '../Utils/fetchAPI';
import ProjectList from "../Components/Project/ProjectList";

jest.mock("../Utils/fetchAPI", () => ({
    fetchRequest: jest.fn(),
}));

describe('Project List Component', () => {
    test('Should render the Project details text', () => {
        render(<ProjectList />);
        const personDetailsText = screen.getByText("Project Details");
        expect(personDetailsText).toBeInTheDocument();
    });

    test('Should render the Load Projects button', () => {
        render(<ProjectList />);
        const personDetailsText = screen.getByText("Load Projects");
        expect(personDetailsText).toBeInTheDocument();
    });

    test('Should show the Progress indicator on click of the button', async() => {
        render(<ProjectList />);
        const loadProjectsBtn = screen.getByTestId('LOAD_PROJECTS');
        await userEvent.click(loadProjectsBtn);
        const progressIndicator = screen.getByTestId('PROGRESS_INDICATOR');
        expect(progressIndicator).toBeInTheDocument();
    });

    test('Should show the Person list on click of the button', async() => {
        (fetchRequest as jest.Mock).mockResolvedValue([
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
        ]);
        render(<ProjectList />);
        const loadProjectsBtn = screen.getByTestId('LOAD_PROJECTS');
        await userEvent.click(loadProjectsBtn);
        const projectList = screen.getByTestId('PROJECT_LIST');
        expect(projectList).toBeInTheDocument();
    });

    test('Should render Add Project button', () => {
        render(<ProjectList />);
        const addProjectBtn = screen.getByTestId('ADD_PROJECT');
        expect(addProjectBtn).toBeInTheDocument();
    });

    test('Should render the Add project form', async() => {
        render(<ProjectList />);
        const addProjectBtn = screen.getByTestId('ADD_PROJECT');
        await userEvent.click(addProjectBtn);

        const createProject = screen.getByTestId('CREATE_PROJECT_WRAPPER');
        expect(createProject).toBeInTheDocument();
    });
});
