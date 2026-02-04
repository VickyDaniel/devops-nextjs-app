# DevOps Demo - Next.js Application

A REST API demo application built with Next.js for DevOps student lab exercises.

## Lab Programs Covered

| Program | Topic |
|---------|-------|
| 1 | Version Control with Git and GitHub |
| 2 | Building a REST API with Next.js |
| 3 | Building the Web UI & Connecting to REST API |
| 4 | Deploying the Web Application in Docker |
| 5 | Jenkins Setup & CI/CD Pipeline |
| 6 | Writing and Running Unit Tests in a CI/CD Pipeline |
| 7 | Working with Ansible, Terraform and Selenium |
| 8 | Monitoring and Logging with Prometheus & Grafana |
| 9 | Deploying Applications to Kubernetes |

## Getting Started

### Prerequisites

- Bun 1.0+ (or Node.js 18+)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd demo-ct

# Install dependencies
bun install

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## API Documentation

### Swagger UI

Interactive API documentation available at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### API Endpoints

#### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check endpoint (for Docker, K8s, Prometheus) |

#### Users API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a new user |
| GET | `/api/users/{id}` | Get user by ID |
| PUT | `/api/users/{id}` | Update user by ID |
| DELETE | `/api/users/{id}` | Delete user by ID |

#### Products API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a new product |
| GET | `/api/products/{id}` | Get product by ID |
| PUT | `/api/products/{id}` | Update product by ID |
| DELETE | `/api/products/{id}` | Delete product by ID |

### Example API Requests

```bash
# Health Check
curl http://localhost:3000/api/health

# Get all users
curl http://localhost:3000/api/users

# Create a new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "role": "developer"}'

# Get user by ID
curl http://localhost:3000/api/users/1

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated", "role": "admin"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/1

# Get all products
curl http://localhost:3000/api/products

# Create a new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Monitor", "price": 299.99, "stock": 100}'
```

## Project Structure

```
demo-ct/
├── data/                    # JSON data files (local storage)
│   ├── users.json
│   └── products.json
├── public/
│   └── openapi.json         # OpenAPI 3.0 specification
├── src/
│   └── app/
│       ├── api/             # API routes
│       │   ├── health/
│       │   ├── users/
│       │   └── products/
│       ├── api-docs/        # Swagger UI page
│       ├── layout.tsx
│       └── page.tsx
├── package.json
└── README.md
```

## Docker (Program 4)

```dockerfile
# Example Dockerfile
FROM oven/bun:1-alpine
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
EXPOSE 3000
CMD ["bun", "start"]
```

```bash
# Build and run
docker build -t devops-demo .
docker run -p 3000:3000 devops-demo
```

## Available Scripts

```bash
bun dev      # Start development server
bun run build    # Build for production
bun start    # Start production server
bun run lint     # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Docs**: OpenAPI 3.0 + Swagger UI
- **Data Storage**: Local JSON files

## License

This project is for educational purposes.
