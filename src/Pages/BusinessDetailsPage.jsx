import { useParams } from "react-router-dom";
import { useState } from "react";

// Mock data for businesses
const businessesData = [
  {
    id: 1,
    name: "Campus Delight Restaurant",
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
    ],
    description: "Delicious meals at affordable prices.",
    contact: {
      phone: "+234 801 234 5678",
      email: "contact@campusdelight.com",
      website: "https://campusdelight.com",
    },
    location: "SUB, University of Nigeria, Nsukka",
    reviews: [
      { user: "John Doe", comment: "Amazing food and great service!" },
      { user: "Jane Smith", comment: "Affordable and tasty meals!" },
    ],
  },

  {
    id: 2,
    name: "TechSavvy Cyber Cafe",
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
    ],
    description: "Fast internet and printing services.",
    contact: {
      phone: "+234 801 234 5678",
      email: "contact@techsavvy.com",
      website: "https://techsavvy.com",
    },
    location: "Container, University of Nigeria, Nsukka",
    reviews: [
      { user: "John Doe", comment: "Fast internet and affordable pricing!" },
      {
        user: "Jane Smith",
        comment: "I did my entire printing for my clearance here!",
      },
    ],
  },
  // Add more businesses as needed
];

const BusinessDetailsPage = () => {
  const { businessId } = useParams();
  const business = businessesData.find(
    (b) => b.id === parseInt(businessId, 10)
  );

  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState(business.reviews || []);

  if (!business) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold">Business Not Found</h1>
      </div>
    );
  }

  const handleAddReview = () => {
    if (review.trim()) {
      setReviews([...reviews, { user: "Anonymous", comment: review }]);
      setReview("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Business Name */}
      <h1 className="text-4xl font-bold text-center mb-6">{business.name}</h1>

      {/* Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {business.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${business.name} ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-700 text-lg mb-6">{business.description}</p>

      {/* Contact Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <ul className="text-lg">
          <li>
            <strong>Phone:</strong> {business.contact.phone}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${business.contact.email}`}
              className="text-green-600 hover:underline"
            >
              {business.contact.email}
            </a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a
              href={business.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              Visit Website
            </a>
          </li>
          <li>
            <strong>Location:</strong> {business.location}
          </li>
        </ul>
      </div>

      {/* Reviews Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <ul className="space-y-4">
          {reviews.map((review, index) => (
            <li
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md text-gray-800"
            >
              <strong>{review.user}</strong>: {review.comment}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col md:flex-row items-center">
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write a review..."
            className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 mb-4 md:mb-0 md:mr-4"
          />
          <button
            onClick={handleAddReview}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <a
          href={`mailto:${business.contact.email}`}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Contact
        </a>
        <a
          href={business.contact.website}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default BusinessDetailsPage;
