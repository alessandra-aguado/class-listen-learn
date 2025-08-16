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
  grade: string;
  totalStudents: number;
  department: string;
  province: string;
  district: string;
  educationalCenter: string;
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
    grade: "",
    totalStudents: 0,
    department: "",
    province: "",
    district: "",
    educationalCenter: "",
    resources: [],
    averageStudentsPerClass: 0,
    otherLevel: "",
    otherResource: ""
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate("/audio-introduction");
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

  // Peru departments and their provinces/districts
  const peruLocations = {
    "Amazonas": {
      "Bagua": ["Bagua", "Aramango", "Copallín", "El Parco", "Imaza", "La Peca"],
      "Bongará": ["Jumbilla", "Chisquilla", "Churuja", "Corosha", "Cuispes", "Florida"],
      "Chachapoyas": ["Chachapoyas", "Asunción", "Balsas", "Cheto", "Chiliquín", "Chuquibamba"],
      "Condorcanqui": ["Santa María de Nieva", "El Cenepa", "Río Santiago"],
      "Luya": ["Lamud", "Camporredondo", "Cocabamba", "Colcamar", "Conila", "Inguilpata"],
      "Rodríguez de Mendoza": ["San Nicolás", "Chirimoto", "Cochamal", "Huambo", "Limabamba", "Longar"],
      "Utcubamba": ["Bagua Grande", "Cajaruro", "Cumba", "El Milagro", "Jamalca", "Lonya Grande"]
    },
    "Ancash": {
      "Huaraz": ["Huaraz", "Cochabamba", "Colcabamba", "Huanchay", "Independencia", "Jangas"],
      "Aija": ["Aija", "Coris", "Huacllán", "La Merced", "Succha"],
      "Antonio Raymondi": ["Llamellín", "Aczo", "Chaccho", "Chingas", "Mirgas", "San Juan de Rontoy"],
      "Asunción": ["Chacas", "Acochaca"],
      "Bolognesi": ["Chiquián", "Abelardo Pardo Lezameta", "Antonio Raymondi", "Aquia", "Cajacay", "Canis"],
      "Carhuaz": ["Carhuaz", "Acopampa", "Amashca", "Anta", "Ataquero", "Marcará"],
      "Carlos Fermín Fitzcarrald": ["San Luis", "San Nicolás", "Yauya"]
    },
    "Apurímac": {
      "Abancay": ["Abancay", "Chacoche", "Circa", "Curahuasi", "Huanipaca", "Lambrama"],
      "Andahuaylas": ["Andahuaylas", "Andarapa", "Chiara", "Huancarama", "Huancaray", "Huayana"],
      "Antabamba": ["Antabamba", "El Oro", "Huaquirca", "Juan Espinoza Medrano", "Oropesa", "Pachaconas"],
      "Aymaraes": ["Chalhuanca", "Capaya", "Caraybamba", "Chapimarca", "Colcabamba", "Cotaruse"],
      "Cotabambas": ["Tambobamba", "Cotabambas", "Coyllurqui", "Haquira", "Mara", "Challhuahuacho"],
      "Chincheros": ["Chincheros", "Anco Huallo", "Cocharcas", "Huaccana", "Ocobamba", "Ongoy"],
      "Grau": ["Chuquibambilla", "Curasco", "Huayllati", "Mamara", "Micaela Bastidas", "Pataypampa"]
    },
    "Arequipa": {
      "Arequipa": ["Arequipa", "Alto Selva Alegre", "Cayma", "Cerro Colorado", "Characato", "Chiguata"],
      "Camaná": ["Camaná", "José María Quimper", "Mariano Nicolás Valcárcel", "Mariscal Cáceres", "Nicolás de Piérola", "Ocoña"],
      "Caravelí": ["Caravelí", "Acarí", "Atico", "Atiquipa", "Bella Unión", "Cahuacho"],
      "Castilla": ["Aplao", "Andagua", "Ayo", "Chachas", "Chilcaymarca", "Choco"],
      "Caylloma": ["Chivay", "Achoma", "Cabanaconde", "Callalli", "Caylloma", "Coporaque"],
      "Condesuyos": ["Chuquibamba", "Andaray", "Cayarani", "Chichas", "Iray", "Río Grande"],
      "Islay": ["Mollendo", "Cocachacra", "Dean Valdivia", "Islay", "Mejía", "Punta de Bombón"],
      "La Unión": ["Cotahuasi", "Alca", "Charcana", "Huaynacotas", "Pampamarca", "Puyca"]
    },
    "Ayacucho": {
      "Huamanga": ["Ayacucho", "Acocro", "Acos Vinchos", "Carmen Alto", "Chiara", "Ocros"],
      "Cangallo": ["Cangallo", "Chuschi", "Los Morochucos", "María Parado de Bellido", "Paras", "Totos"],
      "Huanca Sancos": ["Sancos", "Carapo", "Sacsamarca", "Santiago de Lucanamarca"],
      "Huanta": ["Huanta", "Ayahuanco", "Huamanguilla", "Iguaín", "Luricocha", "Santillana"],
      "La Mar": ["San Miguel", "Anco", "Ayna", "Chilcas", "Chungui", "Luis Carranza"],
      "Lucanas": ["Puquio", "Aucara", "Cabana", "Carmen Salcedo", "Chaviña", "Chipao"],
      "Parinacochas": ["Coracora", "Chumpi", "Coronel Castañeda", "Pacapausa", "Pullo", "Puyusca"],
      "Páucar del Sara Sara": ["Pausa", "Colta", "Corculla", "Lampa", "Marcabamba", "Oyolo"],
      "Sucre": ["Querobamba", "Belén", "Chalcos", "Chilcayoc", "Huacaña", "Morcolla"],
      "Víctor Fajardo": ["Huancapi", "Alcamenca", "Apongo", "Asquipata", "Canaria", "Cayara"],
      "Vilcas Huamán": ["Vilcas Huamán", "Accomarca", "Carhuanca", "Concepción", "Huambalpa", "Independencia"]
    },
    "Cajamarca": {
      "Cajamarca": ["Cajamarca", "Asunción", "Chetilla", "Cospan", "Encañada", "Jesús"],
      "Cajabamba": ["Cajabamba", "Cachachi", "Condebamba", "Sitacocha"],
      "Celendín": ["Celendín", "Chumuch", "Cortegana", "Huasmin", "Jorge Chávez", "José Gálvez"],
      "Chota": ["Chota", "Anguía", "Chadin", "Chiguirip", "Chimban", "Choropampa"],
      "Contumazá": ["Contumazá", "Chilete", "Cupisnique", "Guzmango", "San Benito", "Santa Cruz de Toledo"],
      "Cutervo": ["Cutervo", "Callayuc", "Choros", "Cujillo", "La Ramada", "Pimpingos"],
      "Hualgayoc": ["Bambamarca", "Chugur", "Hualgayoc"],
      "Jaén": ["Jaén", "Bellavista", "Chontali", "Colasay", "Huabal", "Las Pirias"],
      "San Ignacio": ["San Ignacio", "Chirinos", "Huarango", "La Coipa", "Namballe", "San José de Lourdes"],
      "San Marcos": ["Pedro Gálvez", "Chancay", "Eduardo Villanueva", "Gregorio Pita", "Ichocan", "José Manuel Quiroz"],
      "San Miguel": ["San Miguel", "Bolívar", "Calquis", "Catilluc", "El Prado", "La Florida"],
      "San Pablo": ["San Pablo", "San Bernardino", "San Luis", "Tumbadén"],
      "Santa Cruz": ["Santa Cruz", "Andabamba", "Catache", "Chancaybaños", "La Esperanza", "Ninabamba"]
    },
    "Callao": {
      "Callao": ["Callao", "Bellavista", "Carmen de la Legua Reynoso", "La Perla", "La Punta", "Ventanilla"]
    },
    "Cusco": {
      "Cusco": ["Cusco", "Ccorca", "Poroy", "San Jerónimo", "San Sebastián", "Santiago"],
      "Acomayo": ["Acomayo", "Acopia", "Acos", "Mosoc Llacta", "Pomacanchi", "Rondocan"],
      "Anta": ["Anta", "Ancahuasi", "Cachimayo", "Chinchaypujio", "Huarocondo", "Limatambo"],
      "Calca": ["Calca", "Coya", "Lamay", "Lares", "Pisac", "San Salvador"],
      "Canas": ["Yanaoca", "Checca", "Kunturkanki", "Langui", "Layo", "Pampamarca"],
      "Canchis": ["Sicuani", "Checacupe", "Combapata", "Marangani", "Pitumarca", "San Pablo"],
      "Chumbivilcas": ["Santo Tomás", "Capacmarca", "Chamaca", "Colquemarca", "Livitaca", "Llusco"],
      "Espinar": ["Espinar", "Condoroma", "Coporaque", "Occoruro", "Pallpata", "Pichigua"],
      "La Convención": ["Santa Ana", "Echarate", "Huayopata", "Maranura", "Ocobamba", "Quellouno"],
      "Paruro": ["Paruro", "Accha", "Ccapi", "Colcha", "Huanoquite", "Omacha"],
      "Paucartambo": ["Paucartambo", "Caicay", "Challabamba", "Colquepata", "Huancarani", "Kosñipata"],
      "Quispicanchi": ["Urcos", "Andahuaylillas", "Camanti", "Ccarhuayo", "Ccatca", "Cusipata"],
      "Urubamba": ["Urubamba", "Chinchero", "Huayllabamba", "Machupicchu", "Maras", "Ollantaytambo"]
    },
    "Huancavelica": {
      "Huancavelica": ["Huancavelica", "Acobambilla", "Acoria", "Conayca", "Cuenca", "Huachocolpa"],
      "Acobamba": ["Acobamba", "Andabamba", "Anta", "Caja", "Marcas", "Paucará"],
      "Angaraes": ["Lircay", "Anchonga", "Callanmarca", "Ccochaccasa", "Chincho", "Congalla"],
      "Castrovirreyna": ["Castrovirreyna", "Arma", "Aurahuá", "Capillas", "Chupamarca", "Cocas"],
      "Churcampa": ["Churcampa", "Anco", "Chinchihuasi", "El Carmen", "La Merced", "Locroja"],
      "Huaytará": ["Huaytará", "Ayaví", "Córdova", "Huayacundo Arma", "Laramarca", "Ocoyo"],
      "Tayacaja": ["Pampas", "Acostambo", "Acraquia", "Ahuaycha", "Colcabamba", "Daniel Hernández"]
    },
    "Huánuco": {
      "Huánuco": ["Huánuco", "Amarilis", "Chinchao", "Churubamba", "Margos", "Quisqui"],
      "Ambo": ["Ambo", "Cayna", "Colpas", "Conchamarca", "Huácar", "San Francisco"],
      "Dos de Mayo": ["La Unión", "Chuquis", "Marías", "Pachas", "Quivilla", "Ripan"],
      "Huacaybamba": ["Huacaybamba", "Canchabamba", "Cochabamba", "Pinra"],
      "Huamalíes": ["Llata", "Arancay", "Chavín de Pariarca", "Jacas Grande", "Jircan", "Miraflores"],
      "Leoncio Prado": ["Rupa-Rupa", "Daniel Alomías Robles", "Hermilio Valdizán", "José Crespo y Castillo", "Luyando", "Mariano Dámaso Beraún"],
      "Marañón": ["Huacrachuco", "Cholon", "San Buenaventura"],
      "Pachitea": ["Panao", "Chaglla", "Molino", "Umari"],
      "Puerto Inca": ["Puerto Inca", "Codo del Pozuzo", "Honoria", "Tournavista", "Yuyapichis"],
      "Lauricocha": ["Jesús", "Baños", "Jivia", "Queropalca", "Rondos", "San Francisco de Asís"],
      "Yarowilca": ["Chavinillo", "Cahuac", "Chacabamba", "Aparicio Pomares", "Jacas Chico", "Obas"]
    },
    "Ica": {
      "Ica": ["Ica", "La Tinguiña", "Los Aquijes", "Ocucaje", "Pachacutec", "Parcona"],
      "Chincha": ["Chincha Alta", "Alto Larán", "Chavin", "Chincha Baja", "El Carmen", "Grocio Prado"],
      "Nazca": ["Nazca", "Changuillo", "El Ingenio", "Marcona", "Vista Alegre"],
      "Palpa": ["Palpa", "Llipata", "Río Grande", "Santa Cruz", "Tibillo"],
      "Pisco": ["Pisco", "Huancano", "Humay", "Independencia", "Paracas", "San Andrés"]
    },
    "Junín": {
      "Huancayo": ["Huancayo", "Carhuacallanga", "Chacapampa", "Chicche", "Chilca", "Chongos Alto"],
      "Concepción": ["Concepción", "Aco", "Andamarca", "Chambara", "Cochas", "Comas"],
      "Chanchamayo": ["Chanchamayo", "Perené", "Pichanaqui", "San Luis de Shuaro", "San Ramón", "Vitoc"],
      "Jauja": ["Jauja", "Acolla", "Apata", "Ataura", "Canchayllo", "Curicaca"],
      "Junín": ["Junín", "Carhuamayo", "Ondores", "Ulcumayo"],
      "Satipo": ["Satipo", "Coviriali", "Llaylla", "Mazamari", "Pampa Hermosa", "Pangoa"],
      "Tarma": ["Tarma", "Acobamba", "Huaricolca", "Huasahuasi", "La Unión", "Palca"],
      "Yauli": ["La Oroya", "Chacapalpa", "Huay-Huay", "Marcapomacocha", "Morococha", "Paccha"],
      "Chupaca": ["Chupaca", "Ahuac", "Chongos Bajo", "Huachac", "Huamancaca Chico", "San Juan de Iscos"]
    },
    "La Libertad": {
      "Trujillo": ["Trujillo", "El Porvenir", "Florencia de Mora", "Huanchaco", "La Esperanza", "Laredo"],
      "Ascope": ["Ascope", "Chicama", "Chocope", "Magdalena de Cao", "Paijan", "Rázuri"],
      "Bolívar": ["Bolívar", "Bambamarca", "Condormarca", "Longotea", "Uchumarca", "Ucuncha"],
      "Chepén": ["Chepén", "Pacanga", "Pueblo Nuevo"],
      "Julcán": ["Julcán", "Calamarca", "Carabamba", "Huaso"],
      "Otuzco": ["Otuzco", "Agallpampa", "Charat", "Huaranchal", "La Cuesta", "Mache"],
      "Pacasmayo": ["San Pedro de Lloc", "Guadalupe", "Jequetepeque", "Pacasmayo", "San José"],
      "Pataz": ["Tayabamba", "Buldibuyo", "Chillia", "Huancaspata", "Huaylillas", "Huayo"],
      "Sánchez Carrión": ["Huamachuco", "Chugay", "Cochorco", "Curgos", "Marcabal", "Sanagoran"],
      "Santiago de Chuco": ["Santiago de Chuco", "Angasmarca", "Cachicadan", "Mollebamba", "Mollepata", "Quiruvilca"],
      "Gran Chimú": ["Cascas", "Lucma", "Marmot", "Sayapullo"],
      "Virú": ["Virú", "Chao", "Guadalupito"]
    },
    "Lambayeque": {
      "Chiclayo": ["Chiclayo", "Chongoyape", "Eten", "Eten Puerto", "José Leonardo Ortiz", "La Victoria"],
      "Ferreñafe": ["Ferreñafe", "Cañaris", "Incahuasi", "Manuel Antonio Mesones Muro", "Pitipo", "Pueblo Nuevo"],
      "Lambayeque": ["Lambayeque", "Chóchope", "Illimo", "Jayanca", "Mochumi", "Mórrope"]
    },
    "Lima": {
      "Lima": ["Lima", "Ancón", "Ate", "Barranco", "Breña", "Carabayllo"],
      "Barranca": ["Barranca", "Paramonga", "Pativilca", "Supe", "Supe Puerto"],
      "Cajatambo": ["Cajatambo", "Copa", "Gorgor", "Huancapón", "Manas"],
      "Canta": ["Canta", "Arahuay", "Huamantanga", "Huaros", "Lachaqui", "San Buenaventura"],
      "Cañete": ["San Vicente de Cañete", "Asia", "Calango", "Cerro Azul", "Chilca", "Coayllo"],
      "Huaral": ["Huaral", "Atavillos Alto", "Atavillos Bajo", "Aucallama", "Chancay", "Ihuari"],
      "Huarochirí": ["Matucana", "Antioquia", "Callahuanca", "Carampoma", "Chicla", "Cuenca"],
      "Huaura": ["Huacho", "Ambar", "Caleta de Carquín", "Checras", "Hualmay", "Huaura"],
      "Oyón": ["Oyón", "Andajes", "Caujul", "Cochamarca", "Navan", "Pachangara"],
      "Yauyos": ["Yauyos", "Alis", "Allauca", "Ayaviri", "Azángaro", "Cacra"]
    },
    "Loreto": {
      "Maynas": ["Iquitos", "Alto Nanay", "Fernando Lores", "Indiana", "Las Amazonas", "Mazan"],
      "Alto Amazonas": ["Yurimaguas", "Balsapuerto", "Jeberos", "Lagunas", "Santa Cruz", "Teniente César López Rojas"],
      "Loreto": ["Nauta", "Parinari", "Tigre", "Trompeteros", "Urarinas"],
      "Mariscal Ramón Castilla": ["Ramón Castilla", "Pebas", "Yavari", "San Pablo"],
      "Requena": ["Requena", "Alto Tapiche", "Capelo", "Emilio San Martín", "Maquia", "Puinahua"],
      "Ucayali": ["Contamana", "Inahuaya", "Padre Márquez", "Pampa Hermosa", "Sarayacu", "Vargas Guerra"],
      "Datem del Marañón": ["Barranca", "Cahuapanas", "Manseriche", "Morona", "Pastaza", "Andoas"]
    },
    "Madre de Dios": {
      "Tambopata": ["Tambopata", "Inambari", "Las Piedras", "Laberinto"],
      "Manu": ["Manu", "Fitzcarrald", "Madre de Dios", "Huepetuhe"],
      "Tahuamanu": ["Iñapari", "Iberia", "Tahuamanu"]
    },
    "Moquegua": {
      "Mariscal Nieto": ["Moquegua", "Carumas", "Cuchumbaya", "Samegua", "San Cristóbal", "Torata"],
      "General Sánchez Cerro": ["Omate", "Chojata", "Coalaque", "Ichuña", "La Capilla", "Lloque"],
      "Ilo": ["Ilo", "El Algarrobal", "Pacocha"]
    },
    "Pasco": {
      "Pasco": ["Chaupimarca", "Huachón", "Huariaca", "Huayllay", "Ninacaca", "Pallanchacra"],
      "Daniel Alcides Carrión": ["Yanahuanca", "Chacayan", "Goyllarisquizga", "Paucar", "San Pedro de Pillao", "Santa Ana de Tusi"],
      "Oxapampa": ["Oxapampa", "Chontabamba", "Huancabamba", "Palcazu", "Pozuzo", "Puerto Bermúdez"]
    },
    "Piura": {
      "Piura": ["Piura", "Castilla", "Catacaos", "Cura Mori", "El Tallán", "La Arena"],
      "Ayabaca": ["Ayabaca", "Frías", "Jililí", "Lagunas", "Montero", "Pacaipampa"],
      "Huancabamba": ["Huancabamba", "Canchaque", "El Carmen de la Frontera", "Huarmaca", "Lalaquiz", "San Miguel de El Faique"],
      "Morropón": ["Chulucanas", "Buenos Aires", "Chalaco", "La Matanza", "Morropón", "Salitral"],
      "Paita": ["Paita", "Amotape", "Arenal", "Colan", "La Huaca", "Tamarindo"],
      "Sullana": ["Sullana", "Bellavista", "Ignacio Escudero", "Lancones", "Marcavelica", "Miguel Checa"],
      "Talara": ["Pariñas", "El Alto", "La Brea", "Lobitos", "Los Órganos", "Máncora"],
      "Sechura": ["Sechura", "Bellavista de la Unión", "Bernal", "Cristo Nos Valga", "Vice", "Rinconada Llicuar"]
    },
    "Puno": {
      "Puno": ["Puno", "Acora", "Amantani", "Atuncolla", "Capachica", "Chucuito"],
      "Azángaro": ["Azángaro", "Achaya", "Arapa", "Asillo", "Caminaca", "Chupa"],
      "Carabaya": ["Macusani", "Ajoyani", "Ayapata", "Coasa", "Corani", "Crucero"],
      "Chucuito": ["Juli", "Desaguadero", "Huacullani", "Kelluyo", "Pisacoma", "Pomata"],
      "El Collao": ["Ilave", "Capaso", "Pilcuyo", "Santa Rosa", "Conduriri"],
      "Huancané": ["Huancané", "Cojata", "Huatasani", "Inchupalla", "Pusi", "Rosaspata"],
      "Lampa": ["Lampa", "Cabanilla", "Calapuja", "Nicasio", "Ocuviri", "Palca"],
      "Melgar": ["Ayaviri", "Antauta", "Cupi", "Llalli", "Macari", "Nuñoa"],
      "Moho": ["Moho", "Conima", "Huayrapata", "Tilali"],
      "San Antonio de Putina": ["Putina", "Ananea", "Pedro Vilca Apaza", "Quilcapuncu", "Sina"],
      "San Román": ["Juliaca", "Cabana", "Cabanillas", "Caracoto"],
      "Sandia": ["Sandia", "Cuyocuyo", "Limbani", "Patambuco", "Phara", "Quiaca"],
      "Yunguyo": ["Yunguyo", "Anapia", "Copani", "Cuturapi", "Ollaraya", "Tinicachi"]
    },
    "San Martín": {
      "Moyobamba": ["Moyobamba", "Calzada", "Habana", "Jepelacio", "Soritor", "Yantalo"],
      "Bellavista": ["Bellavista", "Alto Biavo", "Bajo Biavo", "Huallaga", "San Pablo", "San Rafael"],
      "El Dorado": ["San José de Sisa", "Agua Blanca", "San Martín", "Santa Rosa", "Shatoja"],
      "Huallaga": ["Saposoa", "Alto Saposoa", "El Eslabón", "Piscoyacu", "Sacanche", "Tingo de Saposoa"],
      "Lamas": ["Lamas", "Alonso de Alvarado", "Barranquita", "Caynarachi", "Cuñumbuqui", "Pinto Recodo"],
      "Mariscal Cáceres": ["Juanjuí", "Campanilla", "Huicungo", "Pachiza", "Pajarillo"],
      "Picota": ["Picota", "Buenos Aires", "Caspisapa", "Pilluana", "Pucacaca", "San Cristóbal"],
      "Rioja": ["Rioja", "Awajun", "Elías Soplin Vargas", "Nueva Cajamarca", "Pardo Miguel", "Posic"],
      "San Martín": ["Tarapoto", "Alberto Leveau", "Cacatachi", "Chazuta", "Chipurana", "El Porvenir"],
      "Tocache": ["Tocache", "Nuevo Progreso", "Polvora", "Shunte", "Uchiza"]
    },
    "Tacna": {
      "Tacna": ["Tacna", "Alto de la Alianza", "Calana", "Ciudad Nueva", "Inclan", "Pachia"],
      "Candarave": ["Candarave", "Cairani", "Camilaca", "Curibaya", "Huanuara", "Quilahuani"],
      "Jorge Basadre": ["Locumba", "Ilabaya", "Ite"],
      "Tarata": ["Tarata", "Chucatamani", "Estique", "Estique-Pampa", "Sitajara", "Susapaya"]
    },
    "Tumbes": {
      "Tumbes": ["Tumbes", "Corrales", "La Cruz", "Pampas de Hospital", "San Jacinto", "San Juan de la Virgen"],
      "Contralmirante Villar": ["Zorritos", "Casitas", "Canoas de Punta Sal"],
      "Zarumilla": ["Zarumilla", "Aguas Verdes", "Matapalo", "Papayal"]
    },
    "Ucayali": {
      "Coronel Portillo": ["Callería", "Campoverde", "Iparia", "Masisea", "Yarinacocha", "Nueva Requena"],
      "Atalaya": ["Raymondi", "Sepahua", "Tahuania", "Yurua"],
      "Padre Abad": ["Padre Abad", "Irazola", "Curimana", "Neshuya"],
      "Purús": ["Purús"]
    }
  };

  // Get provinces for selected department
  const getProvinces = (department: string) => {
    return department ? Object.keys(peruLocations[department as keyof typeof peruLocations] || {}) : [];
  };

  // Get districts for selected province
  const getDistricts = (department: string, province: string) => {
    if (!department || !province) return [];
    const deptData = peruLocations[department as keyof typeof peruLocations];
    return deptData ? deptData[province as keyof typeof deptData] || [] : [];
  };

  // Get grade options based on educational level
  const getGradeOptions = (educationalLevel: string) => {
    switch (educationalLevel) {
      case "inicial":
        return ["3 años", "4 años", "5 años"];
      case "primaria":
        return ["1° de primaria", "2° de primaria", "3° de primaria", "4° de primaria", "5° de primaria", "6° de primaria"];
      case "secundaria":
        return ["1° de secundaria", "2° de secundaria", "3° de secundaria", "4° de secundaria", "5° de secundaria"];
      default:
        return [];
    }
  };

  // Get helper text based on educational level
  const getGradeHelperText = (educationalLevel: string) => {
    switch (educationalLevel) {
      case "inicial":
        return "💡 Selecciona el grupo de edad que atiendes regularmente.";
      case "primaria":
        return "💡 Puedes elegir el grado que más atiendes. Si enseñas a varios, selecciona el más común.";
      case "secundaria":
        return "💡 Elige el grado que enseñas con mayor frecuencia.";
      default:
        return "";
    }
  };

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
              {currentStep === 2 && "¿Qué grado enseñas principalmente?"}
              {currentStep === 3 && "¿Cuántos estudiantes tienes actualmente?"}
              {currentStep === 4 && "¿Dónde se ubica tu centro educativo?"}
              {currentStep === 5 && "Recursos disponibles"}
              {currentStep === 6 && "Cantidad promedio de estudiantes por clase"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Permite a la IA adaptar el análisis pedagógico según el rango de edad y competencias esperadas"}
              {currentStep === 2 && "Da contexto sobre el nivel académico de tus estudiantes. Selecciona el grado que atiendes con más frecuencia."}
              {currentStep === 3 && "Da contexto sobre la complejidad del entorno del docente"}
              {currentStep === 4 && "Ajusta el feedback a nivel curricular/regional"}
              {currentStep === 5 && "¡Selecciona los recursos con los que cuentas. Todo suma!"}
              {currentStep === 6 && "Información para adaptar sugerencias relacionadas con participación y metodologías"}
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

            {/* Step 2: Grade Selection */}
            {currentStep === 2 && (
              <div className="space-y-4">
                {formData.educationalLevel && getGradeOptions(formData.educationalLevel).length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="grade" className="text-base font-medium">
                        Selecciona el grado
                      </Label>
                      <Select 
                        value={formData.grade}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}
                      >
                        <SelectTrigger className="h-12 transition-all duration-200 focus:shadow-soft">
                          <SelectValue placeholder="Selecciona el grado que más atiendes" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border shadow-lg z-50">
                          {getGradeOptions(formData.educationalLevel).map((grade) => (
                            <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {getGradeHelperText(formData.educationalLevel) && (
                      <p className="text-sm text-muted-foreground">
                        {getGradeHelperText(formData.educationalLevel)}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center space-y-4 py-8">
                    <p className="text-muted-foreground">
                      Primero selecciona un nivel educativo en el paso anterior para ver las opciones de grado.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Total Students */}
            {currentStep === 3 && (
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

            {/* Step 4: Location */}
            {currentStep === 4 && (
              <div className="space-y-6">
                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department" className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Departamento</span>
                  </Label>
                  <Select 
                    value={formData.department}
                    onValueChange={(value) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        department: value, 
                        province: "", 
                        district: "",
                        educationalCenter: ""
                      }));
                    }}
                  >
                    <SelectTrigger className="h-12 transition-all duration-200 focus:shadow-soft">
                      <SelectValue placeholder="Selecciona tu departamento" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {Object.keys(peruLocations).map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Province */}
                {formData.department && (
                  <div className="space-y-2">
                    <Label htmlFor="province">Provincia</Label>
                    <Select 
                      value={formData.province}
                      onValueChange={(value) => {
                        setFormData(prev => ({ 
                          ...prev, 
                          province: value, 
                          district: "",
                          educationalCenter: ""
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 transition-all duration-200 focus:shadow-soft">
                        <SelectValue placeholder="Selecciona tu provincia" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border shadow-lg z-50">
                        {getProvinces(formData.department).map((prov) => (
                          <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* District */}
                {formData.province && (
                  <div className="space-y-2">
                    <Label htmlFor="district">Distrito</Label>
                    <Select 
                      value={formData.district}
                      onValueChange={(value) => {
                        setFormData(prev => ({ 
                          ...prev, 
                          district: value,
                          educationalCenter: ""
                        }));
                      }}
                    >
                      <SelectTrigger className="h-12 transition-all duration-200 focus:shadow-soft">
                        <SelectValue placeholder="Selecciona tu distrito" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border shadow-lg z-50">
                        {getDistricts(formData.department, formData.province).map((dist) => (
                          <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Educational Center (Optional) */}
                {formData.district && (
                  <div className="space-y-2">
                    <Label htmlFor="educationalCenter">Centro educativo (Opcional)</Label>
                    <Input
                      id="educationalCenter"
                      placeholder="Buscar institución educativa..."
                      value={formData.educationalCenter}
                      onChange={(e) => setFormData(prev => ({ ...prev, educationalCenter: e.target.value }))}
                      className="transition-all duration-200 focus:shadow-soft"
                    />
                    <p className="text-sm text-muted-foreground">
                      Basado en nombres oficiales de instituciones educativas del MINEDU
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Resources */}
            {currentStep === 5 && (
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

            {/* Step 6: Average Students Per Class */}
            {currentStep === 6 && (
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