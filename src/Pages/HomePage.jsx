// import Header from "../Component/header";
import HeroSection from "../Component/hero";
import "../App.css";

function HomePage() {
  return (
    <div>
      <HeroSection />

      {/* Featured Businesses Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-600 mb-8">
            Featured Businesses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Business Categories */}
            {businesses.map((business) => (
              <div
                key={business.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {business.name}
                </h3>
                <p className="text-gray-600 mb-4">{business.description}</p>
                <button className="text-green-600 hover:underline">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Featured Businesses Data
const businesses = [
  {
    id: 1,
    name: "Restaurants & Cafeterias",
    description:
      "Enjoy delicious meals and snacks at various eateries on campus.",
  },
  {
    id: 2,
    name: "Grocery Shops",
    description: "Get all your essential groceries conveniently.",
  },
  {
    id: 3,
    name: "Banks & ATMs",
    description: "Locate banks and ATM services around the campus.",
  },
  {
    id: 4,
    name: "Salons & Barbershops",
    description: "Find grooming services, salons, and barber shops near you.",
  },
  {
    id: 5,
    name: "Cyber Cafes & Printing Centers",
    description:
      "Access the internet and printing services for your academic needs.",
  },
  {
    id: 6,
    name: "Laundry Services",
    description: "Quick and affordable laundry services on campus.",
  },
  {
    id: 7,
    name: "Photography Studios",
    description: "Capture memories with professional photography services.",
  },
  {
    id: 8,
    name: "Fitness & Gym",
    description: "Keep fit and routine exercise.",
  },
  {
    id: 9,
    name: "Bookshop & Stationery",
    description: "Purchase textbooks, novels, and academic materials.",
  },
  {
    id: 10,
    name: "Mobile Repair & Accessories",
    description: "Fix your phones and gadgets with ease. ",
  },
];

export default HomePage;
