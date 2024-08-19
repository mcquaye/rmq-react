import { NextResponse } from "next/server";
import mailgun from "mailgun-js";
import path from "path";

// Initialize Mailgun
const mg = mailgun({
	apiKey: process.env.MAILGUN_API_KEY as string,
	domain: process.env.MAILGUN_DOMAIN as string,
});

export async function POST(request: Request) {
	try {
		// Parse the JSON body from the request
		const { to, name, message } = await request.json();

		// Validate required fields
		if (!to || !name || !message) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}

		// Define the file path for the attachment
		const filePath = path.join(process.cwd(), "rmq-resume.pdf");

		// Set up the email data object
		const data = {
			from: "Reuben Mac-Quaye <hello@mcquaye.xyz>",
			to,
			subject: "Resume of RMQ | Reuben Mac-Quaye | Web Developer",
			text: message,
			attachment: filePath, // Pass the file path directly as a string
		};

		// Send the email
		await mg.messages().send(data);

		return NextResponse.json({ success: "Resume sent successfully!" });
	} catch (error) {
		// Narrowing down the error type
		if (error instanceof Error) {
			// Handle the error as a regular Error object
			console.error("Mailgun Error:", error.message);
			return NextResponse.json(
				{ error: "Failed to send resume", details: error.message },
				{ status: 500 }
			);
		} else {
			// Handle unexpected error types
			console.error("Unexpected Error:", error);
			return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
		}
	}
}
