# 🍳 CookBook – REST API

A RESTful backend developed with **Node.js**, **Express**, and **MongoDB** for managing recipes, categories, users, comments, external favorites, image uploads, and AI-generated recipe ideas.

This API was developed as part of an academic **Full Stack project** and provides the backend services consumed by the CookBook React Single Page Application.

---

## 📌 Description

CookBook API provides authentication, authorization, data persistence, file management, external service integrations, and business rules for a digital recipe platform.

The system supports two user roles:

- **Chef:** can create, edit, and delete recipes and categories, upload images, and change plans.
- **Reader:** can explore recipes, comment, manage external favorites, and generate recipe suggestions with AI.

The API uses a layered structure based on routes, controllers, services, models, validators, middlewares, and reusable utilities.

---

## 🚀 Main Features

### 🔐 Authentication and Authorization

- User registration with encrypted passwords
- Login using email and password
- Google Identity authentication
- JWT generation and verification
- Bearer token authorization
- Role-based access control
- Persistent local and Google user accounts
- Protected API routes

### 👤 User Management

- Chef and Reader roles
- Plus and Premium plans
- Upgrade from Plus to Premium for Chef users
- User profile image updates
- Replacement of previous Cloudinary images
- Local and Google authentication providers

### 📖 Recipe Management

- Create recipes
- Retrieve published recipes
- Retrieve recipes created by the authenticated user
- Retrieve recipe details by ID
- Edit recipes
- Delete recipes
- Upload recipe images
- Draft and published recipe states
- Search and filter support
- Category and author references
- Ingredients, preparation steps, difficulty, portions, and preparation time

### 🏷️ Category Management

- Create categories
- Retrieve all categories
- Retrieve category details
- Edit categories
- Delete categories
- Chef-only category administration

### 💬 Recipe Comments

- Retrieve comments from a recipe
- Add comments
- Edit the authenticated user's comment
- Delete comments
- Return commenter name and profile image

### ❤️ External Favorites

- Save recipes imported from TheMealDB
- Retrieve saved favorites
- Check whether an external recipe is already saved
- Remove external favorites

### 🌍 TheMealDB Integration

- Search external recipes by name
- Search recipes by ingredient
- Retrieve random recipes
- Retrieve external recipe details
- Retrieve external recipe categories

### ✨ AI Recipe Generation

- Generate structured recipe suggestions from a prompt
- Integration with OpenRouter
- Configurable AI model and endpoint
- JSON-based recipe output
- Request timeout and error handling

### 🖼️ Image Management

- Multipart image uploads using Multer
- In-memory file processing
- Cloudinary integration
- Recipe image uploads
- User profile image uploads
- Generic upload endpoint

### 🛡️ Validation and Error Handling

- Joi request validation
- MongoDB ObjectId validation
- Centralized error middleware
- Custom 404 middleware
- Conditional rate limiting
- Consistent HTTP status handling

---

## 🛠️ Technologies Used

### Backend

- Node.js
- Express 5
- JavaScript ES Modules
- MongoDB
- Mongoose

### Authentication and Security

- JSON Web Tokens
- bcryptjs
- Google Auth Library
- Express Rate Limit
- CORS

### Validation and File Management

- Joi
- Multer
- Cloudinary

### External Integrations

- Axios
- TheMealDB
- OpenRouter
- Google Identity Services

### Development

- Nodemon
- dotenv

---

## 🧱 Architecture

The project follows a layered backend structure:

- **Routes:** define the available HTTP endpoints.
- **Controllers:** receive requests and build HTTP responses.
- **Services:** contain business logic and external integrations.
- **Models:** define MongoDB collections using Mongoose schemas.
- **Validators:** validate request data using Joi.
- **Middlewares:** handle authentication, authorization, uploads, validation, errors, and ObjectIds.
- **Utils:** provide reusable JWT, error, upload, and response helpers.
- **Config:** contains database and external service configuration.

---

## 📁 Project Structure

```text
API-Obl_FS_mar26/
├── v1/
│   ├── config/
│   │   ├── cloudinary.config.js
│   │   └── db.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   │   ├── categoria.model.js
│   │   ├── comentario.model.js
│   │   ├── favorito.model.js
│   │   ├── receta.model.js
│   │   └── usuario.model.js
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── index.js
├── app.js
├── server.js
├── package.json
└── README.md
```

---

## 🔗 API Base URL

The versioned API is available under:

```text
http://localhost:<PORT>/v1
```

The root endpoint returns a basic API welcome message:

```http
GET /
```

---

## 🔐 Authentication

With the exception of the authentication endpoints, all `/v1` routes require a JWT.

Send the token using the `Authorization` header:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Public authentication endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/v1/auth/register` | Register a local user |
| `POST` | `/v1/auth/login` | Log in with email and password |
| `POST` | `/v1/auth/google` | Log in or register using a Google ID token |

---

## 🧭 Endpoint Overview

### Users

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `PATCH` | `/v1/usuarios/foto` | Authenticated | Update the user's profile image |
| `PATCH` | `/v1/usuarios/plan` | Chef | Upgrade from Plus to Premium |

### Recipes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/v1/recetas` | Authenticated | Retrieve recipes |
| `GET` | `/v1/recetas/mis-recetas` | Authenticated | Retrieve the current user's recipes |
| `GET` | `/v1/recetas/:id` | Authenticated | Retrieve one recipe |
| `POST` | `/v1/recetas` | Chef | Create a recipe |
| `PUT` | `/v1/recetas/:id` | Chef | Update a recipe |
| `DELETE` | `/v1/recetas/:id` | Chef | Delete a recipe |

