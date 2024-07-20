
# Money Lending App

This project implements the backend of a money lending application using Node.js, Express, and MongoDB. The application provides essential functionalities similar to popular money lending apps such as Slice and KreditBee. It features user registration, authentication, and the ability to borrow money, with all necessary validations and business logic implemented.

# Technologies Used

Node.js : JavaScript runtime used for building the server-side application.

Express : Web framework for Node.js to handle routing and middleware.

MongoDB : NoSQL database to store user and transaction data.

JWT : JSON Web Tokens for user authentication and authorization.

# API Endpoints

1 . Sign Up API (POST Request) ~/api/auth/signup

Functionality : Registers a new user, approving or rejecting the application based on the user's age and monthly salary. Users must be over 20 years old and have a monthly salary of at least 25,000. Upon successful registration, the user's application status is set to 'Approved'.


![Signup(Age)](https://github.com/user-attachments/assets/96907575-f0e7-4303-bf92-0a7f4797c612)

                                             User should be above 20 years of age

![Signup(salary)](https://github.com/user-attachments/assets/7591fe1f-4b7f-435c-921d-414ef46bec7a)

                                             Monthly salary should be 25k or more

![Signup](https://github.com/user-attachments/assets/57b7c9d2-8717-4a61-9405-18c2ddf2d26a)

                                                Signup Application Approved


2 . Login API (POST Request) ~/api/auth/login

Functionality : Authenticates users based on their email and password. On successful authentication, returns a JWT token to be used for subsequent requests.

![Login](https://github.com/user-attachments/assets/4acadb1c-eecb-4694-9dd5-3c7aa852774a)

                                                       User Logged In
3 . Show User Data API (GET Request) ~/api/user

Functionality : Retrieves and returns user data, including purchase power amount, phone number, email, registration date, date of birth, and monthly salary. Requires a valid JWT token.

![Get(Token)](https://github.com/user-attachments/assets/7f6b6865-b267-4619-bbd7-3aece81e0a4c)

                                                JWT Token from Login Response

![Get](https://github.com/user-attachments/assets/4b676a49-8850-4f1e-bcc7-5b94f26ab8ba)

                                                     Displaying User Data 

4 . Borrow Money API (POST Request) ~/api/user/borrow      

Functionality : Allows a user to borrow money, updating their purchase power and calculating the monthly repayment amount based on an 8% interest rate over the specified tenure. Requires a valid JWT token.

![Borrow(Token)](https://github.com/user-attachments/assets/e3ce856d-a518-4eca-963d-2bc43b194e6d)

                                                JWT Token from Login Response

![Borrow](https://github.com/user-attachments/assets/5a3a8a26-e18f-4889-a7d4-4aa8a25dc4cd)


                                               Borrow Money API Implemented

![Get(After Borrow)](https://github.com/user-attachments/assets/5f6d3829-69d2-4a0d-bae3-515025f8f824)

                                       Purchase Power updated after borrowing money

# Mongo DB

![MongoDB](https://github.com/user-attachments/assets/b0d767ff-6760-411c-8cb8-b443212ad8a6)


                                                    MongoDB connected 








