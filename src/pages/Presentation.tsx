
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    title: "HomFud",
    subtitle: "Project Presentation",
    content: [
      "A hyperlocal food delivery platform connecting home chefs with nearby customers.",
      "Taste Home. Connect Local. Earn Together.",
      "",
      "Team: [Your Team Name]",
    ],
    type: "title" as const,
  },
  {
    title: "Problem Statement",
    subtitle: "Why HomFud?",
    content: [
      "🍽️ Many talented home cooks lack a platform to sell homemade food locally",
      "🏠 Customers want affordable, hygienic, home-cooked meals — not just restaurant food",
      "📍 Existing platforms (Swiggy, Zomato) don't support hyperlocal home chefs",
      "💰 Home chefs need a low-barrier way to earn income from their cooking skills",
    ],
    type: "list" as const,
  },
  {
    title: "Proposed Solution",
    subtitle: "What is HomFud?",
    content: [
      "✅ A web-based marketplace connecting home chefs with customers within 1 km radius",
      "✅ Two user roles — Customer (browse & order) and Chef (list food & manage orders)",
      "✅ Features: Search, filter, order placement, reviews, and real-time order tracking",
      "✅ Supports COD, UPI, and prepaid payments with self-pickup & home delivery",
    ],
    type: "list" as const,
  },
  {
    title: "Technology Stack",
    subtitle: "MERN Stack Architecture",
    content: [
      "⚛️ React.js — Component-based frontend UI with hooks & state management",
      "🎨 Tailwind CSS — Utility-first CSS framework for responsive, modern styling",
      "🟢 Node.js + Express.js — RESTful API backend with middleware & routing",
      "🍃 MongoDB + Mongoose — NoSQL document database with schema modeling",
    ],
    type: "list" as const,
  },
  {
    title: "System Architecture",
    subtitle: "How the parts connect",
    content: [],
    type: "architecture" as const,
  },
  {
    title: "Frontend Details",
    subtitle: "React.js + Tailwind CSS",
    content: [
      "⚛️ React 18 — Functional components with useState, useEffect, useContext hooks",
      "🔗 React Router DOM — Client-side routing (/, /login, /dashboard, /chef)",
      "📡 Axios — HTTP client for API communication with the Express backend",
      "🎨 Tailwind CSS — Responsive grid layouts, utility classes, dark mode support",
      "🧩 Component Library — Reusable Card, Modal, Button, Form components",
    ],
    type: "list" as const,
  },
  {
    title: "Backend Details",
    subtitle: "Node.js + Express.js",
    content: [
      "🟢 Express.js — RESTful API with structured route handlers & controllers",
      "🔐 JWT Authentication — JSON Web Token for secure login & session management",
      "🛡️ bcrypt.js — Password hashing for secure credential storage",
      "📁 Multer — File upload middleware for chef profile & food images",
      "🔧 Middleware — CORS, error handling, auth guards, input validation",
    ],
    type: "list" as const,
  },
  {
    title: "Database Design",
    subtitle: "MongoDB Collections",
    content: [],
    type: "database" as const,
  },
  {
    title: "API Endpoints",
    subtitle: "RESTful API Design",
    content: [
      "🔐 POST /api/auth/register — User registration (Customer/Chef)",
      "🔐 POST /api/auth/login — User login, returns JWT token",
      "🍽️ GET /api/chefs — List nearby chefs (with filters: cuisine, veg, distance)",
      "📋 POST /api/orders — Place a new order",
      "📋 GET /api/orders/:userId — Get user's order history",
      "⭐ POST /api/reviews — Submit a review for a chef",
      "👨‍🍳 PUT /api/chef/menu — Update chef's menu items",
    ],
    type: "list" as const,
  },
  {
    title: "User Flow",
    subtitle: "Customer Journey",
    content: [],
    type: "userflow" as const,
  },
  {
    title: "Key Features Implemented",
    subtitle: "Application Modules",
    content: [
      "🏠 Landing Page — Role selection (Customer/Chef) with animated hero section",
      "🔐 Authentication — Login & Signup with JWT, role-based access control",
      "🍽️ Customer Dashboard — Search, filter by cuisine/veg, view nearby chefs",
      "👨‍🍳 Chef Dashboard — Add/edit menu, track orders, view earnings summary",
      "📋 Order System — Place orders with quantity, notes, payment & delivery options",
      "⭐ Review System — Star rating + text feedback after order completion",
    ],
    type: "list" as const,
  },
  {
    title: "Project Structure",
    subtitle: "Folder Organization",
    content: [],
    type: "structure" as const,
  },
  {
    title: "Development Workflow",
    subtitle: "How We Built It",
    content: [
      "1️⃣ Planning — Defined user roles, features, database schema & API design",
      "2️⃣ Backend Setup — Express server, MongoDB connection, auth routes, CRUD APIs",
      "3️⃣ Frontend Development — React components, routing, Tailwind styling",
      "4️⃣ Integration — Connected frontend with backend via Axios HTTP calls",
      "5️⃣ Testing — Postman for API testing, browser testing for UI flows",
      "6️⃣ Deployment — Frontend on Vercel/Netlify, Backend on Render/Railway",
    ],
    type: "list" as const,
  },
  {
    title: "Future Enhancements",
    subtitle: "What's Next?",
    content: [
      "📍 Google Maps API — Real-time location-based chef discovery",
      "💬 Socket.io — Real-time chat between customer and chef",
      "📱 React Native — Mobile app version for Android & iOS",
      "💳 Razorpay/Stripe — Integrated online payment gateway",
      "📊 Admin Dashboard — Platform analytics, user management, moderation",
    ],
    type: "list" as const,
  },
  {
    title: "Thank You!",
    subtitle: "HomFud — Taste Home. Connect Local. Earn Together.",
    content: [
      "Built with React, Tailwind CSS, Node.js, Express, and MongoDB",
      "",
      "Questions? 🙋‍♂️",
    ],
    type: "title" as const,
  },
];

