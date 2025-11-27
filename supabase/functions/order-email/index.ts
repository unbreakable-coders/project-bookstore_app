// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "https://esm.sh/resend@3";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey ?? "");

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY env var");
    return new Response("Missing RESEND_API_KEY", { status: 500 });
  }

  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response("No record in payload", { status: 400 });
    }

    const orderId = record.id;
    const customerEmail: string | undefined = record.email ?? undefined;

    const totalPrice =
      record.total_price_uah ??
      record.total_price ??
      record.amount ??
      null;

    const fullName =
      [record.first_name, record.last_name].filter(Boolean).join(" ") ||
      "друже";

    const fallbackAdminEmail = Deno.env.get("ORDERS_NOTIFICATION_EMAIL");
    const recipient = customerEmail || fallbackAdminEmail;

    if (!recipient) {
      console.error(
        "No recipient email (record.email or ORDERS_NOTIFICATION_EMAIL)",
      );
      return new Response("No recipient email", { status: 400 });
    }

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5;">
        <h2>Дякуємо за замовлення в Bookstore!</h2>
        <p>Привіт, ${fullName}!</p>
        <p>Ми отримали ваше замовлення <strong>№${orderId}</strong>.</p>
        ${
          totalPrice !== null
            ? `<p>Сума замовлення: <strong>${totalPrice} грн</strong>.</p>`
            : ""
        }
        <p>Найближчим часом ми розпочнемо обробку замовлення і повідомимо про відправку.</p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #777;">
          Це автоматичний лист, будь ласка, не відповідайте на нього.
        </p>
      </div>
    `;

    await resend.emails.send({
      from: "Bookstore <no-reply@yourdomain.com>",
      to: recipient,
      subject: `Ваше замовлення №${orderId} прийнято`,
      html,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("order-email error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
