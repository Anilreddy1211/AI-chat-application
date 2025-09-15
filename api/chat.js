import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  // Load FAQ data from file
  const filePath = path.join(process.cwd(), 'data', 'faq.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const faqs = JSON.parse(fileContents);

  let answer = "I couldn't find this in the uploaded documents. Please upload relevant FAQs.";

  for (const item of faqs) {
    if (item.question.toLowerCase().includes(question.toLowerCase())) {
      answer = item.answer;
      break;
    }
  }

  res.status(200).json({ answer });
}
