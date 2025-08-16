import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Send, Paperclip, Mic, Plus, Play, Pause, Download, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  type: 'aliada' | 'user';
  content: string;
  timestamp: Date;
  isFileUpload?: boolean;
  fileName?: string;
}

interface ClassRecord {
  id: string;
  name: string;
  subject: string;
  duration: string;
  date: Date;
  status: 'analyzing' | 'completed' | 'warning';
}

const ChatGPTInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'aliada',
      content: '¡Hola! Soy Aliada, tu asistente de enseñanza personalizada. Puedes preguntarme cualquier cosa sobre pedagogía, subir audios de tus clases para análisis, o simplemente conversar sobre tu experiencia docente. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [classRecords] = useState<ClassRecord[]>([
    {
      id: '1',
      name: 'Fracciones - 4° grado',
      subject: 'Matemáticas',
      duration: '12 min',
      date: new Date(Date.now() - 86400000),
      status: 'completed'
    },
    {
      id: '2',
      name: 'Ecosistemas marinos',
      subject: 'Ciencias Naturales',
      duration: '18 min',
      date: new Date(Date.now() - 172800000),
      status: 'completed'
    },
    {
      id: '3',
      name: 'Análisis en proceso...',
      subject: 'Historia',
      duration: '15 min',
      date: new Date(),
      status: 'analyzing'
    }
  ]);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (currentMessage.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Entiendo tu consulta. Como tu asistente pedagógica, estoy aquí para ayudarte. ¿Podrías contarme más detalles sobre lo que necesitas?',
        'Excelente pregunta. En mi experiencia analizando clases, he notado que esto es muy común. Te puedo sugerir algunas estrategias efectivas.',
        'Me parece una situación interesante. ¿Has intentado aplicar metodologías activas en este caso? Te puedo compartir algunas ideas específicas.'
      ];
      
      const aiResponse: ChatMessage = {
        type: 'aliada',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Add user message about file upload
      const userMessage: ChatMessage = {
        type: 'user',
        content: `Archivo subido: ${file.name}`,
        timestamp: new Date(),
        isFileUpload: true,
        fileName: file.name
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      // Simulate processing time
      setTimeout(() => {
        const processingResponse: ChatMessage = {
          type: 'aliada',
          content: `🎧 Recibí tu clase: "${file.name}" (${Math.floor(Math.random() * 20 + 5)} min)
Estoy procesándola... esto tomará unos segundos ⏳`,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, processingResponse]);

        // Simulate analysis completion
        setTimeout(() => {
          const analysisResponse: ChatMessage = {
            type: 'aliada',
            content: `✅ ¡Análisis completo!

📄 Tu clase ha sido evaluada.  
He preparado un reporte con observaciones, sugerencias y una idea de mejora.

¿Quieres que te lo resuma aquí en el chat o prefieres descargarlo directamente?`,
            timestamp: new Date()
          };

          setMessages(prev => [...prev, analysisResponse]);
          setIsLoading(false);

          // Show download notification
          setTimeout(() => {
            toast({
              title: "Reporte listo",
              description: "Tu análisis pedagógico está disponible para descarga",
            });
          }, 1000);
        }, 3000);
      }, 1000);
    }
  };

  const downloadReport = () => {
    // Create a simple text file simulating a PDF report
    const reportContent = `REPORTE DE ANÁLISIS PEDAGÓGICO - ALIADA

📋 RESUMEN DE LA CLASE
• Duración: 12 minutos
• Materia: Matemáticas  
• Tema: Fracciones
• Grado: 4° de primaria

✅ PUNTOS FUERTES
• Explicación clara y estructurada
• Uso de ejemplos concretos
• Buen ritmo de enseñanza

📌 SUGERENCIAS DE MEJORA
• Incluir más preguntas abiertas para fomentar participación
• Usar material visual adicional
• Permitir más tiempo para preguntas al final

🧠 IDEA DIDÁCTICA EXTRA
Actividad sugerida: "El restaurante de fracciones"
Los estudiantes pueden simular ser meseros y dividir pizzas en fracciones según los pedidos de los clientes.

🗓️ Generado: ${new Date().toLocaleDateString()}
📧 Docente: Usuario ALIADA
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Reporte_Aliada_Analisis_Pedagogico.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "✅ Reporte descargado",
      description: "El archivo se ha guardado en tu dispositivo",
    });
  };

  const getStatusIcon = (status: ClassRecord['status']) => {
    switch (status) {
      case 'analyzing':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status: ClassRecord['status']) => {
    switch (status) {
      case 'analyzing':
        return 'En análisis';
      case 'completed':
        return 'Evaluada';
      case 'warning':
        return 'Con observaciones';
    }
  };

  const getStatusColor = (status: ClassRecord['status']) => {
    switch (status) {
      case 'analyzing':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex">
      {/* Sidebar */}
      <div className="w-80 border-r bg-background/80 backdrop-blur-sm flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/7ecccd56-3e45-4c2e-b819-a26e92b82caf.png" 
              alt="ALIADA" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-lg font-semibold">ALIADA</h1>
              <p className="text-xs text-muted-foreground">Asistente de enseñanza</p>
            </div>
          </div>
          
          {/* Upload new class button */}
          <Button className="w-full gap-2" size="lg">
            <Plus className="h-4 w-4" />
            🎙️ Subir nueva clase
          </Button>
        </div>

        {/* Class history */}
        <div className="flex-1 overflow-auto p-4">
          <h3 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wide">
            Historial de clases
          </h3>
          <div className="space-y-3">
            {classRecords.map((record) => (
              <Card key={record.id} className="p-3 hover:bg-muted/50 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm leading-tight">{record.name}</h4>
                    {getStatusIcon(record.status)}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <div>{record.subject}</div>
                    <div>{record.duration} • {record.date.toLocaleDateString()}</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getStatusColor(record.status)}`}
                    >
                      {getStatusText(record.status)}
                    </Badge>
                    
                    {record.status === 'completed' && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Play className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 text-xs"
                          onClick={downloadReport}
                        >
                          Ver feedback
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Help section */}
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full text-left justify-start gap-2" size="sm">
            ❓ Ayuda
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/7ecccd56-3e45-4c2e-b819-a26e92b82caf.png" 
                alt="ALIADA" 
                className="h-6 w-auto"
              />
            </div>
            <div>
              <h2 className="font-semibold">Aliada</h2>
              <p className="text-sm text-muted-foreground">Tu asistente pedagógica personal</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'aliada' && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/7ecccd56-3e45-4c2e-b819-a26e92b82caf.png" 
                      alt="ALIADA" 
                      className="h-5 w-auto"
                    />
                  </div>
                </div>
              )}
              
              <div className={`max-w-[80%] ${
                message.type === 'user' ? 'order-first' : ''
              }`}>
                <Card className={`p-4 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50'
                }`}>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.isFileUpload && (
                    <div className="mt-2 pt-2 border-t border-border/20">
                      <div className="flex items-center gap-2 text-sm opacity-80">
                        <Paperclip className="h-3 w-3" />
                        <span>{message.fileName}</span>
                      </div>
                    </div>
                  )}
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </Card>
                
                {/* Download button for completed analysis */}
                {message.type === 'aliada' && message.content.includes('¿Quieres que te lo resuma') && (
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadReport}
                      className="gap-2"
                    >
                      <Download className="h-3 w-3" />
                      📥 Descargar reporte PDF
                    </Button>
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                    U
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/7ecccd56-3e45-4c2e-b819-a26e92b82caf.png" 
                    alt="ALIADA" 
                    className="h-5 w-auto"
                  />
                </div>
              </div>
              <Card className="bg-muted/50 p-4">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span>Aliada está escribiendo...</span>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
          <Card className="p-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Escribe aquí tu mensaje o pregunta..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="text-base border-0 focus-visible:ring-0 shadow-none"
                />
              </div>
              <div className="flex gap-1">
                <input
                  type="file"
                  accept=".mp3,.wav,.pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  title="📎 Adjuntar archivo"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title="🎤 Grabar voz"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  size="icon"
                  title="📤 Enviar"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTInterface;