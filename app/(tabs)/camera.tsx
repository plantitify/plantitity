import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture } from "expo-camera"
import { useState, useRef } from "react"
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
import { router } from "expo-router"

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>("back")
    const [permission, requestPermission] = useCameraPermissions()
    const cameraRef = useRef<CameraView | null>(null)
    const [photo, setPhoto] = useState<string | null>(null)
    const [flash, setFlash] = useState<"off" | "on">("off")
    const [isTakingPicture, setIsTakingPicture] = useState(false)

    const takePhoto = async () => {
        if (cameraRef.current) {
            try {
                setIsTakingPicture(true)
                const result = await cameraRef.current.takePictureAsync({
                    quality: 1,
                    exif: true,
                })
                const photoData = result as CameraCapturedPicture
                if (photoData.uri) {
                    setPhoto(photoData.uri)
                } else {
                    Alert.alert("Erreur", "La photo n'a pas pu être sauvegardée")
                }
                setIsTakingPicture(false)
            } catch (error) {
                console.error("Erreur lors de la prise de photo:", error)
                Alert.alert("Erreur", "Impossible de prendre une photo")
                setIsTakingPicture(false)
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

    const goBack = () => {
        router.replace('/')
    }

    if (!permission) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        )
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.containerMessage}>
                <Text style={styles.message}>
                    Nous avons besoin de votre permission pour utiliser la caméra
                </Text>
                <Button onPress={requestPermission} title="Autoriser l'accès" />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.containerMessage}>
                <Text style={styles.message}>
                    Nous avons besoin de votre permission pour utiliser la caméra
                </Text>
                <Button onPress={requestPermission} title="Autoriser l'accès" />
            </SafeAreaView>
            {photo ? (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: photo }} style={styles.preview} />
                    <View style={styles.photoControls}>
                        <TouchableOpacity style={styles.controlButton} onPress={retakePhoto}>
                            <Text style={styles.controlText}>Reprendre</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.controlButton, styles.shareButton]}>
                            <Text style={styles.controlText}>Partager</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    ref={cameraRef}
                    flash={flash}
                >
                    <View style={styles.controls}>
                        <View style={styles.topControls}>
                            <TouchableOpacity style={styles.backButton} onPress={goBack}>
                                <Text style={styles.backButtonText}>← Retour</Text>
                            </TouchableOpacity>
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
    containerMessage: {
        height: "30%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        position: "absolute",
        top: 80,
        left: 40,
        right: 40,
        borderRadius: 10,
        padding: 20,
    },
    message: {
        textAlign: "center",
        paddingBottom: 20,
        color: "black",
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
        justifyContent: "space-between",
        padding: 20,
    },
    backButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    backButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
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
    shareButton: {
        backgroundColor: "#1a73e8",
    },
    controlText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
})