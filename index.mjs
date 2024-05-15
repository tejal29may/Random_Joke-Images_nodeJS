import express from "express";
import fetch from "node-fetch";


const app = express();
async function fetchJoke() {
  return fetch("https://official-joke-api.appspot.com/jokes/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return { setup: data.setup, punchline: data.punchline };
    })
    .catch((error) => {
      console.error("Error fetching joke:", error);
      throw error;
    });
}
  
 async function fetchImages() {
    return fetch("https://source.unsplash.com/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // The URL of the random image from Unsplash is in the response URL
        return { url: response.url };
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        throw error; // Re-throw the error to be handled by the caller
      });
  }


app.get("/api/Jokes-and-images/random", async(req, res) => {
  try{
    let randomJoke=await fetchJoke();
    let ramdomImages=await fetchImages();
    res.json({...ramdomImages,...randomJoke})

  }catch{
    res.status(500).json({
        error: error.message
      })
  }
});

app.listen(8080, () => {
  console.log("express server is running at port 8080");
});
