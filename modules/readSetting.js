import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { Platform } from 'react-native';

const snailSetting = {
    "theme": "Night",
    "preview": "theme",
    "autoSave": "30"
}


const directoryUri = FileSystem.documentDirectory + 'SimpleMarkdown/setting/'
const settingFileName = 'snailSetting.json'
const fileUri = directoryUri + settingFileName

let FS

if (Platform.OS == 'ios') {
    FS = FileSystem
} else if (Platform.OS == 'android') {
    FS = StorageAccessFramework
} else {
    console.log("eeee");
}

export default async function readSetting() {
    let settingData = JSON.stringify(snailSetting)

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



export async function setThemeSetting(themeName) {
    const settingData = await FS.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
        .then(e => {
            // console.log("setThemeSettinge>>readAsStringAsync >>" + e);
            return e
        }).catch(err => {
            console.error("setThemeSetting>>readAsStringAsync >>" + err);
        })

    let new_settingData_json = await JSON.parse(settingData)
    new_settingData_json["theme"] = themeName
    
  
    await FS.writeAsStringAsync(fileUri, JSON.stringify(new_settingData_json), { encoding: FileSystem.EncodingType.UTF8 })
        .then(e => {
            // console.log("setThemeSetting>>writeAsStringAsync >>" + e);
            return e
        }).catch(err => {
            console.log(fileUri);
            console.error("setThemeSetting>>writeAsStringAsync >>" + err);
        })

    return JSON.parse(settingData)
}

export async function setPreviewThemeSetting(themeName) {
    const settingData = await FS.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
        .then(e => {
            // console.log("setThemeSettinge>>readAsStringAsync >>" + e);
            return e
        }).catch(err => {
            console.error("setThemeSetting>>readAsStringAsync >>" + err);
        })

    let new_settingData_json = await JSON.parse(settingData)
    new_settingData_json["preview"] = themeName


    await FS.writeAsStringAsync(fileUri, JSON.stringify(new_settingData_json), { encoding: FileSystem.EncodingType.UTF8 })
        .then(e => {
            // console.log("setThemeSetting>>writeAsStringAsync >>" + e);
            return e
        }).catch(err => {
            console.log(fileUri);
            console.error("setThemeSetting>>writeAsStringAsync >>" + err);
        })

    return JSON.parse(settingData)
}