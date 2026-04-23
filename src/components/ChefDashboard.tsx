
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, Plus, Trash2, Shield, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from "sonner";
import { addDish as addSharedDish, removeDish as removeSharedDish } from '@/lib/dishStore';

interface ChefDashboardProps {
  onBack: () => void;
}

interface Dish {
  id: number;
  name: string;
  price: string;
  ingredients: string;
  image: string;
}

const ChefDashboard = ({ onBack }: ChefDashboardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [deliveryRange, setDeliveryRange] = useState('1');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [newDish, setNewDish] = useState({
    name: '',
    price: '',
    ingredients: ''
  });
  const [verificationStatus, setVerificationStatus] = useState({
    fssai: false,
    kitchen: false,
    profile: false
  });

  const handleAddDish = () => {
    if (!newDish.name || !newDish.price || !newDish.ingredients) {
      toast.error("Please fill in all dish details!");
      return;
    }

    const dish: Dish = {
      id: Date.now(),
      ...newDish,
      image: "/placeholder.svg"
    };

    setDishes([...dishes, dish]);
    addSharedDish({
      ...dish,
      chefId: 'chef-local',
      chefName: "Your Kitchen",
      isVeg: true,
      cuisine: 'Home Style',
    });
    setNewDish({ name: '', price: '', ingredients: '' });
    toast.success("Dish added — now visible to customers!");
  };

  const handleRemoveDish = (id: number) => {
    setDishes(dishes.filter(dish => dish.id !== id));
    removeSharedDish(id);
    toast.success("Dish removed!");
  };

  const handleFileUpload = (type: string) => {
    // Simulate file upload
    toast.success(`${type} uploaded successfully!`);
    setVerificationStatus(prev => ({ ...prev, [type]: true }));
  };

  const handlePublish = () => {
    if (!verificationStatus.fssai || !verificationStatus.kitchen) {
      toast.error("Please complete FSSAI license and kitchen photo verification first!");
      return;
    }
    
    if (dishes.length === 0) {
      toast.error("Please add at least one dish to your menu!");
      return;
    }

    toast.success("Your kitchen is now live and accepting orders!");
    setIsActive(true);
  };

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
              <h1 className="text-2xl font-bold text-gray-800">Your Home Kitchen</h1>
              <p className="text-sm text-gray-600">Build trust and earn from your passion</p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="active-toggle" className="text-sm font-medium">
                {isActive ? "Active" : "Inactive"}
              </Label>
              <Switch
                id="active-toggle"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="verification" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Verification Tab */}
          <TabsContent value="verification" className="space-y-6">
            {/* Food Safety Guidelines */}
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertCircle className="w-5 h-5" />
                  Food Safety Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-orange-700">
                  <p>🔸 <strong>Serve fresh:</strong> Cook food fresh for each order</p>
                  <p>🔸 <strong>Keep your kitchen safe & hygienic:</strong> Clean workspace, fresh ingredients</p>
                  <p>🔸 <strong>Follow local food laws:</strong> FSSAI compliance builds customer trust</p>
                  <p>🔸 <strong>Quality assurance:</strong> Maintain consistent taste and presentation</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              {/* FSSAI License Upload */}
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>FSSAI License</span>
                    {verificationStatus.fssai ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Shield className="w-5 h-5 text-gray-400" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload FSSAI License</p>
                    </div>
                    <Button 
                      onClick={() => handleFileUpload('fssai')}
                      className="w-full"
                      variant={verificationStatus.fssai ? "secondary" : "default"}
                    >
                      {verificationStatus.fssai ? "Verified ✓" : "Upload License"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Kitchen Photos */}
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Kitchen Photos</span>
                    {verificationStatus.kitchen ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Camera className="w-5 h-5 text-gray-400" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload Kitchen Photos</p>
                    </div>
                    <Button 
                      onClick={() => handleFileUpload('kitchen')}
                      className="w-full"
                      variant={verificationStatus.kitchen ? "secondary" : "default"}
                    >
                      {verificationStatus.kitchen ? "Verified ✓" : "Upload Photos"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Setup */}
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Profile Photo</span>
                    {verificationStatus.profile ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Upload className="w-5 h-5 text-gray-400" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload Profile Photo</p>
                    </div>
                    <Button 
                      onClick={() => handleFileUpload('profile')}
                      className="w-full"
                      variant={verificationStatus.profile ? "secondary" : "default"}
                    >
                      {verificationStatus.profile ? "Uploaded ✓" : "Upload Photo"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Menu Tab */}
          <TabsContent value="menu" className="space-y-6">
            {/* Add New Dish */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Dish
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="dish-name">Dish Name</Label>
                    <Input
                      id="dish-name"
                      value={newDish.name}
                      onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                      placeholder="e.g., Butter Chicken"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dish-price">Price (₹)</Label>
                    <Input
                      id="dish-price"
                      value={newDish.price}
                      onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                      placeholder="e.g., 150"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Button onClick={handleAddDish} className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      Add Dish
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="ingredients">Ingredients</Label>
                  <Textarea
                    id="ingredients"
                    value={newDish.ingredients}
                    onChange={(e) => setNewDish({...newDish, ingredients: e.target.value})}
                    placeholder="List main ingredients..."
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Current Menu */}
            <Card>
              <CardHeader>
                <CardTitle>Your Menu ({dishes.length} dishes)</CardTitle>
              </CardHeader>
              <CardContent>
                {dishes.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Plus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No dishes added yet. Add your first dish above!</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {dishes.map((dish) => (
                      <div key={dish.id} className="border rounded-lg p-4 bg-white/50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{dish.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveDish(dish.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{dish.ingredients}</p>
                        <Badge variant="secondary">₹{dish.price}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="delivery-range">Delivery Range (km)</Label>
                  <Input
                    id="delivery-range"
                    type="number"
                    value={deliveryRange}
                    onChange={(e) => setDeliveryRange(e.target.value)}
                    min="0.5"
                    max="2"
                    step="0.1"
                    className="mt-1 max-w-xs"
                  />
                  <p className="text-sm text-gray-600 mt-1">Default: 1 km (adjustable up to 2 km)</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>No orders yet. Complete your verification and add dishes to start receiving orders!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Publish Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handlePublish}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-3 text-lg font-semibold"
            disabled={isActive}
          >
            {isActive ? "Kitchen is Live! 🎉" : "Save & Publish Kitchen"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
