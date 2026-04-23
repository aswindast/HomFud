
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, MapPin, Star, Shield, Clock, Heart, ChefHat } from 'lucide-react';
import OrderModal from '@/components/OrderModal';
import { useDishes } from '@/lib/dishStore';

interface CustomerDashboardProps {
  onBack: () => void;
}

const mockChefs = [
  {
    id: 1,
    name: "Priya's Kitchen",
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 127,
    distance: "0.3 km",
    cuisine: "North Indian",
    isVeg: true,
    verified: true,
    specialties: ["Rajma Chawal", "Aloo Paratha", "Dal Makhani"],
    price: "₹80-150"
  },
  {
    id: 2,
    name: "Mama's South Delights",
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 98,
    distance: "0.7 km",
    cuisine: "South Indian",
    isVeg: true,
    verified: true,
    specialties: ["Dosa", "Sambar", "Coconut Chutney"],
    price: "₹60-120"
  },
  {
    id: 3,
    name: "Zaheer's Biryani House",
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 203,
    distance: "0.9 km",
    cuisine: "Mughlai",
    isVeg: false,
    verified: true,
    specialties: ["Chicken Biryani", "Mutton Curry", "Kebabs"],
    price: "₹120-300"
  }
];

const CustomerDashboard = ({ onBack }: CustomerDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [vegFilter, setVegFilter] = useState('');
  const [selectedChef, setSelectedChef] = useState<any>(null);
  const chefDishes = useDishes();

  const filteredChefs = mockChefs.filter(chef => {
    const matchesSearch = chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chef.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = !cuisineFilter || cuisineFilter === 'all' || chef.cuisine === cuisineFilter;
    const matchesVeg = !vegFilter || vegFilter === 'all' || (vegFilter === 'veg' ? chef.isVeg : !chef.isVeg);
    
    return matchesSearch && matchesCuisine && matchesVeg;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">Nearby Home Chefs</h1>
              <p className="text-sm text-gray-600">Fresh homemade food within 1 km</p>
            </div>
            <div className="w-20" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-6 border border-orange-100">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search chefs or cuisine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Cuisine Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                <SelectItem value="North Indian">North Indian</SelectItem>
                <SelectItem value="South Indian">South Indian</SelectItem>
                <SelectItem value="Mughlai">Mughlai</SelectItem>
                <SelectItem value="Chinese">Chinese</SelectItem>
              </SelectContent>
            </Select>
            <Select value={vegFilter} onValueChange={setVegFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Dietary Preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="veg">Vegetarian</SelectItem>
                <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Max Distance: 1 km</span>
            </div>
          </div>
        </div>

        {/* Dishes added by chefs (live) */}
        {chefDishes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-500" />
              Fresh from Local Chefs
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chefDishes.map((dish) => (
                <Card key={dish.id} className="border-2 hover:border-orange-200 bg-white/70 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all">
                  <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover" />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{dish.name}</CardTitle>
                    <p className="text-sm text-gray-600">by {dish.chefName}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dish.ingredients}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-orange-600">₹{dish.price}</span>
                      <Button
                        onClick={() => setSelectedChef({ id: dish.id, name: dish.chefName, specialties: [dish.name], price: `₹${dish.price}` })}
                        size="sm"
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                      >
                        Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Chef Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChefs.map((chef) => (
            <Card key={chef.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200 bg-white/70 backdrop-blur-sm overflow-hidden">
              <div className="relative">
                <img 
                  src={chef.image} 
                  alt={chef.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {chef.verified && (
                  <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
                <div className="absolute top-3 left-3">
                  <Badge variant={chef.isVeg ? "secondary" : "destructive"}>
                    {chef.isVeg ? "🟢 VEG" : "🔴 NON-VEG"}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{chef.name}</CardTitle>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{chef.rating}</span>
                    <span className="text-xs text-gray-500">({chef.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {chef.distance}
                  </span>
                  <span>{chef.cuisine}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {chef.specialties.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-orange-600">{chef.price}</span>
                  <Button 
                    onClick={() => setSelectedChef(chef)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChefs.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No chefs found</h3>
            <p className="text-gray-500">Try adjusting your filters to find more options</p>
          </div>
        )}
      </div>

      {selectedChef && (
        <OrderModal 
          chef={selectedChef} 
          onClose={() => setSelectedChef(null)} 
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
