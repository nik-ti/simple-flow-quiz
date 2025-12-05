import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const webhookUrl = process.env.WEBHOOK_URL;

        console.log("Submitting to webhook..."); // Log start

        if (!webhookUrl) {
            console.error("WEBHOOK_URL is not defined");
            return NextResponse.json({ success: true, warning: "Webhook not configured" });
        }

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Webhook submission failed:", response.status, errorText);
            // We still return success to the client to show the thank you screen
            // but we log the error on the server
        } else {
            console.log("Webhook submission successful");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("API route error:", error);
        // Return 200 even on error to ensure UI flow completes, but log it
        return NextResponse.json({ success: true, error: "Internal Server Error" });
    }
}
