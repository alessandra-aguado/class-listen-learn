import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Square, Play, RotateCcw, Send, SkipForward } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AudioIntroduction = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo acceder al micrófono",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    }
  };

  const reRecord = () => {
    setAudioBlob(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const sendAudio = () => {
    toast({
      title: "Audio enviado",
      description: "Gracias por compartir tu historia. ¡Aliada está emocionada de conocerte!",
    });
    navigate('/chat');
  };

  const skipAudio = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 text-center space-y-6">
        {/* Header with Aliada logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img 
            src="/lovable-uploads/7ecccd56-3e45-4c2e-b819-a26e92b82caf.png" 
            alt="ALIADA" 
            className="h-12 w-auto"
          />
        </div>

        {/* Welcome message */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">
            ¡Gracias por responder esas preguntas!
          </h1>
          <p className="text-lg text-muted-foreground">
            Ahora me encantaría escucharte.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-3 my-6">
          <div className="flex items-center justify-center gap-2 text-lg">
            <Mic className="h-5 w-5 text-primary" />
            <span>¿Cómo eres tú como profesora o profesor?</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-lg">
            <Mic className="h-5 w-5 text-primary" />
            <span>¿Cómo son tus alumnos?</span>
          </div>
        </div>

        <p className="text-muted-foreground">
          Puedes contarme lo que quieras en un audio breve (1-2 minutos).<br />
          Esto me ayudará a conocerte mejor y darte retroalimentación más personalizada.
        </p>

        <p className="text-sm text-muted-foreground italic">
          ✨ No necesitas ser perfecta/o. Tu voz es más que suficiente.
        </p>

        {/* Recording controls */}
        <div className="space-y-4 py-6">
          {!audioBlob && (
            <Button
              size="lg"
              onClick={isRecording ? stopRecording : startRecording}
              className={`h-16 w-16 rounded-full ${isRecording ? 'bg-destructive hover:bg-destructive/90' : ''}`}
            >
              {isRecording ? (
                <Square className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          )}

          {isRecording && (
            <div className="space-y-2">
              <div className="animate-pulse text-destructive font-medium">
                🔴 Grabando...
              </div>
              <p className="text-sm text-muted-foreground">
                Toca el botón para detener la grabación
              </p>
            </div>
          )}

          {audioBlob && (
            <div className="space-y-4">
              <div className="text-green-600 font-medium">
                ✅ Audio grabado exitosamente
              </div>
              
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={playAudio}
                  disabled={isPlaying}
                  className="gap-2"
                >
                  <Play className="h-4 w-4" />
                  {isPlaying ? 'Reproduciendo...' : 'Reproducir'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={reRecord}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Volver a grabar
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 pt-6">
          {audioBlob && (
            <Button
              onClick={sendAudio}
              size="lg"
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Enviar audio
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={skipAudio}
            className="gap-2"
          >
            <SkipForward className="h-4 w-4" />
            Puedes hacerlo después
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AudioIntroduction;