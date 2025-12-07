<div align="center">

# HealthPal

### Digital Healthcare Platform for Palestinians
<img width="789" height="316" alt="newhealtpalwhite" src="https://github.com/user-attachments/assets/77dc926c-8153-4fd7-aa43-afcdda4db8e0" />


[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)

A comprehensive digital healthcare platform providing Palestinians with access to medical support, remote consultations, medicine coordination, and donation-driven treatment sponsorships.

</div>

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Database Schema](#database-schema)
- [Development & Collaboration Tools](#development--collaboration-tools)
- [Development Team](#development-team)

---

## Project Overview

HealthPal is a specialized digital healthcare platform designed to bridge the gap between patients, doctors, donors, and medical NGOs. Our platform enables users to access remote medical consultations, coordinate medication delivery, sponsor medical treatments, and connect with verified healthcare professionals and organizations to overcome the challenges of healthcare accessibility.

The project focuses on delivering a robust, scalable, and secure backend API while implementing modern backend development practices including clean architecture, comprehensive error handling, and data security.

---

## Key Features

### For Patients
- **Remote Medical Consultations**: Book virtual appointments with qualified doctors across multiple specialties
- **Low-Bandwidth Support**: Audio-only calls and asynchronous messaging for areas with limited connectivity
- **Medical Translation**: Integrated Arabic ↔ English translation for international doctor-patient communication
- **Treatment Sponsorship**: Access crowdfunded medical treatments including surgeries, cancer care, dialysis, and rehabilitation
- **Medication Coordination**: Request critical medications with delivery matching from NGOs and volunteers
- **Health Education**: Access localized health guides, public alerts, and educational content
- **Mental Health Support**: Trauma counseling, support groups, and anonymous therapy chat services

### For Doctors
- **Professional Profile**: Showcase expertise, certifications, and specializations
- **Consultation Management**: Schedule and conduct virtual consultations with patients
- **Medical Records Access**: View patient histories and medical information securely
- **Transparent Feedback**: Provide detailed consultation notes and treatment recommendations

### For Donors
- **Treatment Sponsorship**: Fund specific medical cases with full transparency
- **Donation Dashboard**: Track where contributions are allocated with invoices and receipts
- **Patient Impact**: Receive updates on patient recovery and treatment progress
- **Verified Cases**: Access verified patient profiles with complete medical history

### For NGOs & Medical Missions
- **Organization Dashboard**: Manage medical missions, equipment registries, and volunteer coordination
- **Equipment Tracking**: Maintain inventory of oxygen tanks, wheelchairs, dialysis machines, and other medical equipment
- **Crowdsourced Resources**: Share surplus medicines and tools from hospitals and pharmacies
- **Mission Scheduling**: Coordinate surgical camps and specialist visits
- **Volunteer Management**: Register international doctors and coordinate availability

### For Administrators
- **Platform Management**: Oversee user verification, doctor credentials, and NGO partnerships
- **Quality Control**: Monitor consultations, user feedback, and safety compliance
- **Analytics & Reporting**: Generate comprehensive usage reports and platform statistics
- **Content Management**: Manage health education resources, guidelines, and public health alerts

---

## System Architecture

HealthPal follows a **RESTful API Architecture** with a layered design pattern for optimal separation of concerns and scalable communication:

**API Layer**: Node.js server handling HTTP requests and implementing RESTful endpoints for all platform features.

- **Routes**: Organize endpoints by feature (consultations, donations, medications, missions, mental health, etc.)
- **Controllers**: Handle incoming requests, validate inputs, and orchestrate business logic
- **Services**: Encapsulate business logic, database operations, and external API integrations
- **Middleware**: Authentication (JWT), error handling, request validation, and logging
- **Database Layer**: MySQL with structured schemas for users, consultations, donations, medical records, and more

---

## Technology Stack

### Backend Technologies
- **Node.js** - JavaScript runtime for server-side development
- **MySQL 3.15.3** - MySQL client for Node.js with promise support
- **JWT (jsonwebtoken 9.0.2)** - Secure token-based authentication and authorization
- **bcryptjs 3.0.3** - Password hashing and cryptographic security
- **Axios 1.13.2** - HTTP client for external API integrations
- **UUID 8.3.2** - Unique identifier generation
- **dotenv 17.2.3** - Environment variable management
- **Nodemon 3.1.10** - Development server with auto-reload capability

### Database
- **MySQL** - Relational database management system for data persistence

---

## Project Structure

```
healthpal/
├── node_modules/                # Project dependencies
├── routes/                       # API route definitions
│   ├── userRoutes.js
│   ├── bookingRoutes.js
│   ├── ngoRoutes.js
│   ├── missionRoutes.js
│   ├── healtheducationRoutes.js
│   ├── equipmentRoutes.js
│   ├── medicationRoutes.js
│   ├── publicHealthAlertRoutes.js
│   ├── collaborationRoutes.js
│   ├── supportGroupRoutes.js
│   ├── drAvailabilityRoutes.js
│   │
│   ├── medicalSponsorshipSystem/
│   │   ├── sponsorshipRoutes.js
│   │   ├── medicalRecordRoutes.js
│   │   ├── invoiceRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── patientUpdateRoutes.js
│   │   └── patientFeedbackRoutes.js
│   │
│   ├── remoteMedicalConsultations/
│   │   ├── consultaionRoutes.js
│   │   ├── bookingRequestRoutes.js
│   │   ├── sessionRoutes.js
│   │   ├── doctorConsultationRoutes.js
│   │   ├── chatConsultationRoutes.js
│   │   └── translationRoutes.js
│   │
│   └── MentalHealth&TraumaSupport/
│       ├── therapySessionRoutes.js
│       └── therapyChattingRoutes.js
│
├── services/
│   └── ngoVerifyService.js        # Business logic for NGO verification
│
├── .env                           # Environment variables (not in git)
├── .env.example                   # Example environment file
├── .gitignore                     # Git ignore rules
├── package.json                   # Project dependencies
├── server.js                      # Application entry point
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShamsAziz03/HelthPal.git
   cd HelthPal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration (see [Environment Variables](#environment-variables) section)

4. **Set up the database**
   ```bash
   # Create the database and tables
   mysql -u root -p < database/schema.sql
   
   # Seed sample data (optional)
   mysql -u root -p < database/seed.sql
   ```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=healthpal

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d


```

---

## Running the Application

### Development Mode
```bash
npm run dev
```
The server will start with hot-reload enabled via Nodemon on `http://localhost:5000`

### Production Mode
```bash
NODE_ENV=production node server.js
```

---

## API Documentation

### Base URL
```
http://localhost:5000/
```

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### API Documentation Tool
We use **Postman** for comprehensive API documentation and testing. All endpoints are documented with:
- Request/response examples
- Parameter descriptions
- Authentication requirements
- Error handling details

Import our Postman collection to test all endpoints easily.

### Core API Endpoints

#### User Management
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `POST /api/users/refresh-token` - Refresh JWT token
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

#### Remote Medical Consultations
- `POST /api/consultations` - Book a consultation
- `GET /api/consultations` - List user consultations
- `GET /api/consultations/:id` - Get consultation details
- `PUT /api/consultations/:id` - Update consultation status
- `GET /api/doctors` - List available doctors
- `GET /api/doctors/:id` - Get doctor profile
- `GET /api/doctors/availability` - Get doctor availability

#### Chat & Sessions
- `POST /api/sessions/start` - Start consultation session
- `GET /api/sessions/:id` - Get session details
- `POST /api/chat/send` - Send chat message
- `GET /api/chat/:sessionId` - Get session chat history

#### Medical Sponsorship System
- `GET /api/sponsorships/cases` - List treatment cases needing sponsorship
- `POST /api/sponsorships` - Create a sponsorship
- `GET /api/sponsorships/:id` - Get sponsorship details
- `GET /api/medical-records/:patientId` - Get patient medical records
- `POST /api/invoices` - Create invoice for sponsorship
- `GET /api/transactions` - Get transaction history

#### Medications & Equipment
- `POST /api/medications/request` - Request medication
- `GET /api/medications/requests` - List medication requests
- `POST /api/medications/fulfill` - Fulfill medication request
- `GET /api/equipment/inventory` - View available equipment
- `POST /api/equipment/register` - Register new equipment

#### NGOs & Medical Missions
- `GET /api/ngos` - List verified NGOs
- `GET /api/ngos/:id` - Get NGO details
- `GET /api/missions` - List upcoming medical missions
- `POST /api/missions` - Create a medical mission (NGO only)
- `GET /api/missions/:id` - Get mission details

#### Health Education & Public Health
- `GET /api/health-education/guides` - Get health education guides
- `GET /api/health-alerts` - Get public health alerts
- `POST /api/health-alerts` - Create public health alert (Admin only)
- `GET /api/workshops` - List upcoming workshops

#### Mental Health & Trauma Support
- `POST /api/mental-health/therapy-session` - Request therapy session
- `GET /api/mental-health/support-groups` - List support groups
- `POST /api/mental-health/support-groups/join` - Join support group
- `POST /api/mental-health/therapy-chat` - Anonymous therapy chat
- `GET /api/mental-health/resources` - Get mental health resources

### Response Format
All API responses follow a standard JSON format:

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error description",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

---

## User Roles

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| **Patient** | Seeks medical care and sponsorship | Book consultations, request medications, view health content |
| **Doctor** | Provides medical consultations | Conduct consultations, view patient records, provide feedback |
| **Donor** | Funds medical treatments | Sponsor cases, track donations, communicate with patients |
| **NGO** | Provides medical services and aid | Manage missions, coordinate medications, update inventory |
| **Admin** | Platform management | Verify users, manage content, view analytics, oversee quality |

---

## Database Schema

Key tables include:

- **users** - User accounts with roles and authentication
- **doctors** - Doctor profiles and specializations
- **patients** - Patient profiles and medical information
- **medical_records** - Patient medical history and conditions
- **consultations** - Virtual appointment records
- **sessions** - Consultation session details
- **chat_messages** - Chat communication during sessions
- **sponsorships** - Medical sponsorship records
- **donations** - Donation transactions
- **treatment_cases** - Medical cases needing sponsorship
- **medications** - Medicine requests and inventory
- **equipment** - Medical equipment registry
- **ngos** - NGO organizations and information
- **missions** - Medical mission details
- **invoices** - Sponsorship invoices
- **transactions** - Financial transaction logs
- **health_education_guides** - Educational content
- **public_health_alerts** - Public health announcements
- **therapy_sessions** - Mental health therapy sessions
- **support_groups** - Support group information

---

## Development & Collaboration Tools

### Version Control
- **Git** - Distributed version control system
- **GitHub** - Repository hosting and collaboration platform
- Workflow: Main branch for production, development branches for features, pull requests for code review

### API Testing & Documentation
- **Postman** - REST API testing, documentation, and collaboration tool
  - All endpoints documented with examples
  - Pre-configured requests for testing
  - Environment-based configuration

### Communication & Meetings
- **Zoom** - Video conferencing for team meetings, stand-ups, and discussions
- Regular sync meetings to discuss progress and blockers
- Demo sessions for feature reviews

### Project Documentation
- **Wiki** - Comprehensive project documentation including:
  - Architecture overview and design decisions
  - Setup and installation guides
  - API endpoint documentation
  - Database schema descriptions
  - Development guidelines and best practices
  - Troubleshooting guide

### Diagram & Visualization
- **draw.io** - UML and architecture diagram creation for:
  - System architecture diagrams
  - Database entity-relationship diagrams (ERD)
  - API flow diagrams
  - User journey maps
  - Component interaction diagrams

---

## Development Workflow

1. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Make your changes** and commit regularly
   ```bash
   git add .
   git commit -m "feat: description of changes"
   ```

3. **Push to your branch**
   ```bash
   git push origin feature/feature-name
   ```

4. **Create a pull request** for code review and discussion before merging to `main`

5. **Testing with Postman**: Test your API endpoints using Postman collection before submitting PR

6. **Documentation**: Update Wiki with any new features, changes, or API endpoints

---



## Error Handling & Logging

The application includes comprehensive error handling and logging:

- **Custom Error Classes** for different error types
- **Centralized Error Handler** middleware for consistent responses
- **Request Logging** for debugging and monitoring
- **Database Transaction Support** for data consistency
- **Validation Middleware** for input validation and sanitization

---

## Security Features

- **JWT Authentication** for secure token-based authentication
- **Password Hashing** using bcryptjs for secure credential storage
- **Role-Based Access Control (RBAC)** for authorization
- **Input Validation** to prevent SQL injection and XSS attacks
- **HTTPS Support** for secure data transmission
- **Data Privacy** compliance with medical data protection regulations
- **Secure Environment Variables** for sensitive configuration

---

## Project Repository

**GitHub**: https://github.com/ShamsAziz03/HelthPal

---

## Development Team

| Role | Developer | Responsibilities |
|------|-----------|-----------------|
| **Backend Developer** | Shams Aziz |  backend architecture, API design ,Node.js development, route implementation, business logic,Database management, services layer, integrations|
| **Backend Developer** | Yara Daraghmeh | backend architecture, API design ,Node.js development, route implementation, business logic,Database management, services layer, integrations |
| **Backend Developer** | Aya Sawallha | backend architecture, API design ,Node.js development, route implementation, business logic,Database management, services layer, integrations  |
| **Backend Developer** | Raheeq Qassrawi | backend architecture, API design ,Node.js development, route implementation, business logic,Database management, services layer, integrations  |

---

## License

ISC

---

## Support & Issues

If you encounter any issues or have questions, please:
1. Check the [Wiki](https://github.com/ShamsAziz03/HelthPal/wiki) for documentation
2. Create an issue on [GitHub Issues](https://github.com/ShamsAziz03/HelthPal/issues)

