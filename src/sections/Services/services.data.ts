import type { CSSProperties } from "react";
import airConditioningServiceImage from "../../assets/images/services/air-conditioning-service.jpg";
import additionalServicesImage from "../../assets/images/services/additional-services.jpg";
import carElectronicsImage from "../../assets/images/services/car-electronics.jpg";
import engineTuningImage from "../../assets/images/services/engine-tuning.jpg";
import steeringRackRegenerationImage from "../../assets/images/services/steering-rack-regeneration.jpg";
import suspensionRepairImage from "../../assets/images/services/suspension-repair.jpg";
import tireReplacementImage from "../../assets/images/services/tire-replacement.jpg";
import vehicleMechanicsImage from "../../assets/images/services/vehicle-mechanics.jpg";
import wheelAlignment3dImage from "../../assets/images/services/wheel-alignment-3d.jpg";

export interface ServiceCardConfig {
  title: string;
  description: string;
  imageAlt: string;
  backgroundStyle: CSSProperties;
}

export const servicesData: ServiceCardConfig[] = [
  {
    title: "Geometria kół 3D",
    description: "Dokładne ustawienie zbieżności dla pewnej i równej jazdy.",
    imageAlt: "Stanowisko do geometrii kół 3D przy samochodzie w serwisie.",
    backgroundStyle: {
      backgroundImage: `url(${wheelAlignment3dImage})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  {
    title: "Wymiana opon",
    description: "Sezonowa wymiana opon z szybkim i pewnym montażem.",
    imageAlt: "Mechanik wymienia oponę przy ciemnej feldze samochodu.",
    backgroundStyle: {
      backgroundImage: `url(${tireReplacementImage})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  {
    title: "Mechanika pojazdowa",
    description: "Naprawy mechaniczne od diagnostyki po większe serwisy.",
    imageAlt: "Komora silnika samochodu podczas prac mechanicznych.",
    backgroundStyle: {
      backgroundImage: `url(${vehicleMechanicsImage})`,
      backgroundPosition: "2% 56%",
      backgroundSize: "138%",
    },
  },
  {
    title: "Chip tuning",
    description: "Bezpieczna optymalizacja osiągów dopasowana do Twojego auta.",
    imageAlt: "Tablet diagnostyczny używany podczas chip tuningu samochodu.",
    backgroundStyle: {
      backgroundImage: `url(${engineTuningImage})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  {
    title: "Auto elektronika",
    description: "Diagnostyka i naprawa układów elektronicznych w samochodzie.",
    imageAlt: "Laptop diagnostyczny podłączony do samochodu w warsztacie.",
    backgroundStyle: {
      backgroundImage: `url(${carElectronicsImage})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  {
    title: "Naprawa zawieszenia",
    description: "Usuwamy luzy, stuki i problemy z prowadzeniem.",
    imageAlt: "Spód samochodu na podnośniku podczas naprawy zawieszenia.",
    backgroundStyle: {
      backgroundImage: `url(${suspensionRepairImage})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  {
    title: "Klimatyzacja",
    description: "Serwis klimatyzacji dla skutecznego chłodzenia i świeżości.",
    imageAlt: "Serwis klimatyzacji samochodowej z podłączonym manometrem.",
    backgroundStyle: {
      backgroundImage: `url(${airConditioningServiceImage})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  {
    title: "Regeneracja przekładni kierowniczych",
    description: "Regenerujemy przekładnie dla precyzyjnego i lekkiego skrętu.",
    imageAlt: "Prace serwisowe przy elementach układu kierowniczego.",
    backgroundStyle: {
      backgroundImage: `url(${steeringRackRegenerationImage})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  {
    title: "Inne usługi",
    description: "Sprawdź dodatkowe prace wykonywane w naszym serwisie.",
    imageAlt: "Dolewanie oleju silnikowego podczas obsługi samochodu.",
    backgroundStyle: {
      backgroundImage: `url(${additionalServicesImage})`,
      backgroundPosition: "left center",
      backgroundSize: "cover",
    },
  },
];
