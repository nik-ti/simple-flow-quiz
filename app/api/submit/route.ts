import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const webhookUrl = process.env.WEBHOOK_URL;

        if (!webhookUrl) {
            console.error("WEBHOOK_URL is not defined");
            // Return success to frontend even if webhook fails to not alarm user
            // But log error on server
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
            console.error("Webhook submission failed", await response.text());
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("API route error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
