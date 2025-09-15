export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { question } = req.body;

  const faqs = {
    "what is your name": "I am your FAQ bot.",
    "how can i contact support": "You can email support@example.com.",
    "what are your hours": "We are available 24/7."
  };

  let answer = "I couldn't find this in the uploaded documents. Please upload relevant FAQs.";
  for (const key of Object.keys(faqs)) {
    if (question.toLowerCase().includes(key)) {
      answer = faqs[key];
      break;
    }
  }

  res.status(200).json({ answer });
}
