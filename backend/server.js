
// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const { createObjectCsvWriter } = require('csv-writer');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // Root route
// app.get('/', (req, res) => {
//   res.send('Server is running!');
// });

// // POST route to save quiz data
// app.post('/submit-quiz', (req, res) => {
//   const userAnswers = req.body.answers;
  
//   console.log("Received Data:", userAnswers); 

//   if (!Array.isArray(userAnswers)) {
//     return res.status(400).send("Invalid data format. Expected an array.");
//   }

//   const csvDir = path.join(__dirname, "csv");
//   const csvFilePath = path.join(csvDir, "data.csv");

//   // Ensure CSV directory exists
//   if (!fs.existsSync(csvDir)) {
//     fs.mkdirSync(csvDir, { recursive: true });
//   }

//   const csvWriter = createObjectCsvWriter({
//     path: csvFilePath,
//     header: [{ id: 'answer', title: 'ANSWER' }],
//     append: true, // Important: Prevents overwriting the file
//   });

// //   const records = userAnswers.map(answer => ({ answer }));

//     const records = [{ answers: userAnswers.join(', ') }];


//   csvWriter.writeRecords(records)
//     .then(() => {
//       console.log('Data successfully written to CSV');
//       res.status(200).send('Data saved!');
//     })
//     .catch(err => {
//       console.error('Error writing to CSV:', err);
//       res.status(500).send('Error saving data');
//     });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });











const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Server is running!');
});



app.post('/submit-quiz', (req, res) => {
    const userAnswers = req.body.answers;
    
    console.log("Received Data:", userAnswers); // Debugging log
  
    if (!Array.isArray(userAnswers)) {
      return res.status(400).send("Invalid data format. Expected an array.");
    }
  
    const csvFilePath = 'csv/data.csv';
  
    // Ensure CSV directory exists
    if (!fs.existsSync('csv')) {
      fs.mkdirSync('csv', { recursive: true });
    }
  
    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [{ id: 'answers', title: 'ANSWERS' }], // Single column header
      append: true, // Prevents overwriting
    });
  
    // Write all answers as a single row in one column
    const records = [{ answers: userAnswers.join(', ') }];
  
    csvWriter.writeRecords(records)
      .then(() => {
        console.log('Data successfully written to CSV');
        res.status(200).send('Data saved!');
      })
      .catch(err => {
        console.error('Error writing to CSV:', err);
        res.status(500).send('Error saving data');
      });
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



















  