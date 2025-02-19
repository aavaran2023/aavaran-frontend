const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_CHAT_ID;

export const sendTelegramMessage = async (message) => {
    console.log(TELEGRAM_BOT_TOKEN)
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: "Markdown",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.description || "Failed to send Telegram message");
    }
    console.log("📩 Telegram notification sent!");
  } catch (error) {
    console.error("🚨 Error sending Telegram message:", error);
  }
};
