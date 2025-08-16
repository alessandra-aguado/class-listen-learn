import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Mic, Brain, Star, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-teachers.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">PlanificaIA</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Ingresar</Button>
            </Link>
            <Link to="/register">
              <Button variant="hero">Comenzar ahora</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Planifica mejor.</span>{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Enseña con confianza.
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Una IA que te escucha y te ayuda a mejorar tus clases. 
                  Sube el audio de tu clase y recibe feedback personalizado para ser un mejor docente.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Comenzar gratis
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Ya tengo cuenta
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-education-orange text-education-orange" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">4.9/5 de docentes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-secondary-accent" />
                  <span className="text-sm text-muted-foreground">+1,000 profesores</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Docentes utilizando PlanificaIA para mejorar sus clases"
                className="rounded-2xl shadow-elevated animate-float"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-warm border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-ai rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">IA Personalizada</p>
                    <p className="text-xs text-muted-foreground">Análisis en tiempo real</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">¿Cómo funciona PlanificaIA?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tres pasos simples para transformar tu enseñanza
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">1. Sube tu clase en audio</h3>
                <p className="text-muted-foreground">
                  Graba tu clase o sube un archivo de audio. Nuestra IA analizará cada detalle de tu enseñanza.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-ai rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">2. Recibe feedback personalizado</h3>
                <p className="text-muted-foreground">
                  Obtén análisis detallado sobre claridad, participación y metodología adaptado a tu contexto.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">3. Mejora tu planificación</h3>
                <p className="text-muted-foreground">
                  Implementa las sugerencias y ve cómo tus estudiantes responden mejor a tus clases.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Beneficios para tu carrera docente
                </h2>
                <p className="text-lg text-muted-foreground">
                  PlanificaIA te ayuda a ser el profesor que siempre quisiste ser
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-primary-soft rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Feedback objetivo y personalizado</h3>
                    <p className="text-muted-foreground">
                      Análisis imparcial de tu enseñanza adaptado a tu nivel educativo y contexto.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Mejora la participación estudiantil</h3>
                    <p className="text-muted-foreground">
                      Aprende técnicas para mantener a tus estudiantes más comprometidos.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-education-orange-soft rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-education-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Desarrollo profesional continuo</h3>
                    <p className="text-muted-foreground">
                      Evoluciona constantemente con sugerencias basadas en mejores prácticas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center border-0 shadow-soft bg-primary-soft">
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <p className="text-sm text-primary/80">Mejora en claridad</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center border-0 shadow-soft bg-secondary">
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold text-secondary-foreground">87%</div>
                  <p className="text-sm text-secondary-foreground/80">Aumento participación</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center border-0 shadow-soft bg-education-orange-soft">
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold text-education-orange">92%</div>
                  <p className="text-sm text-education-orange/80">Satisfacción docente</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center border-0 shadow-soft bg-ai-purple-soft">
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold text-ai-purple">4.9</div>
                  <p className="text-sm text-ai-purple/80">Calificación promedio</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              ¿Listo para transformar tu enseñanza?
            </h2>
            <p className="text-xl text-white/90">
              Únete a miles de docentes que ya están mejorando sus clases con PlanificaIA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Empezar gratis hoy
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-foreground">
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PlanificaIA</span>
              </div>
              <p className="text-muted-foreground">
                Empoderando a los docentes con IA para crear mejores experiencias educativas.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Producto</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Características</p>
                <p>Planes</p>
                <p>Soporte</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Empresa</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Sobre nosotros</p>
                <p>Blog</p>
                <p>Contacto</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Términos de uso</p>
                <p>Política de privacidad</p>
                <p>Cookies</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 PlanificaIA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;