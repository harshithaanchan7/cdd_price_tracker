import os
from pathlib import Path

import requests
from dotenv import load_dotenv

# Load environment variables
env_path = Path(__file__).with_name(".env")
load_dotenv(env_path)

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")


def send_telegram_alert(product_name, current_price, target_price):

    if not BOT_TOKEN or not CHAT_ID:
        raise ValueError(
            "Telegram bot token or chat ID is missing in .env"
        )

    message = (
        "PRICE DROP ALERT!\n\n"
        f"Product: {product_name}\n"
        f"Current Price: Rs. {current_price}\n"
        f"Target Price: Rs. {target_price}\n\n"
        "Your target price has been reached!"
    )

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    response = requests.post(
        url,
        data={
            "chat_id": CHAT_ID,
            "text": message
        },
        timeout=15
    )

    response.raise_for_status()

    result = response.json()

    if not result.get("ok"):
        raise RuntimeError("Telegram message was not sent")

    print("Telegram alert sent successfully!")