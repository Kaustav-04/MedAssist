const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config()

// Import the OpenAI
const { Configuration, OpenAIApi } = require("openai");

// Create a new OpenAI configuration and paste your API key
// obtained from Step 1
// The key displayed here is a fake key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

app.use(express.static(path.join(__dirname, "/build")));

// This route serves the React app

// create a post route
app.post("/chatbot", async (req, res) => {
  // console.log(req.body);
  const data = req.body;

  // const choices = [
  //   {
  //     text:
  //       "\n" +
  //       "\n" +
  //       "A: That sounds like a difficult situation. Can you tell me more about how this has been affecting you?",
  //     index: 0,
  //     logprobs: null,
  //     finish_reason: "stop",
  //   },
  // ];

  // res.json(choices[0].text);

  // Query the OpenAI API
  // Bringing in the training model from Part 1 of the tutorial on mental health
  let promptContext = `I want you to act as an AI assisted doctor. I will provide details of my mental health condition and other physical condition. You need to analyze and evaluate it and suggest me the most possible health disease according to it and the possible solution forr it.Answer the question above as truthfully as possible using the context below. 
  If the answer is not contained within the context below, say "I'm sorry, that isn't within 
  my expertise. `;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${promptContext} ${data.queryPrompt} ?`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    console.log(response.data);
    res.json(response.data.choices[0].text);
});

app.get("/*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "/build", "index.html"))
);

app.listen(port, () => {
  console.log(`Node server listening at http://localhost:${port}`);
});
