const { assert, expect } = require('chai');
const { BaseAction } = require('../setup/baseAction');


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

        // for FB paths...
        Username : '//input[@id="email"]',
        password2 : '//input[@id="pass"]',
        signin : '//button[@name="login"]',
        logout : 'div[aria-label="Account"]',
        logout2 : '.a8nywdso.sj5x9vvc.rz4wbd8a.ecm0bbzt div:nth-child(4) .qzhwtbm6.knvmm38d > span',
        search : '//input[@dir="ltr"]',
        searchResult :'.d2edcug0.o7dlgrpb > div:nth-child(1) > div > div > div >div:nth-child(1) > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) > div > div > span > span ',
        messenger : 'div[role="banner"] > div:nth-child(4) > div > div:nth-child(3)',
        msg : 'div[aria-label="Messenger"] div[data-testid="mwthreadlist-item-open"]:nth-child(2) > div',
        msgText : '.j83agx80.lhclo0ds.bkfpd7mw > div p',
        msgSend : 'div[aria-label="Press Enter to send"]',
        lastMsg : 'div[class="__fb-light-mode l9j0dhe7"]:last-child > div > div > div > div:nth-child(2) > div > div > div:nth-child(2) span > div > div:nth-child(2) > div > div',

    };

    validationText = {
        emailSentNotification: "Success",
    };

    /**
     * Function to open home page
     */
    async openBrowserWithURL() {
        await this.openBrowser(global.BASE_URL);
    }

    /**
     * Function to check if login is working okay
     */
    // async loginProcess(loginData) {
    //     await this.type(this.elements.USERNAME_INPUT, loginData.username);
    //     await this.type(this.elements.PASSWORD_INPUT, loginData.password);
    //     await this.click(this.elements.SignIn_Btn);
    // }

    async loginProcess(loginData) {
        await this.type(this.elements.Username, loginData.username);
        await this.type(this.elements.password2, loginData.password);
        await this.click(this.elements.signin);
        await this.wait(4);
    }

    async message()  {
        await this.wait(2);
        await this.click(this.elements.messenger);
        await this.click(this.elements.msg);
        await this.wait(4)
        await this.type(this.elements.msgText, "Hi Muthu !!");
        await this.click(this.elements.msgSend);
        await this.wait(3)
    }

    async logOutFb() {
        await this.wait(2);
        await this.click(this.elements.logout);
        await this.wait(2);
        await this.click(this.elements.logout2);
        await this.wait(2);
        // await this.openNewTab(global.BASE_URL);
    }

    async loginProcess_2(loginData) {
        await this.type_2(this.elements.Username, loginData.username);
        await this.type_2(this.elements.password2, loginData.password);
        await this.click(this.elements.signin, "newTab");
        await this.wait(4);
    }

    async message_check()  {
        await this.wait(2);
        await this.click(this.elements.messenger, "newTab");
        await this.click(this.elements.msg, "newTab");
        await this.wait(4);
        const stringToMatch = "Hi Muthu !!";
        await this.shouldContainTextt(await this.getTextss(this.elements.lastMsg), stringToMatch);
        // console.log(stringToMatch);
        // await this.type(this.elements.msgText, "Hi Muthu");
        // await this.click(this.elements.msgSend);
        await this.wait(3)
    }

    async logOutFb_2() {
        await this.wait(2);
        await this.click(this.elements.logout,"newTab");
        await this.wait(2);
        await this.click(this.elements.logout2,"newTab");
        await this.wait(2);
    }

    async secondTab() {
        await this.openNewTab(global.BASE_URL)
    }

    async checkMsg() {
        // await this.wait(2);
        // await this.click(this.elements.messenger, "newTab");
        // await this.wait(2);
        // await this.click(this.elements.msg, "newTab");
        await this.wait(10);
        const stringToMatch = "Hi Muthu !!";
        await this.shouldContainTextt(await this.getTextss(this.elements.lastMsg), stringToMatch);
        await pageNew.close();
        await this.wait(3);
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