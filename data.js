// LocalHarvest – Mock Data

// Farmer contact directory
const FARMER_CONTACTS = {
  "Mang Pedro Santos":   "09171234567",
  "Aling Rosa Cruz":     "09281234567",
  "Totoy Reyes Farm":    "09351234567",
  "Ben Dela Torre":      "09461234567",
  "Nena Villanueva":     "09571234567",
  "Kuya Rodel Farms":    "09181234567",
  "Ate Cora Produce":    "09291234567",
  "Manong Berto":        "09371234567",
  "Lola Caring Organics":"09481234567",
  "Flores Family Farm":  "09561234567",
  "Dalisay Livestock":   "09671234567",
  "Jun Seafoods":        "09781234567",
  "Magsaysay Grains Co": "09171239999",
  "Bagong Silang Farm":  "09281239999",
  "Mountain View Herbs":  "09391234567"
};

const PRODUCTS = [

  // ─── VEGETABLES ─────────────────────────────────────────────
  { id:1,   name:"Sweet Corn",               category:"vegetables", price:25,   unit:"piece",  quantity:80,  emoji:"🌽", farmer:"Mang Pedro Santos",   farmerPhone:"09171234567", location:"Toril, Davao City",          distance:1.2, farmerEmoji:"👨‍🌾" },
  { id:2,   name:"Fresh Tomatoes",            category:"vegetables", price:45,   unit:"kg",     quantity:30,  emoji:"🍅", farmer:"Aling Rosa Cruz",     farmerPhone:"09281234567", location:"Calinan, Davao City",         distance:3.5, farmerEmoji:"👩‍🌾" },
  { id:3,   name:"Pechay (Bok Choy)",         category:"vegetables", price:30,   unit:"bundle", quantity:45,  emoji:"🥬", farmer:"Mang Pedro Santos",   farmerPhone:"09171234567", location:"Toril, Davao City",          distance:1.2, farmerEmoji:"👨‍🌾" },
  { id:4,   name:"Camote (Sweet Potato)",     category:"vegetables", price:40,   unit:"kg",     quantity:60,  emoji:"🍠", farmer:"Ben Dela Torre",      farmerPhone:"09461234567", location:"Baguio District, Davao",      distance:5.1, farmerEmoji:"👨‍🌾" },
  { id:5,   name:"Bitter Melon (Ampalaya)",   category:"vegetables", price:35,   unit:"kg",     quantity:15,  emoji:"🥒", farmer:"Ben Dela Torre",      farmerPhone:"09461234567", location:"Baguio District, Davao",      distance:5.1, farmerEmoji:"👨‍🌾" },
  { id:6,   name:"Eggplant (Talong)",         category:"vegetables", price:30,   unit:"kg",     quantity:40,  emoji:"🍆", farmer:"Aling Rosa Cruz",     farmerPhone:"09281234567", location:"Calinan, Davao City",         distance:3.5, farmerEmoji:"👩‍🌾" },
  { id:7,   name:"Sitaw (String Beans)",      category:"vegetables", price:25,   unit:"bundle", quantity:50,  emoji:"🫘", farmer:"Nena Villanueva",     farmerPhone:"09571234567", location:"Marilog, Davao City",         distance:6.2, farmerEmoji:"👩‍🌾" },
  { id:8,   name:"Okra (Ladies Finger)",      category:"vegetables", price:28,   unit:"bundle", quantity:35,  emoji:"🌿", farmer:"Nena Villanueva",     farmerPhone:"09571234567", location:"Marilog, Davao City",         distance:6.2, farmerEmoji:"👩‍🌾" },
  { id:9,   name:"Squash (Kalabasa)",         category:"vegetables", price:35,   unit:"kg",     quantity:55,  emoji:"🎃", farmer:"Manong Berto",        farmerPhone:"09371234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"👨‍🌾" },
  { id:10,  name:"Cabbage (Repolyo)",         category:"vegetables", price:40,   unit:"piece",  quantity:30,  emoji:"🥦", farmer:"Lola Caring Organics",farmerPhone:"09481234567", location:"Buda, Davao City",            distance:7.8, farmerEmoji:"👩‍🌾" },
  { id:11,  name:"Kangkong (Water Spinach)",  category:"vegetables", price:15,   unit:"bundle", quantity:70,  emoji:"🥬", farmer:"Mang Pedro Santos",   farmerPhone:"09171234567", location:"Toril, Davao City",          distance:1.2, farmerEmoji:"👨‍🌾" },
  { id:12,  name:"Malunggay (Moringa)",       category:"vegetables", price:10,   unit:"bundle", quantity:90,  emoji:"🌱", farmer:"Aling Rosa Cruz",     farmerPhone:"09281234567", location:"Calinan, Davao City",         distance:3.5, farmerEmoji:"👩‍🌾" },
  { id:13,  name:"Carrot",                    category:"vegetables", price:55,   unit:"kg",     quantity:25,  emoji:"🥕", farmer:"Lola Caring Organics",farmerPhone:"09481234567", location:"Buda, Davao City",            distance:7.8, farmerEmoji:"👩‍🌾" },
  { id:14,  name:"Radish (Labanos)",          category:"vegetables", price:20,   unit:"bundle", quantity:40,  emoji:"🫚", farmer:"Nena Villanueva",     farmerPhone:"09571234567", location:"Marilog, Davao City",         distance:6.2, farmerEmoji:"👩‍🌾" },
  { id:15,  name:"Garlic (Bawang)",           category:"vegetables", price:120,  unit:"kg",     quantity:20,  emoji:"🧄", farmer:"Manong Berto",        farmerPhone:"09371234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"👨‍🌾" },
  { id:16,  name:"Onion (Sibuyas)",           category:"vegetables", price:90,   unit:"kg",     quantity:30,  emoji:"🧅", farmer:"Manong Berto",        farmerPhone:"09371234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"👨‍🌾" },
  { id:17,  name:"Ginger (Luya)",             category:"vegetables", price:80,   unit:"kg",     quantity:25,  emoji:"🫚", farmer:"Ben Dela Torre",      farmerPhone:"09461234567", location:"Baguio District, Davao",      distance:5.1, farmerEmoji:"👨‍🌾" },
  { id:18,  name:"Potato",                    category:"vegetables", price:65,   unit:"kg",     quantity:40,  emoji:"🥔", farmer:"Lola Caring Organics",farmerPhone:"09481234567", location:"Buda, Davao City",            distance:7.8, farmerEmoji:"👩‍🌾" },
  { id:19,  name:"Sayote (Chayote)",          category:"vegetables", price:20,   unit:"piece",  quantity:60,  emoji:"🍏", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },
  { id:20,  name:"Bell Pepper (Paminta)",     category:"vegetables", price:75,   unit:"kg",     quantity:20,  emoji:"🫑", farmer:"Lola Caring Organics",farmerPhone:"09481234567", location:"Buda, Davao City",            distance:7.8, farmerEmoji:"👩‍🌾" },
  { id:21,  name:"Upo (Bottle Gourd)",        category:"vegetables", price:25,   unit:"piece",  quantity:35,  emoji:"🥒", farmer:"Nena Villanueva",     farmerPhone:"09571234567", location:"Marilog, Davao City",         distance:6.2, farmerEmoji:"👩‍🌾" },
  { id:22,  name:"Cucumber (Pipino)",         category:"vegetables", price:30,   unit:"kg",     quantity:45,  emoji:"🥒", farmer:"Aling Rosa Cruz",     farmerPhone:"09281234567", location:"Calinan, Davao City",         distance:3.5, farmerEmoji:"👩‍🌾" },
  { id:23,  name:"Taro (Gabi)",               category:"vegetables", price:35,   unit:"kg",     quantity:30,  emoji:"🍠", farmer:"Manong Berto",        farmerPhone:"09371234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"👨‍🌾" },
  { id:24,  name:"Cassava (Kamoteng Kahoy)",  category:"vegetables", price:30,   unit:"kg",     quantity:50,  emoji:"🍠", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },
  { id:25,  name:"Munggo (Mung Beans)",       category:"vegetables", price:90,   unit:"kg",     quantity:40,  emoji:"🫘", farmer:"Bagong Silang Farm",  farmerPhone:"09281239999", location:"Bunawan, Davao City",         distance:8.1, farmerEmoji:"🧑‍🌾" },
  { id:26,  name:"Patola (Luffa)",            category:"vegetables", price:20,   unit:"piece",  quantity:35,  emoji:"🥒", farmer:"Nena Villanueva",     farmerPhone:"09571234567", location:"Marilog, Davao City",         distance:6.2, farmerEmoji:"👩‍🌾" },
  { id:27,  name:"Bataw (Hyacinth Bean)",     category:"vegetables", price:25,   unit:"bundle", quantity:25,  emoji:"🫘", farmer:"Ben Dela Torre",      farmerPhone:"09461234567", location:"Baguio District, Davao",      distance:5.1, farmerEmoji:"👨‍🌾" },
  { id:28,  name:"Paria (Bitter Gourd)",      category:"vegetables", price:30,   unit:"kg",     quantity:20,  emoji:"🥒", farmer:"Manong Berto",        farmerPhone:"09371234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"👨‍🌾" },

  // ─── FRUITS ─────────────────────────────────────────────────
  { id:100, name:"Ripe Mangoes",              category:"fruits",     price:60,   unit:"kg",     quantity:20,  emoji:"🥭", farmer:"Totoy Reyes Farm",    farmerPhone:"09351234567", location:"Tugbok, Davao City",          distance:2.8, farmerEmoji:"🧑‍🌾" },
  { id:101, name:"Lakatan Bananas",           category:"fruits",     price:35,   unit:"kg",     quantity:50,  emoji:"🍌", farmer:"Aling Rosa Cruz",     farmerPhone:"09281234567", location:"Calinan, Davao City",         distance:3.5, farmerEmoji:"👩‍🌾" },
  { id:102, name:"Papaya",                    category:"fruits",     price:25,   unit:"piece",  quantity:40,  emoji:"🍈", farmer:"Aling Rosa Cruz",     farmerPhone:"09281234567", location:"Calinan, Davao City",         distance:3.5, farmerEmoji:"👩‍🌾" },
  { id:103, name:"Durian (Puyat)",            category:"fruits",     price:180,  unit:"kg",     quantity:15,  emoji:"🥝", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:104, name:"Durian (Arancillo)",        category:"fruits",     price:200,  unit:"kg",     quantity:10,  emoji:"🥝", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:105, name:"Cavendish Banana",          category:"fruits",     price:40,   unit:"kg",     quantity:80,  emoji:"🍌", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },
  { id:106, name:"Saba Banana",               category:"fruits",     price:30,   unit:"kg",     quantity:60,  emoji:"🍌", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },
  { id:107, name:"Pineapple (Pinya)",         category:"fruits",     price:50,   unit:"piece",  quantity:30,  emoji:"🍍", farmer:"Totoy Reyes Farm",    farmerPhone:"09351234567", location:"Tugbok, Davao City",          distance:2.8, farmerEmoji:"🧑‍🌾" },
  { id:108, name:"Coconut (Buko)",            category:"fruits",     price:25,   unit:"piece",  quantity:100, emoji:"🥥", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:109, name:"Mature Coconut (Niyog)",    category:"fruits",     price:20,   unit:"piece",  quantity:120, emoji:"🥥", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:110, name:"Watermelon (Pakwan)",       category:"fruits",     price:35,   unit:"kg",     quantity:25,  emoji:"🍉", farmer:"Manong Berto",        farmerPhone:"09371234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"👨‍🌾" },
  { id:111, name:"Calamansi",                 category:"fruits",     price:40,   unit:"kg",     quantity:40,  emoji:"🍋", farmer:"Nena Villanueva",     farmerPhone:"09571234567", location:"Marilog, Davao City",         distance:6.2, farmerEmoji:"👩‍🌾" },
  { id:112, name:"Rambutan",                  category:"fruits",     price:55,   unit:"kg",     quantity:20,  emoji:"🍒", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:113, name:"Lanzones",                  category:"fruits",     price:70,   unit:"kg",     quantity:15,  emoji:"🍇", farmer:"Bagong Silang Farm",  farmerPhone:"09281239999", location:"Bunawan, Davao City",         distance:8.1, farmerEmoji:"🧑‍🌾" },
  { id:114, name:"Marang",                    category:"fruits",     price:80,   unit:"piece",  quantity:12,  emoji:"🍈", farmer:"Bagong Silang Farm",  farmerPhone:"09281239999", location:"Bunawan, Davao City",         distance:8.1, farmerEmoji:"🧑‍🌾" },
  { id:115, name:"Jackfruit (Langka)",        category:"fruits",     price:35,   unit:"kg",     quantity:20,  emoji:"🍈", farmer:"Totoy Reyes Farm",    farmerPhone:"09351234567", location:"Tugbok, Davao City",          distance:2.8, farmerEmoji:"🧑‍🌾" },
  { id:116, name:"Guava (Bayabas)",           category:"fruits",     price:30,   unit:"kg",     quantity:30,  emoji:"🍏", farmer:"Nena Villanueva",     farmerPhone:"09571234567", location:"Marilog, Davao City",         distance:6.2, farmerEmoji:"👩‍🌾" },
  { id:117, name:"Star Apple (Kaimito)",      category:"fruits",     price:45,   unit:"kg",     quantity:20,  emoji:"🍇", farmer:"Mang Pedro Santos",   farmerPhone:"09171234567", location:"Toril, Davao City",          distance:1.2, farmerEmoji:"👨‍🌾" },
  { id:118, name:"Pomelo (Suha)",             category:"fruits",     price:50,   unit:"piece",  quantity:25,  emoji:"🍊", farmer:"Manong Berto",        farmerPhone:"09371234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"👨‍🌾" },
  { id:119, name:"Avocado",                   category:"fruits",     price:75,   unit:"kg",     quantity:18,  emoji:"🥑", farmer:"Lola Caring Organics",farmerPhone:"09481234567", location:"Buda, Davao City",            distance:7.8, farmerEmoji:"👩‍🌾" },
  { id:120, name:"Tamarind (Sampalok)",       category:"fruits",     price:35,   unit:"kg",     quantity:22,  emoji:"🫐", farmer:"Aling Rosa Cruz",     farmerPhone:"09281234567", location:"Calinan, Davao City",         distance:3.5, farmerEmoji:"👩‍🌾" },
  { id:121, name:"Santol",                    category:"fruits",     price:40,   unit:"kg",     quantity:15,  emoji:"🍑", farmer:"Bagong Silang Farm",  farmerPhone:"09281239999", location:"Bunawan, Davao City",         distance:8.1, farmerEmoji:"🧑‍🌾" },
  { id:122, name:"Mangosteen",                category:"fruits",     price:120,  unit:"kg",     quantity:10,  emoji:"🍒", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:123, name:"Dragon Fruit",              category:"fruits",     price:90,   unit:"kg",     quantity:18,  emoji:"🐲", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },
  { id:124, name:"Strawberry",                category:"fruits",     price:150,  unit:"kg",     quantity:8,   emoji:"🍓", farmer:"Lola Caring Organics",farmerPhone:"09481234567", location:"Buda, Davao City",            distance:7.8, farmerEmoji:"👩‍🌾" },
  { id:125, name:"Passion Fruit (Maracuya)",  category:"fruits",     price:80,   unit:"kg",     quantity:12,  emoji:"🍈", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:126, name:"Guyabano (Soursop)",        category:"fruits",     price:65,   unit:"kg",     quantity:14,  emoji:"🍏", farmer:"Bagong Silang Farm",  farmerPhone:"09281239999", location:"Bunawan, Davao City",         distance:8.1, farmerEmoji:"🧑‍🌾" },
  { id:127, name:"Atis (Sugar Apple)",        category:"fruits",     price:55,   unit:"kg",     quantity:16,  emoji:"🍏", farmer:"Totoy Reyes Farm",    farmerPhone:"09351234567", location:"Tugbok, Davao City",          distance:2.8, farmerEmoji:"🧑‍🌾" },

  // ─── GRAINS & LEGUMES ────────────────────────────────────────
  { id:200, name:"White Rice (Bigas)",        category:"grains",     price:52,   unit:"kg",     quantity:100, emoji:"🌾", farmer:"Totoy Reyes Farm",    farmerPhone:"09351234567", location:"Tugbok, Davao City",          distance:2.8, farmerEmoji:"🧑‍🌾" },
  { id:201, name:"Brown Rice",                category:"grains",     price:65,   unit:"kg",     quantity:75,  emoji:"🍚", farmer:"Totoy Reyes Farm",    farmerPhone:"09351234567", location:"Tugbok, Davao City",          distance:2.8, farmerEmoji:"🧑‍🌾" },
  { id:202, name:"Glutinous Rice (Malagkit)", category:"grains",     price:70,   unit:"kg",     quantity:50,  emoji:"🍚", farmer:"Magsaysay Grains Co", farmerPhone:"09171239999", location:"Tugbok, Davao City",          distance:3.0, farmerEmoji:"🧑‍🌾" },
  { id:203, name:"Black Rice (Pirurutong)",   category:"grains",     price:90,   unit:"kg",     quantity:30,  emoji:"🍚", farmer:"Magsaysay Grains Co", farmerPhone:"09171239999", location:"Tugbok, Davao City",          distance:3.0, farmerEmoji:"🧑‍🌾" },
  { id:204, name:"Corn (Mais) – Dried",       category:"grains",     price:30,   unit:"kg",     quantity:80,  emoji:"🌽", farmer:"Mang Pedro Santos",   farmerPhone:"09171234567", location:"Toril, Davao City",          distance:1.2, farmerEmoji:"👨‍🌾" },
  { id:205, name:"Yellow Corn Grits",         category:"grains",     price:35,   unit:"kg",     quantity:60,  emoji:"🌽", farmer:"Magsaysay Grains Co", farmerPhone:"09171239999", location:"Tugbok, Davao City",          distance:3.0, farmerEmoji:"🧑‍🌾" },
  { id:206, name:"Mung Beans (Munggo)",       category:"grains",     price:90,   unit:"kg",     quantity:40,  emoji:"🫘", farmer:"Bagong Silang Farm",  farmerPhone:"09281239999", location:"Bunawan, Davao City",         distance:8.1, farmerEmoji:"🧑‍🌾" },
  { id:207, name:"Red Kidney Beans",          category:"grains",     price:100,  unit:"kg",     quantity:30,  emoji:"🫘", farmer:"Bagong Silang Farm",  farmerPhone:"09281239999", location:"Bunawan, Davao City",         distance:8.1, farmerEmoji:"🧑‍🌾" },
  { id:208, name:"Black Beans (Itim na Gisantes)",category:"grains", price:95,   unit:"kg",     quantity:25,  emoji:"🫘", farmer:"Magsaysay Grains Co", farmerPhone:"09171239999", location:"Tugbok, Davao City",          distance:3.0, farmerEmoji:"🧑‍🌾" },
  { id:209, name:"Soybean",                   category:"grains",     price:80,   unit:"kg",     quantity:35,  emoji:"🫘", farmer:"Ben Dela Torre",      farmerPhone:"09461234567", location:"Baguio District, Davao",      distance:5.1, farmerEmoji:"👨‍🌾" },
  { id:210, name:"Peanuts (Mani)",            category:"grains",     price:75,   unit:"kg",     quantity:45,  emoji:"🥜", farmer:"Manong Berto",        farmerPhone:"09371234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"👨‍🌾" },
  { id:211, name:"Sesame Seeds (Linga)",      category:"grains",     price:120,  unit:"kg",     quantity:15,  emoji:"🌾", farmer:"Magsaysay Grains Co", farmerPhone:"09171239999", location:"Tugbok, Davao City",          distance:3.0, farmerEmoji:"🧑‍🌾" },
  { id:212, name:"Oats",                      category:"grains",     price:130,  unit:"kg",     quantity:20,  emoji:"🌾", farmer:"Magsaysay Grains Co", farmerPhone:"09171239999", location:"Tugbok, Davao City",          distance:3.0, farmerEmoji:"🧑‍🌾" },

  // ─── HERBS & SPICES ──────────────────────────────────────────
  { id:300, name:"Lemongrass (Tanglad)",      category:"herbs",      price:15,   unit:"bundle", quantity:25,  emoji:"🌿", farmer:"Mang Pedro Santos",   farmerPhone:"09171234567", location:"Toril, Davao City",          distance:1.2, farmerEmoji:"👨‍🌾" },
  { id:301, name:"Basil (Balanoy)",           category:"herbs",      price:20,   unit:"bundle", quantity:30,  emoji:"🌱", farmer:"Mang Pedro Santos",   farmerPhone:"09171234567", location:"Toril, Davao City",          distance:1.2, farmerEmoji:"👨‍🌾" },
  { id:302, name:"Pandan (Screwpine)",        category:"herbs",      price:15,   unit:"bundle", quantity:40,  emoji:"🌿", farmer:"Aling Rosa Cruz",     farmerPhone:"09281234567", location:"Calinan, Davao City",         distance:3.5, farmerEmoji:"👩‍🌾" },
  { id:303, name:"Turmeric (Luyang Dilaw)",   category:"herbs",      price:60,   unit:"kg",     quantity:20,  emoji:"🌿", farmer:"Mountain View Herbs",  farmerPhone:"09391234567", location:"Marilog, Davao City",         distance:6.5, farmerEmoji:"🧑‍🌾" },
  { id:304, name:"Oregano",                   category:"herbs",      price:25,   unit:"bundle", quantity:30,  emoji:"🌱", farmer:"Mountain View Herbs",  farmerPhone:"09391234567", location:"Marilog, Davao City",         distance:6.5, farmerEmoji:"🧑‍🌾" },
  { id:305, name:"Peppercorn (Paminta)",      category:"herbs",      price:100,  unit:"kg",     quantity:15,  emoji:"🌿", farmer:"Mountain View Herbs",  farmerPhone:"09391234567", location:"Marilog, Davao City",         distance:6.5, farmerEmoji:"🧑‍🌾" },
  { id:306, name:"Chili (Siling Labuyo)",     category:"herbs",      price:80,   unit:"kg",     quantity:20,  emoji:"🌶️", farmer:"Nena Villanueva",     farmerPhone:"09571234567", location:"Marilog, Davao City",         distance:6.2, farmerEmoji:"👩‍🌾" },
  { id:307, name:"Chili (Siling Haba)",       category:"herbs",      price:55,   unit:"kg",     quantity:25,  emoji:"🌶️", farmer:"Nena Villanueva",     farmerPhone:"09571234567", location:"Marilog, Davao City",         distance:6.2, farmerEmoji:"👩‍🌾" },
  { id:308, name:"Mint (Yerba Buena)",        category:"herbs",      price:20,   unit:"bundle", quantity:35,  emoji:"🌱", farmer:"Mountain View Herbs",  farmerPhone:"09391234567", location:"Marilog, Davao City",         distance:6.5, farmerEmoji:"🧑‍🌾" },
  { id:309, name:"Bay Leaves (Laurel)",       category:"herbs",      price:15,   unit:"pack",   quantity:50,  emoji:"🍃", farmer:"Lola Caring Organics",farmerPhone:"09481234567", location:"Buda, Davao City",            distance:7.8, farmerEmoji:"👩‍🌾" },
  { id:310, name:"Rosemary",                  category:"herbs",      price:30,   unit:"bundle", quantity:20,  emoji:"🌿", farmer:"Mountain View Herbs",  farmerPhone:"09391234567", location:"Marilog, Davao City",         distance:6.5, farmerEmoji:"🧑‍🌾" },
  { id:311, name:"Spring Onion (Sibuyas Dahon)",category:"herbs",    price:20,   unit:"bundle", quantity:45,  emoji:"🌱", farmer:"Aling Rosa Cruz",     farmerPhone:"09281234567", location:"Calinan, Davao City",         distance:3.5, farmerEmoji:"👩‍🌾" },
  { id:312, name:"Coriander (Kinchay)",       category:"herbs",      price:15,   unit:"bundle", quantity:40,  emoji:"🌿", farmer:"Nena Villanueva",     farmerPhone:"09571234567", location:"Marilog, Davao City",         distance:6.2, farmerEmoji:"👩‍🌾" },

  // ─── COCONUT & COPRA PRODUCTS ────────────────────────────────
  { id:400, name:"Coconut Copra (Dried)",     category:"coconut",    price:22,   unit:"kg",     quantity:200, emoji:"🥥", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:401, name:"Virgin Coconut Oil (VCO)",  category:"coconut",    price:350,  unit:"liter",  quantity:30,  emoji:"🥥", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:402, name:"Coconut Milk (Gata)",       category:"coconut",    price:50,   unit:"liter",  quantity:40,  emoji:"🥥", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:403, name:"Coconut Cream",             category:"coconut",    price:65,   unit:"liter",  quantity:30,  emoji:"🥥", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:404, name:"Coconut Sugar (Muscovado)", category:"coconut",    price:120,  unit:"kg",     quantity:25,  emoji:"🥥", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },
  { id:405, name:"Coconut Vinegar (Sukang Tuba)",category:"coconut", price:80,   unit:"liter",  quantity:20,  emoji:"🥥", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },
  { id:406, name:"Desiccated Coconut",        category:"coconut",    price:90,   unit:"kg",     quantity:20,  emoji:"🥥", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:407, name:"Coconut Husk (Bunot)",      category:"coconut",    price:10,   unit:"piece",  quantity:200, emoji:"🥥", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:408, name:"Tuba (Coconut Wine)",       category:"coconut",    price:60,   unit:"liter",  quantity:15,  emoji:"🥥", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },
  { id:409, name:"Lambanog (Coconut Spirits)",category:"coconut",    price:150,  unit:"liter",  quantity:10,  emoji:"🥥", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },

  // ─── CACAO & COCOA ───────────────────────────────────────────
  { id:500, name:"Cacao Beans (Fresh)",       category:"cacao",      price:80,   unit:"kg",     quantity:40,  emoji:"🍫", farmer:"Ate Cora Produce",    farmerPhone:"09291234567", location:"Baguio District, Davao",      distance:5.5, farmerEmoji:"👩‍🌾" },
  { id:501, name:"Cacao Beans (Dried/Fermented)",category:"cacao",   price:150,  unit:"kg",     quantity:30,  emoji:"🍫", farmer:"Ate Cora Produce",    farmerPhone:"09291234567", location:"Baguio District, Davao",      distance:5.5, farmerEmoji:"👩‍🌾" },
  { id:502, name:"Cacao Nibs",                category:"cacao",      price:220,  unit:"kg",     quantity:15,  emoji:"🍫", farmer:"Ate Cora Produce",    farmerPhone:"09291234567", location:"Baguio District, Davao",      distance:5.5, farmerEmoji:"👩‍🌾" },
  { id:503, name:"Tablea (Cacao Tablets)",    category:"cacao",      price:180,  unit:"pack",   quantity:20,  emoji:"🍫", farmer:"Ate Cora Produce",    farmerPhone:"09291234567", location:"Baguio District, Davao",      distance:5.5, farmerEmoji:"👩‍🌾" },
  { id:504, name:"Cacao Powder (Unsweetened)",category:"cacao",      price:200,  unit:"kg",     quantity:15,  emoji:"🍫", farmer:"Flores Family Farm",  farmerPhone:"09561234567", location:"Calinan, Davao City",         distance:4.0, farmerEmoji:"🧑‍🌾" },
  { id:505, name:"Cacao Butter",              category:"cacao",      price:400,  unit:"kg",     quantity:10,  emoji:"🍫", farmer:"Ate Cora Produce",    farmerPhone:"09291234567", location:"Baguio District, Davao",      distance:5.5, farmerEmoji:"👩‍🌾" },
  { id:506, name:"Champorado Mix (Cacao)",    category:"cacao",      price:90,   unit:"pack",   quantity:25,  emoji:"🍫", farmer:"Ate Cora Produce",    farmerPhone:"09291234567", location:"Baguio District, Davao",      distance:5.5, farmerEmoji:"👩‍🌾" },

  // ─── MEAT & POULTRY ──────────────────────────────────────────
  { id:600, name:"Native Chicken (Manok na Pula)",category:"meat",   price:280,  unit:"kg",     quantity:15,  emoji:"🍗", farmer:"Dalisay Livestock",   farmerPhone:"09671234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"🧑‍🌾" },
  { id:601, name:"Chicken Eggs (Native)",     category:"meat",       price:12,   unit:"piece",  quantity:100, emoji:"🥚", farmer:"Dalisay Livestock",   farmerPhone:"09671234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"🧑‍🌾" },
  { id:602, name:"Chicken Eggs (Commercial)", category:"meat",       price:8,    unit:"piece",  quantity:300, emoji:"🥚", farmer:"Dalisay Livestock",   farmerPhone:"09671234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"🧑‍🌾" },
  { id:603, name:"Duck Eggs (Itlog ng Itik)", category:"meat",       price:15,   unit:"piece",  quantity:80,  emoji:"🥚", farmer:"Bagong Silang Farm",  farmerPhone:"09281239999", location:"Bunawan, Davao City",         distance:8.1, farmerEmoji:"🧑‍🌾" },
  { id:604, name:"Balut (Fertilized Duck Egg)",category:"meat",      price:18,   unit:"piece",  quantity:50,  emoji:"🥚", farmer:"Bagong Silang Farm",  farmerPhone:"09281239999", location:"Bunawan, Davao City",         distance:8.1, farmerEmoji:"🧑‍🌾" },
  { id:605, name:"Free-Range Pork (Baboy)",   category:"meat",       price:320,  unit:"kg",     quantity:20,  emoji:"🥩", farmer:"Dalisay Livestock",   farmerPhone:"09671234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"🧑‍🌾" },
  { id:606, name:"Native Pork Liempo",        category:"meat",       price:300,  unit:"kg",     quantity:15,  emoji:"🥩", farmer:"Dalisay Livestock",   farmerPhone:"09671234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"🧑‍🌾" },
  { id:607, name:"Goat Meat (Kambing)",       category:"meat",       price:350,  unit:"kg",     quantity:10,  emoji:"🥩", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },
  { id:608, name:"Carabao Meat (Kalabaw)",    category:"meat",       price:380,  unit:"kg",     quantity:8,   emoji:"🥩", farmer:"Ben Dela Torre",      farmerPhone:"09461234567", location:"Baguio District, Davao",      distance:5.1, farmerEmoji:"👨‍🌾" },
  { id:609, name:"Native Duck (Itik)",        category:"meat",       price:290,  unit:"kg",     quantity:10,  emoji:"🍗", farmer:"Bagong Silang Farm",  farmerPhone:"09281239999", location:"Bunawan, Davao City",         distance:8.1, farmerEmoji:"🧑‍🌾" },
  { id:610, name:"Rabbit (Kelinci)",          category:"meat",       price:340,  unit:"kg",     quantity:8,   emoji:"🐇", farmer:"Dalisay Livestock",   farmerPhone:"09671234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"🧑‍🌾" },

  // ─── SEAFOOD & FISH ──────────────────────────────────────────
  { id:700, name:"Bangus (Milkfish)",         category:"seafood",    price:160,  unit:"kg",     quantity:25,  emoji:"🐟", farmer:"Jun Seafoods",        farmerPhone:"09781234567", location:"Samal Island, Davao",         distance:12.0,farmerEmoji:"🧑‍🌾" },
  { id:701, name:"Tilapia",                   category:"seafood",    price:120,  unit:"kg",     quantity:30,  emoji:"🐟", farmer:"Jun Seafoods",        farmerPhone:"09781234567", location:"Samal Island, Davao",         distance:12.0,farmerEmoji:"🧑‍🌾" },
  { id:702, name:"Shrimp (Hipon)",            category:"seafood",    price:350,  unit:"kg",     quantity:10,  emoji:"🦐", farmer:"Jun Seafoods",        farmerPhone:"09781234567", location:"Samal Island, Davao",         distance:12.0,farmerEmoji:"🧑‍🌾" },
  { id:703, name:"Squid (Pusit)",             category:"seafood",    price:250,  unit:"kg",     quantity:12,  emoji:"🦑", farmer:"Jun Seafoods",        farmerPhone:"09781234567", location:"Samal Island, Davao",         distance:12.0,farmerEmoji:"🧑‍🌾" },
  { id:704, name:"Crab (Alimango)",           category:"seafood",    price:450,  unit:"kg",     quantity:8,   emoji:"🦀", farmer:"Jun Seafoods",        farmerPhone:"09781234567", location:"Samal Island, Davao",         distance:12.0,farmerEmoji:"🧑‍🌾" },
  { id:705, name:"Dried Fish (Tuyo)",         category:"seafood",    price:180,  unit:"kg",     quantity:20,  emoji:"🐟", farmer:"Jun Seafoods",        farmerPhone:"09781234567", location:"Samal Island, Davao",         distance:12.0,farmerEmoji:"🧑‍🌾" },
  { id:706, name:"Dried Squid (Pusit Tuyô)",  category:"seafood",    price:300,  unit:"kg",     quantity:12,  emoji:"🦑", farmer:"Jun Seafoods",        farmerPhone:"09781234567", location:"Samal Island, Davao",         distance:12.0,farmerEmoji:"🧑‍🌾" },
  { id:707, name:"Bagoong (Shrimp Paste)",    category:"seafood",    price:120,  unit:"kg",     quantity:15,  emoji:"🦐", farmer:"Jun Seafoods",        farmerPhone:"09781234567", location:"Samal Island, Davao",         distance:12.0,farmerEmoji:"🧑‍🌾" },
  { id:708, name:"Patis (Fish Sauce)",        category:"seafood",    price:90,   unit:"liter",  quantity:20,  emoji:"🐟", farmer:"Jun Seafoods",        farmerPhone:"09781234567", location:"Samal Island, Davao",         distance:12.0,farmerEmoji:"🧑‍🌾" },
  { id:709, name:"Mussel (Tahong)",           category:"seafood",    price:80,   unit:"kg",     quantity:18,  emoji:"🦪", farmer:"Jun Seafoods",        farmerPhone:"09781234567", location:"Samal Island, Davao",         distance:12.0,farmerEmoji:"🧑‍🌾" },
  { id:710, name:"Oyster (Talaba)",           category:"seafood",    price:100,  unit:"kg",     quantity:15,  emoji:"🦪", farmer:"Jun Seafoods",        farmerPhone:"09781234567", location:"Samal Island, Davao",         distance:12.0,farmerEmoji:"🧑‍🌾" },

  // ─── DAIRY & PROCESSED ───────────────────────────────────────
  { id:800, name:"Carabao Milk (Gatas ng Kalabaw)",category:"dairy", price:80,   unit:"liter",  quantity:20,  emoji:"🥛", farmer:"Dalisay Livestock",   farmerPhone:"09671234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"🧑‍🌾" },
  { id:801, name:"Goat Milk",                 category:"dairy",      price:90,   unit:"liter",  quantity:15,  emoji:"🥛", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },
  { id:802, name:"Kesong Puti (White Cheese)", category:"dairy",     price:150,  unit:"kg",     quantity:10,  emoji:"🧀", farmer:"Dalisay Livestock",   farmerPhone:"09671234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"🧑‍🌾" },
  { id:803, name:"Fresh Honey (Pulot)",       category:"dairy",      price:350,  unit:"liter",  quantity:10,  emoji:"🍯", farmer:"Mountain View Herbs",  farmerPhone:"09391234567", location:"Marilog, Davao City",         distance:6.5, farmerEmoji:"🧑‍🌾" },
  { id:804, name:"Muscovado Sugar",           category:"dairy",      price:100,  unit:"kg",     quantity:25,  emoji:"🍬", farmer:"Kuya Rodel Farms",    farmerPhone:"09181234567", location:"Paquibato, Davao City",       distance:9.4, farmerEmoji:"🧑‍🌾" },
  { id:805, name:"Native Vinegar (Sukang Iloko)",category:"dairy",   price:60,   unit:"liter",  quantity:20,  emoji:"🍶", farmer:"Manong Berto",        farmerPhone:"09371234567", location:"Mintal, Davao City",          distance:4.3, farmerEmoji:"👨‍🌾" },
];

const ORDERS = JSON.parse(localStorage.getItem('lh_orders') || '[]');
const USERS  = JSON.parse(localStorage.getItem('lh_users')  || '[]');
let currentUser    = JSON.parse(localStorage.getItem('lh_current_user')    || 'null');
let farmerProducts = JSON.parse(localStorage.getItem('lh_farmer_products') || JSON.stringify(PRODUCTS.slice(0, 3)));

function saveOrders()         { localStorage.setItem('lh_orders',          JSON.stringify(ORDERS)); }
function saveFarmerProducts() { localStorage.setItem('lh_farmer_products', JSON.stringify(farmerProducts)); }
function saveUsers()          { localStorage.setItem('lh_users',           JSON.stringify(USERS)); }
function setCurrentUser(u)    { currentUser = u; localStorage.setItem('lh_current_user', JSON.stringify(u)); }
function logout()             { currentUser = null; localStorage.removeItem('lh_current_user'); window.location.href = 'index.html'; }
