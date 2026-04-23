
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Users, Heart, MapPin, Shield, Star } from 'lucide-react';
import AuthForm from '@/components/AuthForm';
import CustomerDashboard from '@/components/CustomerDashboard';
import ChefDashboard from '@/components/ChefDashboard';
import foodBackground from '@/assets/food-background.jpg';

const Index = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'auth' | 'customer' | 'chef'>('welcome');
  const [userRole, setUserRole] = useState<'customer' | 'chef' | null>(null);

  const handleRoleSelection = (role: 'customer' | 'chef') => {
    setUserRole(role);
    setCurrentView('auth');
  };

  const handleAuthSuccess = () => {
    setCurrentView(userRole || 'customer');
  };

  if (currentView === 'customer') {
    return <CustomerDashboard onBack={() => setCurrentView('welcome')} />;
  }

  if (currentView === 'chef') {
    return <ChefDashboard onBack={() => setCurrentView('welcome')} />;
  }

  if (currentView === 'auth') {
    return (
      <AuthForm 
        role={userRole!} 
        onSuccess={handleAuthSuccess}
        onBack={() => setCurrentView('welcome')}
      />
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 237, 213, 0.8), rgba(254, 226, 226, 0.8)), url(${foodBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                HomFud
              </h1>
              <p className="text-sm text-gray-600">Taste Home. Connect Local. Earn Together.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Welcome to <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">HomFud</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Taste the love of homemade food. Connect with local chefs in your neighborhood and enjoy authentic, fresh meals made with care.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-300 bg-white/50 backdrop-blur-sm" 
                  onClick={() => handleRoleSelection('customer')}>
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">I am a Customer</h3>
                <p className="text-gray-600 mb-6">
                  Discover amazing homemade food from verified local chefs in your neighborhood. Fresh, safe, and delicious meals await you.
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-semibold">
                  Order Now
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-300 bg-white/50 backdrop-blur-sm"
                  onClick={() => handleRoleSelection('chef')}>
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <ChefHat className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">I am a Chef</h3>
                <p className="text-gray-600 mb-6">
                  Share your culinary passion and earn from home. Connect with food lovers in your area and build your local cooking business.
                </p>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-semibold">
                  Start Cooking
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-green-500 p-3 rounded-full w-16 h-16 mx-auto mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Verified & Safe</h4>
              <p className="text-gray-600">FSSAI licensed chefs with verified kitchens</p>
            </div>
            <div className="text-center">
              <div className="bg-red-500 p-3 rounded-full w-16 h-16 mx-auto mb-4">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Hyperlocal</h4>
              <p className="text-gray-600">Fresh food from chefs within 1 km radius</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 p-3 rounded-full w-16 h-16 mx-auto mb-4">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Made with Love</h4>
              <p className="text-gray-600">Authentic homemade food that brings joy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-12">Why Choose HomFud?</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">Fresh</div>
              <p className="text-gray-600">Cooked to order</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">Safe</div>
              <p className="text-gray-600">Licensed kitchens</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">Local</div>
              <p className="text-gray-600">1 km radius</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">Affordable</div>
              <p className="text-gray-600">Better than restaurants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">HomFud</span>
          </div>
          <p className="text-gray-400 mb-4">Local Taste, Local Trust</p>
          <p className="text-gray-500">Eat happy. Earn from home.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
