import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Brain, User, Mail, Lock, GraduationCap, Building } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    educationLevel: "",
    institutionType: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log("Registration attempt:", formData);
    // Redirect to onboarding after successful registration
    navigate("/onboarding");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-warm">
              <Brain className="w-7 h-7 text-primary" />
            </div>
            <span className="text-2xl font-bold text-white">ALIADA</span>
          </Link>
          <p className="text-white/80">Crea tu cuenta y comienza a mejorar</p>
        </div>

        <Card className="border-0 shadow-elevated">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl">Crear cuenta</CardTitle>
            <CardDescription>
              Únete a la comunidad de docentes que mejoran con IA
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Nombre</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Tu nombre"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="transition-all duration-200 focus:shadow-soft"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    placeholder="Tu apellido"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="transition-all duration-200 focus:shadow-soft"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Correo electrónico</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="educationLevel" className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Nivel educativo que impartes</span>
                </Label>
                <Select onValueChange={(value) => handleInputChange("educationLevel", value)}>
                  <SelectTrigger className="transition-all duration-200 focus:shadow-soft">
                    <SelectValue placeholder="Selecciona el nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inicial">Educación Inicial</SelectItem>
                    <SelectItem value="primaria">Educación Primaria</SelectItem>
                    <SelectItem value="secundaria">Educación Secundaria</SelectItem>
                    <SelectItem value="superior">Educación Superior</SelectItem>
                    <SelectItem value="especial">Educación Especial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institutionType" className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>Tipo de establecimiento</span>
                </Label>
                <Select onValueChange={(value) => handleInputChange("institutionType", value)}>
                  <SelectTrigger className="transition-all duration-200 focus:shadow-soft">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="publico">Público</SelectItem>
                    <SelectItem value="privado">Privado</SelectItem>
                    <SelectItem value="concertado">Concertado</SelectItem>
                    <SelectItem value="online">En línea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Contraseña</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  minLength={8}
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Crear cuenta
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O regístrate con
                </span>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => {
                // TODO: Implement Google OAuth
                console.log("Google registration");
              }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar con Google
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Inicia sesión aquí
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;