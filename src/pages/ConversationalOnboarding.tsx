import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Brain, MapPin, Users, BookOpen, Laptop } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface OnboardingData {
  name: string;
  educationLevel: string;
  studentCount: string;
  location: string;
  resources: string[];
  averageClassSize: string;
  grade: string;
}

interface Message {
  type: 'aliada' | 'user';
  content: string;
  options?: string[];
  inputType?: 'text' | 'number' | 'select' | 'checkbox' | 'multiselect';
  selectOptions?: { value: string; label: string }[];
  checkboxOptions?: string[];
}

const ConversationalOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>({
    name: "",
    educationLevel: "",
    studentCount: "",
    location: "",
    resources: [],
    averageClassSize: "",
    grade: ""
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  const conversationFlow: Message[] = [
    {
      type: 'aliada',
      content: '¡Hola! ¿Cómo te llamas?',
      inputType: 'text'
    },
    {
      type: 'aliada',
      content: '¡Encantada de conocerte, {{name}}!\nSoy Aliada, tu asistente de IA educativa. Me gustaría conocerte mejor para brindarte la mejor experiencia personalizada.',
      inputType: 'text'
    },
    {
      type: 'aliada',
      content: '¿Qué nivel educativo impartes?',
      inputType: 'select',
      selectOptions: [
        { value: 'preescolar', label: 'Preescolar' },
        { value: 'primaria', label: 'Primaria' },
        { value: 'secundaria', label: 'Secundaria' },
        { value: 'bachillerato', label: 'Bachillerato' },
        { value: 'universidad', label: 'Universidad' },
        { value: 'otro', label: 'Otro' }
      ]
    },
    {
      type: 'aliada',
      content: '¿Cuántos estudiantes tienes?',
      inputType: 'number'
    },
    {
      type: 'aliada',
      content: '¿Dónde se ubica tu centro educativo?',
      inputType: 'select',
      selectOptions: [
        { value: 'madrid-espana', label: 'Madrid, España' },
        { value: 'barcelona-espana', label: 'Barcelona, España' },
        { value: 'valencia-espana', label: 'Valencia, España' },
        { value: 'sevilla-espana', label: 'Sevilla, España' },
        { value: 'buenos-aires-argentina', label: 'Buenos Aires, Argentina' },
        { value: 'cordoba-argentina', label: 'Córdoba, Argentina' },
        { value: 'cdmx-mexico', label: 'Ciudad de México, México' },
        { value: 'guadalajara-mexico', label: 'Guadalajara, México' },
        { value: 'bogota-colombia', label: 'Bogotá, Colombia' },
        { value: 'medellin-colombia', label: 'Medellín, Colombia' },
        { value: 'lima-peru', label: 'Lima, Perú' },
        { value: 'arequipa-peru', label: 'Arequipa, Perú' },
        { value: 'santiago-chile', label: 'Santiago, Chile' },
        { value: 'valparaiso-chile', label: 'Valparaíso, Chile' },
        { value: 'otro', label: 'Otro' }
      ]
    },
    {
      type: 'aliada',
      content: '¿Qué recursos tienes disponibles en tu centro?',
      inputType: 'checkbox',
      checkboxOptions: ['Proyector', 'Computadoras', 'Internet', 'Material impreso', 'Otros']
    },
    {
      type: 'aliada',
      content: 'Cantidad promedio de estudiantes por clase',
      inputType: 'number'
    },
    {
      type: 'aliada',
      content: '¿Qué grado enseñas principalmente?',
      inputType: 'select',
      selectOptions: [
        { value: '1', label: '1°' },
        { value: '2', label: '2°' },
        { value: '3', label: '3°' },
        { value: '4', label: '4°' },
        { value: '5', label: '5°' },
        { value: '6', label: '6°' },
        { value: '7', label: '7°' },
        { value: '8', label: '8°' },
        { value: '9', label: '9°' },
        { value: '10', label: '10°' },
        { value: '11', label: '11°' },
        { value: '12', label: '12°' },
        { value: 'otro', label: 'Otro' }
      ]
    },
    {
      type: 'aliada',
      content: '¡Perfecto, {{name}}! Ya tengo todo lo que necesito para comenzar a trabajar contigo.\n\n✨ Estoy lista para ayudarte a analizar tus clases y mejorar tu enseñanza.',
      inputType: 'text'
    }
  ];

  useEffect(() => {
    // Initialize first message
    if (messages.length === 0) {
      setMessages([conversationFlow[0]]);
    }
  }, []);

  const handleNext = () => {
    if (currentStep === 0) {
      setFormData(prev => ({ ...prev, name: currentInput }));
    } else if (currentStep === 2) {
      setFormData(prev => ({ ...prev, educationLevel: currentInput }));
    } else if (currentStep === 3) {
      setFormData(prev => ({ ...prev, studentCount: currentInput }));
    } else if (currentStep === 4) {
      setFormData(prev => ({ ...prev, location: currentInput }));
    } else if (currentStep === 5) {
      setFormData(prev => ({ ...prev, resources: selectedResources }));
    } else if (currentStep === 6) {
      setFormData(prev => ({ ...prev, averageClassSize: currentInput }));
    } else if (currentStep === 7) {
      setFormData(prev => ({ ...prev, grade: currentInput }));
    }

    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: currentStep === 5 ? selectedResources.join(', ') : currentInput
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const nextStep = currentStep + 1;
    
    if (nextStep < conversationFlow.length) {
      setTimeout(() => {
        const nextMessage = conversationFlow[nextStep];
        const processedContent = nextMessage.content.replace('{{name}}', formData.name || currentInput);
        
        setMessages(prev => [...prev, { ...nextMessage, content: processedContent }]);
        setCurrentStep(nextStep);
        setCurrentInput("");
        setSelectedResources([]);
      }, 1000);
    } else {
      // Complete onboarding
      setTimeout(() => {
        navigate("/chat");
      }, 2000);
    }
  };

  const handleResourceToggle = (resource: string) => {
    setSelectedResources(prev => 
      prev.includes(resource) 
        ? prev.filter(r => r !== resource)
        : [...prev, resource]
    );
  };

  const currentMessage = messages[messages.length - 1];
  const canProceed = currentInput.trim() !== "" || 
    (currentMessage?.inputType === 'checkbox' && selectedResources.length > 0);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-warm">
              <Brain className="w-7 h-7 text-primary" />
            </div>
            <span className="text-2xl font-bold text-white">Aliada</span>
          </Link>
        </div>

        <Card className="border-0 shadow-elevated max-h-[600px] overflow-hidden">
          <CardContent className="p-6">
            {/* Chat Messages */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'aliada' && (
                    <div className="w-8 h-8 rounded-full bg-ai-purple flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-ai-purple-soft text-foreground'
                  }`}>
                    <p className="whitespace-pre-line text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            {currentMessage && currentStep < conversationFlow.length - 1 && (
              <div className="space-y-4">
                {currentMessage.inputType === 'text' && (
                  <Input
                    placeholder="Escribe tu respuesta..."
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && canProceed && handleNext()}
                    className="transition-all duration-200 focus:shadow-soft"
                  />
                )}

                {currentMessage.inputType === 'number' && (
                  <Input
                    type="number"
                    placeholder="Número de estudiantes"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && canProceed && handleNext()}
                    className="transition-all duration-200 focus:shadow-soft"
                  />
                )}

                {currentMessage.inputType === 'select' && currentMessage.selectOptions && (
                  <Select onValueChange={setCurrentInput}>
                    <SelectTrigger className="transition-all duration-200 focus:shadow-soft">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentMessage.selectOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {currentMessage.inputType === 'checkbox' && currentMessage.checkboxOptions && (
                  <div className="grid grid-cols-2 gap-3">
                    {currentMessage.checkboxOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={selectedResources.includes(option)}
                          onCheckedChange={() => handleResourceToggle(option)}
                        />
                        <label htmlFor={option} className="text-sm cursor-pointer">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="bg-ai-purple hover:bg-ai-purple/90 text-white"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {/* Completion message */}
            {currentStep === conversationFlow.length - 1 && (
              <div className="text-center pt-4">
                <div className="animate-pulse">
                  <p className="text-sm text-muted-foreground">Redirigiendo a tu panel...</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConversationalOnboarding;