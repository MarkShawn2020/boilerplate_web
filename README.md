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
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## 🛠️ Development Setup

### Supabase Configuration

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Configure environment variables:
   ```bash
   # API Package (.env)
   PORT=3001
   SUPABASE_URL=your-project-url
   SUPABASE_SERVICE_KEY=your-service-role-key

   # Web Package (.env)
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Install Supabase CLI:
   ```bash
   brew install supabase/tap/supabase
   ```

4. Link to your Supabase project:
   ```bash
   # Get your access token from: https://supabase.com/dashboard/account/tokens
   export SUPABASE_ACCESS_TOKEN=your-access-token
   
   # Link to your project
   supabase link --project-ref your-project-ref
   
   # Push database migrations
   supabase db push
   ```

### Database Schema

The project uses the following tables:

- **keys**: Stores environment variables and API keys
  - `id`: UUID (Primary Key)
  - `name`: Text (Required)
  - `value`: Text (Required)
  - `description`: Text
  - `tags`: Text Array
  - `revoked`: Boolean
  - `user_id`: UUID (Foreign Key to auth.users)
  - `created_at`, `updated_at`: Timestamps

- **solutions**: Groups of related keys
  - `id`: UUID (Primary Key)
  - `name`: Text (Required)
  - `description`: Text
  - `user_id`: UUID (Foreign Key to auth.users)
  - `created_at`, `updated_at`: Timestamps

- **solution_keys**: Many-to-many relationship between solutions and keys
  - `solution_id`: UUID (Foreign Key to solutions)
  - `key_id`: UUID (Foreign Key to keys)

### Security Features

- Row Level Security (RLS) policies ensure users can only access their own data
- Automatic timestamps for auditing
- Service role key for admin operations
- Anonymous key for public operations

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
