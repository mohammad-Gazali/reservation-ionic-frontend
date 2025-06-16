// src/pages/LoginPage.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonInput,
  IonIcon,
  IonButton,
  IonItem,
  IonRouterLink,
	IonBackButton,
	IonButtons,
} from '@ionic/react';

import { mailOutline, lockClosedOutline } from 'ionicons/icons';

import './Login.css';

const LoginPage: React.FC = () => {
  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
					<IonButtons slot="start">
						<IonBackButton />
					</IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="auth-page ion-padding">
        <div className="auth-container">
          <h2>Welcome Back</h2>
          <p>Log in to continue</p>

          <IonCard className="auth-card">
            <IonCardContent>
              <IonItem lines="none" className="input-field">
                <IonIcon icon={mailOutline} slot="start" />
                <IonInput type="email" placeholder="Email" />
              </IonItem>

              <IonItem lines="none" className="input-field">
                <IonIcon icon={lockClosedOutline} slot="start" />
                <IonInput type="password" placeholder="Password" />
              </IonItem>

              <IonButton expand="block" color="primary" className="login-btn">
                Log In
              </IonButton>

              {/* Google Sign In Button */}
              <IonButton
                expand="block"
                fill="outline"
                className="google-btn"
                onClick={() => alert('Google login clicked')}
              >
                <IonIcon
                  slot="start"
                  icon="/google.svg" 
                />
                Sign in with Google
              </IonButton>

              <p className="auth-footer">
                Don't have an account?{' '}
                <IonRouterLink routerLink="/register">Register</IonRouterLink>
              </p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;