/**
 * DataService - Local data management for ePaaramid prototype
 * Handles all mock data and in-memory state management
 */

// Mock Jobs Data
export const mockJobs = [
  {
    id: '1',
    title: 'Home Painting',
    description: 'Need to paint 3 bedrooms and living room',
    company: 'John\'s Home',
    location: 'Downtown, City Center',
    coordinates: { latitude: 40.7128, longitude: -74.0060 },
    contact: '+1 (555) 101-0001',
    dateTime: '2025-12-01T10:00:00',
    estimatedFair: '$500-$700',
    status: 'open',
    postedBy: 'user123',
  },
  {
    id: '2',
    title: 'Plumbing Repair',
    description: 'Fix leaky kitchen faucet and bathroom pipes',
    company: 'Sarah\'s House',
    location: 'Midtown, Main Street',
    coordinates: { latitude: 40.7580, longitude: -73.9855 },
    contact: '+1 (555) 202-0002',
    dateTime: '2025-12-02T14:30:00',
    estimatedFair: '$150-$250',
    status: 'open',
    postedBy: 'user124',
  },
  {
    id: '3',
    title: 'Electrical Installation',
    description: 'Install new outlets and light fixtures in kitchen',
    company: 'Mike\'s Condo',
    location: 'Uptown, Park Avenue',
    coordinates: { latitude: 40.7614, longitude: -73.9776 },
    contact: '+1 (555) 303-0003',
    dateTime: '2025-12-03T09:00:00',
    estimatedFair: '$300-$450',
    status: 'open',
    postedBy: 'user125',
  },
  {
    id: '4',
    title: 'Deck Building',
    description: 'Build a wooden deck for backyard, approximately 20x12 feet',
    company: 'Robert\'s Estate',
    location: 'Suburbs, Riverside',
    coordinates: { latitude: 40.6895, longitude: -74.0118 },
    contact: '+1 (555) 404-0004',
    dateTime: '2025-12-05T08:00:00',
    estimatedFair: '$1200-$1800',
    status: 'open',
    postedBy: 'user126',
  },
  {
    id: '5',
    title: 'Tile Installation',
    description: 'Replace bathroom tiles and grout',
    company: 'Emma\'s Apartment',
    location: 'Downtown, Arts District',
    coordinates: { latitude: 40.7305, longitude: -73.9933 },
    contact: '+1 (555) 505-0005',
    dateTime: '2025-12-06T11:00:00',
    estimatedFair: '$400-$600',
    status: 'open',
    postedBy: 'user127',
  },
];

// Mock Workers Data
export const mockWorkers = [
  {
    id: 'w1',
    name: 'Alex Rodriguez',
    skills: ['Painting', 'Drywall', 'Surface Prep'],
    verified: true,
    location: 'Downtown',
    coordinates: { latitude: 40.7150, longitude: -74.0080 },
    avatar: 'https://via.placeholder.com/80?text=Alex',
    bio: 'Professional painter with 10+ years experience. Quality work guaranteed!',
    hourlyRate: '$45',
    availability: 'Mon-Sat',
  },
  {
    id: 'w2',
    name: 'Maria Garcia',
    skills: ['Plumbing', 'Water Heater Installation', 'Pipe Repair'],
    verified: true,
    location: 'Midtown',
    coordinates: { latitude: 40.7600, longitude: -73.9900 },
    avatar: 'https://via.placeholder.com/80?text=Maria',
    bio: 'Licensed plumber. Fast, reliable service for all plumbing needs.',
    hourlyRate: '$55',
    availability: '24/7 Emergency',
  },
  {
    id: 'w3',
    name: 'David Chen',
    skills: ['Electrical Work', 'Wiring', 'Safety Inspection'],
    verified: true,
    location: 'Uptown',
    coordinates: { latitude: 40.7650, longitude: -73.9750 },
    avatar: 'https://via.placeholder.com/80?text=David',
    bio: 'Licensed electrician. All commercial and residential work.',
    hourlyRate: '$60',
    availability: 'Mon-Fri 8AM-6PM',
  },
  {
    id: 'w4',
    name: 'James Wilson',
    skills: ['Carpentry', 'Deck Building', 'Wood Finishing'],
    verified: false,
    location: 'Suburbs',
    coordinates: { latitude: 40.6920, longitude: -74.0150 },
    avatar: 'https://via.placeholder.com/80?text=James',
    bio: 'Skilled carpenter. Available for custom projects.',
    hourlyRate: '$50',
    availability: 'Weekends',
  },
  {
    id: 'w5',
    name: 'Lisa Park',
    skills: ['Tile Work', 'Flooring', 'Bathroom Remodeling'],
    verified: true,
    location: 'Downtown',
    coordinates: { latitude: 40.7200, longitude: -73.9950 },
    avatar: 'https://via.placeholder.com/80?text=Lisa',
    bio: 'Expert tile installer with attention to detail.',
    hourlyRate: '$50',
    availability: 'Tue-Sat',
  },
  {
    id: 'w6',
    name: 'Carlos Moreno',
    skills: ['General Handyman', 'Repairs', 'Maintenance'],
    verified: false,
    location: 'Midtown',
    coordinates: { latitude: 40.7500, longitude: -73.9850 },
    avatar: 'https://via.placeholder.com/80?text=Carlos',
    bio: 'Reliable handyman for all your home needs.',
    hourlyRate: '$35',
    availability: 'Mon-Sun',
  },
];

