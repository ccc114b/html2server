from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Mock data for testing
posts = [
    {"id": 1, "title": "Sample Post 1", "body": "This is the content of sample post 1."},
    {"id": 2, "title": "Sample Post 2", "body": "This is the content of sample post 2."},
]

# Route to serve the main page
@app.route("/")
def index():
    return app.send_static_file("index.html")

# Route to serve the static files (HTML, CSS, JS)
@app.route("/<path:filename>")
def static_files(filename):
    return app.send_static_file(f"{filename}")

# Route to get the list of posts
@app.route("/list")
def get_posts():
    return jsonify(posts)

# Route to get a specific post by ID
@app.route("/post/<int:post_id>")
def get_post(post_id):
    post = next((p for p in posts if p["id"] == post_id), None)
    if post:
        return jsonify(post)
    else:
        return jsonify({"error": "Post not found"}), 404

# Route to handle the creation of a new post
@app.route("/post", methods=["POST"])
def create_post():
    data = request.get_json()
    new_post = {
        "id": len(posts) + 1,
        "title": data["title"],
        "body": data["body"],
    }
    posts.append(new_post)
    return jsonify(new_post), 201

if __name__ == "__main__":
    app.run(debug=True)
