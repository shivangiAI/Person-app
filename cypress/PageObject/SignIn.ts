class SignIn {
    elements = {
        userName: () => cy.get("[data-testid='USER_NAME']"),
        password: () => cy.get("[data-testid='PASSWORD']"),
        signInBtn: () => cy.get("[data-testid='SIGN_IN_BUTTON']")
    }

    navigate(url: string) {
        cy.visit(url)
    }

    fillForm(userName: string, password: string) {
        this.elements.userName().type(userName);
        this.elements.password().type(password);
    }
}

export default SignIn;