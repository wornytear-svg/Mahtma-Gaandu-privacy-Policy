import { GoogleGenAI } from "@google/genai";
import { PrivacyPolicyData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhancePrivacyPolicy = async (currentData: PrivacyPolicyData): Promise<string> => {
  const prompt = `
    You are a legal expert specializing in software privacy policies (GDPR/CCPA compliant).
    Rewrite and enhance the following Privacy Policy for a Discord Bot. 
    Make it sound professional yet accessible. 
    Maintain all specific facts (names, dates, data collection methods).
    Output the result in clean Markdown format.

    Current Data:
    Name: ${currentData.metadata.name}
    Type: ${currentData.metadata.type}
    Created: ${currentData.metadata.createdDate}
    Last Updated: ${currentData.metadata.lastUpdated}
    Creator: ${currentData.metadata.creatorName}
    Contact: ${currentData.metadata.supportEmail}

    Current Sections:
    ${currentData.sections.map(s => `## ${s.title}\n${s.content}`).join('\n\n')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Failed to generate policy.";
  } catch (error) {
    console.error("Error generating policy:", error);
    throw error;
  }
};
