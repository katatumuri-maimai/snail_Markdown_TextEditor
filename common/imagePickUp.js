import * as FileSystem from 'expo-file-system';
import * as Device from 'expo-device';
import { readDirectoryAsync, StorageAccessFramework } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';
import * as DocumentPicker from 'expo-document-picker';

const directoryUri = FileSystem.documentDirectory + 'SimpleMarkdown/projects/'
const cacheDirectoryUri = FileSystem.cacheDirectory + 'SimpleMarkdown/temp/'
const imagePickerUri = FileSystem.documentDirectory + 'SimpleMarkdown/ImagePicker/'
const imagePickerCacheUri = cacheDirectoryUri + 'ImagePicker/'
const documentPickerCacheUri = FileSystem.cacheDirectory + 'DocumentPicker/'

let FS = Device.osName == 'Android' ? StorageAccessFramework : FileSystem

export async function importImageFromMediaLibrary() {
    await ImagePicker.requestMediaLibraryPermissionsAsync(true)
    const data = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 })
    if (!data.cancelled && data.type == 'image') {
        const dataUri = data.uri
        const fileName = dataUri.match(".+/(.+?)([\?#;].*)?$")[1]
        const fileUri = imagePickerUri + fileName

        await FileSystem.makeDirectoryAsync(imagePickerUri, { intermediates: true })
        await FS.copyAsync({ from: dataUri, to: fileUri })
        const imageData= await FileSystem.getInfoAsync(fileUri)

        const text = `![image](${fileName})`
        Clipboard.setString(text)

        return imageData
    } 
}

export async function importImageFromCamera() {
    await ImagePicker.requestCameraPermissionsAsync()
    const data = await ImagePicker.launchCameraAsync({ quality: 0.5 })
    console.log(data);
    if (!data.cancelled && data.type == 'image') {
        const dataUri = data.uri
        const fileName = dataUri.match(".+/(.+?)([\?#;].*)?$")[1]
        const fileUri = imagePickerUri + fileName

        await FileSystem.makeDirectoryAsync(imagePickerUri, { intermediates: true })
        await FS.copyAsync({ from: dataUri, to: fileUri })
        const imageData = await FileSystem.getInfoAsync(fileUri)

        const text = `![image](${fileName})`
        Clipboard.setString(text)

        return imageData
    }
}

export async function importImageFromFolder() {
    const data = await DocumentPicker.getDocumentAsync({ type: 'image/*', copyToCacheDirectory:true})
    console.log(data);
    if (data.type == "success") {
        const dataUri = data.uri
        const fileName = dataUri.match(".+/(.+?)([\?#;].*)?$")[1]
        const cacheFileUri = documentPickerCacheUri + fileName
        const fileUri = imagePickerUri + fileName
        
        await FileSystem.makeDirectoryAsync(imagePickerUri, { intermediates: true })
        await FS.copyAsync({ from: cacheFileUri, to: fileUri })
        const imageData = await FileSystem.getInfoAsync(fileUri)

        const text = `![image](${fileName})`
        Clipboard.setString(text)

        return imageData
    }
}

export async function readImages(){
    await FileSystem.makeDirectoryAsync(imagePickerUri, { intermediates: true })
    const imageList = await FileSystem.readDirectoryAsync(imagePickerUri)
    let imageDataList=[];

    for (const i in imageList) {
        const data = await FileSystem.getInfoAsync(imagePickerUri + imageList[i])
        imageDataList.push(data);
    }

    if (imageDataList.length > 0){
         const sort_imageDataList = imageDataList.sort((a, b) => {
            if (a.modificationTime > b.modificationTime)
                return -1;
            if (a.modificationTime < b.modificationTime)
                return 1;
            return 0;
        });

        return sort_imageDataList
    }else{
        return imageDataList
    }
    
}


export async function deletImage(imageUri) {
    await FileSystem.deleteAsync(imageUri)

    const new_Image_List = await readImages()
    return new_Image_List
}