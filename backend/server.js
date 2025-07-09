import express from 'express'
import axios from 'axios' 
import mongoose from 'mongoose' 
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config() 

const app = express() 
app.use(express.json()) 


app.use(cors({
  origin: process.env.FRONTEND_URL_NEW,  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
}))

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  const clientSecret = req.headers['x-api-key']

  if (!clientSecret || clientSecret !== process.env.API_SECRET) {
    return res.status(403).json({ error: 'Unauthorized: Invalid API key' })
  }

  next()
})

const GEMINI_API_KEY1 = process.env.GEMINI_API_KEY1
const GEMINI_API_KEY2 = process.env.GEMINI_API_KEY2
const GEMINI_API_KEY3 = process.env.GEMINI_API_KEY3
const password = process.env.PASSWORD

try{
  await mongoose.connect(`mongodb+srv://promptify:${password}@cluster0.2jipw5a.mongodb.net/promptifyDB?retryWrites=true&w=majority&appName=Cluster0`) 
}
catch(e){
  console.log(e)
}

const CommentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  rate: String
})

const Comment = mongoose.model('Comment', CommentSchema)

app.get('/api/top-comments', async (req, res) => {
  try {
    const topComments = await Comment.aggregate([
      {
        $addFields: { commentLength: { $strLenCP: "$comment" } }  
      },
      {
        $sort: { rate: -1, commentLength: -1, name: -1 }  
      },
      {
        $limit: 8 
      }
    ]);
            
    res.json(topComments)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' })
  }
})


app.post('/api/comments', async (req, res) => {
  const { name, comment } = req.body
  const rating = `give me rating for this comment ${comment} out of 5, gimme only rating number nothing else` 
  let rate; 

  try {
    const response1 = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY3}`,
      {
        contents: [
          {
            parts: [{ text: rating }]
          }
        ]
      }
    )

    rate = response1.data.candidates?.[0]?.content?.parts?.[0]?.text.replace(/\n/g, '').trim() || '0'
  } catch (err) {
    console.error('Error:', err.response?.data || err.message) 
  }

   if (!name || !comment || !rate) return res.status(400).json({ error: 'Fields required' })
  try {
    const newComment = new Comment({ name, comment, rate})
    await newComment.save()
    res.status(201).json({ message: 'Comment saved successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
})
 
app.post('/api/enhance', async (req, res) => {
  const { prompt, tone, aimodel } = req.body 
  let enhancedPrompt = `Assume the role of "${aimodel}" and interpret the context of the prompt "${prompt}" in an "${tone}" tone. From your deep understanding, craft one vivid, efficient prompt that clearly captures the user's intent. Output only that single, highly effective prompt.` 
  console.log(enhancedPrompt)
  try {
    const selectedKey = Math.random() < 0.5 ? GEMINI_API_KEY1 : GEMINI_API_KEY2;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${selectedKey}`,
      {
        contents: [
          {
            parts: [{ text: enhancedPrompt }]
          }
        ]
      }
    )

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response'
    res.json({ enhancedPrompt: result })
  } catch (err) {
    console.error('Error:', err.response?.data || err.message)
    res.status(500).json({ error: 'Failed to enhance prompt' })
  }
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
