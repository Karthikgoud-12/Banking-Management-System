
import { GoogleGenAI } from "@google/genai";
import { Transaction } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getFinancialSummary = async (transactions: Transaction[], balance: number, accountHolder: string): Promise<string> => {
    if (!process.env.API_KEY) {
        return "AI features are disabled. Please configure your Gemini API key.";
    }

    const transactionList = transactions
        .slice(0, 20) // Use recent transactions
        .map(t => `- ${t.date}: ${t.description} - ${t.type} of $${t.amount.toFixed(2)}`)
        .join('\n');

    const prompt = `
      You are a friendly financial advisor for Gemini Bank.
      Your client is ${accountHolder}. Their current balance is $${balance.toFixed(2)}.

      Analyze the following recent transactions and provide a brief, encouraging financial summary and one actionable piece of advice.
      Keep the tone positive and helpful. Format the output as simple text, not markdown.

      Recent Transactions:
      ${transactionList}

      Summary and Advice:
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching financial summary:", error);
        return "I'm sorry, I couldn't generate a summary at this time. Please check your connection or API key and try again.";
    }
};
