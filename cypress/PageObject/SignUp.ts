class SignUp {
    elements = {
        userName: () => cy.get("[data-testid='USER_NAME']"),
        password: () => cy.get("[data-testid='PASSWORD']"),
        email: () => cy.get("[data-testid='EMAIL']"),
        signUpBtn: () => cy.get("[data-testid='SIGN_UP_BUTTON']"),
        signInLink: () => cy.get("[data-testid='SIGN_IN_LINK']")
    }

    navigate(url: string) {
        cy.visit(url)
    }

    fillForm(userName: string, email: string, password: string) {
        this.elements.userName().type(userName);
        this.elements.password().type(email);
        this.elements.password().type(password);
    }
}

export default SignUp;