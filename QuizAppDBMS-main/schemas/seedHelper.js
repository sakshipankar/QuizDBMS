const mongoose=require("mongoose");
const {questions}= require("./questions");
mongoose.connect('mongodb://localhost:27017/QuizData');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

const Quiz = mongoose.model('Quiz',questionSchema);

const saveQuiz = async () => {
  try {
    
    await Quiz.deleteMany({});
    console.log("Existing data cleared");

   
    for (let i = 0; i < 30; i++) {
      const randIndex = Math.floor(Math.random() * questions.length);

      const newData = new Quiz({
        question: questions[randIndex].question,
        options: questions[randIndex].options,
        answer: questions[randIndex].answer,
      });

      
      await newData.save();
    }
    console.log("Data successfully seeded");
  } catch (err) {
    console.error("Error seeding the data:", err);
  } 
};


saveQuiz();
module.exports={Quiz};