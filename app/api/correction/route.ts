"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { nota } = await req.json();

    if (!nota) {
      return NextResponse.json(
        { error: "La nota es requerida" },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      console.error("La clave de API de Google Gemini no está configurada.");
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Corrige la siguiente nota y ofrece solo dos sugerencias para mejorar su claridad. Formatea las sugerencias como una lista desordenada HTML (<ul><li>...</li></ul>) y utiliza etiquetas <strong> para resaltar las palabras clave o frases importantes:
 ${nota}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const sugerencias = response.text();

    return NextResponse.json({ sugerencias });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
