import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/search", methods=["POST"])
def search():
    # Get the link from the request form
    link = request.form.get("link")
    if not link:
        return jsonify({"error": "Missing link parameter"}), 400

    # Make a GET request to the AO3 website and pass the search term as a parameter in the query string
    url = f"https://archiveofourown.org/works?utf8=✓&work_search%5Bquery%5D={link}&commit=Search"
    response = requests.get(url)

    # Parse the HTML response using Beautiful Soup
    soup = BeautifulSoup(response.text, "html.parser")

    # Find all the elements with the "work" class
    works = soup.find_all("li", class_="work")

    # Extract the data for each work
    results = []
    for work in works:
        title = work.find("h4", class_="title").text
        link = work.find("h4", class_="title").find("a").get("href")
        description = work.find("blockquote", class_="description").text
        results.append({"title": title, "link": link, "description": description})

    return jsonify({"results": results})

if __name__ == "__main__":
    app.run()