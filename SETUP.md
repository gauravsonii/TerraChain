# TerraChain - Detailed Setup Guide

This comprehensive guide will help you set up and run the TerraChain project locally on your machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or yarn (v1.22.0 or higher)
- Git
- VS Code (recommended)
- A Supabase account
- A Mappls account (for map integration)
- An OpenRouter account (for AI features)

## Step 1: Clone the Repository

\`\`\`bash
git clone https://github.com/ayushmorbar/terrachain.git
cd terrachain
\`\`\`

## Step 2: Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

## Step 3: Set Up Environment Variables

1. Copy the `.env.local.example` file to `.env.local`:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

2. Open the `.env.local` file in your editor and fill in the values for each environment variable:

### Supabase Configuration
1. Go to the [Supabase Dashboard](https://app.supabase.io/)
2. Create a new project
3. Go to Project Settings > API
4. Copy the URL and anon key to your `.env.local` file

### Mappls Configuration
1. Sign up for a [Mappls account](https://www.mappls.com/)
2. Create an API key from the developer dashboard
3. Copy the API key to your `.env.local` file as `MAPPLS_API_KEY`

### Google Maps Configuration
1. Sign up for a [Google Cloud Platform account](https://cloud.google.com/)
2. Create a project and enable the Maps JavaScript API
3. Create an API key with appropriate restrictions
4. Add the key to your `.env.local` file as `GOOGLE_MAPS_API_KEY`

### OpenRouter Configuration
1. Sign up for an [OpenRouter account](https://openrouter.ai/)
2. Create an API key
3. Add the key to your `.env.local` file

### DigiLocker Configuration (for production)
1. Register as a DigiLocker partner
2. Get your client ID and set up your redirect URI
3. Add these to your `.env.local` file

### Meri Pehchaan Configuration (for production)
1. Register as a Meri Pehchaan partner
2. Get your client ID and set up your redirect URI
3. Add these to your `.env.local` file

## Step 4: Set Up Supabase Database

1. Create the necessary tables in your Supabase project:

\`\`\`sql
-- Land Records Table
CREATE TABLE land_records (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 owner TEXT NOT NULL,
 location TEXT NOT NULL,
 area NUMERIC NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending',
 district TEXT NOT NULL,
 state TEXT NOT NULL,
 survey_number TEXT,
 ulpin TEXT,
 user_id TEXT,
 document_hash TEXT,
 transaction_hash TEXT,
 last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users Table
CREATE TABLE users (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 auth_id TEXT UNIQUE,
 auth_provider TEXT NOT NULL,
 name TEXT NOT NULL,
 email TEXT,
 phone TEXT,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents Table
CREATE TABLE documents (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 user_id UUID REFERENCES users(id),
 land_record_id UUID REFERENCES land_records(id),
 document_type TEXT NOT NULL,
 file_name TEXT NOT NULL,
 file_size INTEGER NOT NULL,
 file_url TEXT NOT NULL,
 hash TEXT,
 status TEXT NOT NULL DEFAULT 'pending',
 verification_result JSONB,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some sample data
INSERT INTO land_records (owner, location, area, status, district, state, survey_number)
VALUES 
 ('Rajesh Kumar', 'North District, Plot 123', 5.2, 'verified', 'North District', 'Delhi', '123/A'),
 ('Priya Singh', 'South District, Plot 456', 3.7, 'pending', 'South District', 'Karnataka', '456/B'),
 ('Amit Patel', 'East District, Plot 789', 2.1, 'verified', 'East District', 'Gujarat', '789/C'),
 ('Sunita Sharma', 'West District, Plot 101', 4.5, 'disputed', 'West District', 'Maharashtra', '101/D'),
 ('Vikram Malhotra', 'Central District, Plot 202', 6.3, 'verified', 'Central District', 'Uttar Pradesh', '202/E');
\`\`\`

## Step 5: Set Up VS Code

1. Install the following VS Code extensions for a better development experience:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

2. Configure VS Code settings:
- Open VS Code settings (File > Preferences > Settings or Ctrl+,)
- Enable "Format on Save"
- Set Default Formatter to Prettier

3. Open the project in VS Code:
\`\`\`bash
code .
\`\`\`

## Step 6: Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

## Step 7: Access the Application

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Step 8: Building for Production

When you're ready to deploy your application:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

This will create an optimized production build in the `.next` folder.

## Step 9: Deploying to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).

1. Push your code to a GitHub repository
2. Import your project into Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
\`\`\`

## Troubleshooting

If you encounter any issues during setup, please check the following:

1. Make sure all environment variables are correctly set in `.env.local`
2. Ensure Supabase tables are properly created
3. Check that your API keys are valid and have the necessary permissions
4. Verify that you're using the correct Node.js version

For more detailed information, please refer to the documentation in the `/docs` directory or open an issue on GitHub.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [DigiLocker API Documentation](https://apisetu.gov.in/digilocker)
- [Meri Pehchaan API Documentation](https://apisetu.gov.in/meri-pehchaan)
- [Mappls API Documentation](https://www.mappls.com/api/)