// Mock Reviews Data
export const mockReviews = {
  w1: [
    { id: 'r1', rating: 5, comment: 'Excellent work! Very professional.', author: 'John' },
    { id: 'r2', rating: 5, comment: 'Completed on time and budget.', author: 'Sarah' },
    { id: 'r3', rating: 4, comment: 'Good quality but a bit slow.', author: 'Mike' },
  ],
  w2: [
    { id: 'r4', rating: 5, comment: 'Fixed my plumbing issue quickly!', author: 'Emma' },
    { id: 'r5', rating: 5, comment: 'Very knowledgeable and friendly.', author: 'Robert' },
  ],
  w3: [
    { id: 'r6', rating: 4, comment: 'Good work, professional approach.', author: 'Alex' },
    { id: 'r7', rating: 4, comment: 'A bit pricey but quality work.', author: 'Lisa' },
  ],
  w4: [
    { id: 'r8', rating: 3, comment: 'Did okay, but could improve.', author: 'David' },
  ],
  w5: [
    { id: 'r9', rating: 5, comment: 'Perfect tile work!', author: 'Maria' },
    { id: 'r10', rating: 5, comment: 'Very neat and clean finish.', author: 'James' },
    { id: 'r11', rating: 4, comment: 'Great job overall.', author: 'Carlos' },
  ],
  w6: [
    { id: 'r12', rating: 3, comment: 'Average service.', author: 'Lisa' },
  ],
};

// Mock Messages Data
export const mockMessages = {
  'chat_w1_user1': [
    { id: 'm1', sender: 'w1', senderName: 'Alex Rodriguez', message: 'Hi! I\'m interested in your painting job.', timestamp: '2025-12-01T10:00:00' },
    { id: 'm2', sender: 'user1', senderName: 'You', message: 'Great! When can you start?', timestamp: '2025-12-01T10:05:00' },
    { id: 'm3', sender: 'w1', senderName: 'Alex Rodriguez', message: 'I can start this weekend!', timestamp: '2025-12-01T10:10:00' },
  ],
  'chat_w2_user1': [
    { id: 'm4', sender: 'w2', senderName: 'Maria Garcia', message: 'I can help with your plumbing needs.', timestamp: '2025-12-02T09:00:00' },
    { id: 'm5', sender: 'user1', senderName: 'You', message: 'What\'s your availability?', timestamp: '2025-12-02T09:15:00' },
  ],
  'chat_w3_user1': [
    { id: 'm6', sender: 'w3', senderName: 'David Chen', message: 'Licensed electrician here. Happy to help!', timestamp: '2025-12-03T08:00:00' },
  ],
};

// Mock Current User
export const mockCurrentUser = {
  id: 'user1',
  name: 'John Homeowner',
  email: 'john@example.com',
  type: 'homeowner',
  location: 'Downtown',
  coordinates: { latitude: 40.7128, longitude: -74.0060 },
  avatar: 'https://via.placeholder.com/100?text=John',
};

