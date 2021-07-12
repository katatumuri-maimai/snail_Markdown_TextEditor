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

let FS = Device.osName == 'Android' ? StorageAccessFramework : FileSystem

export async function importImage() {
    const data = await ImagePicker.launchImageLibraryAsync({ quality: 1 })
    // console.log(data.base64);
    if (!data.cancelled && data.type == 'image') {
        const dataUri = data.uri
        const fileName = dataUri.match(".+/(.+?)([\?#;].*)?$")[1]
        const fileUri = imagePickerUri + fileName

        await FileSystem.makeDirectoryAsync(imagePickerUri, { intermediates: true })
        await FS.copyAsync({ from: dataUri, to: fileUri })

        const text = `![image](${fileName})`

        Clipboard.setString(text)
    }
}

export async function readImages(){
    const imageList = await FileSystem.readDirectoryAsync(imagePickerUri)
    console.log(imageList);
}