const ArchitectureDiagram = () => (
  <div className="flex flex-col items-center gap-3 text-sm">
    <div className="flex items-center gap-4 flex-wrap justify-center">
      <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg px-4 py-3 text-blue-300 text-center min-w-[140px]">
        <div className="font-bold">👤 User</div>
        <div className="text-xs opacity-75">Browser</div>
      </div>
      <div className="text-gray-500 text-xl">→</div>
      <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg px-4 py-3 text-cyan-300 text-center min-w-[140px]">
        <div className="font-bold">⚛️ React</div>
        <div className="text-xs opacity-75">Frontend (Port 3000)</div>
      </div>
      <div className="text-gray-500 text-xl">→</div>
      <div className="bg-green-500/20 border border-green-500/50 rounded-lg px-4 py-3 text-green-300 text-center min-w-[140px]">
        <div className="font-bold">🟢 Express.js</div>
        <div className="text-xs opacity-75">Backend API (Port 5000)</div>
      </div>
      <div className="text-gray-500 text-xl">→</div>
      <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg px-4 py-3 text-emerald-300 text-center min-w-[140px]">
        <div className="font-bold">🍃 MongoDB</div>
        <div className="text-xs opacity-75">Database</div>
      </div>
    </div>
    <div className="flex gap-6 mt-2 flex-wrap justify-center">
      <div className="text-xs text-gray-500 bg-gray-800 rounded px-3 py-1.5">Tailwind CSS • Axios • React Router</div>
      <div className="text-xs text-gray-500 bg-gray-800 rounded px-3 py-1.5">JWT • bcrypt • Multer • CORS</div>
      <div className="text-xs text-gray-500 bg-gray-800 rounded px-3 py-1.5">Mongoose ODM • Atlas Cloud</div>
    </div>
  </div>
);

const DatabaseDiagram = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
      <h4 className="font-bold text-emerald-400 mb-2">👤 Users Collection</h4>
      <div className="text-gray-400 space-y-1 text-xs font-mono">
        <div>_id: ObjectId</div>
        <div>name: String</div>
        <div>email: String (unique)</div>
        <div>password: String (hashed)</div>
        <div>role: "customer" | "chef"</div>
        <div>phone: String</div>
        <div>address: String</div>
        <div>createdAt: Date</div>
      </div>
    </div>
    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
      <h4 className="font-bold text-orange-400 mb-2">🍽️ Menus Collection</h4>
      <div className="text-gray-400 space-y-1 text-xs font-mono">
        <div>_id: ObjectId</div>
        <div>chefId: ObjectId (ref: Users)</div>
        <div>name: String</div>
        <div>price: Number</div>
        <div>isVeg: Boolean</div>
        <div>cuisine: String</div>
        <div>image: String (URL)</div>
        <div>available: Boolean</div>
      </div>
    </div>
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
      <h4 className="font-bold text-blue-400 mb-2">📋 Orders Collection</h4>
      <div className="text-gray-400 space-y-1 text-xs font-mono">
        <div>_id: ObjectId</div>
        <div>customerId: ObjectId</div>
        <div>chefId: ObjectId</div>
        <div>items: [&#123; name, qty, price &#125;]</div>
        <div>total: Number</div>
        <div>status: String</div>
        <div>payment: String</div>
        <div>createdAt: Date</div>
      </div>
    </div>
  </div>
);

