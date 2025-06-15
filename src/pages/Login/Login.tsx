import { LoginParams } from "@/types/auth";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { lockClosedOutline } from "ionicons/icons";
import { useForm } from "react-hook-form";
import "./Login.css";

const Login = () => {
	const { register } = useForm<LoginParams>();

	return (
		<IonPage id="login-page">
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Login</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<IonIcon icon={lockClosedOutline} />
				<IonList>
					<IonItem>
						<IonInput
							label="Email"
							labelPlacement="floating"
							{...register("email")}
						/>
					</IonItem>
					<IonItem>
						<IonInput
							type="password"
							label="Password"
							labelPlacement="floating"
							{...register("password")}
						/>
					</IonItem>
            <IonButton className="ion-margin-top" expand="block" size="default">
              Submit
            </IonButton>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Login;
