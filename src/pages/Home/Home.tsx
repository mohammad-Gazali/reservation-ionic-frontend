// src/pages/HomePage.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonRouterLink,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';

import {
  restaurantOutline,
  businessOutline,
  peopleOutline,
  footballOutline,
  airplaneOutline,
} from 'ionicons/icons';

const HomePage: React.FC = () => {
  const categories = [
    { name: 'Restaurants', path: '/restaurants', icon: restaurantOutline },
    { name: 'Hotels', path: '/hotels', icon: businessOutline },
    { name: 'Event Halls', path: '/event-halls', icon: peopleOutline },
    { name: 'Playgrounds', path: '/playgrounds', icon: footballOutline },
    { name: 'Tours', path: '/tours', icon: airplaneOutline },
  ];

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Explore Categories</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {categories.map((category, index) => (
          <IonRouterLink key={index} routerLink={category.path} style={{ textDecoration: 'none' }}>
            <IonCard
              color="primary"
              className="category-card ion-margin-bottom"
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}
            >
              <IonCardHeader className="ion-display-flex ion-align-items-center ion-justify-content-between">
                <IonCardTitle>{category.name}</IonCardTitle>
                <IonIcon icon={category.icon} style={{ fontSize: '2rem' }} />
              </IonCardHeader>
            </IonCard>
          </IonRouterLink>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;