# CARECONNECT APP

<p align="center">
  <img src="client/public/golden-swing-1964101_1280.png" alt="CARECONNECT-LOGO" width="300" height="200">
</p>

## Table of Contents
- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [Launching](#launching)
  - [Endpoints](#endpoints)
- [Prerequisites](#prerequisites)
- [Installations](#installations)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Running CareConnect Locally](#running-careconnect-locally)
- [Usage](#usage)
- [Development Notes](#development-notes)
- [Security Considerations](#security-considerations)
- [MVPs](#mvps)
  - [MVP 1: Service Management](#mvp-1-service-management)
  - [MVP 2: Patient Management](#mvp-2-patient-management)
  - [MVP 3: Appointment Management](#mvp-3-appointment-management)
  - [MVP 4: Patient Login](#mvp-4-patient-login)
  - [Stretch MVPs](#stretch-mvps)
    - [MVP 5: Staff Management](#mvp-5-staff-management)
    - [MVP 6: Billing Services](#mvp-6-billing-services)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contributors](#contributors)


## Features
- ## User Roles
The app's homepage requests a person to define themselves either as a patient or an admin(Healthcare provider).
  - ## As a Patient:
Can view available services and their prices, register and login, book appointments and view medical records.
  - ## As an Admin: 
Can manage services, appointments, and update patients records.

CareConnect App is a comprehensive healthcare facility application dedicated to providing high-quality medical services to patients. Our mission is to modernize healthcare operations, improve patient care through innovative solutions, and promote a good image and integrity for all healthcare facilities.

## Problem Statement

Many healthcare facilities struggle with efficient management of patient information, appointments, and medical records. Patients are also wary of hidden fees in hospitals and desire a way to see all services received and their current bill. This project provides a way for patients to track their bills. Manual processes are often time-consuming, error-prone, and can lead to miscommunication between departments. This results in longer wait times for patients, increased administrative burden on staff, and potential risks to patient care quality.

## Key Features

- ## User Roles
The app's homepage requests a person to define themselves either as a patient or an admin(Healthcare provider).
  - ## As a Patient:
Can view available services and their prices, register and login, book appointments and view medical records.
  - ## As an Admin: 
Can manage services, appointments, and update patients records.

- ## Service Management:
  - Add, view and delete services.
  - View service details.

- ## Appointment management:
  - Schedule, view and cancel appointments.

- ## Patient Management:
  - Register, view, update details and delete patients.
  - View patient details.

- ## Medical records(Patient Profile):
  - View, store and update patients medical records.
  - Accessible to authorized healthcare providers and patients.

- ## Admin panel:
  - Admin dashboard for managing patient accounts, appointments and services.

## Launching
## ENDPOINTS:
1. ## User Authentication and Authorization Endpoints
Purpose: Handles user registration, login and logout.
 - POST /api.add_resource(PatientResource, '/patients', '/patient'): /patient 

  - Description: Registers a new patient in the system.
  - Request Body: { username,first_name,last_name, date_of_birth, contact_number, email,password }
  - Response: { success: true, message: "User registered        successfully" }

- POST /api.add_resource(Login, '/login'): /login

  - Description: Logs in a user or an admin and generates a JWT token for   authentication.
  - Request Body: { username, password }
  - Response: { success: true, token: "your_jwt_token_here" }

- POST /api.add_resource(Logout, '/logout'): /logout

  - Description: Logs out the patient by invalidating the current JWT token.
  - Authorization: Bearer token in headers.
  - Response: { success: true, message: "Logged out successfully" }

2. ##  Appointment Management Endpoints
Purpose: Handles CRUD operations related to appointments.

- POST /api.add_resource(AppointmentResource, '/appointments',): /appointments

  - Description: Creates a new appointment.
  - Authorization: Bearer token in headers.
  - Request Body: { patientId, doctorId, appointmentDate, reason}
  - Response: { success: true, message: "Appointment created successfully" }

- GET /api.add_resource(AppointmentResource, '/appointments',): /appointments

  - Description: Retrieves all appontments with their details.
  - Authorization: Bearer token in headers.
  - Response: { success: true, appointment: { ... } }

- DELETE /api.add_resource(AppointmentByID, '/appointments/<int:appointment_id>', endpoint='appointment_by_id'): /appointments/${selectedAppointment.id}

  - Description: Cancels an appointment.
  - Authorization: Bearer token in headers.
  - Response: { success: true, message: "Appointment canceled successfully" }

3. ##  Service Management Endpoints
Purpose: Handles CRUD operations related to Services.

- POST /api.add_resource(services_data,'/services_data', endpoint='services_data'): /services_data

  - Description: Creates a new service.
  - Authorization: Bearer token in headers.
  - Request Body: { name, description, price}
  - Response: { success: true, message: "Service created successfully" }

- GET /api.add_resource(services_data,'/services_data', endpoint='services_data')

  - Description: Retrieves all services with their details.
  - Authorization: Bearer token in headers.
  - Response: { success: true, servces: { ... } }

- DELETE /api.add_resource(ServiceByID, '/service_data/<int:service_id>'): /service_data/${id}

  - Description: Deletes a service.
  - Authorization: Bearer token in headers.
  - Response: { success: true, message: "Service deleted successfully" }

4. ##  Patient Management Endpoints
Purpose: Handles CRUD operations related to Services.

- POST /api.add_resource(PatientResource, '/patients', '/patient'): /patients

  - Description: Creates a new patient in the system.
  - Authorization: Bearer token in headers.
  - Request Body: { username,first_name,last_name, date_of_birth, contact_number, email,password}
  - Response: { success: true, message: "patient created successfully" }

- GET /api.add_resource(PatientResource, '/patients', '/patient'): /patients

  - Description: Retrieves all patients with their details.
  - Authorization: Bearer token in headers.
  - Response: { success: true, patients: { ... } }

 PATCH /api.add_resource(PatientByID, '/patient/<int:patient_id>', endpoint='patient_by_id'): /patient/${id}

  - Description: Updates patient details.
  - Authorization: Bearer token in headers.
  - Response: { success: true, message: "Patient updated successfully" }  

- DELETE /api.add_resource(PatientByID, '/patient/<int:patient_id>', endpoint='patient_by_id'): /patient/${id}

  - Description: Deletes a patient.
  - Authorization: Bearer token in headers.
  - Response: { success: true, message: "Patient deleted successfully" }

  ## Additional Considerations
    - Error Handling: Implement robust error handling for each endpoint to provide meaningful error messages and status codes.
    - Validation (login page): Validate incoming data to ensure it meets expected formats and criteria.



## Prerequisites:
- React
- Python 3.8.13
- Flask sqlalchemy
- An active database  and client side connection.

## Installations:
- ## Backend:
  - Ensure atleast python 3.8.13 is installed in your system.
  - Install required packages using pip:
        pip install flask-sqlalchemy, sqlalchemy_serializer, flask_bcrypt, flask_jwt_extended, faker and any other incase the app requires.

- ## Frontend:
  - Ensure Reactjs is installed in your system.

## To run Careconnect locally, follow these steps:
1. ## Clone the repository:
      git clone https://github.com/Maurine6/careconnect.git
      cd careconnect
2. ## Client side
  -  To download the dependencies for the frontend client, run:
           npm install --prefix client;
  - You can run your React app on localhost:3000 by running: 
            npm start --prefix client

  - Check that your the React client displays a default page http://localhost:3000. You should see a web page with the heading "Welcome to CareConnect".   

3. ## Open another terminal: Run Server side.
  - Install dependencies:
      pipenv install

  - Set up environment:    
      pipenv shell

4. ## Run the application:
      cd server
      python seed.py
      python app.py

5. ## Access the application:
- Open your web browser and go to 'http://localhost: 3000' to use Careconnect.
## Usage
- ## Patient Workflow:
  1. Register or login.
  2. Schedule appointment with the doctor.
  3. View personal  medical records(patient profile).

- ## Admin Wokflow: 
  1. Login.
  2. Manage appointments by either keeping or cancelling schedules.
  3. Manage services by either adding, viewing, or deleting a service.
  4. Manage patients by viewing, updating patient details and deleting a patient.

## Development Notes:
- ~ client~: Contains  the frontend code built with React.js.
- ~ server~: Contains the backend code built with flask sqlalchemy(python)
- ~ models~: Defines Flask app db schemas using sqlalchemy.
- ~ routes~: Defines API routes for authentication
- ~config~: Configuration files including database connection setup and JWT configuration.

## Security Considerations:

  - Use of JWT for secure authentication and authorization.
  - Input validation and sanitization to prevent security vulnerabilities.


## MVPs

### MVP 1: Service Management

As a user (with credentials):
- I should be able to get a list of all services offered by the hospital.
- I should be able to delete a hospital service if it is no longer offered.
- I should be able to add services offered by the hospital.

#### Service List
![Service List](server/Readme/servicesList.png)

#### Add Services
![Add Services](server/Readme/serviceList.png)

### MVP 2: Patient Management

Admin should be able to:
- See all patients.
- Update patient details.
- Delete a patient.
- Add a patient with all their details.

#### Patient Management Section
![Patient Management](server/Readme/patientData.png)

### MVP 3: Appointment Management

As a user (with credentials):
- I should be able to create an appointment.
- I should be able to delete an appointment.
- I should be able to view appointments.

#### Managing Appointments
![Managing Appointments](server/Readme/Appointment.png)

### MVP 4: Patient Login

- Login page for patients using credentials provided in their hospital account.

#### Logging In
![Logging In](server/Readme/login.png)

### Stretch MVPs

#### MVP 5: Staff Management

- Based on accrued appointments, hospital staff (e.g., doctors) will be able to know what patients to expect and plan accordingly.

#### MVP 6: Billing Services

As a user:
- I should be able to view a list of all services I have received and my current bill.

## Technologies Used

### Backend
- **Language**: Python, JavaScript (Node.js)
- **Framework**: Flask
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens) or OAuth

### Frontend
- **Language**: JavaScript
- **Framework**: React
- **Routing**: React Router

### Development Tools
- **Version Control**: Git and GitHub
- **Package Management**: npm
- **Build Tools**: Create React App

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributors

- [Maurine6](https://github.com/Maurine6)
- [SC-Kenduiwa](https://github.com/SC-Kenduiwa)
- [macharra](https://github.com/macharra)
- [0097eo](https://github.com/0097eo)
- [Ephy](https://github.com/Ephymuiruri)
