const axios = require("axios");
const cheerio = require("cheerio");

async function getData(url) {
  try {
    // Make a GET request to the URL
    const response = await axios.get(url);

    // Load the HTML content into cheerio
    const $ = cheerio.load(response.data);

    // Initialize an empty array to store the results
    const results = [];

    // Select the elements with the class "work" and iterate over them
    $(".work").each((i, el) => {
      // Extract the data from the element
      const title = $(el).find(".title").text();
      const link = $(el).find(".title a").attr("href");
      const description = $(el).find(".description").text();

      // Add the data to the results array
      results.push({
        title: title,
        link: link,
        description: description,
      });
    });

    // Return the results
    return results;
  } catch (error) {
    console.error(error);
  }
}

// Call the function with the URL of the AO3 page
getData("https://archiveofourown.org/works/123456").then((results) => {
  console.log(results);
});
