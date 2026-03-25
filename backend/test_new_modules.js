const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const API_URL = 'http://localhost:5000/api';
const MONGODB_URI = process.env.MONGODB_URI;

// We need the User model to inject an Admin directly
const User = require('./src/modules/auth/auth.model');

const runTests = async () => {
  try {
    // 0. Ensure we have an admin user in DB
    console.log('--- Connecting to DB to setup Admin user ---');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const adminEmail = 'admin_tester_999@example.com';
    const adminPass = 'securepassword123';

    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      console.log('Admin user not found, creating one...');
      // Mongoose hook handles password hashing hook
      adminUser = await User.create({
        firstName: 'Admin',
        lastName: 'Test',
        email: adminEmail,
        password: adminPass,
        role: 'admin',
        isVerified: true
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
      if (adminUser.role !== 'admin') {
         adminUser.role = 'admin';
         await adminUser.save();
      }
    }

    // 1. Login to get token and cookies
    console.log('\\n--- Logging in ---');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: adminEmail,
      password: adminPass
    });
    
    // Axios usually doesn't automatically send set-cookies unless configured.
    // We can extract it from loginRes.headers['set-cookie']
    const cookies = loginRes.headers['set-cookie'];
    if (!cookies) throw new Error("No cookies returned from login");

    const axiosConfig = {
      headers: {
        Cookie: cookies.join('; ')
      }
    };

    // First ensure the logged-in user is an admin
    console.log('Logged in successfully. Cookies acquired.');

    // 2. Test Events module
    console.log('\\n--- Testing Events ---');
    const eventPost = await axios.post(`${API_URL}/events`, {
      title: 'Test Event',
      description: 'This is a test event',
      date: new Date().toISOString(),
      location: 'New Delhi',
      type: 'hybrid'
    }, axiosConfig);
    console.log('Event POST:', eventPost.status, eventPost.data.data.title);
    
    const eventGet = await axios.get(`${API_URL}/events`);
    console.log('Event GET Count:', eventGet.data.count);

    // 3. Test Media module
    console.log('\\n--- Testing Media ---');
    const mediaPost = await axios.post(`${API_URL}/media`, {
      title: 'Test Press Release',
      source: 'PIB',
      publishedDate: new Date().toISOString(),
      summary: 'Test summary',
      externalLink: 'https://example.com'
    }, axiosConfig);
    console.log('Media POST:', mediaPost.status, mediaPost.data.data.title);

    const mediaGet = await axios.get(`${API_URL}/media`);
    console.log('Media GET Count:', mediaGet.data.count);

    // 4. Test Publications module
    console.log('\\n--- Testing Publications ---');
    const pubPost = await axios.post(`${API_URL}/publications`, {
      title: 'Test Report',
      description: 'Test description',
      author: 'Test Author',
      status: 'published'
    }, axiosConfig);
    console.log('Publication POST:', pubPost.status, pubPost.data.data.title);

    const pubGet = await axios.get(`${API_URL}/publications`);
    console.log('Publication GET Count:', pubGet.data.count);

    // 5. Test Governance module
    console.log('\\n--- Testing Governance ---');
    const govPost = await axios.post(`${API_URL}/governance`, {
      name: 'Test Leader',
      designation: 'Chairman',
      bio: 'Test Bio'
    }, axiosConfig);
    console.log('Governance POST:', govPost.status, govPost.data.data.name);

    const govGet = await axios.get(`${API_URL}/governance`);
    console.log('Governance GET Count:', govGet.data.count);

    // 6. Test Platforms module
    console.log('\\n--- Testing Platforms ---');
    const platPost = await axios.post(`${API_URL}/platforms`, {
      name: 'Test Platform',
      slug: 'test-platform-' + Date.now(),
      shortDescription: 'Short desc',
      fullDescription: 'Full desc'
    }, axiosConfig);
    console.log('Platforms POST:', platPost.status, platPost.data.data.name);

    const platGet = await axios.get(`${API_URL}/platforms`);
    console.log('Platforms GET Count:', platGet.data.count);

    // 7. Test Centers module
    console.log('\\n--- Testing Centers ---');
    const centerPost = await axios.post(`${API_URL}/centers`, {
      country: 'USA',
      missionStatement: 'Test Mission',
      contactPerson: 'John Doe',
      email: 'john@example.com'
    }, axiosConfig);
    console.log('Centers POST:', centerPost.status, centerPost.data.data.country);

    const centerGet = await axios.get(`${API_URL}/centers`);
    console.log('Centers GET Count:', centerGet.data.count);

    // 8. Test Gallery module
    console.log('\\n--- Testing Gallery ---');
    const gallPost = await axios.post(`${API_URL}/gallery`, {
      title: 'Test Gallery Image',
      mediaType: 'image',
      mediaUrl: 'https://example.com/image.png'
    }, axiosConfig);
    console.log('Gallery POST:', gallPost.status, gallPost.data.data.title);

    const gallGet = await axios.get(`${API_URL}/gallery`);
    console.log('Gallery GET Count:', gallGet.data.count);

    // 9. Test Partnerships module
    console.log('\\n--- Testing Partnerships ---');
    const partPost = await axios.post(`${API_URL}/partners`, {
      organizationName: 'Test Partner',
      logoUrl: 'https://example.com/logo.png',
      partnershipType: 'knowledge'
    }, axiosConfig);
    console.log('Partnerships POST:', partPost.status, partPost.data.data.organizationName);

    const partGet = await axios.get(`${API_URL}/partners`);
    console.log('Partnerships GET Count:', partGet.data.count);
    
    console.log('\\n--- ALL TESTS PASSED SUCCESSFULLY ---');

  } catch (error) {
    console.error('Test Failed!');
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(error.message);
    }
  } finally {
    await mongoose.disconnect();
  }
};

runTests();
