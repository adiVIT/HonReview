# Honereview 🌟

Honereview is a feedback platform enabling users to provide constructive and honest reviews for products and services. Using generative AI to help craft clear, valuable feedback, alongside features like category-specific ratings and secure email verification.

## ✨ Key Features

### 1. Anonymous Reviews
- Submit anonymous feedback while maintaining authenticity
- Protected user identity for honest opinions
- Verification system to prevent abuse

### 2. AI-Enhanced Review Writing
- Generative AI assistance for constructive feedback
- Structured review templates
- Tone and content guidance

### 3. Category-Specific Ratings
- Customized rating criteria per product category
- Detailed evaluation metrics
- Comprehensive feedback system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/honereview.git

# Navigate to project directory
cd honereview

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

## 💻 Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form, Zod
- **UI Components**: Shadcn UI
- **API Client**: Axios

## 📱 Core Features

### User Dashboard
- Personal profile management
- Review history tracking
- Message acceptance settings
- Profile sharing capabilities

### Review Management
- Anonymous review submission
- AI-assisted review writing
- Category-specific rating system
- Review moderation tools

### Security Features
- Email verification
- Spam protection
- User anonymity
- Data encryption

## 🔧 Configuration

```env
# Required environment variables
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/verify` - Email verification

### Reviews
- `POST /api/reviews` - Submit review
- `GET /api/reviews` - Fetch reviews
- `DELETE /api/reviews/:id` - Delete review

