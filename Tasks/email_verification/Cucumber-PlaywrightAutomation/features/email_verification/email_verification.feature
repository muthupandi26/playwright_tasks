Feature: Email verification

    Scenario: Email verification on form
        Given User visit the form page
        When User Enter the 'user_1' role credentials
        Then Assert the mail subject if correct