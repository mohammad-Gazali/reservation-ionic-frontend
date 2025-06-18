// RoomsPage.tsx
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
import { useParams } from 'react-router-dom';
import { HotelRoom } from '@/types';
import './RoomsPage.css';

// بيانات وهمية لتجريب
const hotelRooms: HotelRoom[] = [
  {
    id: 1,
    hotel_id: 1,
    floor: 1,
    room_number: 101,
    type: 'Rich',
    capacity: 5,
    price_per_night: 100,
    description: 'View to the sea',
    created_at: '2024-01-02',
    updated_at: '2024-01-19',
  },
  {
    id: 2,
    hotel_id: 1,
    floor: 2,
    room_number: 202,
    type: 'Standard',
    capacity: 3,
    price_per_night: 70,
    description: null,
    created_at: '2024-01-03',
    updated_at: '2024-01-20',
  },
  {
    id: 3,
    hotel_id: 2,
    floor: 1,
    room_number: 103,
    type: 'Economy',
    capacity: 2,
    price_per_night: 50,
    description: 'No view',
    created_at: '2024-01-04',
    updated_at: '2024-01-21',
  },
];

const HotelList: React.FC<{ hotelRooms: HotelRoom[] }> = ({ hotelRooms }) => {
  const [favorites, setFavorites] = React.useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="hotelpage">
      <IonGrid>
        <IonRow>
          {hotelRooms.map((room) => (
            <IonCol key={room.id} size="12" size-md="6" size-lg="4">
              <IonCard className="card-style">
                <IonCardHeader>
                  <IonCardTitle className="card-title">
                    Room #{room.room_number}
                  </IonCardTitle>
                  <IonCardSubtitle className="card-subtitle">
                    Capacity: {room.capacity} persons
                  </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent className="card-content-text">
                  <div>Price: ${room.price_per_night} / night</div>
                  <div>
                    Created: {new Date(room.created_at).toLocaleDateString()} &nbsp;|&nbsp;
                    Updated: {new Date(room.updated_at).toLocaleDateString()}
                  </div>
                  {room.description && <div>Description: {room.description}</div>}
                </IonCardContent>

                <div className="card-bottom-controls">
                  <IonIcon
                    icon={favorites.includes(room.id) ? heartSharp : heartOutline}
                    color="danger"
                    size="large"
                    onClick={() => toggleFavorite(room.id)}
                  />
                  <IonButton fill="solid" size="small" onClick={() => alert('Booking...')}>
                    Book
                  </IonButton>
                </div>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  );
};

interface RouteParams {
  id: string; // جاي من /hotel/:id/rooms
}

const RoomsPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const hotelId = parseInt(id);
  const filteredRooms = hotelRooms.filter((room) => room.hotel_id === hotelId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hotel Rooms</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {filteredRooms.length > 0 ? (
          <HotelList hotelRooms={filteredRooms} />
        ) : (
          <div className="no-rooms">
            <h3>لا يوجد غرف لهذا الفندق</h3>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RoomsPage;
