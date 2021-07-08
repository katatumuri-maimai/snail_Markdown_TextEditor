import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import * as Device from 'expo-device';


const directoryUri = FileSystem.documentDirectory + 'SimpleMarkdown/projects/'
let FS = Device.osName == 'Android' ? StorageAccessFramework : FileSystem


export async function saveProject(name) {
    const projectName = removeMarks(name)
    
    const Projects = await FileSystem.readDirectoryAsync(directoryUri)
        .then(e => {
            console.log("readDirectoryAsync >>" + e);
            return e
        }).catch(err => {
            console.error(err);
        })

    const newProjectName = Projects.includes(projectName) ? (projectName + "(" + Projects.length + ")" ): projectName
    const projectUri = directoryUri + encodeURIComponent(newProjectName)

    await FileSystem.makeDirectoryAsync(projectUri, { intermediates: true })
        .then(e => {
            console.log("saveProjectsmakeDirectoryAsync" + e);
        }).catch(err => {
            console.error(err);
        })

}

export async function readProjects(name) {
    const projectName = removeMarks(name)
    const projectUri = directoryUri + projectName

    const Project_List = await FileSystem.readDirectoryAsync(directoryUri)
        .then(e => {
            console.log("readDirectoryAsync >>" + e);
            return e
        }).catch(err => {
            console.error(err);
        })

    const File_List = await FileSystem.readDirectoryAsync(projectUri)
        .then(e => {
            console.log("readDirectoryAsync >>" + e);
            return e
        }).catch(err => {
            console.error(err);
        })

    console.log(Project_List);
    console.log(File_List);

}

export async function templateProjects(os) {
    const settingFileName = 'snailSetting.json'
    const fileUri = directoryUri + settingFileName
    let settingData = JSON.stringify(snailSetting)
    let FS

    await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true })
        .then(e => {
            console.log("saveProjectsmakeDirectoryAsync" + e);
        }).catch(err => {
            console.error(err);
        })

    const isFileExits = await FileSystem.getInfoAsync(fileUri)
        .then(e => {
            console.log("saveProjectsgetInfoAsync >>" + e.exists);
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
                console.log("saveProjectswriteAsStringAsync >>" + e);
                return e
            }).catch(err => {
                console.log(fileUri);
                console.error("saveProjectswriteAsStringAsync >>" + err);
            })
    } else {
        settingData = await FS.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
            .then(e => {
                console.log("e>>"+e);
                return e
            }).catch(err => {
                console.error("saveProjectsreadAsStringAsync >>" + err);
            })
    }
    console.log("saveProjectssettingData>>"+settingData);
    return JSON.parse(settingData)
}

function removeMarks(name) {
    const marks = ["\\", '/', ':', '*', '?', 'a', "<", ">", '|', /^ */g, /^　*/g];
    let name_removeMarks = name;
    for (const i in marks) {
        name_removeMarks = name_removeMarks.replaceAll(marks[i], '')
    }
    return (name_removeMarks);
}