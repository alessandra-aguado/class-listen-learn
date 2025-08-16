import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Brain, 
  ArrowLeft, 
  Send, 
  Play, 
  Pause, 
  Volume2, 
  Star,
  Clock,
  BookOpen,
  Users,
  Lightbulb
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

// Mock data for the AI session
const mockClassData = {
  id: 1,
  name: "Matemáticas - Fracciones",
  subject: "Matemáticas",
  date: "2024-01-15",
  duration: "45 min",
  rating: 4.5,
  objectives: "Enseñar el concepto de fracciones equivalentes",
  grade: "5° Primaria",
  studentCount: 28
};

const mockConversation = [
  {
    id: 1,
    sender: "ai",
    message: "¡Hola! He analizado tu clase de Matemáticas sobre fracciones. En general, fue una excelente sesión. ¿Te gustaría que revisemos juntos los aspectos más destacados o hay algo específico en lo que quieres que me enfoque?",
    timestamp: "14:30"
  },
  {
    id: 2,
    sender: "teacher",
    message: "Hola! Me gustaría saber cómo fue la participación de los estudiantes. Sentí que algunos estaban distraídos.",
    timestamp: "14:32"
  },
  {
    id: 3,
    sender: "ai", 
    message: "Tienes razón en esa observación. Noté que aproximadamente a los 25 minutos de clase, hubo una disminución en la participación activa. Sin embargo, tu estrategia de hacer preguntas directas a estudiantes específicos ayudó a recuperar su atención. Te sugiero implementar actividades cortas cada 15 minutos para mantener el engagement.",
    timestamp: "14:33"
  }
];

const AISession = () => {
  const { classId } = useParams();
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [conversation, setConversation] = useState(mockConversation);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: conversation.length + 1,
        sender: "teacher" as const,
        message,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setConversation([...conversation, newMessage]);
      setMessage("");
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: conversation.length + 2,
          sender: "ai" as const,
          message: "Entiendo tu consulta. Déjame analizar ese aspecto específico de tu clase y te daré recomendaciones concretas.",
          timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        };
        setConversation(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al panel
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">PlanificaIA</span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              Sesión activa
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          {/* Left Sidebar - Class Info */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Información de la clase</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">{mockClassData.name}</h3>
                  <p className="text-sm text-muted-foreground">📚 {mockClassData.subject}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Fecha:</span>
                    <span>{new Date(mockClassData.date).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duración:</span>
                    <span>{mockClassData.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Grado:</span>
                    <span>{mockClassData.grade}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estudiantes:</span>
                    <span>{mockClassData.studentCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Calificación IA:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-education-orange text-education-orange" />
                      <span>{mockClassData.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium mb-2">Objetivo de la clase:</p>
                  <p className="text-sm text-muted-foreground">{mockClassData.objectives}</p>
                </div>
              </CardContent>
            </Card>

            {/* Audio Player */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Volume2 className="w-5 h-5" />
                  <span>Audio de la clase</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <div className="flex-1">
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 bg-primary rounded-full w-1/3"></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>15:20</span>
                  <span>45:00</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Insights rápidos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-soft rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Gestión del tiempo</p>
                    <p className="text-xs text-muted-foreground">Excelente distribución</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Participación</p>
                    <p className="text-xs text-muted-foreground">Mejorable en partes</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-education-orange-soft rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-education-orange" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Claridad</p>
                    <p className="text-xs text-muted-foreground">Muy buena explicación</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-soft h-full flex flex-col">
              <CardHeader className="border-b border-border">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-ai text-white">
                      <Brain className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Asistente IA de PlanificaIA</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Analista pedagógico especializado en {mockClassData.subject}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {conversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-3 max-w-3xl ${msg.sender === 'teacher' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className={msg.sender === 'ai' ? 'bg-gradient-ai text-white' : 'bg-primary-soft text-primary'}>
                          {msg.sender === 'ai' ? <Brain className="w-4 h-4" /> : 'M'}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`rounded-lg p-4 ${
                        msg.sender === 'teacher' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-2 ${
                          msg.sender === 'teacher' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex space-x-4">
                  <Input
                    placeholder="Escribe tu pregunta sobre la clase..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    variant="hero" 
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Presiona Enter para enviar • La IA analizará tu clase y te dará feedback personalizado
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISession;