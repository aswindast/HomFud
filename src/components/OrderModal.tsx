
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Phone, CreditCard, Wallet, Banknote } from 'lucide-react';
import { toast } from "sonner";
import ReviewModal from '@/components/ReviewModal';

interface OrderModalProps {
  chef: any;
  onClose: () => void;
}

const OrderModal = ({ chef, onClose }: OrderModalProps) => {
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [selectedItems, setSelectedItems] = useState([
    { name: chef.specialties[0], price: 120, quantity: 1 },
    { name: chef.specialties[1], price: 80, quantity: 1 }
  ]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const deliveryFee = deliveryOption === 'delivery' ? 20 : 0;
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!");
    setOrderPlaced(true);
  };

  const handleMarkDelivered = () => {
    toast.success("Order marked as delivered!");
    setShowReview(true);
  };

  if (showReview) {
    return (
      <ReviewModal
        chef={chef}
        onClose={() => {
          setShowReview(false);
          onClose();
        }}
      />
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {orderPlaced ? "Order Confirmed! 🎉" : `Order from ${chef.name}`}
          </DialogTitle>
        </DialogHeader>

        {!orderPlaced ? (
          <div className="space-y-6">
            {/* Chef Info */}
            <Card className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img src={chef.image} alt={chef.name} className="w-16 h-16 rounded-full object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{chef.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {chef.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {chef.rating} ({chef.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Verified</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <div>
              <h4 className="font-semibold mb-3">Order Summary</h4>
              <div className="space-y-2">
                {selectedItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Options */}
            <div>
              <Label className="text-base font-semibold">Delivery Option</Label>
              <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="mt-2">
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="flex justify-between">
                      <span>Self Pickup</span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                    <p className="text-sm text-gray-500">Pick up from chef's location</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                    <div className="flex justify-between">
                      <span>Home Delivery</span>
                      <span className="font-semibold">₹{deliveryFee}</span>
                    </div>
                    <p className="text-sm text-gray-500">Delivered to your doorstep</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Options */}
            <div>
              <Label className="text-base font-semibold">Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                    <Banknote className="w-4 h-4" />
                    Cash on Delivery (COD)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                    <Wallet className="w-4 h-4" />
                    UPI Payment
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="prepaid" id="prepaid" />
                  <Label htmlFor="prepaid" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="w-4 h-4" />
                    Prepaid (Card/Net Banking)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Order Total */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Order Confirmed!</h3>
              <p className="text-green-700">Your order has been placed successfully.</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Chef Contact Details Unlocked</h4>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{chef.name}</p>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium">Pickup Address</p>
                      <p className="text-gray-600">123 Food Street, Local Area</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Estimated Time</p>
                      <p className="text-gray-600">30-45 minutes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-gray-600">
              The chef can also see your contact details to coordinate delivery.
            </p>
          </div>
        )}

        <DialogFooter>
          {!orderPlaced ? (
            <div className="flex gap-3 w-full">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handlePlaceOrder}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Confirm Order - ₹{total}
              </Button>
            </div>
          ) : (
            <div className="flex gap-3 w-full">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
              <Button 
                onClick={handleMarkDelivered}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                Mark as Delivered
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
