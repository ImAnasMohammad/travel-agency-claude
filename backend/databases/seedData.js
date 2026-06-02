/*
 *  FileName:-     seedData.js
 *  Description:-  Database seeder that populates initial data: admin users, categories,
 *                 destinations, packages with full details and pricing in INR
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("./connection");

// Import Models
const AuthModel = require("../modules/auths/models/AuthModel");
const UserModel = require("../modules/users/models/UserModel");
const CategoryModel = require("../modules/categories/models/CategoryModel");
const DestinationModel = require("../modules/destinations/models/DestinationModel");
const PackageModel = require("../modules/packages/models/PackageModel");

/*
 *  functionName:- clearCollections
 *  Description:-  Removes all existing documents from seeded collections
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const clearCollections = async () => {
  await AuthModel.deleteMany({});
  await UserModel.deleteMany({});
  await CategoryModel.deleteMany({});
  await DestinationModel.deleteMany({});
  await PackageModel.deleteMany({});
  console.log("✅ Cleared existing collections");
};

/*
 *  functionName:- seedUsers
 *  Description:-  Creates admin and sample user accounts
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const seedUsers = async () => {
  // Plaintext passwords — AuthModel pre-save hook handles hashing automatically
  const users = [
    {
      auth: { email: "admin@wanderlux.com", password: "Anas@123", role: "admin", isVerified: true },
      profile: { firstName: "Admin", lastName: "User", phone: "+91-9876543210" },
    },
    {
      auth: { email: "superadmin@wanderlux.com", password: "Admin@1234", role: "admin", isVerified: true },
      profile: { firstName: "Super", lastName: "Admin", phone: "+91-9876543211" },
    },
    {
      auth: { email: "rahul.sharma@example.com", password: "User@1234", role: "user", isVerified: true },
      profile: { firstName: "Rahul", lastName: "Sharma", phone: "+91-9876543212" },
    },
    {
      auth: { email: "priya.patel@example.com", password: "User@1234", role: "user", isVerified: true },
      profile: { firstName: "Priya", lastName: "Patel", phone: "+91-9876543213" },
    },
    {
      auth: { email: "arjun.mehta@example.com", password: "User@1234", role: "agent", isVerified: true },
      profile: { firstName: "Arjun", lastName: "Mehta", phone: "+91-9876543214" },
    },
  ];

  const createdUsers = [];
  for (const u of users) {
    const auth = await AuthModel.create(u.auth);
    const user = await UserModel.create({ ...u.profile, authId: auth._id });
    createdUsers.push({ auth, user });
  }
  console.log(`✅ Seeded ${createdUsers.length} users`);
  return createdUsers;
};

/*
 *  functionName:- seedCategories
 *  Description:-  Creates travel package categories
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const seedCategories = async () => {
  const categories = [
    {
      name: "Adventure",
      slug: "adventure",
      icon: "🏔️",
      description: "Thrilling outdoor adventures — trekking, rafting, skydiving and more.",
      image: { url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800", publicId: "", alt: "Adventure" },
      isActive: true,
    },
    {
      name: "Beach",
      slug: "beach",
      icon: "🏖️",
      description: "Relax on pristine beaches with crystal-clear waters.",
      image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", publicId: "", alt: "Beach" },
      isActive: true,
    },
    {
      name: "Cultural",
      slug: "cultural",
      icon: "🏛️",
      description: "Explore rich heritage, ancient temples, and vibrant local cultures.",
      image: { url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800", publicId: "", alt: "Cultural" },
      isActive: true,
    },
    {
      name: "Wildlife",
      slug: "wildlife",
      icon: "🦁",
      description: "Safari adventures and wildlife encounters in national parks.",
      image: { url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800", publicId: "", alt: "Wildlife" },
      isActive: true,
    },
    {
      name: "Honeymoon",
      slug: "honeymoon",
      icon: "💑",
      description: "Romantic getaways crafted for the perfect honeymoon experience.",
      image: { url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800", publicId: "", alt: "Honeymoon" },
      isActive: true,
    },
    {
      name: "Family",
      slug: "family",
      icon: "👨‍👩‍👧‍👦",
      description: "Fun-filled family vacations with activities for all ages.",
      image: { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800", publicId: "", alt: "Family" },
      isActive: true,
    },
  ];

  const created = await CategoryModel.insertMany(categories);
  console.log(`✅ Seeded ${created.length} categories`);
  return created;
};

/*
 *  functionName:- imgArr
 *  Description:-  Converts URL strings to image object array matching schema
 *  Arguments:-    urls - array of image URL strings
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const imgArr = (urls) =>
  urls.map((url, i) => ({ url, alt: "", isPrimary: i === 0 }));

/*
 *  functionName:- actArr
 *  Description:-  Converts activity strings to activity object array matching schema
 *  Arguments:-    activities - array of activity strings
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const actArr = (activities) =>
  activities.map((activity) => ({ activity, time: "", location: "" }));

/*
 *  functionName:- seedDestinations
 *  Description:-  Creates popular travel destinations with full details
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const seedDestinations = async () => {
  const destinations = [
    {
      name: "Goa",
      slug: "goa",
      country: "India",
      state: "Goa",
      description:
        "India's beach paradise with golden sands, vibrant nightlife, Portuguese heritage and fresh seafood. The perfect blend of relaxation and adventure.",
      shortDescription: "India's favourite beach destination with sun, sand and seafood.",
      images: imgArr([
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      highlights: ["Beach Parties", "Water Sports", "Portuguese Churches", "Spice Plantations", "Seafood"],
      climate: { type: "tropical", avgTemperatureCelsius: 28, rainfall: "High (June–Sept)", humidity: "High" },
      bestTimeToVisit: "November to February",
      bestMonths: ["November", "December", "January", "February"],
      languages: ["Konkani", "English", "Hindi"],
      currency: "INR",
      visaInfo: { required: false, notes: "Not required for Indian citizens" },
      rating: 4.6,
      isActive: true,
      isFeatured: true,
    },
    {
      name: "Kerala",
      slug: "kerala",
      country: "India",
      state: "Kerala",
      description:
        "God's Own Country — backwaters, houseboat cruises, lush hill stations, Ayurveda retreats and pristine beaches along the Malabar coast.",
      shortDescription: "Serene backwaters, tea gardens and Ayurveda in God's Own Country.",
      images: imgArr([
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
      highlights: ["Backwaters", "Houseboat", "Tea Plantations", "Ayurveda", "Wildlife Sanctuaries"],
      climate: { type: "tropical", avgTemperatureCelsius: 27, rainfall: "Very High (June–Aug)", humidity: "Very High" },
      bestTimeToVisit: "October to March",
      bestMonths: ["October", "November", "December", "January", "February", "March"],
      languages: ["Malayalam", "English"],
      currency: "INR",
      visaInfo: { required: false },
      rating: 4.8,
      isActive: true,
      isFeatured: true,
    },
    {
      name: "Rajasthan",
      slug: "rajasthan",
      country: "India",
      state: "Rajasthan",
      description:
        "The Land of Kings — magnificent forts, royal palaces, colorful bazaars, desert safaris and an unmatched royal heritage.",
      shortDescription: "Majestic forts, palaces and desert safaris in the Land of Kings.",
      images: imgArr([
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
      highlights: ["Forts & Palaces", "Desert Safari", "Camel Ride", "Traditional Cuisine", "Folk Music"],
      climate: { type: "arid", avgTemperatureCelsius: 32, rainfall: "Low", humidity: "Low" },
      bestTimeToVisit: "October to March",
      bestMonths: ["October", "November", "December", "January", "February", "March"],
      languages: ["Hindi", "Rajasthani", "English"],
      currency: "INR",
      visaInfo: { required: false },
      rating: 4.7,
      isActive: true,
      isFeatured: true,
    },
    {
      name: "Manali",
      slug: "manali",
      country: "India",
      state: "Himachal Pradesh",
      description:
        "Adventure capital of India — snow-capped peaks, Rohtang Pass, river rafting, skiing and beautiful Himalayan valleys.",
      shortDescription: "Snow adventures and Himalayan scenery in the adventure capital.",
      images: imgArr([
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
        "https://images.unsplash.com/photo-1597149514736-a0404f5e7e5b?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
      highlights: ["Snow Activities", "Rohtang Pass", "River Rafting", "Paragliding", "Hadimba Temple"],
      climate: { type: "continental", avgTemperatureCelsius: 10, rainfall: "Moderate", humidity: "Moderate" },
      bestTimeToVisit: "December to June",
      bestMonths: ["December", "January", "February", "March", "April", "May", "June"],
      languages: ["Hindi", "Pahari"],
      currency: "INR",
      visaInfo: { required: false },
      rating: 4.5,
      isActive: true,
      isFeatured: false,
    },
    {
      name: "Andaman Islands",
      slug: "andaman-islands",
      country: "India",
      state: "Andaman & Nicobar",
      description:
        "Pristine white-sand beaches, turquoise waters, coral reefs and historical cellular jail — a tropical paradise off India's east coast.",
      shortDescription: "Turquoise waters, coral reefs and pristine beaches in the Bay of Bengal.",
      images: imgArr([
        "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=800",
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=800",
      highlights: ["Scuba Diving", "Snorkeling", "Radhanagar Beach", "Cellular Jail", "Sea Walking"],
      climate: { type: "tropical", avgTemperatureCelsius: 29, rainfall: "High", humidity: "High" },
      bestTimeToVisit: "October to May",
      bestMonths: ["October", "November", "December", "January", "February", "March", "April", "May"],
      languages: ["Hindi", "Bengali", "English"],
      currency: "INR",
      visaInfo: { required: false },
      rating: 4.9,
      isActive: true,
      isFeatured: true,
    },
    {
      name: "Maldives",
      slug: "maldives",
      country: "Maldives",
      description:
        "The world's most luxurious island destination — overwater bungalows, coral reefs, private beaches and unrivaled sunset views.",
      shortDescription: "Overwater bungalows and coral reefs in the Indian Ocean paradise.",
      images: imgArr([
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      highlights: ["Overwater Bungalows", "Snorkeling", "Coral Reefs", "Private Beaches", "Dolphin Watching"],
      climate: { type: "tropical", avgTemperatureCelsius: 30, rainfall: "Moderate", humidity: "High" },
      bestTimeToVisit: "November to April",
      bestMonths: ["November", "December", "January", "February", "March", "April"],
      languages: ["Dhivehi", "English"],
      currency: "MVR",
      visaInfo: { required: false, type: "Visa on arrival for 30 days" },
      rating: 4.9,
      isActive: true,
      isFeatured: true,
    },
    {
      name: "Bali",
      slug: "bali",
      country: "Indonesia",
      description:
        "Island of the Gods — ancient temples, rice terraces, stunning beaches, world-class surfing and vibrant nightlife.",
      shortDescription: "Ancient temples, rice terraces and world-class surf in the Island of the Gods.",
      images: imgArr([
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      highlights: ["Temple Visits", "Rice Terraces", "Surfing", "Spa & Wellness", "Ubud Arts"],
      climate: { type: "tropical", avgTemperatureCelsius: 29, rainfall: "High (Nov–Mar)", humidity: "High" },
      bestTimeToVisit: "April to October",
      bestMonths: ["April", "May", "June", "July", "August", "September", "October"],
      languages: ["Balinese", "Indonesian", "English"],
      currency: "IDR",
      visaInfo: { required: true, type: "Visa on arrival (30 days, extendable)" },
      rating: 4.8,
      isActive: true,
      isFeatured: true,
    },
    {
      name: "Dubai",
      slug: "dubai",
      country: "UAE",
      description:
        "City of superlatives — Burj Khalifa, luxury shopping, desert safaris, gold souks and world-class entertainment.",
      shortDescription: "Burj Khalifa, desert safaris and luxury shopping in the city of superlatives.",
      images: imgArr([
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Gold Souk", "Palm Jumeirah"],
      climate: { type: "arid", avgTemperatureCelsius: 35, rainfall: "Very Low", humidity: "Low" },
      bestTimeToVisit: "November to March",
      bestMonths: ["November", "December", "January", "February", "March"],
      languages: ["Arabic", "English"],
      currency: "AED",
      visaInfo: { required: true, type: "Tourist visa (30 days) — Apply online", processingTime: "3-5 business days" },
      rating: 4.7,
      isActive: true,
      isFeatured: false,
    },
    {
      name: "Paris",
      slug: "paris",
      country: "France",
      description:
        "The City of Love — Eiffel Tower, world-class museums, haute cuisine, fashion and the romance of the Seine.",
      shortDescription: "Eiffel Tower, Louvre and the romance of the Seine in the City of Love.",
      images: imgArr([
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise", "French Cuisine", "Fashion Shopping"],
      climate: { type: "temperate", avgTemperatureCelsius: 15, rainfall: "Moderate", humidity: "Moderate" },
      bestTimeToVisit: "April to June, September to October",
      bestMonths: ["April", "May", "June", "September", "October"],
      languages: ["French", "English"],
      currency: "EUR",
      visaInfo: { required: true, type: "Schengen Visa", processingTime: "10-15 business days" },
      rating: 4.8,
      isActive: true,
      isFeatured: false,
    },
    {
      name: "London",
      slug: "london",
      country: "United Kingdom",
      description:
        "The world's most iconic city — Big Ben, Buckingham Palace, world-class museums, theatre and multicultural charm.",
      shortDescription: "Big Ben, Buckingham Palace and West End theatre in the world's most iconic city.",
      images: imgArr([
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
        "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
      highlights: ["Big Ben", "Buckingham Palace", "Tower of London", "West End Theatre", "British Museum"],
      climate: { type: "temperate", avgTemperatureCelsius: 12, rainfall: "Moderate", humidity: "Moderate" },
      bestTimeToVisit: "May to September",
      bestMonths: ["May", "June", "July", "August", "September"],
      languages: ["English"],
      currency: "GBP",
      visaInfo: { required: true, type: "UK Standard Visitor Visa", processingTime: "3 weeks" },
      rating: 4.7,
      isActive: true,
      isFeatured: false,
    },
  ];

  const created = await DestinationModel.insertMany(destinations);
  console.log(`✅ Seeded ${created.length} destinations`);
  return created;
};

/*
 *  functionName:- seedPackages
 *  Description:-  Creates 10 travel packages with full details, itinerary and pricing in INR
 *  Arguments:-    destinations, categories
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const seedPackages = async (destinations, categories) => {
  const destMap = Object.fromEntries(destinations.map((d) => [d.slug, d._id]));
  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c._id]));

  const packages = [
    {
      title: "Goa Beach Bliss — 5 Days",
      slug: "goa-beach-bliss-5-days",
      destination: destMap["goa"],
      category: catMap["beach"],
      description:
        "Experience the magic of Goa with its golden beaches, vibrant nightlife, Portuguese heritage and water sports. This 5-day package covers North and South Goa with the best beaches, shacks, and cultural sites.",
      shortDescription: "5 days of sun, sand and seafood on Goa's golden coast.",
      images: imgArr([
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
        "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      duration: { days: 5, nights: 4 },
      minGroupSize: 2,
      maxGroupSize: 15,
      basePrice: 24999,
      discountedPrice: 18999,
      discountPercent: 24,
      highlights: ["Private beach access", "Water sports (parasailing, jet ski)", "Portuguese church tour", "Spice plantation visit", "Sunset cruise"],
      inclusions: ["4-night accommodation (3-star hotel)", "Daily breakfast & dinner", "Airport transfers", "AC vehicle for sightseeing", "Water sports activities", "Expert local guide"],
      exclusions: ["Airfare", "Personal expenses", "Lunch", "Travel insurance", "Camera fees at monuments"],
      itinerary: [
        {
          day: 1, title: "Arrival & North Goa Exploration",
          description: "Airport pickup, check-in, evening at Calangute Beach, welcome dinner at a beach shack.",
          activities: actArr(["Airport transfer", "Hotel check-in", "Calangute Beach visit", "Welcome dinner"]),
        },
        {
          day: 2, title: "Water Sports & Beach Hopping",
          description: "Full day of water sports at Baga Beach, visit Anjuna flea market.",
          activities: actArr(["Parasailing", "Jet ski", "Banana boat ride", "Anjuna market"]),
        },
        {
          day: 3, title: "Cultural Heritage Tour",
          description: "Visit Old Goa churches, Panjim city tour, afternoon at Miramar Beach.",
          activities: actArr(["Basilica of Bom Jesus", "Se Cathedral", "Panjim heritage walk", "Miramar Beach"]),
        },
        {
          day: 4, title: "South Goa & Spice Plantation",
          description: "Explore pristine South Goa beaches and visit a spice plantation for lunch.",
          activities: actArr(["Palolem Beach", "Colva Beach", "Spice plantation tour", "Traditional Goan lunch"]),
        },
        {
          day: 5, title: "Leisure & Departure",
          description: "Morning leisure at beach, shopping at local markets, airport transfer.",
          activities: actArr(["Leisure morning", "Souvenir shopping", "Airport drop"]),
        },
      ],
      rating: 4.6,
      reviewCount: 124,
      isActive: true,
      isFeatured: true,
    },
    {
      title: "Kerala Backwaters & Hill Stations — 7 Days",
      slug: "kerala-backwaters-hill-stations-7-days",
      destination: destMap["kerala"],
      category: catMap["cultural"],
      description:
        "Cruise through serene backwaters on a traditional houseboat, explore misty Munnar tea gardens, and relax on Kovalam beach. Kerala at its most enchanting.",
      shortDescription: "Houseboats, tea gardens and Ayurveda in 7 days of Kerala magic.",
      images: imgArr([
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
      duration: { days: 7, nights: 6 },
      minGroupSize: 2,
      maxGroupSize: 12,
      basePrice: 42000,
      discountedPrice: 32999,
      discountPercent: 21,
      highlights: ["Alleppey houseboat overnight stay", "Munnar tea gardens", "Periyar wildlife sanctuary", "Kathakali performance", "Kovalam beach"],
      inclusions: ["6-night accommodation (3 nights hotel + 1 night houseboat + 2 nights resort)", "Daily breakfast", "Houseboat with all meals", "AC vehicle throughout", "Kathakali show tickets", "Guide"],
      exclusions: ["Airfare", "Lunch (except houseboat)", "Personal expenses", "Ayurveda treatments"],
      itinerary: [
        {
          day: 1, title: "Kochi Arrival & Fort Kochi Tour",
          description: "Arrive at Kochi, explore Fort Kochi, Chinese fishing nets.",
          activities: actArr(["Arrival", "Fort Kochi walk", "Chinese fishing nets", "Spice market"]),
        },
        {
          day: 2, title: "Munnar Hill Station",
          description: "Drive to Munnar, visit tea gardens and Echo Point.",
          activities: actArr(["Tea plantation tour", "Echo Point", "Mattupetty Dam", "Shopping"]),
        },
        {
          day: 3, title: "Munnar to Thekkady",
          description: "Periyar wildlife sanctuary boat ride, elephant interaction.",
          activities: actArr(["Periyar boat ride", "Spice gardens", "Elephant show"]),
        },
        {
          day: 4, title: "Alleppey Houseboat",
          description: "Board traditional Kerala houseboat, cruise through backwaters.",
          activities: actArr(["Houseboat boarding", "Backwater cruise", "Village visits", "Sunset views"]),
        },
        {
          day: 5, title: "Kovalam Beach",
          description: "Drive to Kovalam, relax at lighthouse beach.",
          activities: actArr(["Lighthouse Beach", "Ayurveda spa", "Beach walk"]),
        },
        {
          day: 6, title: "Trivandrum Cultural Tour",
          description: "Visit Padmanabhaswamy Temple, local markets, Kathakali show.",
          activities: actArr(["Temple visit", "Local markets", "Kathakali performance"]),
        },
        {
          day: 7, title: "Departure",
          description: "Morning leisure, airport transfer.",
          activities: actArr(["Leisure", "Airport drop"]),
        },
      ],
      rating: 4.8,
      reviewCount: 98,
      isActive: true,
      isFeatured: true,
    },
    {
      title: "Royal Rajasthan — 8 Days",
      slug: "royal-rajasthan-8-days",
      destination: destMap["rajasthan"],
      category: catMap["cultural"],
      description:
        "Explore the golden city of Jaisalmer, the blue city of Jodhpur, pink city Jaipur and the romantic lakes of Udaipur. A royal journey through Rajasthan's finest.",
      shortDescription: "8 days through Jaipur, Jodhpur, Jaisalmer and Udaipur.",
      images: imgArr([
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
      duration: { days: 8, nights: 7 },
      minGroupSize: 2,
      maxGroupSize: 20,
      basePrice: 58000,
      discountedPrice: 45999,
      discountPercent: 21,
      highlights: ["Jaisalmer desert safari", "Camel ride at sunset", "Amber Fort Jaipur", "City Palace Udaipur", "Lake Pichola boat ride"],
      inclusions: ["7-night accommodation (heritage hotels)", "Daily breakfast & dinner", "AC vehicle throughout", "All monument entry fees", "Camel ride", "Boat ride at Udaipur"],
      exclusions: ["Airfare", "Lunch", "Personal shopping", "Camera fees"],
      itinerary: [
        {
          day: 1, title: "Jaipur — The Pink City",
          description: "Arrive Jaipur, visit Hawa Mahal, local bazaars.",
          activities: actArr(["Hawa Mahal", "Jaipur bazaar", "Welcome dinner"]),
        },
        {
          day: 2, title: "Jaipur Forts & Palaces",
          description: "Amber Fort, City Palace, Jantar Mantar.",
          activities: actArr(["Amber Fort", "City Palace", "Jantar Mantar", "Elephant ride"]),
        },
        {
          day: 3, title: "Jaipur to Jodhpur",
          description: "Drive to Jodhpur, visit Mehrangarh Fort.",
          activities: actArr(["Mehrangarh Fort", "Jaswant Thada", "Blue City walk"]),
        },
        {
          day: 4, title: "Jodhpur to Jaisalmer",
          description: "Drive through desert landscape to Jaisalmer.",
          activities: actArr(["Jaisalmer Fort", "Patwon Ki Haveli", "Desert evening"]),
        },
        {
          day: 5, title: "Desert Safari",
          description: "Sam Sand Dunes, camel ride, cultural folk show at sunset.",
          activities: actArr(["Camel safari", "Sam Sand Dunes", "Folk music & dance"]),
        },
        {
          day: 6, title: "Jaisalmer to Udaipur",
          description: "Fly to Udaipur, evening at Lake Pichola.",
          activities: actArr(["Udaipur arrival", "Lake Pichola boat ride", "Sunset view"]),
        },
        {
          day: 7, title: "Udaipur City Tour",
          description: "City Palace, Saheliyon Ki Bari, Fateh Sagar Lake.",
          activities: actArr(["City Palace", "Garden visit", "Shopping", "Farewell dinner"]),
        },
        {
          day: 8, title: "Departure",
          description: "Airport transfer from Udaipur.",
          activities: actArr(["Airport drop"]),
        },
      ],
      rating: 4.7,
      reviewCount: 156,
      isActive: true,
      isFeatured: true,
    },
    {
      title: "Manali Snow Adventure — 6 Days",
      slug: "manali-snow-adventure-6-days",
      destination: destMap["manali"],
      category: catMap["adventure"],
      description:
        "Experience the thrill of snow-capped Himalayas. Rohtang Pass snow point, Solang Valley snow activities, river rafting in Beas and paragliding above Manali valley.",
      shortDescription: "Snow, paragliding and river rafting in the Himalayan adventure capital.",
      images: imgArr([
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
        "https://images.unsplash.com/photo-1597149514736-a0404f5e7e5b?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
      duration: { days: 6, nights: 5 },
      minGroupSize: 2,
      maxGroupSize: 15,
      basePrice: 29000,
      discountedPrice: 22999,
      discountPercent: 21,
      highlights: ["Rohtang Pass snow point", "Paragliding at Solang Valley", "River rafting in Beas", "Hadimba Temple", "Old Manali walk"],
      inclusions: ["5-night accommodation", "Daily breakfast & dinner", "AC vehicle", "Rohtang permits", "All adventure activities (paragliding, rafting)", "Guide"],
      exclusions: ["Airfare/bus fare", "Lunch", "Personal expenses", "Snow gear rental"],
      itinerary: [
        {
          day: 1, title: "Arrival at Manali",
          description: "Arrive from Delhi/Chandigarh, check-in, evening at Mall Road.",
          activities: actArr(["Arrival", "Mall Road", "Local market"]),
        },
        {
          day: 2, title: "Rohtang Pass",
          description: "Early morning drive to Rohtang, snow activities, scenic views.",
          activities: actArr(["Rohtang Pass", "Snow point", "Photography"]),
        },
        {
          day: 3, title: "Solang Valley Adventure",
          description: "Paragliding, zorbing, snow skiing at Solang Valley.",
          activities: actArr(["Paragliding", "Zorbing", "Skiing"]),
        },
        {
          day: 4, title: "River Rafting & Old Manali",
          description: "White water rafting in Beas River, explore Old Manali.",
          activities: actArr(["River rafting", "Hadimba Temple", "Old Manali"]),
        },
        {
          day: 5, title: "Naggar Castle & Kullu",
          description: "Visit Naggar Castle, Kullu Valley temples.",
          activities: actArr(["Naggar Castle", "Kullu Dussehra ground", "Vashisht hot springs"]),
        },
        {
          day: 6, title: "Departure",
          description: "Leisure morning, depart for Delhi.",
          activities: actArr(["Leisure", "Departure"]),
        },
      ],
      rating: 4.5,
      reviewCount: 87,
      isActive: true,
      isFeatured: false,
    },
    {
      title: "Andaman Tropical Paradise — 7 Days",
      slug: "andaman-tropical-paradise-7-days",
      destination: destMap["andaman-islands"],
      category: catMap["beach"],
      description:
        "Discover the emerald islands of Andaman — pristine Radhanagar Beach, scuba diving at Havelock, cellular jail and the magical bioluminescent waters.",
      shortDescription: "Scuba diving, pristine beaches and island hopping in the Andamans.",
      images: imgArr([
        "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=800",
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=800",
      duration: { days: 7, nights: 6 },
      minGroupSize: 2,
      maxGroupSize: 12,
      basePrice: 55000,
      discountedPrice: 42999,
      discountPercent: 22,
      highlights: ["Scuba diving at Havelock", "Radhanagar Beach", "Glass-bottom boat", "Cellular Jail", "Sea walking"],
      inclusions: ["6-night accommodation (3 nights Port Blair + 3 nights Havelock)", "Daily breakfast & dinner", "Ferry tickets", "All water activities", "Cellular Jail sound & light show"],
      exclusions: ["Airfare", "Lunch", "Scuba diving certification course", "Personal expenses"],
      itinerary: [
        {
          day: 1, title: "Port Blair Arrival",
          description: "Arrive Port Blair, Cellular Jail sound & light show.",
          activities: actArr(["Arrival", "Cellular Jail", "Local market"]),
        },
        {
          day: 2, title: "Ross Island & North Bay",
          description: "Snorkeling at North Bay, glass-bottom boat, Ross Island.",
          activities: actArr(["North Bay snorkeling", "Glass bottom boat", "Ross Island"]),
        },
        {
          day: 3, title: "Havelock Island",
          description: "Ferry to Havelock, evening at Elephant Beach.",
          activities: actArr(["Ferry to Havelock", "Elephant Beach", "Beach bonfire"]),
        },
        {
          day: 4, title: "Scuba Diving Day",
          description: "Full day scuba diving at Nemo Reef, sea walking.",
          activities: actArr(["Scuba diving", "Sea walking", "Snorkeling"]),
        },
        {
          day: 5, title: "Radhanagar Beach",
          description: "Rated Asia's best beach — sunrise walk and leisure.",
          activities: actArr(["Radhanagar Beach", "Beach walk", "Photography", "Kayaking"]),
        },
        {
          day: 6, title: "Neil Island Day Trip",
          description: "Day trip to Neil Island — natural rock bridge, beautiful beaches.",
          activities: actArr(["Natural Bridge", "Bharatpur Beach", "Sitapur Beach"]),
        },
        {
          day: 7, title: "Departure",
          description: "Return to Port Blair, airport transfer.",
          activities: actArr(["Airport drop"]),
        },
      ],
      rating: 4.9,
      reviewCount: 203,
      isActive: true,
      isFeatured: true,
    },
    {
      title: "Maldives Luxury Retreat — 5 Days",
      slug: "maldives-luxury-retreat-5-days",
      destination: destMap["maldives"],
      category: catMap["honeymoon"],
      description:
        "The ultimate luxury escape — private overwater bungalow, coral reef snorkeling, dolphin watching cruise, spa treatments and fine dining with ocean views.",
      shortDescription: "Overwater bungalow, dolphins and coral reefs in the Maldives.",
      images: imgArr([
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      duration: { days: 5, nights: 4 },
      minGroupSize: 2,
      maxGroupSize: 2,
      basePrice: 165000,
      discountedPrice: 124999,
      discountPercent: 24,
      highlights: ["Overwater bungalow", "Private snorkeling reef", "Dolphin watching cruise", "Couples spa", "Fine dining on the beach"],
      inclusions: ["4-night overwater bungalow", "All meals (breakfast, lunch, dinner)", "Speedboat transfers", "Snorkeling equipment", "Dolphin watching cruise", "One couple spa session"],
      exclusions: ["International airfare", "Scuba diving", "Alcohol", "Premium excursions"],
      itinerary: [
        {
          day: 1, title: "Arrival & Resort Check-in",
          description: "Speedboat transfer to resort, welcome drinks, romantic dinner setup.",
          activities: actArr(["Arrival", "Resort check-in", "Welcome drinks", "Romantic dinner"]),
        },
        {
          day: 2, title: "Snorkeling & Spa",
          description: "Morning snorkeling at house reef, afternoon couple spa.",
          activities: actArr(["House reef snorkeling", "Couple spa", "Sunset on deck"]),
        },
        {
          day: 3, title: "Island Hopping",
          description: "Visit local island, fishing village, sandbank picnic.",
          activities: actArr(["Local island tour", "Sandbank picnic", "Stargazing"]),
        },
        {
          day: 4, title: "Dolphin Watching & Water Sports",
          description: "Sunrise dolphin cruise, water sports, evening beach dinner.",
          activities: actArr(["Dolphin cruise", "Kayaking", "Paddleboard", "Beach dinner"]),
        },
        {
          day: 5, title: "Leisure & Departure",
          description: "Morning leisure, checkout and speedboat transfer.",
          activities: actArr(["Leisure", "Checkout", "Departure"]),
        },
      ],
      rating: 4.9,
      reviewCount: 67,
      isActive: true,
      isFeatured: true,
    },
    {
      title: "Bali Spirit & Surf — 8 Days",
      slug: "bali-spirit-surf-8-days",
      destination: destMap["bali"],
      category: catMap["adventure"],
      description:
        "Explore Bali's spiritual side with temple visits and yoga retreats, then catch waves at Kuta Beach. Rice terraces, waterfalls, and the most stunning sunsets.",
      shortDescription: "Temples, rice terraces, surfing and yoga in the Island of the Gods.",
      images: imgArr([
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      duration: { days: 8, nights: 7 },
      minGroupSize: 2,
      maxGroupSize: 15,
      basePrice: 82000,
      discountedPrice: 64999,
      discountPercent: 21,
      highlights: ["Tanah Lot temple at sunset", "Tegalalang rice terraces", "White water rafting", "Kuta surfing", "Ubud art scene"],
      inclusions: ["7-night accommodation (mix of hotel & villa)", "Daily breakfast", "Airport transfers", "All sightseeing with driver", "Surfing lesson", "White water rafting"],
      exclusions: ["International airfare", "Visa on arrival fees", "Lunch & dinner", "Personal spa", "Shopping"],
      itinerary: [
        {
          day: 1, title: "Arrival at Denpasar",
          description: "Airport pickup, check-in at Seminyak boutique hotel, Legian Beach sunset.",
          activities: actArr(["Arrival", "Beach walk", "Sunset dinner"]),
        },
        {
          day: 2, title: "Kuta & Seminyak",
          description: "Surfing lesson at Kuta, afternoon spa, evening at Seminyak beach clubs.",
          activities: actArr(["Surfing lesson", "Kuta Beach", "Spa", "Beach club"]),
        },
        {
          day: 3, title: "Ubud Cultural Day",
          description: "Sacred Monkey Forest, Ubud Art Market, Royal Palace.",
          activities: actArr(["Monkey Forest", "Ubud market", "Tegalalang Rice Terrace"]),
        },
        {
          day: 4, title: "Ubud Activities",
          description: "White water rafting, cooking class, traditional dance show.",
          activities: actArr(["White water rafting", "Cooking class", "Kecak dance"]),
        },
        {
          day: 5, title: "Temples & Waterfalls",
          description: "Tirta Empul holy spring, Uluwatu cliff temple.",
          activities: actArr(["Tirta Empul", "Uluwatu Temple", "Kecak fire dance"]),
        },
        {
          day: 6, title: "Mount Batur Sunrise Trek",
          description: "Pre-dawn trek to volcano, sunrise at 1717m.",
          activities: actArr(["Batur volcano trek", "Sunrise view", "Hot springs"]),
        },
        {
          day: 7, title: "Tanah Lot & Shopping",
          description: "Iconic ocean temple at sunset, shopping at Seminyak.",
          activities: actArr(["Tanah Lot temple", "Sunset photography", "Shopping"]),
        },
        {
          day: 8, title: "Departure",
          description: "Leisure morning, airport transfer.",
          activities: actArr(["Leisure", "Airport drop"]),
        },
      ],
      rating: 4.8,
      reviewCount: 145,
      isActive: true,
      isFeatured: false,
    },
    {
      title: "Dubai City Glamour — 5 Days",
      slug: "dubai-city-glamour-5-days",
      destination: destMap["dubai"],
      category: catMap["cultural"],
      description:
        "Experience the best of Dubai — top of Burj Khalifa, desert safari with BBQ dinner, dhow cruise on Dubai Creek, Dubai Mall and stunning Palm Jumeirah.",
      shortDescription: "Burj Khalifa, desert safari and dhow cruise in 5 days of Dubai glamour.",
      images: imgArr([
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      duration: { days: 5, nights: 4 },
      minGroupSize: 2,
      maxGroupSize: 20,
      basePrice: 74000,
      discountedPrice: 58999,
      discountPercent: 20,
      highlights: ["Burj Khalifa Top", "Desert safari BBQ", "Dhow cruise dinner", "Dubai Mall", "Palm Jumeirah"],
      inclusions: ["4-night 4-star accommodation", "Daily breakfast", "Airport transfers", "Burj Khalifa tickets", "Desert safari with BBQ dinner", "Dhow cruise dinner"],
      exclusions: ["International airfare", "UAE visa", "Lunch", "Alcohol", "Personal shopping"],
      itinerary: [
        {
          day: 1, title: "Dubai Arrival",
          description: "Arrive Dubai, hotel check-in, evening Dubai Frame and Deira Gold Souk.",
          activities: actArr(["Arrival", "Dubai Frame", "Gold Souk", "Spice Souk"]),
        },
        {
          day: 2, title: "Modern Dubai",
          description: "Burj Khalifa At the Top, Dubai Fountain, Dubai Mall.",
          activities: actArr(["Burj Khalifa", "Dubai Fountain show", "Dubai Mall", "Aquarium"]),
        },
        {
          day: 3, title: "Desert Safari",
          description: "Afternoon dune bashing, camel ride, sunset, BBQ dinner with show.",
          activities: actArr(["Dune bashing", "Camel ride", "Henna tattooing", "BBQ dinner", "Belly dance"]),
        },
        {
          day: 4, title: "Palm Jumeirah & Dhow Cruise",
          description: "Palm Jumeirah monorail, Atlantis view, evening dhow cruise dinner.",
          activities: actArr(["Palm Jumeirah", "Atlantis view", "Dhow cruise", "Creek dinner"]),
        },
        {
          day: 5, title: "Shopping & Departure",
          description: "Mall of Emirates, Ski Dubai (optional), airport transfer.",
          activities: actArr(["Mall of Emirates", "Shopping", "Airport drop"]),
        },
      ],
      rating: 4.7,
      reviewCount: 178,
      isActive: true,
      isFeatured: false,
    },
    {
      title: "Paris Romance — 6 Days",
      slug: "paris-romance-6-days",
      destination: destMap["paris"],
      category: catMap["honeymoon"],
      description:
        "The ultimate romantic escape — Eiffel Tower at dusk, Seine River cruise, Versailles gardens, Moulin Rouge and the finest French cuisine.",
      shortDescription: "Eiffel Tower, Versailles and Seine cruise in 6 romantic days in Paris.",
      images: imgArr([
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      duration: { days: 6, nights: 5 },
      minGroupSize: 2,
      maxGroupSize: 10,
      basePrice: 175000,
      discountedPrice: 139999,
      discountPercent: 20,
      highlights: ["Eiffel Tower night visit", "Seine River cruise", "Versailles Palace", "Louvre Museum", "Moulin Rouge show"],
      inclusions: ["5-night boutique hotel in central Paris", "Daily French breakfast", "Airport transfers", "Paris city pass", "Seine river cruise", "Versailles day trip"],
      exclusions: ["International airfare", "Schengen visa", "Lunch & dinner", "Moulin Rouge tickets", "Personal shopping"],
      itinerary: [
        {
          day: 1, title: "Bonjour Paris",
          description: "Arrive Paris, check-in, evening Eiffel Tower illuminated.",
          activities: actArr(["Arrival", "Champs-Elysees walk", "Eiffel Tower at night"]),
        },
        {
          day: 2, title: "Louvre & Central Paris",
          description: "Louvre Museum, Notre Dame, Ile de la Cite.",
          activities: actArr(["Louvre Museum", "Notre Dame", "Latin Quarter", "Seine walk"]),
        },
        {
          day: 3, title: "Versailles Day Trip",
          description: "Full day at Palace of Versailles and its magnificent gardens.",
          activities: actArr(["Palace of Versailles", "Hall of Mirrors", "Gardens", "Marie Antoinette estate"]),
        },
        {
          day: 4, title: "Montmartre & Sacre-Coeur",
          description: "Artistic Montmartre, Sacre-Coeur, Moulin Rouge area.",
          activities: actArr(["Sacre-Coeur", "Montmartre artists", "Moulin Rouge photo stop", "Pigalle"]),
        },
        {
          day: 5, title: "Seine River Cruise & Shopping",
          description: "Morning cruise, afternoon at Marais district and luxury shopping.",
          activities: actArr(["Seine cruise", "Le Marais", "Place Vendome", "Romantic dinner"]),
        },
        {
          day: 6, title: "Au Revoir Paris",
          description: "Leisure morning, last French pastry, airport transfer.",
          activities: actArr(["Cafe breakfast", "Last shopping", "Airport drop"]),
        },
      ],
      rating: 4.8,
      reviewCount: 92,
      isActive: true,
      isFeatured: false,
    },
    {
      title: "London Classic — 7 Days",
      slug: "london-classic-7-days",
      destination: destMap["london"],
      category: catMap["cultural"],
      description:
        "Discover London's iconic landmarks — Buckingham Palace, Tower of London, British Museum, Harry Potter Studio and a quintessential English countryside day trip.",
      shortDescription: "Big Ben, Harry Potter Studios and royal London in 7 classic days.",
      images: imgArr([
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
        "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800",
      ]),
      coverImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
      duration: { days: 7, nights: 6 },
      minGroupSize: 2,
      maxGroupSize: 20,
      basePrice: 185000,
      discountedPrice: 149999,
      discountPercent: 19,
      highlights: ["Buckingham Palace", "Tower of London", "Harry Potter Studios", "Thames River cruise", "Windsor Castle day trip"],
      inclusions: ["6-night central London hotel", "Daily breakfast", "Oyster card (3-day)", "Thames River cruise", "Harry Potter Studio tour", "Windsor Castle entry"],
      exclusions: ["International airfare", "UK visa", "Dinner", "West End theatre tickets", "Personal shopping"],
      itinerary: [
        {
          day: 1, title: "Welcome to London",
          description: "Arrive London, check-in, evening Westminster bridge walk.",
          activities: actArr(["Arrival", "Westminster Bridge", "Big Ben", "Thames walk"]),
        },
        {
          day: 2, title: "Royal London",
          description: "Buckingham Palace changing of guard, Hyde Park, Harrods.",
          activities: actArr(["Buckingham Palace", "Changing of Guard", "Hyde Park", "Harrods"]),
        },
        {
          day: 3, title: "Historical London",
          description: "Tower of London, Tower Bridge, Borough Market.",
          activities: actArr(["Tower of London", "Tower Bridge", "Borough Market", "Shakespeare Globe"]),
        },
        {
          day: 4, title: "Harry Potter Studios",
          description: "Day trip to Warner Bros. Studio, behind-the-scenes magic.",
          activities: actArr(["Harry Potter Tour", "Platform 9 3/4", "Butterbeer", "Hogwarts Great Hall"]),
        },
        {
          day: 5, title: "Museums & Culture",
          description: "British Museum, National Gallery, Covent Garden street performance.",
          activities: actArr(["British Museum", "National Gallery", "Covent Garden", "West End stroll"]),
        },
        {
          day: 6, title: "Windsor Castle Day Trip",
          description: "Windsor Castle, Eton College, evening in Soho.",
          activities: actArr(["Windsor Castle", "Eton College", "Soho dinner"]),
        },
        {
          day: 7, title: "Departure",
          description: "Leisure morning, airport transfer.",
          activities: actArr(["Leisure", "Final shopping", "Airport drop"]),
        },
      ],
      rating: 4.7,
      reviewCount: 73,
      isActive: true,
      isFeatured: false,
    },
  ];

  const created = await PackageModel.insertMany(packages);
  console.log(`✅ Seeded ${created.length} packages`);
  return created;
};

/*
 *  functionName:- runSeed
 *  Description:-  Main seed runner — connects to DB, runs all seeders, disconnects
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const runSeed = async () => {
  try {
    await connectDB();
    console.log("\n🌱 Starting database seeding...\n");

    await clearCollections();
    await seedUsers();
    const categories = await seedCategories();
    const destinations = await seedDestinations();
    await seedPackages(destinations, categories);

    console.log("\n✅ Database seeding completed successfully!\n");
    console.log("Admin Credentials:");
    console.log("  Email:    admin@wanderlux.com");
    console.log("  Password: Admin@1234\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

runSeed();
