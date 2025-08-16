import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Brain, MapPin, Users, BookOpen, Laptop, ChevronRight, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface OnboardingData {
  school: string;
  location: string;
  isRural: boolean;
  resources: string[];
  grade: string;
  studentCount: number;
  experience: number;
  methodology: string;
  bio: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    school: "",
    location: "",
    isRural: false,
    resources: [],
    grade: "",
    studentCount: 25,
    experience: 5,
    methodology: "",
    bio: ""
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate("/dashboard");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResourceToggle = (resource: string) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.includes(resource)
        ? prev.resources.filter(r => r !== resource)
        : [...prev.resources, resource]
    }));
  };

  const availableResources = [
    "Computadoras/Tablets",
    "Internet de alta velocidad",
    "Proyector/Pantalla",
    "Pizarra digital",
    "Biblioteca física",
    "Laboratorio de ciencias",
    "Material didáctico variado",
    "Sistema de sonido"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-warm">
              <Brain className="w-7 h-7 text-primary" />
            </div>
            <span className="text-2xl font-bold text-white">PlanificaIA</span>
          </Link>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Personaliza tu experiencia</h1>
            <p className="text-white/80">
              Cuéntanos sobre tu contexto educativo para brindarte el mejor feedback
            </p>
          </div>
          
          {/* Progress */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2 bg-white/20" />
            <p className="text-sm text-white/70">
              Paso {currentStep} de {totalSteps}
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentStep === 1 && "Contexto educativo"}
              {currentStep === 2 && "Recursos disponibles"}
              {currentStep === 3 && "Información de clase"}
              {currentStep === 4 && "Experiencia profesional"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Cuéntanos sobre tu centro educativo"}
              {currentStep === 2 && "¿Qué recursos tienes disponibles para enseñar?"}
              {currentStep === 3 && "Detalles sobre tus clases actuales"}
              {currentStep === 4 && "Tu experiencia y metodología de enseñanza"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Educational Context */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="school" className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Nombre del centro educativo</span>
                  </Label>
                  <Input
                    id="school"
                    placeholder="Ej: Escuela Primaria San José"
                    value={formData.school}
                    onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
                    className="transition-all duration-200 focus:shadow-soft"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Ubicación (País/Ciudad)</span>
                  </Label>
                  <Input
                    id="location"
                    placeholder="Ej: Madrid, España"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="transition-all duration-200 focus:shadow-soft"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rural"
                    checked={formData.isRural}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, isRural: !!checked }))
                    }
                  />
                  <Label htmlFor="rural">El centro se encuentra en zona rural</Label>
                </div>
              </div>
            )}

            {/* Step 2: Resources */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Selecciona todos los recursos que tienes disponible en tu centro educativo:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableResources.map((resource) => (
                    <div key={resource} className="flex items-center space-x-2">
                      <Checkbox
                        id={resource}
                        checked={formData.resources.includes(resource)}
                        onCheckedChange={() => handleResourceToggle(resource)}
                      />
                      <Label htmlFor={resource} className="text-sm">{resource}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Class Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grado que enseñas principalmente</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                    <SelectTrigger className="transition-all duration-200 focus:shadow-soft">
                      <SelectValue placeholder="Selecciona el grado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preescolar">Preescolar</SelectItem>
                      <SelectItem value="1-primaria">1° Primaria</SelectItem>
                      <SelectItem value="2-primaria">2° Primaria</SelectItem>
                      <SelectItem value="3-primaria">3° Primaria</SelectItem>
                      <SelectItem value="4-primaria">4° Primaria</SelectItem>
                      <SelectItem value="5-primaria">5° Primaria</SelectItem>
                      <SelectItem value="6-primaria">6° Primaria</SelectItem>
                      <SelectItem value="1-secundaria">1° Secundaria</SelectItem>
                      <SelectItem value="2-secundaria">2° Secundaria</SelectItem>
                      <SelectItem value="3-secundaria">3° Secundaria</SelectItem>
                      <SelectItem value="4-secundaria">4° Secundaria</SelectItem>
                      <SelectItem value="universidad">Universidad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Cantidad promedio de estudiantes por clase</span>
                  </Label>
                  <div className="space-y-2">
                    <Slider
                      value={[formData.studentCount]}
                      onValueChange={([value]) => setFormData(prev => ({ ...prev, studentCount: value }))}
                      max={50}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>5 estudiantes</span>
                      <span className="font-medium">{formData.studentCount} estudiantes</span>
                      <span>50+ estudiantes</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Professional Experience */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>¿Cuántos años llevas enseñando?</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[formData.experience]}
                      onValueChange={([value]) => setFormData(prev => ({ ...prev, experience: value }))}
                      max={40}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Nuevo</span>
                      <span className="font-medium">{formData.experience} años</span>
                      <span>40+ años</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="methodology">¿Qué metodología usas principalmente?</Label>
                  <Input
                    id="methodology"
                    placeholder="Ej: Aprendizaje por proyectos, metodología tradicional, constructivismo..."
                    value={formData.methodology}
                    onChange={(e) => setFormData(prev => ({ ...prev, methodology: e.target.value }))}
                    className="transition-all duration-200 focus:shadow-soft"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Cuéntanos de ti como profesor/a (opcional)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Describe tu enfoque de enseñanza, materias favoritas, desafíos que enfrentas..."
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="transition-all duration-200 focus:shadow-soft"
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </Button>

              <Button
                variant="hero"
                onClick={handleNext}
                className="flex items-center space-x-2"
              >
                <span>{currentStep === totalSteps ? "Ir al panel" : "Siguiente"}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;