const UserFlowDiagram = () => (
  <div className="flex flex-col items-center gap-2 text-sm">
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {[
        { label: "Visit Site", icon: "🌐" },
        { label: "Register/Login", icon: "🔐" },
        { label: "Choose Role", icon: "👤" },
      ].map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="bg-orange-500/20 border border-orange-500/40 rounded-lg px-3 py-2 text-orange-300 text-center">
            <div className="text-lg">{step.icon}</div>
            <div className="text-xs">{step.label}</div>
          </div>
          {i < 2 && <div className="text-gray-600">→</div>}
        </div>
      ))}
    </div>
    <div className="text-gray-600 text-lg">↓</div>
    <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
        <h4 className="font-bold text-blue-400 text-xs mb-2">🛒 Customer Flow</h4>
        <div className="text-gray-400 text-xs space-y-1">
          <div>1. Browse nearby chefs</div>
          <div>2. Filter & search food</div>
          <div>3. Place order</div>
          <div>4. Track status</div>
          <div>5. Leave review ⭐</div>
        </div>
      </div>
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
        <h4 className="font-bold text-green-400 text-xs mb-2">👨‍🍳 Chef Flow</h4>
        <div className="text-gray-400 text-xs space-y-1">
          <div>1. Set up profile</div>
          <div>2. Add menu items</div>
          <div>3. Receive orders</div>
          <div>4. Update status</div>
          <div>5. View earnings 💰</div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectStructure = () => (
  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
      <h4 className="font-bold text-cyan-400 mb-2 font-sans text-sm">📁 Frontend (client/)</h4>
      <div className="text-gray-400 space-y-1">
        <div>├── src/</div>
        <div>│   ├── components/</div>
        <div>│   │   ├── Navbar.jsx</div>
        <div>│   │   ├── ChefCard.jsx</div>
        <div>│   │   ├── OrderModal.jsx</div>
        <div>│   │   └── ReviewModal.jsx</div>
        <div>│   ├── pages/</div>
        <div>│   │   ├── Home.jsx</div>
        <div>│   │   ├── Login.jsx</div>
        <div>│   │   ├── CustomerDash.jsx</div>
        <div>│   │   └── ChefDash.jsx</div>
        <div>│   ├── context/AuthContext.js</div>
        <div>│   ├── App.jsx</div>
        <div>│   └── index.js</div>
      </div>
    </div>
    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
      <h4 className="font-bold text-green-400 mb-2 font-sans text-sm">📁 Backend (server/)</h4>
      <div className="text-gray-400 space-y-1">
        <div>├── models/</div>
        <div>│   ├── User.js</div>
        <div>│   ├── Menu.js</div>
        <div>│   ├── Order.js</div>
        <div>│   └── Review.js</div>
        <div>├── routes/</div>
        <div>│   ├── authRoutes.js</div>
        <div>│   ├── chefRoutes.js</div>
        <div>│   └── orderRoutes.js</div>
        <div>├── middleware/auth.js</div>
        <div>├── config/db.js</div>
        <div>├── server.js</div>
        <div>└── .env</div>
      </div>
    </div>
  </div>
);

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slide = slides[currentSlide];

  const goNext = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const goPrev = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  const renderSlideContent = () => {
    if (slide.type === 'title') {
      return (
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            {slide.title}
          </h1>
          <p className="text-xl text-gray-400 mb-8">{slide.subtitle}</p>
          {slide.content.map((line, i) => (
            <p key={i} className="text-lg text-gray-300 mb-2">{line}</p>
          ))}
        </div>
      );
    }

    if (slide.type === 'architecture') {
      return (
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{slide.title}</h2>
          <p className="text-orange-400 text-lg mb-8 font-medium">{slide.subtitle}</p>
          <ArchitectureDiagram />
        </div>
      );
    }

    if (slide.type === 'database') {
      return (
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{slide.title}</h2>
          <p className="text-orange-400 text-lg mb-6 font-medium">{slide.subtitle}</p>
          <DatabaseDiagram />
        </div>
      );
    }

    if (slide.type === 'userflow') {
      return (
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{slide.title}</h2>
          <p className="text-orange-400 text-lg mb-6 font-medium">{slide.subtitle}</p>
          <UserFlowDiagram />
        </div>
      );
    }

    if (slide.type === 'structure') {
      return (
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{slide.title}</h2>
          <p className="text-orange-400 text-lg mb-6 font-medium">{slide.subtitle}</p>
          <ProjectStructure />
        </div>
      );
    }

    return (
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{slide.title}</h2>
        <p className="text-orange-400 text-lg mb-8 font-medium">{slide.subtitle}</p>
        <ul className="space-y-4">
          {slide.content.map((item, i) => (
            <li key={i} className="text-gray-300 text-lg leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4 relative">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-gray-400 hover:text-white"
      >
        <Home className="w-5 h-5 mr-2" /> Back to App
      </Button>

      <div className="absolute top-4 right-4 text-gray-500 text-sm font-mono">
        {currentSlide + 1} / {slides.length}
      </div>

      <Card className="w-full max-w-5xl bg-gray-800/80 border-gray-700 shadow-2xl backdrop-blur-sm min-h-[480px] flex flex-col justify-center">
        <CardContent className="p-8 md:p-14">
          {renderSlideContent()}
        </CardContent>
      </Card>

      <div className="flex items-center gap-6 mt-8">
        <Button
          onClick={goPrev}
          disabled={currentSlide === 0}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Previous
        </Button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentSlide ? 'bg-orange-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={goNext}
          disabled={currentSlide === slides.length - 1}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white disabled:opacity-30"
        >
          Next <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Presentation;
