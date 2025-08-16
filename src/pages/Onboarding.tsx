import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Brain, MapPin, Users, BookOpen, Laptop, ChevronRight, ChevronLeft, GraduationCap, Baby, School } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface OnboardingData {
  educationalLevel: string;
  totalStudents: number;
  location: string;
  resources: string[];
  averageStudentsPerClass: number;
  otherLevel: string;
  otherResource: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    educationalLevel: "",
    totalStudents: 0,
    location: "",
    resources: [],
    averageStudentsPerClass: 0,
    otherLevel: "",
    otherResource: ""
  });

  const totalSteps = 5;
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
    "Proyector",
    "Computadoras", 
    "Internet",
    "Material impreso",
    "Otros"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-warm">
              <img src="/lovable-uploads/7ecccd56-3e45-4c2e-b819-a26e92b82caf.png" alt="ALIADA" className="w-7 h-7 rounded-sm" />
            </div>
            <span className="text-2xl font-bold text-white">ALIADA</span>
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
              {currentStep === 1 && "Nivel educativo que impartes"}
              {currentStep === 2 && "¿Cuántos estudiantes tienes actualmente?"}
              {currentStep === 3 && "Ubicación del centro educativo"}
              {currentStep === 4 && "Recursos disponibles"}
              {currentStep === 5 && "Cantidad promedio de estudiantes por clase"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Permite a la IA adaptar el análisis pedagógico según el rango de edad y competencias esperadas"}
              {currentStep === 2 && "Da contexto sobre la complejidad del entorno del docente"}
              {currentStep === 3 && "Ajusta el feedback a nivel curricular/regional"}
              {currentStep === 4 && "¡Selecciona los recursos con los que cuentas. Todo suma!"}
              {currentStep === 5 && "Información para adaptar sugerencias relacionadas con participación y metodologías"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Educational Level */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, educationalLevel: "inicial" }))}
                    className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
                      formData.educationalLevel === "inicial" 
                        ? "border-primary bg-primary/5 shadow-soft" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <Baby className="w-8 h-8 text-primary" />
                      <span className="font-medium">Inicial</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, educationalLevel: "primaria" }))}
                    className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
                      formData.educationalLevel === "primaria" 
                        ? "border-primary bg-primary/5 shadow-soft" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <BookOpen className="w-8 h-8 text-primary" />
                      <span className="font-medium">Primaria</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, educationalLevel: "secundaria" }))}
                    className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
                      formData.educationalLevel === "secundaria" 
                        ? "border-primary bg-primary/5 shadow-soft" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <GraduationCap className="w-8 h-8 text-primary" />
                      <span className="font-medium">Secundaria</span>
                    </div>
                  </button>
                </div>
                
                <button
                  onClick={() => setFormData(prev => ({ ...prev, educationalLevel: "otro" }))}
                  className={`w-full p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    formData.educationalLevel === "otro" 
                      ? "border-primary bg-primary/5 shadow-soft" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <School className="w-5 h-5 text-primary" />
                    <span className="font-medium">Otro</span>
                  </div>
                </button>
                
                {formData.educationalLevel === "otro" && (
                  <div className="space-y-2">
                    <Label htmlFor="otherLevel">Especifica el nivel educativo</Label>
                    <Input
                      id="otherLevel"
                      placeholder="Ej: Universidad, Educación especial, etc."
                      value={formData.otherLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, otherLevel: e.target.value }))}
                      className="transition-all duration-200 focus:shadow-soft"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Total Students */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="totalStudents" className="text-base font-medium">
                    Incluye todos los grupos que atiendes en total
                  </Label>
                  <Input
                    id="totalStudents"
                    type="number"
                    placeholder="Ej: 30"
                    value={formData.totalStudents || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalStudents: parseInt(e.target.value) || 0 }))}
                    className="h-12 text-base transition-all duration-200 focus:shadow-soft"
                    min="1"
                    max="999"
                  />
                  <p className="text-sm text-muted-foreground">
                    💡 Incluye todos los grupos que atiendes en total.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Ciudad o región</span>
                  </Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger className="h-12 transition-all duration-200 focus:shadow-soft">
                      <SelectValue placeholder="Selecciona tu ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="madrid">Madrid, España</SelectItem>
                      <SelectItem value="barcelona">Barcelona, España</SelectItem>
                      <SelectItem value="valencia">Valencia, España</SelectItem>
                      <SelectItem value="sevilla">Sevilla, España</SelectItem>
                      <SelectItem value="zaragoza">Zaragoza, España</SelectItem>
                      <SelectItem value="malaga">Málaga, España</SelectItem>
                      <SelectItem value="murcia">Murcia, España</SelectItem>
                      <SelectItem value="palmas">Las Palmas, España</SelectItem>
                      <SelectItem value="bilbao">Bilbao, España</SelectItem>
                      <SelectItem value="alicante">Alicante, España</SelectItem>
                      <SelectItem value="cordoba">Córdoba, España</SelectItem>
                      <SelectItem value="valladolid">Valladolid, España</SelectItem>
                      <SelectItem value="vigo">Vigo, España</SelectItem>
                      <SelectItem value="gijon">Gijón, España</SelectItem>
                      <SelectItem value="hospitalet">L'Hospitalet, España</SelectItem>
                      <SelectItem value="coruña">A Coruña, España</SelectItem>
                      <SelectItem value="vitoria">Vitoria, España</SelectItem>
                      <SelectItem value="granada">Granada, España</SelectItem>
                      <SelectItem value="elche">Elche, España</SelectItem>
                      <SelectItem value="oviedo">Oviedo, España</SelectItem>
                      <SelectItem value="otra">Otra ubicación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 4: Resources */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableResources.map((resource) => (
                    <div key={resource} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id={resource}
                        checked={formData.resources.includes(resource)}
                        onCheckedChange={() => handleResourceToggle(resource)}
                        className="h-5 w-5"
                      />
                      <Label htmlFor={resource} className="text-base font-medium cursor-pointer flex-1">
                        {resource === "Proyector" && <div className="flex items-center space-x-2"><Laptop className="w-5 h-5" /><span>Proyector</span></div>}
                        {resource === "Computadoras" && <div className="flex items-center space-x-2"><Laptop className="w-5 h-5" /><span>Computadoras</span></div>}
                        {resource === "Internet" && <div className="flex items-center space-x-2"><MapPin className="w-5 h-5" /><span>Internet</span></div>}
                        {resource === "Material impreso" && <div className="flex items-center space-x-2"><BookOpen className="w-5 h-5" /><span>Material impreso</span></div>}
                        {resource === "Otros" && <div className="flex items-center space-x-2"><Brain className="w-5 h-5" /><span>Otros</span></div>}
                      </Label>
                    </div>
                  ))}
                </div>
                
                {formData.resources.includes("Otros") && (
                  <div className="space-y-2">
                    <Label htmlFor="otherResource">Especifica otros recursos</Label>
                    <Input
                      id="otherResource"
                      placeholder="Ej: Pizarra digital, tablets, laboratorio..."
                      value={formData.otherResource}
                      onChange={(e) => setFormData(prev => ({ ...prev, otherResource: e.target.value }))}
                      className="transition-all duration-200 focus:shadow-soft"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Average Students Per Class */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="averageStudents" className="text-base font-medium">
                    Cantidad promedio de estudiantes por clase
                  </Label>
                  <Input
                    id="averageStudents"
                    type="number"
                    placeholder="Ej: 25"
                    value={formData.averageStudentsPerClass || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, averageStudentsPerClass: parseInt(e.target.value) || 0 }))}
                    className="h-12 text-base transition-all duration-200 focus:shadow-soft"
                    min="1"
                    max="999"
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