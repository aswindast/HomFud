
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from 'lucide-react';
import { toast } from "sonner";

interface ReviewModalProps {
  chef: any;
  onClose: () => void;
}

const ReviewModal = ({ chef, onClose }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }

    toast.success("Thank you for your review!");
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Leave a Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <img src={chef.image} alt={chef.name} className="w-16 h-16 rounded-full mx-auto mb-2 object-cover" />
            <h3 className="font-semibold">{chef.name}</h3>
            <p className="text-sm text-gray-600">{chef.cuisine}</p>
          </div>

          <div>
            <Label className="text-base font-semibold">Your Rating</Label>
            <div className="flex justify-center gap-2 my-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-600">
                {rating === 5 && "Excellent! ⭐"}
                {rating === 4 && "Very Good! 👍"}
                {rating === 3 && "Good 👌"}
                {rating === 2 && "Fair 😐"}
                {rating === 1 && "Needs Improvement 😔"}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="review-text" className="text-base font-semibold">
              Write your feedback (optional)
            </Label>
            <Textarea
              id="review-text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with the food quality, taste, and service..."
              className="mt-2"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Skip Review
          </Button>
          <Button 
            onClick={handleSubmitReview}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
