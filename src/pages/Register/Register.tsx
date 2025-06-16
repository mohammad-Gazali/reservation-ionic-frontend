// src/pages/RegisterPage.tsx

import React, { useState } from 'react';
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
  IonLabel,
  IonRouterLink,
  IonAvatar,
  IonButtons,
  IonBackButton,
} from '@ionic/react';

import {
  personAddOutline,
  mailOutline,
  lockClosedOutline,
  cameraOutline,
} from 'ionicons/icons';

import './Register.css'; // 🔁 Import page-specific CSS

const RegisterPage: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <IonPage id="register-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="auth-page ion-padding">
        <div className="auth-container">
          <h2>Create Account</h2>
          <p>Join us today!</p>

          <IonCard className="auth-card">
            <IonCardContent>
              {/* Avatar Upload */}
              <div className="avatar-upload">
                <IonAvatar className="avatar-preview">
                  {avatar ? (
                    <img src={avatar} alt="Avatar preview" />
                  ) : (
                    <div className="avatar-placeholder">+</div>
                  )}
                </IonAvatar>
                <label htmlFor="avatar-input" className="avatar-label">
                  <IonIcon icon={cameraOutline} />
                  <input
                    id="avatar-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
              </div>

              {/* Form Fields */}
              <IonItem lines="none" className="input-field">
                <IonIcon icon={personAddOutline} slot="start" />
                <IonInput type="text" placeholder="Full Name" />
              </IonItem>

              <IonItem lines="none" className="input-field">
                <IonIcon icon={mailOutline} slot="start" />
                <IonInput type="email" placeholder="Email" />
              </IonItem>

              <IonItem lines="none" className="input-field">
                <IonIcon icon={lockClosedOutline} slot="start" />
                <IonInput type="password" placeholder="Password" />
              </IonItem>

              <IonButton expand="block" color="success" className="login-btn">
                Create Account
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
                Sign up with Google
              </IonButton>

              <p className="auth-footer">
                Already have an account?{' '}
                <IonRouterLink routerLink="/login">Login</IonRouterLink>
              </p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;