// lib/categories.ts

export const CATEGORY_KEYWORDS: { [key: string]: string[] } = {
  Food: ["grocery", "restaurant", "cafe", "food", "meal", "snack", "breakfast", "lunch", "dinner", "coffee", "takeout"],
  Travel: ["hotel", "flight", "trip", "airline", "taxi", "travel", "tour", "vacation", "airport", "car rental", "cruise"],
  Utilities: ["electricity", "water", "internet", "gas", "phone", "subscription", "utility", "power", "bill", "service"],
  Entertainment: ["movie", "netflix", "game", "event", "concert", "tv", "streaming", "music", "theater", "play", "show"],
  Shopping: ["shopping", "store", "mall", "clothing", "fashion", "shoes", "electronics", "gadget", "apparel", "accessory"],
  Healthcare: ["hospital", "medicine", "clinic", "doctor", "pharmacy", "health", "treatment", "checkup", "dentist", "surgery", "medical"],
  Transport: ["fuel", "car", "bus", "train", "taxi", "ride", "uber", "transport", "vehicle", "bus pass", "public transport", "metro"],
  Subscriptions: ["netflix", "spotify", "prime", "subscription", "monthly fee", "membership", "magazine", "online service", "subscription fee"],
  Salary: ["salary", "wages", "paycheck", "income", "earnings", "bonus", "commission", "payment", "salary deposit"],
  Rent: ["rent", "lease", "landlord", "apartment", "housing", "mortgage", "rent payment", "house rent", "property rental"],
  Education: ["tuition", "school", "university", "college", "course", "book", "training", "workshop", "seminar", "study", "exam"],
  Taxes: ["tax", "taxes", "IRS", "tax refund", "tax payment", "income tax", "property tax", "tax service"],
  Charitable: ["donation", "charity", "nonprofit", "fundraiser", "cause", "giving", "charitable", "pledge", "support"],
  Household: ["cleaning", "household", "supplies", "furniture", "appliance", "repair", "maintenance", "home", "decor", "vacuum", "laundry"],
  Miscellaneous: ["misc", "other", "miscellaneous", "gift", "loan", "refund", "miscellaneous expense", "ad hoc", "unexpected"],
  Grocery: [
  "supermarket", "grocery", "store", "market", "produce", "vegetables", "fruits", "dairy", 
  "meat", "snacks", "canned goods", "bakery", "frozen food", "biscuit", "cookies", "crackers", 
  "bread", "pastries", "chips", "sweets", "cereal", "granola", "cake", "chocolate"
   ],

  Uncategorized: []  // Default for uncategorized items
};

// Function to get category from description
export const getCategoryFromDescription = (description: string): string => {
  description = description.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => description.includes(keyword))) {
      return category;
    }
  }
  return "Uncategorized"; // If no match, default to Uncategorized
};
