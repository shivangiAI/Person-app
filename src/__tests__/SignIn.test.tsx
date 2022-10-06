import SignInPage from '../Components/SignIn/index';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { fetchRequest } from '../Utils/fetchAPI';

jest.mock("../Utils/fetchAPI", () => ({
    fetchRequest: jest.fn(),
}));

describe("Sign in Component", () => {
    test("Should render the Sign In text", () => {
        render(<SignInPage />, { wrapper: BrowserRouter });
        const signInText = screen.getByText("Sign In Page");
        expect(signInText).toBeInTheDocument();
    });

    test("Should render the Username field", () => {
        render(<SignInPage />, { wrapper: BrowserRouter });
        const usernameNode = screen.getByTestId("USER_NAME");
        expect(usernameNode).toBeInTheDocument();
        expect(usernameNode).toHaveTextContent("User Name");
    });

    test("Should render the Password field", () => {
        render(<SignInPage />, { wrapper: BrowserRouter });
        const passwordNode = screen.getByTestId("PASSWORD");
        expect(passwordNode).toBeInTheDocument();
        expect(passwordNode).toHaveTextContent("Password");
    });

    test("Should show the Sign In button", async() => {
        render(<SignInPage />, { wrapper: BrowserRouter });
        const btn = await screen.findAllByRole("button");
        expect(btn).toHaveLength(1);
    });

    test('User should Sign in with data', async () => {
        const data = {
            data: "responseData",
            status: 200,
        };
        (fetchRequest as jest.Mock).mockResolvedValue(data);
        render(<SignInPage />, { wrapper: BrowserRouter });
        const submitButton = screen.getByTestId("SIGN_IN_BUTTON");
        const usernameNode = screen.getByTestId("USER_NAME").querySelector("input");
        const passwordNode = screen.getByTestId("PASSWORD").querySelector("input");
        
        if (usernameNode) {
            await userEvent.type(usernameNode, "Shivangi");
        }
        if (passwordNode) {
            await userEvent.type(passwordNode, "Shivang@1234");
        }
        await userEvent.click(submitButton);

        const mockData = {
            username: "Shivangi",
            password: "Shivang@1234",
        };
        expect(fetchRequest).toBeCalledTimes(1);
        expect(fetchRequest).toBeCalledWith(
            "https://localhost:7124/api/Authenticate/login",
            "POST",
            mockData
        );
    });
});
