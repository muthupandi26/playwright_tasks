const { Given, When, Then } = require('@cucumber/cucumber');
const { Homepage } = require('../page-objects/homepage.po');
const { userAccount, mail_details } = require('../fixtures/data.json');

const login = userAccount;
const mail = mail_details;
const homepageObj = new Homepage();

Given("User visit the form page", async() => {
    await homepageObj.openBrowserWithURL();
    
})

When("User Enter the {string} role credentials", async(role) => {
    await homepageObj.form_values(mail[role]);
});

Then("Assert the mail subject if correct", async() => {
    // await homepageObj.mailCheck();
    // await homepageObj.mailChecking();
})


