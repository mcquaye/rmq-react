require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/send-resume", async (req, res) => {
	const { email } = req.body;

	if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
		return res.status(400).send("Invalid email address.");
	}

	if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
		return res.status(500).send("Email configuration is missing.");
	}

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: `RMQ Creative <${process.env.EMAIL_USER}>`,
		to: email,
		subject: "RMQ Resume 2024/25 - RMQ Creative",
		text: "Please find attached my resume.",
		attachments: [
			{
				filename: "resume.pdf",
				path: path.join(__dirname, "rmq-resume.pdf"),
			},
		],
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("Email sent successfully to:", email);
		res.status(200).send("Email sent successfully");
	} catch (error) {
		console.error("Error sending email:", error);
		res.status(500).send("Error sending email: " + error.message);
	}
});

app.listen(5000, () => {
	console.log("Server is running on port 5000");
});
