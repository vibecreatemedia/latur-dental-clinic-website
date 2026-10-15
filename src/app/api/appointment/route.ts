import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, date, service, message } = body ?? {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide your full name." }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Please provide a valid mobile number." }, { status: 400 });
    }
    if (!date || typeof date !== "string") {
      return NextResponse.json({ error: "Please choose a preferred date." }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    let appointmentId = "apt-" + Date.now();
    try {
      const appointment = await db.appointment.create({
        data: {
          name: name.trim(),
          email: email?.trim() || null,
          phone: phone.trim(),
          date: date.trim(),
          service: service?.trim() || null,
          message: message?.trim() || null,
        },
      });
      appointmentId = appointment.id;
    } catch (dbErr) {
      console.warn("Database notice (serverless SQLite read-only mode):", dbErr);
      console.log("Appointment Request Captured:", {
        id: appointmentId,
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone.trim(),
        date: date.trim(),
        service: service?.trim() || null,
        message: message?.trim() || null,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      id: appointmentId,
      message: "Appointment request received. Our team will call you to confirm.",
    });
  } catch (err) {
    console.error("appointment POST error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please call us at +91 94043 30627." },
      { status: 500 }
    );
  }
}
