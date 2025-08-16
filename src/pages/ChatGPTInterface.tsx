import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Upload, Send, Paperclip, Plus } from "lucide-react";
import { useState } from "react";

interface ChatMessage {
  type: 'aliada' | 'user';
  content: string;
  timestamp: Date;
}

const ChatGPTInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'aliada',
      content: 'Hola, soy Aliada. ¿Cómo puedo ayudarte hoy?\n\nPuedes preguntarme sobre planificación de clases, metodologías de enseñanza, o subir el audio de una clase para que la analice.',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (currentMessage.trim() === "" || isLoading) return;

    const userMessage: ChatMessage = {
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        type: 'aliada',
        content: 'Entiendo tu consulta. Como tu asistente educativa, te ayudo a mejorar tu enseñanza. ¿Podrías contarme más detalles sobre lo que necesitas? Por ejemplo, ¿es sobre una clase específica, una metodología, o necesitas ayuda con la planificación?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const uploadMessage: ChatMessage = {
        type: 'user',
        content: `📎 Archivo subido: ${file.name}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, uploadMessage]);
      setIsLoading(true);

      // Simulate upload and analysis
      setTimeout(() => {
        const analysisMessage: ChatMessage = {
          type: 'aliada',
          content: `¡Perfecto! He recibido tu archivo "${file.name}". Estoy analizando el contenido y en breve te daré mi retroalimentación detallada.\n\n¿Hay algo específico que te gustaría que revise o en lo que me enfoque durante el análisis?`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, analysisMessage]);
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-ai-purple flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Aliada</h1>
              <p className="text-sm text-muted-foreground">Tu asistente de IA educativa</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nueva conversación
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div key={index} className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.type === 'aliada' 
                ? 'bg-ai-purple' 
                : 'bg-primary'
            }`}>
              {message.type === 'aliada' ? (
                <Brain className="w-4 h-4 text-white" />
              ) : (
                <div className="w-4 h-4 bg-white rounded-full" />
              )}
            </div>

            {/* Message Content */}
            <div className="flex-1 max-w-3xl">
              <div className={`p-4 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground ml-12' 
                  : 'bg-muted'
              }`}>
                <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2 px-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Loading Message */}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-ai-purple flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 max-w-3xl">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-ai-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-ai-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-ai-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Aliada está escribiendo...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex items-end gap-3 max-w-4xl">
          {/* File Upload */}
          <div className="relative">
            <input
              type="file"
              accept="audio/*,.mp3,.wav,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />
            <Button
              variant="outline"
              size="icon"
              disabled={isLoading}
              className="relative"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
          </div>

          {/* Message Input */}
          <div className="flex-1 relative">
            <Textarea
              placeholder="Envía un mensaje a Aliada..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="resize-none min-h-[56px] max-h-32 pr-12"
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              disabled={currentMessage.trim() === "" || isLoading}
              size="icon"
              className="absolute right-2 bottom-2"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          Aliada puede cometer errores. Verifica la información importante.
        </p>
      </div>
    </div>
  );
};

export default ChatGPTInterface;