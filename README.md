# _Currency Exchanger_

#### _A program that converts from US Dollars to any currency of the user's choosing._

#### By _**Woo Jin Kim**_

## Technologies Used

* _HTML_
* _CSS_
* _Javascript_
* _jQuery_
* _ExchangeRate-API_

## Description

* _A user should be able to enter an amount (in U.S. dollars) and then specify another currency (such as the South Korean won). The user should then see the total amount they entered in converted currency._
* _Users should be able to convert U.S. currency into at least 5 other types of currency._
* _The application should return a notification to the user that states what the error is, if one should occur._
* _If the query response doesn't include that particular currency, the application should return a notification that states the currency in question doesn't exist._

## Setup/Installation Requirements

* Clone this repository to your desktop
* Navigate to the top level of the directory
* Visit the ExchangeRate-API site. Input your email address and click the "Get Free Key" button.
* You'll be prompted to create an account with your email, first name and a password. Agree to the terms of use and click "Get Started!"
* At this point, you'll be able to access a dashboard that includes your API key as well as your remaining API calls for the month. Place this token in an .env file at the top level of your directory. 
* Name your API key variable API_KEY in .env. Keep spelling and capitalization identical.
* Include .env in .gitignore.
* Confirm you are in the top level of the directory and enter `npm install` and `npm run start` into your terminal.

## Known Bugs

* _Does not check the input of the optional base amount value very well. Code still runs even if numerals aren't used._
* _No CSS done_

## License

_MIT_

## Contact Information

_Woo Jin Kim (kimwoojin211@gmail.com)_

Copyright (c) 2021 Woo Jin Kim