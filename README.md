# Scanwize Interview

## Overview

NodeJS + Express + Postgres Application that provides CRUD API functionality for a User.

## Installation

### Prerequisites

- Node.js installed (version 18)
- Docker/orbStack installed

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GrishonNganga/Scanwize scanwize
   cd scanwize
   
2. **Create a .env file in the project root:**
   ```bash
    POSTGRES_USER: scanwize_user
    POSTGRES_PASSWORD: scanwize&&strong
    POSTGRES_DATABASE: scanwize_db
    POSTGRES_PORT: 5433
    APP_PORT: 3003
    
    # Test Environment Variables
    POSTGRES_TESTUSER: scanwize_test_user
    POSTGRES_TESTPASSWORD: scanwize&&strong
    POSTGRES_TESTDATABASE: scanwize_test_db
    POSTGRES_TESTPORT: 5435
    APP_TESTPORT: 3005
    
 - Make sure you replace the credentials above with you own. 

3. Make the docker start up files executable (start.sh and start.test.sh)
    ```bash
    chmod +x start.sh start.test.sh
    
4. Start up docker which will bring up the entire application including the database, deploying migrations and starting the node application.
    ```bash
    docker compose up
## Testing

### Prerequisites

-- Ensure you have gone through the Installation process successfully. 

1. **Run Tests:**

   ```bash
   docker compose -f docker-compose.test.yaml up
## Execution

### Prerequisites

-- Ensure you have gone through the Installation process successfully. 

You will have the following API's available:
| Endpoint           |    Description                     |
|--------------------|------------------------------------------|
| /auth/signup       | Sign up a new user                       |
| /auth/login        | Login with an existing user              |
| /users/user-details| Get details about the authenticated user |
| /users/all         | Get all user details                     |
| /api-docs          | Swaggger Documentation                   |

-- If you'd like to play around with the endpoints visit:
   ```bash
    http://localhost:<APP_PORT>/api-docs
