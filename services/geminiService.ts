
import { GoogleGenAI, Type } from "@google/genai";
import { TRANSACTION_CATEGORIES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const categorizeTransaction = async (description: string): Promise<string> => {
  if (!description.trim()) {
    return TRANSACTION_CATEGORIES[TRANSACTION_CATEGORIES.length-1]; // Return "Other"
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Categorize the following transaction description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              description: 'The suggested transaction category.',
              enum: TRANSACTION_CATEGORIES
            },
          },
          required: ["category"]
        },
      },
    });
    
    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    if (result && result.category && TRANSACTION_CATEGORIES.includes(result.category)) {
      return result.category;
    }
    return TRANSACTION_CATEGORIES[TRANSACTION_CATEGORIES.length - 1]; // "Other" as fallback
  } catch (error) {
    console.error("Error categorizing transaction:", error);
    return TRANSACTION_CATEGORIES[TRANSACTION_CATEGORIES.length-1]; // Default to "Other" on error
  }
};
