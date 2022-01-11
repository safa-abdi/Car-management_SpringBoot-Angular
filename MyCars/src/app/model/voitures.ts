import { ImageC } from './image';
import { Marque } from './marque';

export class Voiture {
  idVoiture: number;
  marque: Marque;
  designation: string;
  dateCreation: Date;
  prixVoiture: number;
  couleurs: string;
  disponibilite: string;
  image?: ImageC;
}
