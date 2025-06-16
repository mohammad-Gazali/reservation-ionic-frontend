// src/components/AppDrawer.tsx

import React from 'react';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterLink,
  IonButton,
  IonItemDivider,
} from '@ionic/react';
import {
  homeOutline,
  personOutline,
  logInOutline,
  logOutOutline,
  restaurantOutline,
  businessOutline,
  peopleOutline,
  footballOutline,
  airplaneOutline,
  menu,
} from 'ionicons/icons';

interface AppDrawerProps {
  isAuthenticated: boolean;
  logout: () => void;
}

const AppDrawer: React.FC<AppDrawerProps> = ({ isAuthenticated, logout }) => {
  const appPages = [
    { title: 'Home', path: '/', icon: homeOutline },
    { title: 'Restaurants', path: '/restaurants', icon: restaurantOutline },
    { title: 'Hotels', path: '/hotels', icon: businessOutline },
    { title: 'Event Halls', path: '/event-halls', icon: peopleOutline },
    { title: 'Playgrounds', path: '/playgrounds', icon: footballOutline },
    { title: 'Tours', path: '/tours', icon: airplaneOutline },
  ];

  return (
    <IonMenu contentId="main-content">
      <IonHeader style={{ boxShadow: 'none', borderBottom: '1px solid var(--ion-border-color)' }}>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {/* App Pages */}
          {appPages.map((page) => (
            <IonItem key={page.title} routerLink={page.path} detail={false}>
              <IonIcon slot="start" icon={page.icon} />
              <IonLabel>{page.title}</IonLabel>
            </IonItem>
          ))}

          {/* Authenticated Routes */}
          {isAuthenticated ? (
            <>
              <IonItem routerLink="/profile" detail={false}>
                <IonIcon slot="start" icon={personOutline} />
                <IonLabel>Profile</IonLabel>
              </IonItem>
              <IonItem onClick={logout} detail={false}>
                <IonIcon slot="start" icon={logOutOutline} />
                <IonLabel>Logout</IonLabel>
              </IonItem>
            </>
          ) : (
            <>
              <IonItem routerLink="/login" detail={false}>
                <IonIcon slot="start" icon={logInOutline} />
                <IonLabel>Login</IonLabel>
              </IonItem>
              <IonItem routerLink="/register" detail={false}>
                <IonIcon slot="start" icon={logOutOutline} />
                <IonLabel>Register</IonLabel>
              </IonItem>
            </>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default AppDrawer;