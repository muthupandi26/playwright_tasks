const { assert, expect } = require('chai');
const { BaseAction } = require('../setup/baseAction');
const Mailosaur = require('mailosaur')

    // const result = Math.random().toString(36).substring(2,7);
    // console.log(result);

exports.Homepage = class Homepage extends BaseAction {

    constructor() {
        super();
    }

    /**
   * Creating element object for initializing required locators for home page.
   */
    elements = {
        USERNAME_INPUT: '#container-signin input[name="email"]',
        PASSWORD_INPUT: '#container-signin input[name="password"]',
        SignIn_Btn: "#btn-login",
        profile_DASHBOARD: "#profile-page-slideshow",
        profile_role: "#profile-role",
        ticketShowBtn: '//div[@id="tickets-show-btn"]',
        singleTicketSendBtn: "li#btnSingleTicketSend",
        emailSentNotificationText: "#divSmallBoxes span",
        channelButton: "#channel-tickets-connection-toggle",
        logoutBtn: '#main-logout a',
        confirmLogoutBtn: '#Msg1 .MessageBoxButtonSection button',

        // Mail form
        username : '#name',
        email : "#email",
        subject : "#subject",
        msg : "#message",
        sendMail : 'input[type="submit"]',
    };

    

    validationText = {
        emailSentNotification: "Success",
    };

    /**
     * Function to open home page
     */
    async openBrowserWithURL() {
        await this.openBrowser(global.BASE_URL);
        await this.wait(2)
    }

    /**
     * Function to check if login is working okay
     */
    // async loginProcess(loginData) {
    //     await this.type(this.elements.USERNAME_INPUT, loginData.username);
    //     await this.type(this.elements.PASSWORD_INPUT, loginData.password);
    //     await this.click(this.elements.SignIn_Btn);
    // }

    async form_values(mail) {
        await this.type(this.elements.username, mail.senderName);
        await this.type(this.elements.email, mail.senderEmail);
        await this.type(this.elements.subject, mail.subject);
        await this.type(this.elements.msg, mail.message)
        await this.click(this.elements.sendMail);
        await this.wait(4);
    }

    // async mailChecking() {
    //     await this.check_sub();
    // }

    async mailCheck() {
        // Access mail using api-key
        const apiKey = 'hfyf5MFP0puPtUeo';
        const mailosaur = new Mailosaur(apiKey);

        const serverId = 'uvgsnjwv';
        const serverDomain = 'uvgsnjwv.mailosaur.net';

        // Search for the email
        const email = await mailosaur.messages.get(serverId, {
            sentTo: 'hey@uvgsnjwv.mailosaur.net'
        });
        
        assert.equal(email.subject, 'Just-checking');
        console.log(email.subject);
    }

    /**
     * Function to check if requested element is displayed on page.
     */
    async verifyPageDisplayed(element) {
        switch (element) {
            case "dashboard":
                await this.shouldVisible(this.elements.profile_DASHBOARD);
                await this.wait(2);
                break;
        }
    }

    /**
     * Function to check if dashboard displayed role wise.
     */
    async verifyPageDisplayedRoleWise(role) {
        await this.wait(2);
        await this.shouldContainText(this.elements.profile_role, role);
    }

    clickNavBarButton() {
        this.wait(5)
        this.click(this.elements.ticketShowBtn);
    }

    clickSendEmailBtn() {
        this.wait(4);
        this.clickVisibleElementOnly(this.elements.singleTicketSendBtn);
    }

    emailSent() {
        this.shouldContainText(
            this.elements.emailSentNotificationText,
            this.validationText.emailSentNotification
        );
    }

    // Acces ticket channel
    navigateToTicketChannel() {
        this.wait(4);
        this.click(this.elements.channelButton);
    }

    logout() {
        this.click(this.elements.logoutBtn);
        cy.get(this.elements.confirmLogoutBtn).contains("Yes").click();
    }
}