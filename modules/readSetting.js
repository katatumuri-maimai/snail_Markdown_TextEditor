import * as FileSystem from 'expo-file-system';

const snailSetting = {
    "theme": "Night",
    "preview": "Inheritance",
    "autoSave": "30"
}

export default async function readSetting() {
    const directoryUri = FileSystem.documentDirectory + 'SimpleMarkdown/setting/'
    const settingFileName = 'snailSetting.json'
    const fileUri = directoryUri + settingFileName
    let settingData

    await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true })
        .then(e => {
            // console.log("makeDirectoryAsync" + e);
        }).catch(err => {
            console.error(err);
        })

    const fileList = await FileSystem.readDirectoryAsync(directoryUri)
        .then(e => {
            // console.log("readDirectoryAsync >>"+ e);
            return e
        }).catch(err => {
            console.error(err);
        })

    if (fileList.includes(settingFileName) === false) {
        settingData = await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(snailSetting), { encoding: FileSystem.EncodingType.UTF8 })
            .then(e => {
                // console.log("writeAsStringAsync >>" + e);
                return e
            }).catch(err => {
                console.log(fileUri);
                console.error("writeAsStringAsync >>" + err);
            })
    } else {
        settingData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
            .then(e => {
                // console.log("readAsStringAsync >>" + e);
                return e
            }).catch(err => {
                console.error("readAsStringAsync >>" + err);
            })
    }

    return JSON.parse(settingData)
}