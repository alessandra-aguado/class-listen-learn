import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Upload, 
  History, 
  Settings, 
  Mic, 
  FileAudio, 
  TrendingUp,
  Star,
  Clock,
  Play,
  MoreVertical,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Mock data for demonstration
const mockClasses = [
  {
    id: 1,
    name: "Matemáticas - Fracciones",
    subject: "Matemáticas",
    date: "2024-01-15",
    status: "evaluada",
    rating: 4.5,
    duration: "45 min",
    feedback: "Excelente explicación de conceptos, pero considera más ejemplos prácticos."
  },
  {
    id: 2,
    name: "Historia - Revolución Industrial",
    subject: "Historia",
    date: "2024-01-12",
    status: "en-analisis",
    duration: "40 min"
  },
  {
    id: 3,
    name: "Ciencias - El Sistema Solar",
    subject: "Ciencias",
    date: "2024-01-10",
    status: "evaluada",
    rating: 4.8,
    duration: "50 min",
    feedback: "Muy buena interacción con estudiantes. Metodología visual efectiva."
  }
];

const Dashboard = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <img src="/lovable-uploads/7ecccd56-3e45-4c2e-b819-a26e92b82caf.png" alt="ALIADA" className="w-5 h-5 rounded-sm" />
            </div>
            <span className="text-xl font-bold text-foreground">ALIADA</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
            <Button variant="outline" size="sm">
              Perfil
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">¡Hola, María! 👋</h1>
          <p className="text-muted-foreground text-lg">
            ¿Lista para mejorar tu próxima clase? Aquí tienes tu resumen de progreso.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-soft rounded-lg flex items-center justify-center">
                  <FileAudio className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Clases analizadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">+15%</p>
                  <p className="text-sm text-muted-foreground">Mejora promedio</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-education-orange-soft rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-education-orange" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4.7</p>
                  <p className="text-sm text-muted-foreground">Calificación IA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-ai-purple-soft rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-ai-purple" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8.5h</p>
                  <p className="text-sm text-muted-foreground">Tiempo analizado</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload New Class */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-primary" />
                  <span>Subir nueva clase</span>
                </CardTitle>
                <CardDescription>
                  Sube el audio de tu clase y recibe feedback personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4 hover:border-primary/50 transition-colors">
                  <div className="w-16 h-16 bg-primary-soft rounded-full flex items-center justify-center mx-auto">
                    <Mic className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Arrastra tu archivo de audio aquí</p>
                    <p className="text-sm text-muted-foreground">O haz clic para seleccionar (MP3, WAV, M4A)</p>
                  </div>
                  <Button variant="hero">
                    <Plus className="w-4 h-4 mr-2" />
                    Seleccionar archivo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Classes */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5 text-primary" />
                  <span>Clases recientes</span>
                </CardTitle>
                <CardDescription>
                  Historial de tus clases evaluadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockClasses.map((classItem) => (
                  <div key={classItem.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{classItem.name}</h3>
                          <Badge 
                            variant={classItem.status === "evaluada" ? "default" : "secondary"}
                            className={classItem.status === "evaluada" ? "bg-secondary text-secondary-foreground" : ""}
                          >
                            {classItem.status === "evaluada" ? "Evaluada" : "En análisis"}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>📚 {classItem.subject}</span>
                          <span>🕒 {classItem.duration}</span>
                          <span>📅 {new Date(classItem.date).toLocaleDateString('es-ES')}</span>
                          {classItem.rating && (
                            <span className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-education-orange text-education-orange" />
                              <span>{classItem.rating}</span>
                            </span>
                          )}
                        </div>
                        
                        {classItem.feedback && (
                          <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                            {classItem.feedback}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {classItem.status === "evaluada" && (
                          <Link to={`/ai-session/${classItem.id}`}>
                            <Button variant="outline" size="sm">
                              <Play className="w-4 h-4 mr-2" />
                              Ver feedback
                            </Button>
                          </Link>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Tu progreso este mes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Claridad en explicaciones</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Participación estudiantil</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Gestión del tiempo</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uso de metodología</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-0 shadow-soft bg-gradient-to-br from-ai-purple-soft to-primary-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <img src="/lovable-uploads/7ecccd56-3e45-4c2e-b819-a26e92b82caf.png" alt="ALIADA" className="w-5 h-5 rounded-sm" />
                  <span>Tip de la IA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Considera hacer preguntas abiertas cada 10-15 minutos para mantener la atención de tus estudiantes. 
                  Tus últimas clases muestran gran mejora en este aspecto.
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Acciones rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Editar perfil docente
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileAudio className="w-4 h-4 mr-2" />
                  Ver todas las clases
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Reportes de progreso
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;