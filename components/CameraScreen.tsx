import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import { useState, useRef, useEffect } from "react"
import {
	Button,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	SafeAreaView,
	Alert,
	ActivityIndicator,
} from "react-native"
import * as MediaLibrary from "expo-media-library"
import * as FileSystem from "expo-file-system"


export default function App() {
	const [facing, setFacing] = useState<CameraType>("back")
	const [permission, requestPermission] = useCameraPermissions()
	const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions()
	const cameraRef = useRef(null)
	const [photo, setPhoto] = useState<string | null>(null)
	const [flash, setFlash] = useState<"off" | "on">("off")
	const [isTakingPicture, setIsTakingPicture] = useState(false)
	const [base64, setBase64] = useState('')

	useEffect(() => {
		// Demander la permission de sauvegarder les photos
		;(async () => {
			if (!mediaLibraryPermission) {
				await requestMediaLibraryPermission()
			}
		})()
	}, [])

	const convertToBase64 = async (uri:string) =>{
		try{
			const base64 = await FileSystem.readAsStringAsync(uri, {
				encoding: FileSystem.EncodingType.Base64
			})
			setBase64(base64)
		} catch (error){
			console.error("Erreur de conversion en base64:", error)
			return null
		}
	}

	const takePhoto = async () => {
		if (cameraRef.current) {
			try {
				setIsTakingPicture(true)
				const photoData = await cameraRef.current.takePictureAsync({
					quality: 1,
					exif: true,
				})
				setPhoto(photoData.uri)
				setIsTakingPicture(false)
			} catch (error) {
				console.error("Erreur lors de la prise de photo:", error)
				Alert.alert("Erreur", "Impossible de prendre une photo")
				setIsTakingPicture(false)
			}
		}
	}

	const savePhoto = async () => {
		if (photo) {
			try {
				if (mediaLibraryPermission?.granted) {
					const asset = await MediaLibrary.createAssetAsync(photo)
					await MediaLibrary.createAlbumAsync("CameraApp", asset, false)
					Alert.alert("Succès", "Photo enregistrée dans votre galerie")
				} else {
					Alert.alert(
						"Permission refusée",
						"Veuillez autoriser l'accès à votre galerie pour sauvegarder les photos"
					)
				}
			} catch (error) {
				console.error("Erreur lors de la sauvegarde:", error)
				Alert.alert("Erreur", "Impossible de sauvegarder la photo")
			}
		}
	}

	const toggleFlash = () => {
		setFlash((current) => (current === "on" ? "off" : "on"))
	}

	const toggleCameraFacing = () => {
		setFacing((current) => (current === "back" ? "front" : "back"))
	}

	const retakePhoto = () => {
		setPhoto(null)
	}

	if (!permission || !mediaLibraryPermission) {
		// Permissions are still loading
		return (
			<View style={styles.container}>
				<ActivityIndicator size='large' color='#0000ff' />
			</View>
		)
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.message}>
					Nous avons besoin de votre permission pour utiliser la caméra
				</Text>
				<Button onPress={requestPermission} title="Autoriser l'accès" />
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			{photo ? (
				// Affichage de la photo prise
				<View style={styles.previewContainer}>
					<Image source={{ uri: photo }} style={styles.preview} />
					<View style={styles.photoControls}>
						<TouchableOpacity style={styles.controlButton} onPress={retakePhoto}>
							<Text style={styles.controlText}>Reprendre</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.controlButton, styles.saveButton]}
							onPress={savePhoto}
						>
							<Text style={styles.controlText}>Enregistrer</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				// Interface de l'appareil photo
				<CameraView style={styles.camera} facing={facing} ref={cameraRef} flash={flash}>
					<View style={styles.controls}>
						<View style={styles.topControls}>
							<TouchableOpacity
								style={styles.flashButton}
								onPress={toggleFlash}
							>
								<Text style={styles.text}>
									{flash === "on" ? "⚡️ ON" : "⚡️ OFF"}
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.bottomControls}>
							<TouchableOpacity
								style={styles.flipButton}
								onPress={toggleCameraFacing}
							>
								<Text style={styles.text}>🔄</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.captureButton}
								onPress={takePhoto}
								disabled={isTakingPicture}
							>
								{isTakingPicture ? (
									<ActivityIndicator color='#fff' size='small' />
								) : (
									<View style={styles.captureButtonInner} />
								)}
							</TouchableOpacity>

							<View style={styles.spacer} />
						</View>
					</View>
				</CameraView>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	message: {
		textAlign: "center",
		paddingBottom: 20,
		color: "white",
		fontSize: 16,
	},
	camera: {
		flex: 1,
	},
	controls: {
		flex: 1,
		backgroundColor: "transparent",
		justifyContent: "space-between",
	},
	topControls: {
		flexDirection: "row",
		justifyContent: "flex-end",
		padding: 20,
	},
	bottomControls: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 30,
		paddingBottom: 40,
	},
	flashButton: {
		padding: 10,
		borderRadius: 20,
		backgroundColor: "rgba(0,0,0,0.3)",
	},
	flipButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	captureButton: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	captureButtonInner: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "white",
	},
	text: {
		fontSize: 18,
		color: "white",
		textAlign: "center",
	},
	spacer: {
		width: 50,
	},
	previewContainer: {
		flex: 1,
		backgroundColor: "black",
	},
	preview: {
		flex: 1,
		resizeMode: "contain",
	},
	photoControls: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
	},
	controlButton: {
		flex: 1,
		padding: 15,
		margin: 5,
		borderRadius: 5,
		backgroundColor: "#333",
		alignItems: "center",
	},
	saveButton: {
		backgroundColor: "#38761d",
	},
	controlText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
})
