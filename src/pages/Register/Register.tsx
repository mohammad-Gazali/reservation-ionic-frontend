import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonAlert
} from '@ionic/react';
import { camera, person } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import './Register.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });
      
      if (photo.webPath) {
        setAvatar(photo.webPath);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      setAlertMessage('Failed to take photo. Please try again.');
      setShowAlert(true);
    }
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      setAlertMessage('Please fill in all fields');
      setShowAlert(true);
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Registering with:', { name, email, password, avatar });
    
    // For demo purposes, just show a success message
    setAlertMessage('Registration successful!');
    setShowAlert(true);
    
    // Reset form
    setName('');
    setEmail('');
    setPassword('');
    setAvatar(undefined);
  };

  return (
    <IonPage id="register-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="ion-text-center">
          <IonRow>
            <IonCol>
              <div onClick={takePhoto} style={{ cursor: 'pointer' }}>
                {avatar ? (
                  <IonAvatar>
                    <img src={avatar} alt="User avatar" />
                  </IonAvatar>
                ) : (
                  <IonAvatar>
                    <IonIcon icon={person} />
                  </IonAvatar>
                )}
                <IonButton fill="clear" size="small">
                  <IonIcon icon={camera} slot="start" />
                  {avatar ? 'Change' : 'Add'} Photo
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonItem>
          <IonInput
            type="text"
						label="Full Name"
						labelPlacement="floating"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonInput
            type="email"
            label="Email"
						labelPlacement="floating"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonInput
            type="password"
						label="Password"
						labelPlacement="floating"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={handleRegister} style={{ marginTop: '20px' }}>
          Register
        </IonButton>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Alert'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;