import axios from "axios";
import { Readability } from "@mozilla/readability";
import { JSDOM, VirtualConsole } from "jsdom";

// Suppress jsdom errors by redirecting logs to an empty function
const virtualConsole = new VirtualConsole();
virtualConsole.on("error", () => {}); // Ignore CSS parsing errors

export async function getArticleText(url: string) {
  try {
    // Fetch the HTML content of the page
    const { data } = await axios.get(url);

    // Create a JSDOM instance with a virtual console to suppress errors
    const dom = new JSDOM(data, { virtualConsole });

    // Create a Readability instance with the document from the DOM
    const reader = new Readability(dom.window.document);

    // Extract the main article content
    const article = reader.parse();

    // Return the text content of the article
    return article ? article.textContent.trim() : "";
  } catch (error) {
    console.error("Error extracting article:", error);
    throw new Error("Failed to scrape the website.");
  }
}
