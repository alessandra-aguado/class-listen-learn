import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Upload, Mic, Send, Paperclip, Clock, CheckCircle, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface ChatMessage {
  type: 'aliada' | 'user';
  content: string;
  timestamp: Date;
}

interface ClassRecord {
  id: string;
  subject: string;
  duration: string;
  uploadDate: string;
  status: 'evaluated' | 'analyzing' | 'received';
}

const MainChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'aliada',
      content: 'Hola, soy Aliada. ¿Cómo te puedo ayudar hoy?\n\n📎 Puedes escribirme lo que necesites o subir el audio de una clase para que lo revisemos juntas.',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Mock data for recent classes
  const recentClasses: ClassRecord[] = [
    {
      id: '1',
      subject: 'Matemática',
      duration: '12 min',
      uploadDate: '14/08/2025',
      status: 'evaluated'
    },
    {
      id: '2',
      subject: 'Ciencias',
      duration: '15 min',
      uploadDate: '13/08/2025',
      status: 'analyzing'
    },
    {
      id: '3',
      subject: 'Historia',
      duration: '8 min',
      uploadDate: '12/08/2025',
      status: 'received'
    }
  ];

  const handleSendMessage = () => {
    if (currentMessage.trim() === "") return;

    const userMessage: ChatMessage = {
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        type: 'aliada',
        content: 'Entiendo tu consulta. Te ayudo a analizar este tema. ¿Podrías contarme más detalles sobre lo que necesitas?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        const uploadMessage: ChatMessage = {
          type: 'aliada',
          content: `¡Perfecto! He recibido tu archivo de audio "${file.name}". Estoy analizando la clase y en unos minutos tendrás mi retroalimentación detallada.\n\n¿Hay algo específico que te gustaría que revise en esta clase?`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, uploadMessage]);
      }, 2000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'evaluated':
        return <CheckCircle className="w-4 h-4 text-secondary-accent" />;
      case 'analyzing':
        return <Loader className="w-4 h-4 text-ai-purple animate-spin" />;
      case 'received':
        return <Clock className="w-4 h-4 text-education-orange" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'evaluated':
        return 'Evaluada';
      case 'analyzing':
        return 'Analizando';
      case 'received':
        return 'Recibida';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'evaluated':
        return 'bg-secondary-accent/20 text-secondary-accent';
      case 'analyzing':
        return 'bg-ai-purple/20 text-ai-purple';
      case 'received':
        return 'bg-education-orange/20 text-education-orange';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Recent Classes */}
      <div className="w-80 bg-card border-r border-border p-6 overflow-y-auto">
        <div className="mb-6">
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">PlanificaIA</span>
          </Link>
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <span>📂</span>
            <span>Clases recientes</span>
          </h2>
        </div>

        <div className="space-y-3">
          {recentClasses.map((classRecord) => (
            <Card key={classRecord.id} className="cursor-pointer hover:shadow-soft transition-all duration-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Materia: {classRecord.subject}</h3>
                      <p className="text-sm text-muted-foreground">Duración: {classRecord.duration}</p>
                      <p className="text-sm text-muted-foreground">Subida: {classRecord.uploadDate}</p>
                    </div>
                    {getStatusIcon(classRecord.status)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={getStatusColor(classRecord.status)}>
                      {getStatusText(classRecord.status)}
                    </Badge>
                    
                    {classRecord.status === 'evaluated' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/ai-session/${classRecord.id}`)}
                      >
                        Ver feedback
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4 bg-card">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Chat con Aliada IA</h1>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Ver Panel
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'aliada' && (
                <div className="w-10 h-10 rounded-full bg-ai-purple flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
              )}
              <div className={`max-w-[70%] p-4 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-ai-purple-soft border border-border'
              }`}>
                <p className="whitespace-pre-line">{message.content}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isUploading && (
            <div className="flex justify-start">
              <div className="w-10 h-10 rounded-full bg-ai-purple flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="max-w-[70%] p-4 rounded-lg bg-ai-purple-soft border border-border">
                <div className="flex items-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <p>Procesando audio...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4 bg-card">
          <div className="flex items-center space-x-3">
            {/* File Upload */}
            <div className="relative">
              <input
                type="file"
                accept="audio/*,.mp3,.wav"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              <Button
                variant="outline"
                size="icon"
                disabled={isUploading}
                className="relative"
              >
                {isUploading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Paperclip className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Audio Upload Button */}
            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-education-orange/10 border-education-orange/30 hover:bg-education-orange/20"
            >
              <Mic className="w-4 h-4" />
              <span>🎙️ Subir una clase en audio</span>
            </Button>

            {/* Message Input */}
            <div className="flex-1 flex items-center space-x-2">
              <Input
                placeholder="Escribe tu mensaje..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={currentMessage.trim() === ""}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;