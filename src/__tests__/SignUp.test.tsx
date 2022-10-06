import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { fetchRequest } from '../Utils/fetchAPI';
import SignUpPage from '../Components/SignUp';

jest.mock("../Utils/fetchAPI", () => ({
    fetchRequest: jest.fn(),
}));

describe("Sign Up Component", () => {
    test("Should render the Sign Up text", () => {
        render(<SignUpPage />, { wrapper: BrowserRouter });
        const signInText = screen.getByText("Sign Up Page");
        expect(signInText).toBeInTheDocument();
    });

    test("Should render the Username field", () => {
        render(<SignUpPage />, { wrapper: BrowserRouter });
        const usernameNode = screen.getByTestId("USER_NAME");
        expect(usernameNode).toBeInTheDocument();
        expect(usernameNode).toHaveTextContent("User Name");
    });

    test("Should render the Password field", () => {
        render(<SignUpPage />, { wrapper: BrowserRouter });
        const passwordNode = screen.getByTestId("PASSWORD");
        expect(passwordNode).toBeInTheDocument();
        expect(passwordNode).toHaveTextContent("Password");
    });

    test("Should render the Email field", () => {
        render(<SignUpPage />, { wrapper: BrowserRouter });
        const emailNode = screen.getByTestId("EMAIL");
        expect(emailNode).toBeInTheDocument();
        expect(emailNode).toHaveTextContent("Email");
    });

    test("Should show the Sign Up button", async() => {
        render(<SignUpPage />, { wrapper: BrowserRouter });
        const btn = await screen.findAllByRole("button");
        expect(btn).toHaveLength(1);
    });

    test('User should Sign Up with data', async () => {
        const data = {
            data: "responseData",
            status: 200,
        };
        (fetchRequest as jest.Mock).mockResolvedValue(data);
        render(<SignUpPage />, { wrapper: BrowserRouter });
        const signUpBtn = screen.getByTestId("SIGN_UP_BUTTON");
        const usernameNode = screen.getByTestId("USER_NAME").querySelector("input");
        const passwordNode = screen.getByTestId("PASSWORD").querySelector("input");
        const emailNode = screen.getByTestId("EMAIL").querySelector("input");
        
        if (usernameNode) {
            await userEvent.type(usernameNode, "Shivangi");
        }
        if (passwordNode) {
            await userEvent.type(passwordNode, "Shivang@1234");
        }
        if (emailNode) {
            await userEvent.type(emailNode, "shivangi@gmail.com");
        }
        await userEvent.click(signUpBtn);

        const mockData = {
            username: "Shivangi",
            password: "Shivang@1234",
            email: "shivangi@gmail.com"
        };
        expect(fetchRequest).toBeCalledTimes(1);
        expect(fetchRequest).toBeCalledWith(
            "https://localhost:7124/api/Authenticate/register",
            "POST",
            mockData
        );
    });
});
