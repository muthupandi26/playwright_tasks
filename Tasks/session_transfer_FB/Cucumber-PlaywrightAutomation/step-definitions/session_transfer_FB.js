const { Given, When, Then } = require('@cucumber/cucumber');
const { Homepage } = require('../page-objects/homepage.po');
const { userAccount } = require('../fixtures/data.json');

const login = userAccount;
const homepageObj = new Homepage();

Given("User is on home page", async() => {
    await homepageObj.openBrowserWithURL();
    
})

When("User login with {string} role credentials", async(role) => {
    await homepageObj.loginProcess(login[role]);
});

Then('User send the message', async() => {
    await homepageObj.message();
})

Then("Verify session transfer", async() => {
    await homepageObj.secondTab();
    await homepageObj.checkMsg();
})

When("logout the facebook page", async() => {
    await homepageObj.logOutFb();
})












When("login the {string} user new Tab", async(role) => {
    await homepageObj.openNewTab('https://www.facebook.com/');
    await homepageObj.loginProcess_2(login[role]);
})

Then("last message Assert", async() => {
    await homepageObj.message_check();
    await homepageObj.logOutFb_2();
})