// Mock Notifications
export const mockNotifications = [
  { id: 'n1', type: 'message', title: 'New message from Alex Rodriguez', message: 'Hi! I\'m interested in your painting job.' },
  { id: 'n2', type: 'booking', title: 'Job application', message: 'Maria Garcia applied for your plumbing job.' },
  { id: 'n3', type: 'review', title: 'New review', message: 'Alex Rodriguez gave you a 5-star review.' },
];

/**
 * Helper function to calculate distance between two coordinates (Haversine formula)
 */
export const calculateDistance = (coord1, coord2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLng = toRad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.latitude)) *
      Math.cos(toRad(coord2.latitude)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2);
};

/**
 * Calculate average rating from reviews
 */
export const calculateAverageRating = (workerId) => {
  const reviews = mockReviews[workerId] || [];
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1);
};

/**
 * Get all nearby workers within specified distance (km)
 */
export const findNearbyWorkers = (maxDistance = 5) => {
  return mockWorkers
    .map((worker) => ({
      ...worker,
      distance: calculateDistance(mockCurrentUser.coordinates, worker.coordinates),
      averageRating: calculateAverageRating(worker.id),
    }))
    .filter((worker) => parseFloat(worker.distance) <= maxDistance)
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
};

/**
 * Get worker details with reviews
 */
export const getWorkerDetails = (workerId) => {
  const worker = mockWorkers.find((w) => w.id === workerId);
  if (!worker) return null;

  return {
    ...worker,
    distance: calculateDistance(mockCurrentUser.coordinates, worker.coordinates),
    averageRating: calculateAverageRating(workerId),
    reviews: mockReviews[workerId] || [],
  };
};

/**
 * Add a new review for a worker
 */
export const addReview = (workerId, rating, comment, author) => {
  if (!mockReviews[workerId]) {
    mockReviews[workerId] = [];
  }

  const newReview = {
    id: 'r' + Date.now(),
    rating,
    comment,
    author,
  };

  mockReviews[workerId].push(newReview);
  return newReview;
};

/**
 * Get all workers with ratings
 */
export const getAllWorkersWithRatings = () => {
  return mockWorkers.map((worker) => ({
    ...worker,
    distance: calculateDistance(mockCurrentUser.coordinates, worker.coordinates),
    averageRating: calculateAverageRating(worker.id),
    reviewCount: (mockReviews[worker.id] || []).length,
  }));
};

/**
 * Search jobs by title or description
 */
export const searchJobs = (query, jobs = mockJobs) => {
  if (!query.trim()) return jobs;
  const lowerQuery = query.toLowerCase();
  return jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Filter jobs by distance
 */
export const filterJobsByDistance = (maxDistance = 10, jobs = mockJobs) => {
  return jobs
    .map((job) => ({
      ...job,
      distance: calculateDistance(mockCurrentUser.coordinates, job.coordinates),
    }))
    .filter((job) => parseFloat(job.distance) <= maxDistance)
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
};

/**
 * Get chat messages
 */
export const getMessages = (chatId) => {
  return mockMessages[chatId] || [];
};

/**
 * Add a new message
 */
export const addMessage = (chatId, senderId, senderName, message) => {
  if (!mockMessages[chatId]) {
    mockMessages[chatId] = [];
  }

  const newMessage = {
    id: 'm' + Date.now(),
    sender: senderId,
    senderName,
    message,
    timestamp: new Date().toISOString(),
  };

  mockMessages[chatId].push(newMessage);
  return newMessage;
};

/**
 * Get or create chat ID between two users
 */
export const getChatId = (userId1, userId2) => {
  const ids = [userId1, userId2].sort();
  return `chat_${ids[0]}_${ids[1]}`;
};

/**
 * Update user notifications
 */
export const addNotification = (type, title, message) => {
  const notification = {
    id: 'n' + Date.now(),
    type,
    title,
    message,
  };
  mockNotifications.unshift(notification);
  return notification;
};

export default {
  mockJobs,
  mockWorkers,
  mockReviews,
  mockMessages,
  mockCurrentUser,
  mockNotifications,
  calculateDistance,
  calculateAverageRating,
  findNearbyWorkers,
  getWorkerDetails,
  addReview,
  getAllWorkersWithRatings,
  searchJobs,
  filterJobsByDistance,
  getMessages,
  addMessage,
  getChatId,
  addNotification,
};
