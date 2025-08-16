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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-warm">
              <Brain className="w-7 h-7 text-primary" />
            </div>
            <span className="text-2xl font-bold text-white">PlanificaIA</span>
          </Link>
          <p className="text-white/80">Crea tu cuenta y comienza a mejorar</p>
        </div>

        <Card className="border-0 shadow-elevated">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl">Hola, ¿Cómo te llamas?</CardTitle>
            
          </CardHeader>
          
          <CardContent className="space-y-6">
            

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                
              </div>
            </div>

            

            
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Register;