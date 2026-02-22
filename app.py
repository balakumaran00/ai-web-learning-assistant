from flask import Flask,render_template,request,jsonify
import ollama
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)


############################
# HOME
############################

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/assistant")
def assistant():
    return render_template("assistant.html")


############################
# FAST WEBSITE ANALYSIS
############################

@app.route("/analyze",methods=["POST"])
def analyze():

    data = request.json
    url = data.get("url","")

    try:

        if not url.startswith("http"):
            url = "https://" + url


        # FAST SCRAPE
        r = requests.get(url,timeout=3)

        soup = BeautifulSoup(r.text,"html.parser")

        title = soup.title.string if soup.title else url


        text = soup.get_text()

        text = text[:800]   # SMALL TEXT = FAST AI


        prompt = f"""

Explain this website shortly.

Website: {title}

Explain:

• What this website is

• What users can do

• Main features

Limit to 6 lines only.
"""


        response = ollama.generate(

            model="tinyllama",

            prompt=prompt,

            stream=False

        )


        return jsonify({

            "result":response["response"]

        })


    except:

        return jsonify({

            "result":"Website information unavailable."

        })


############################
# FAST STEP GUIDE
############################

@app.route("/guide",methods=["POST"])
def guide():

    data = request.json

    url = data.get("url","")
    task = data.get("task","")

    try:


        prompt = f"""

Give SIMPLE numbered steps.

Website: {url}

Task: {task}

Example:

1. Open website
2. Login
3. Click button

Max 8 steps.
"""


        response = ollama.generate(

            model="tinyllama",

            prompt=prompt,

            stream=False

        )


        return jsonify({

            "result":response["response"]

        })


    except:

        return jsonify({

            "result":"Guide unavailable."

        })


############################

if __name__ == "__main__":
    app.run(debug=True)