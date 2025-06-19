// HomePage.tsx
import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { heartOutline, heartSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import FourSeson from "../../../public/images/HotelImages/FourSeson.jpeg";
import Hotlin from "../../../public/images/HotelImages/Hoitln.jpeg";
import "./HotelPage.css";
import { Hotel } from '@/types';

const hotels: Hotel[] = [
  {
    id: 1,
    category_id: 10,
    category_name: 'Luxury',
    ar_title: 'فندق هيلتون',
    en_title: 'Hilton Hotel',
    image: FourSeson,
    ar_location: 'دمشق',
    en_location: 'Damascus',
    created_at: '2025-06-01T10:00:00Z',
    updated_at: '2025-06-10T12:00:00Z',
  },
  {
    id: 2,
    category_id: 20,
    category_name: 'Budget',
    ar_title: 'فندق زهيد',
    en_title: 'Budget Stay',
    image: Hotlin,
    ar_location: 'حلب',
    en_location: 'Aleppo',
    created_at: '2025-06-05T11:00:00Z',
    updated_at: '2025-06-11T13:00:00Z',
  },
];

const HotelList: React.FC<{ hotels: Hotel[] }> = ({ hotels }) => {
  const [favorites, setFavorites] = React.useState<number[]>([]);
  const history = useHistory(); // Hook للتنقل

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const goToRooms = (hotelId: number) => {
    history.push(`/hotel/${hotelId}/rooms`);
  };

  return (
    <div className="hotelpage">
      <IonGrid>
        <IonRow>
          {hotels.map((hotel) => (
            <IonCol key={hotel.id} size="12" size-md="6" size-lg="4">
              <IonCard className="card-style">
                <img
                  alt={hotel.en_title}
                  src={hotel.image ?? 'https://via.placeholder.com/400x200?text=No+Image'}
                />
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: '1.1rem', textTransform: "uppercase" }}>
                    {hotel.en_title}
                  </IonCardTitle>
                  <IonCardSubtitle style={{ textTransform: "capitalize", marginBottom: "4px" }}>
                    {hotel.en_location}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent style={{ fontSize: '0.9rem', marginTop: "0" }}>
                  <div>{hotel.category_name}</div>
                  <div>
                    Created: {new Date(hotel.created_at).toLocaleDateString()} &nbsp;|&nbsp;
                    Updated: {new Date(hotel.updated_at).toLocaleDateString()}
                  </div>
                </IonCardContent>
                <IonCardContent>
                  <IonButton
                    fill={favorites.includes(hotel.id) ? "solid" : "outline"}
                    color="danger"
                    onClick={() => toggleFavorite(hotel.id)}
                    style={{ marginRight: '8px' }}
                  >
                    <IonIcon slot="start" icon={favorites.includes(hotel.id) ? heartSharp : heartOutline} />
                    Favorite
                  </IonButton>
                  <IonButton fill="solid" color="primary" onClick={() => goToRooms(hotel.id)}>
                    Book
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hotels</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <HotelList hotels={hotels} />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