Recipe creation and update support `multipart/form-data` with an optional `imagen` file.

### Comments

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/v1/recetas/:recetaId/comentarios` | Authenticated | Retrieve recipe comments |
| `POST` | `/v1/recetas/:recetaId/comentarios` | Authenticated | Create a comment |
| `PUT` | `/v1/recetas/:recetaId/comentarios/mio` | Authenticated | Edit the current user's comment |
| `DELETE` | `/v1/recetas/:recetaId/comentarios/:id` | Authenticated | Delete a comment |

### Categories

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/v1/categorias` | Authenticated | Retrieve categories |
| `GET` | `/v1/categorias/:id` | Authenticated | Retrieve one category |
| `POST` | `/v1/categorias` | Chef | Create a category |
| `PUT` | `/v1/categorias/:id` | Chef | Update a category |
| `DELETE` | `/v1/categorias/:id` | Chef | Delete a category |

### External Recipes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/v1/recetas-externas/buscar?q=<name>` | Search recipes by name |
| `GET` | `/v1/recetas-externas/ingrediente?ingrediente=<ingredient>` | Search recipes by ingredient |
| `GET` | `/v1/recetas-externas/aleatoria` | Retrieve a random recipe |
| `GET` | `/v1/recetas-externas/categorias` | Retrieve external categories |
| `GET` | `/v1/recetas-externas/:id` | Retrieve external recipe details |

### Favorites

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/v1/favoritos` | Retrieve the user's favorites |
| `GET` | `/v1/favoritos/:mealDbId` | Check whether a recipe is a favorite |
| `POST` | `/v1/favoritos/:mealDbId` | Add an external recipe to favorites |
| `DELETE` | `/v1/favoritos/:mealDbId` | Remove an external favorite |

### Uploads and AI

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/v1/uploads` | Upload an image using the `imagen` field |
| `POST` | `/v1/ia/generar` | Generate a recipe suggestion using AI |

> External recipe, favorite, upload, and AI endpoints are also protected by JWT authentication.

---

## 📋 Prerequisites

Before running the API, make sure you have:

- Node.js installed
- npm installed
- A MongoDB database or MongoDB Atlas cluster
- A Cloudinary account
- A Google OAuth Client ID
- An OpenRouter API key

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development

MONGO_URI_DEV=mongodb://localhost:27017/cookbook
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/cookbook

JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10

GOOGLE_CLIENT_ID=your_google_client_id

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

THEMEALDB_BASE_URL=https://www.themealdb.com/api/json/v1/1

OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_URL=https://openrouter.ai/api/v1/chat/completions
OPENROUTER_MODEL=openrouter/free

ENABLE_RATE_LIMIT=false
```

### MongoDB environment behavior

- When `NODE_ENV=development`, the API uses `MONGO_URI_DEV`.
- In any other environment, the API uses `MONGO_URI`.

### Optional variables

- `OPENROUTER_URL` defaults to the official OpenRouter chat completions endpoint.
- `OPENROUTER_MODEL` defaults to `openrouter/free`.
- Rate limiting is only enabled when `ENABLE_RATE_LIMIT=true`.

When enabled, the global limiter allows up to **30 requests per minute per IP**.

> The backend `GOOGLE_CLIENT_ID` must correspond to the Google Client ID configured in the frontend.

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/codewitheduardo/API-Obl_FS_mar26.git
cd API-Obl_FS_mar26
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the environment

Create the `.env` file and add the required variables described above.

### 4. Start the API in development mode

```bash
npm run dev
```

The server will restart automatically when source files change.

### 5. Start the API normally

```bash
npm start
```

---

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the server using Nodemon |
| `npm start` | Start the server using Node.js |

---

## 🗃️ Main Data Models

### User

- Name and unique email
- Encrypted password for local accounts
- Role: `chef` or `lector`
- Plan: `plus` or `premium`
- Provider: `local` or `google`
- Profile image and Cloudinary public ID

### Recipe

- Title and description
- Ingredients and preparation steps
- Preparation time and portions
- Difficulty: `facil`, `media`, or `dificil`
- Status: `borrador` or `publicada`
- Image URL
- Category reference
- Author reference

Other collections store categories, comments, and TheMealDB favorites.

---

## 🔗 Related Frontend Repository

This API is consumed by the following React SPA:

[SPA-Obl_FS_mar26](https://github.com/codewitheduardo/SPA-Obl_FS_mar26)

Both projects must use compatible environment variables and URLs for the complete platform to work.

---

## 🚧 Project Status

🟢 **Completed and functional**

The main requirements of the Full Stack academic assignment have been implemented, including authentication, authorization, CRUD operations, MongoDB persistence, validation, image uploads, comments, external API integration, favorites, AI generation, and centralized error handling.

The project can continue to be expanded with automated tests, API documentation using OpenAPI or Swagger, refresh tokens, and more advanced deployment configuration.

---

## ✍️ Author

**Eduardo Monzón**  
GitHub: [codewitheduardo](https://github.com/codewitheduardo)
