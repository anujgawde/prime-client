# Prime Reports

## Overview

Prime is a platform for document creation and management, organizational collaboration, and personalized usage analytics. The application offers features like Firebase authentication, document management, dashboards, and organizational role-based access control.

## Table of Contents

-   How it looks

-   Features
        
    -   Document Management
        
    -   Organization Management
        
    -   Profile Management

	-	Dashboard
        
-   Technology Stack
    
-   Getting Started
    
    -   Prerequisites
        
    -   Installation
        
-   Future Enhancements

## How it looks

### My Dashboard
![Screenshot 2025-01-04 at 1 28 44 AM](https://github.com/user-attachments/assets/368a3b85-4356-413a-9cae-d763b9401177)

### My Organization
![Screenshot 2025-01-04 at 1 28 58 AM](https://github.com/user-attachments/assets/f4caa192-3cae-44ff-8d27-d74428135000)

### My Reports
![Screenshot 2025-01-04 at 1 29 15 AM](https://github.com/user-attachments/assets/718deddb-5d7a-4f1b-b647-6796e72e49f2)

### My Templates
![Screenshot 2025-01-04 at 1 29 25 AM](https://github.com/user-attachments/assets/d2c14472-c0b8-4073-9e27-a8f90e2ba161)

### Document Editor
![Screenshot 2025-01-04 at 1 29 55 AM](https://github.com/user-attachments/assets/0b60ecfc-5b6a-4540-af79-384ea72840c0)



## Features
    
### Document Management

#### Templates for Reports

-   Create/Edit/Delete templates for standardized report generation.
    
-   Add fields, placeholders, and predefined styles.
    

#### Reports

-   Create/Edit/Delete reports based on templates.
    
-   Customize with additional data, images, tables or notes.
        
### Organization Management

#### Organization Creation

-   Create organizations and manage members.
    

#### Employee Management

-   Assign roles to employees:
    
    -   **Super-Admin**: Full access.
        
    -   **Admin**: Manage templates, reports, and employees.
        
    -   **Member**: Restricted to assigned reports and templates.
        
-   Invite employees via email and manage roles.
    

#### Organization Page

-   Centralized hub displaying:
    
    -   All reports and templates.
        
    -   Employee directory with roles and permissions.
        

### Profile Management

-   Update personal details.
    
### Dashboard

-   Displays personal usage metrics:
    
    -   Number of templates and reports.
        
    -   Recent activity.
        
    -   Usage trends with graphical representation.

## Technology Stack

-   **Frontend**: React
    
-   **Deployment**: Vercel
    
-   **Styling**: Tailwind CSS
    

## Getting Started

### Prerequisites

-   React installed in your system.
-   Firebase account (For authentication)

### Installation
Note: Make sure to set up [prime-server](https://github.com/anujgawde/prime-server) prior to running this project.
1.  Clone the repository:
    
    ```
    git clone https://github.com/anujgawde/prime-client.git
    ```
    
2.  Navigate to the project directory:
    
    ```
    cd prime-client
    ```
    
3.  Install dependencies:
    
    ```
    npm install
    ```
    
4.  Add Firebase credentials to the `.env` file:
    
    ```
    # Firebase Environment Variables:
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
	REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
	REACT_APP_FIREBASE_APP_ID=your-app-id
	
	Environment Variable to connect to server (Clone this project to access server: https://github.com/anujgawde/prime-server)
	REACT_APP_BASE_URL=http://localhost:8080 or Hosted URL
    ```
    
5.  Start the application:
    ```
    npm start
    ```

## Future Enhancements

-   Personal and Organizational task manager.
-   Optimum search for templates, reports and users.
-   Collaborative document contributions.
-   Document history tracking.  

## Contribution

1.  Fork the repository.
    
2.  Create a new branch for your feature:
    
    ```
    git checkout -b feature-name
    ```
    
3.  Commit your changes:
    
    ```
    git commit -m "Add feature description"
    ```
    
4.  Push to the branch:
    
    ```
    git push origin feature-name
    ```
    
5.  Open a pull request.

## Stay in touch

- Author - [Anuj Gawde](https://x.com/axgdevv)
    
