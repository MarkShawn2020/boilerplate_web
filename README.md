# EnvBox - Environment Variable Manager

A secure and user-friendly environment variable management solution that combines a web interface with CLI capabilities for seamless secret management.

## 🎯 Project Goals

- Provide a centralized platform for managing environment variables and API keys
- Offer both web UI and CLI interfaces for maximum flexibility
- Ensure secure storage and transmission of sensitive data
- Support team collaboration with proper access control

## ✨ Key Features

### Web Interface
- 🔐 Secure key management with support for:
  - Description and metadata
  - Revocation capabilities
  - Unique ID tracking
  - Version history
- 🎨 Solution builder for combining multiple keys
- 👥 User authentication and authorization
- 📝 Detailed audit logging

### CLI Tool
- 🔑 Secure authentication
- ⚡ Quick .env file generation
- 📦 Solution-based environment setup
- 🔄 Auto-sync with web platform

## 🏗️ Technical Architecture

- **Frontend**: Modern web application (React/Next.js)
- **Backend**: RESTful API server
- **CLI**: Native command-line tool
- **Database**: Secure storage for credentials
- **Authentication**: JWT-based auth system

## 🚀 Getting Started

### Prerequisites
```bash
# Installation instructions will be added
```

### Installation
```bash
# Installation steps will be added
```

## 📖 Usage

### Web Interface
1. Login to the web platform
2. Create and manage your API keys
3. Create solutions (key combinations)
4. Manage access and permissions

### CLI
```bash
# Login to your account
envbox login

# List available solutions
envbox list

# Generate .env file from a solution
envbox pull <solution-name>

# Update existing .env file
envbox sync
```

## 🔒 Security

- All sensitive data is encrypted at rest
- Secure transmission using TLS
- Regular security audits
- Access control and permission management

## 🤝 Contributing

Guidelines for contributing will be added soon.

## 📄 License

MIT License - see LICENSE file for details
