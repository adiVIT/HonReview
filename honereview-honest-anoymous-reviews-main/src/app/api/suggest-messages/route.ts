import { Separator } from "@/components/ui/separator";
import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // const { prompt } = await req.json();
    const { prompt } = await req.json();
    console.log(prompt);
    // console.log(await req.json());
    // const prompt1 = `(no back slash n only || for Separator) Generate a list of three constructive review variants based on the following input: ${prompt}. Each review should be separated by '||'. The reviews should be constructive, respectful, and provide valuable feedback. dont give example  or anything else just write the reviews. seperated with || no repetions or similar reviews.`;
    const prompt1 = `Generate exactly three constructive review variants(300 characters per review ) based on the following input: "${prompt}". Each review should be separated by '||' without any newline characters. The reviews must be constructive, respectful, and provide valuable feedback. Do not include examples or any additional text. Ensure there are no repetitions or similar reviews.`;
    console.log(prompt1);

    const response = await hf.textGeneration({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      inputs: prompt1,
      parameters: {
        max_new_tokens: 150,
        return_full_text: false,
      },
    });
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    // General error handling
    console.error("An unexpected error occurred:", error);
    throw error;
  }
}
