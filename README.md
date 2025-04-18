# TerraChain: AI x Blockchain-powered Land Record System

TerraChain is a comprehensive platform that combines AI intelligence with blockchain security for transparent, tamper-proof land record management in India.

## 🚀 Features

- **Secure Authentication**: Login via DigiLocker or Meri Pehchaan with secure session storage
- **Dashboard**: Central hub with cards linking to main tools and user activity tracking
- **Land Record Checker**: Search by Owner Name / Land ID / District
- **Upload & Analyze**: Upload documents and run ML detection for anomalies
- **Browse Verified Lands**: Filter by location and verification status
- **TerraBot AI Assistant**: Chatbot supporting English & Hindi queries
- **Tools & Mini-Apps**: Specialized utilities for land management

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript + TailwindCSS
- **Backend**: Supabase (TerraDB)
- **Authentication**: DigiLocker and Meri Pehchaan integration
- **Blockchain**: Ethereum smart contracts
- **AI**: LLM-based Chatbot with Indian land law knowledge base
- **Maps**: MapmyIndia (Mappls) integration

## 📋 Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- DigiLocker Partner API access (for production)
- Meri Pehchaan API access (for production)
- Mappls API key

### Installation

1. Clone the repository:
  \`\`\`bash
  git clone https://github.com/ayushmorbar/terrachain.git
  cd terrachain
  \`\`\`

2. Install dependencies:
  \`\`\`bash
  npm install
  \`\`\`

3. Set up environment variables:
  Create a `.env.local` file with the following variables:
  \`\`\`
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
  MAPPLS_API_KEY=your_mappls_api_key
  GOOGLE_MAPS_API_KEY=your_google_maps_api_key
  OPENROUTER_API_KEY=your_openrouter_api_key
  DIGILOCKER_CLIENT_ID=your_digilocker_client_id
  DIGILOCKER_CLIENT_SECRET=your_digilocker_client_secret
  DIGILOCKER_REDIRECT_URI=your_digilocker_redirect_uri
  MERI_PEHCHAAN_CLIENT_ID=your_meri_pehchaan_client_id
  MERI_PEHCHAAN_CLIENT_SECRET=your_meri_pehchaan_client_secret
  MERI_PEHCHAAN_REDIRECT_URI=your_meri_pehchaan_redirect_uri
  \`\`\`

4. Run the development server:
  \`\`\`bash
  npm run dev
  \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

\`\`\`
terrachain/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   ├── browse/           # Browse land records
│   ├── upload-document/  # Upload new records
│   ├── terrabot/         # AI assistant
│   ├── tools/            # Tools & mini-apps
│   ├── insights/         # Data insights
│   └── coming-soon/      # Future features
├── components/           # React components
│   ├── ui/               # UI components
│   ├── auth/             # Authentication components
│   ├── maps/             # Map components
│   ├── home/             # Home page components
│   ├── land-records/     # Land record components
│   └── terrabot/         # TerraBot components
├── contexts/             # React contexts
├── lib/                  # Utility functions
├── services/             # API services
├── contracts/            # Smart contracts
└── public/               # Static assets
\`\`\`

## 🔄 Blockchain Integration

TerraChain uses Ethereum smart contracts to store land record metadata and document hashes. The actual documents are stored on IPFS for decentralized storage.

### Smart Contract

The `TerraChain.sol` contract provides the following functionality:

- Add new land records
- Update existing records
- Transfer ownership
- Verify records
- Query record history

## 🤖 AI Features

TerraChain incorporates several AI-powered features:

- **Document Analysis**: Detect anomalies and inconsistencies in land documents
- **TerraBot Assistant**: Answer questions about Indian land laws and regulations
- **Coming Soon**: Price prediction, voice-to-text, and smart dispute detection

## 🔜 Roadmap

- **Q1 2026**: AI Price Predictor
- **Q2 2026**: Voice-to-Text Uploader, ULPIN Deep Search
- **Q3 2026**: Aadhaar-Linked e-KYC, Smart Land Dispute Detection
- **Q4 2026**: Community Verification Voting, Interactive GIS Mapping

## 👥 Team

- **Ayush Morbar** – Founder & CEO, leading AI & Blockchain vision
- **Gaurav Soni** – Head of Chains and Block, Offbeats
- **Anonymous** – Head of Product - TerraChain, Offbeats

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Built with chains and blocks by Offbeats!
- Special thanks to the open-source community for their invaluable contributions.
