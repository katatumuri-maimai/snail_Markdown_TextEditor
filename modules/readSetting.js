import * as FileSystem from 'expo-file-system';
import {StorageAccessFramework} from 'expo-file-system';

const snailSetting = {
    "theme": "Night",
    "preview": "Inheritance",
    "autoSave": "30"
}

export default async function readSetting(os) {
    const directoryUri = FileSystem.documentDirectory + 'SimpleMarkdown/setting/'
    const settingFileName = 'snailSetting.json'
    const fileUri = directoryUri + settingFileName
    let settingData = JSON.stringify(snailSetting)
    let FS

    await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true })
        .then(e => {
            console.log("makeDirectoryAsync" + e);
        }).catch(err => {
            console.error(err);
        })

    const isFileExits = await FileSystem.getInfoAsync(fileUri)
        .then(e => {
            console.log("getInfoAsync >>" + e.exists);
            return e
        }).catch(err => {
            console.error(err);
        })


    console.log(os);
    if (os == 'iOS') {
        FS = FileSystem
    } else if (os == 'Android') {
        FS = StorageAccessFramework
    } else {
        console.log("eeee");
    }

    if (isFileExits.exists===false) {
    await FS.writeAsStringAsync(fileUri, settingData, { encoding: FileSystem.EncodingType.UTF8 })
            .then(e => {
                console.log("writeAsStringAsync >>" + e);
                return e
            }).catch(err => {
                console.log(fileUri);
                console.error("writeAsStringAsync >>" + err);
            })
    } else {
        settingData = await FS.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
            .then(e => {
                console.log("e>>"+e);
                return e
            }).catch(err => {
                console.error("readAsStringAsync >>" + err);
            })
    }
    console.log("settingData>>"+settingData);
    return JSON.parse(settingData)
}