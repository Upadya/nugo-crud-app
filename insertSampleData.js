const mongoose = require('mongoose');
const User = require('./models/User'); 
const sampleData = require('./data/Users.json'); 

// Connect to MongoDB 
mongoose.connect('mongodb://localhost:27017/nugo-crud-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Insert sample data
async function insertSampleData() {
  try {
    await User.insertMany(sampleData);
    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    mongoose.connection.close();
  }
}

insertSampleData();
