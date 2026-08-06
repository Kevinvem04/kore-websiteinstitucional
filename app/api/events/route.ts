import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      // Evento inicial: DOM pronto para carregar animações pesadas
      controller.enqueue(encoder.encode(`event: SECTION_READY\ndata: ${JSON.stringify({ ready: true })}\n\n`));
      
      // Simulando um evento de transição posterior
      setTimeout(() => {
        controller.enqueue(encoder.encode(`event: TRIGGER_TRANSITION\ndata: ${JSON.stringify({ transition: 'start' })}\n\n`));
      }, 500);
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    }
  });
}
