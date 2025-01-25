import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const cloudName = "dnpinv6d1";
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Bob",
    email: "bob@email.com",
    busName: "Bob's house",
    busCategory: "Retail Services",
    busLocation: "",
    busLogoUrl: "",
    additionalImagesUrl: "",
    busDescription: "Bla bla bla",
    phone: "08123335221",
    password: "qwerty",
  });

  const categories = [
    "Retail",
    "Food & Beverage",
    "Services",
    "Technology",
    "Health & Wellness",
    "Entertainment",
    "Education",
    "Other",
  ];

  const locations = [
    "SUB",
    "Marlima & Belima",
    "Container",
    "FASA Market",
    "Stadium",
    "Main Gate",
    "Library",
    "Okpara & Balewa",
    "Akintola & Akpabio",
    "Okeke & Isakaita",
    "Nkrumah & Boys Hostel",
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogoUpload();
  };

  const navigate = useNavigate();
  const [logoFile, setLogoFile] = useState(null);
  const [additionalImageFile, setAdditionalImageFile] = useState(null);

  const handleLogoFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleAdditionalImageFileChange = (e) => {
    setAdditionalImageFile(e.target.files[0]);
  };

  const handleLogoUpload = async () => {
    if (!logoFile) {
      alert("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", logoFile);
    formData.append("upload_preset", "business-logo"); // Replace with your preset
    formData.append("cloud_name", cloudName); // Replace with your Cloudinary cloud name
    setLoading(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Replace with your cloud_name
        formData
      );
      setFormData((oldValues) => {
        return {
          ...oldValues,
          busLogoUrl: response.data.secure_url,
        };
      }); // URL of the uploaded image
      handleAdditionalFileUpload();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdditionalFileUpload = async () => {
    if (!additionalImageFile) {
      alert("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", additionalImageFile);
    formData.append("upload_preset", "additional-image"); // Replace with your preset
    formData.append("cloud_name", cloudName); // Replace with your Cloudinary cloud name
    setLoading(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Replace with your cloud_name
        formData
      );
      setFormData((oldValues) => {
        return {
          ...oldValues,
          additionalImagesUrl: response.data.secure_url,
        };
      }); // URL of the uploaded image
      alert("Image uploaded successfully!");
      handleSignUp();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const docRef = await addDoc(collection(db, "businesses"), {
        category: formData.busCategory,
        createdAt: new Date().toISOString(),
        description: formData.busDescription,
        imagesUrl: formData.additionalImagesUrl,
        location: formData.busLocation,
        email: formData.email,
        logoUrl: formData.busLogoUrl,
        name: formData.phone,
        modifiedAt: new Date().toISOString(),
      });
      if (docRef) alert("Business details successfully uploaded");

      alert("User created");
      navigate("/dashboard"); // Replace with the desired route
      console.log(docRef);
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(`Error signing up: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Register Your Business
        </h2>
        <form onSubmit={handleFormSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your full name"
              required
              value={formData.fullName}
              onChange={(e) => {
                setFormData((oldValues) => {
                  return { ...oldValues, fullName: e.target.value };
                });
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData((oldValues) => {
                  return { ...oldValues, email: e.target.value };
                });
              }}
            />
          </div>

          {/* Business Name */}
          <div className="mb-4">
            <label htmlFor="businessName" className="block text-gray-700">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your business name"
              required
              value={formData.busName}
              onChange={(e) => {
                setFormData((oldValues) => {
                  return { ...oldValues, busName: e.target.value };
                });
              }}
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">
              Business Category
            </label>
            <select
              id="category"
              value={formData.busCategory}
              onChange={(e) => {
                setFormData((oldValues) => {
                  return { ...oldValues, busCategory: e.target.value };
                });
              }}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">
              Business Location
            </label>
            <select
              id="location"
              value={formData.busLocation}
              onChange={(e) => {
                setFormData((oldValues) => {
                  return { ...oldValues, busLocation: e.target.value };
                });
              }}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            >
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Logo */}
          <div className="mb-4">
            <label htmlFor="logo" className="block text-gray-700">
              Business Logo
            </label>
            <input
              type="file"
              id="logo"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              accept="image/*"
              onChange={handleLogoFileChange}
            />
          </div>

          {/* Images */}
          <div className="mb-4">
            <label
              htmlFor="additionalImagesUrl"
              className="block text-gray-700"
            >
              Additional Images
            </label>
            <input
              type="file"
              id="additionalImagesUrl"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              accept="image/*"
              onChange={handleAdditionalImageFileChange}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Business Description
            </label>
            <textarea
              id="description"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Write a brief description of your business"
              rows={4}
              required
              value={formData.busDescription}
              onChange={(e) => {
                setFormData((oldValues) => {
                  return { ...oldValues, busDescription: e.target.value };
                });
              }}
            />
          </div>

          {/* Contact Information */}
          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-700">
              Contact Information
            </label>
            <input
              type="tel"
              id="contact"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your phone number"
              required
              value={formData.phone}
              onChange={(e) => {
                setFormData((oldValues) => {
                  return { ...oldValues, phone: e.target.value };
                });
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter password"
              required
              value={formData.password}
              onChange={(e) => {
                setFormData((oldValues) => {
                  return { ...oldValues, password: e.target.value };
                });
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            {loading ? "Loading..." : "Register Business"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
