/* save_score.php
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
if (isset($data['name']) && isset($data['score'])) {
$name = $data['name'];
$score = $data['score'];

$stmt = $conn->prepare("INSERT INTO scores (name, score) VALUES (?, ?)");
$stmt->bind_param("si", $name, $score);
if ($stmt->execute()) {
echo json_encode(["success" => "Score saved successfully"]);
} else {
echo json_encode(["error" => "Error: " . $stmt->error]);
}

$stmt->close();
} else {
echo json_encode(["error" => "Invalid input"]);
}

$conn->close();
*/

fetch("save_score.php", {
  method: "POST",
  headers: {
    contentType: "application/json",
  },
  body: JSON.stringify({ name: playerName, score: score }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
