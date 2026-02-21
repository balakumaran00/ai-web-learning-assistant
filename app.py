from flask import Flask, render_template, request, jsonify
import ollama

app = Flask(__name__)

# Home Page
@app.route('/')
def home():
    return render_template("index.html")


# Dedicated Assistant Page
@app.route('/assistant')
def assistant():
    return render_template("assistant.html")


# Generate Guide
@app.route('/generate', methods=['POST'])
def generate():

    data = request.json
    url = data.get("url")
    task = data.get("task")

    prompt = f"""
Website: {url}

Task: {task}

Generate beginner friendly step-by-step instructions.
Use numbered steps.
Keep it simple.
"""

    response = ollama.chat(

        model="tinyllama",

        messages=[
            {"role":"user","content":prompt}
        ]

    )

    return jsonify({

        "result":response['message']['content']

    })


if __name__ == "__main__":
    app.run(debug=True)