import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import * as Device from 'expo-device';

const directoryUri = FileSystem.documentDirectory + 'SimpleMarkdown/projects/'
let FS = Device.osName == 'Android' ? StorageAccessFramework : FileSystem

export async function saveProject(projectName) {
    projectName = removeMarks(projectName)
    
    const Projects = await FileSystem.readDirectoryAsync(directoryUri)
        .then(e => {
            // console.log("readDirectoryAsync >>" + e);
            return e
        }).catch(err => {
            console.error(err);
        })

    const new_ProjectName = createNewName(Projects, projectName)

    // const new_ProjectName = Projects.includes(projectName) ? (projectName + "(" + Projects.length + ")" ): projectName
    const projectUri = directoryUri + encodeURIComponent(new_ProjectName)

    await FileSystem.makeDirectoryAsync(projectUri, { intermediates: true })
        .then(e => {
            // console.log("saveProjectsmakeDirectoryAsync" + e);
        }).catch(err => {
            console.error(err);
        })

    return new_ProjectName

}

export async function createNewFile(projectName, fileName,content) {
    const projectUri = directoryUri + encodeURIComponent(removeMarks(projectName))

    const Files = await FileSystem.readDirectoryAsync(projectUri)
        .then(e => {
            // console.log("readDirectoryAsync >>" + e);
            return e
        }).catch(err => {
            console.error(err);
        })

    const new_FileName = createNewName(Files, `${removeMarks(fileName)}`)
    const fileUri = projectUri + '/'+ encodeURIComponent(new_FileName)+'.md'

    await FS.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 })
        .then(e => {
            // console.log("saveFilemakeDirectoryAsync" + e);
        }).catch(err => {
            console.error(err);
        })

    const new_Files = await FileSystem.readDirectoryAsync(projectUri)
        .then(e => {
            // console.log("readDirectoryAsync >>" + e);
            return e
        }).catch(err => {
            console.error(err);
        })

    return({
        [projectName]: new_Files
    })

}

export async function saveFile(projectName, fileName,text) {
    const projectUri = directoryUri + encodeURIComponent(removeMarks(projectName))
    const fileUri = projectUri + '/' + encodeURIComponent(removeMarks(fileName).replace('.md','')) + '.md'

    await FS.writeAsStringAsync(fileUri, text, { encoding: FileSystem.EncodingType.UTF8 })
        .then(e => {
            // console.log("saveFilemakeDirectoryAsync" + e);
        }).catch(err => {
            console.error(err);
        })

    const new_Files = await FileSystem.readDirectoryAsync(projectUri)
        .then(e => {
            // console.log("readDirectoryAsync >>" + e);
            return e
        }).catch(err => {
            console.error(err);
        })

}

export async function readProjects() {
    let ProjectData=[]
    await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true })
        .then(e => {
            // console.log("readProjectsmakeDirectoryAsync" + e);
        }).catch(err => {
            console.error(err);
        })

    const Project_List = await FileSystem.readDirectoryAsync(directoryUri)
        .then(e => {
            // console.log("Project_ListreadDirectoryAsync >>" + e);
            return e
        }).catch(err => {
            console.error(err);
        })

    if (!Project_List){
        console.log("Project_List" + Project_List);
        return null
    }


    for (let i in Project_List){
        const projectName = encodeURIComponent(Project_List[i])
        const projectUri = directoryUri + projectName+'/'

        const File_List = await FileSystem.readDirectoryAsync(projectUri)
            .then(e => {
                // console.log("File_ListreadDirectoryAsync >>" + e);
                return e
            }).catch(err => {
                console.error("File_ListreadDirectoryAsync >>" + err);
            })
        ProjectData.push({ [Project_List[i]]: File_List})
    }
    
    // console.log(ProjectData);

    return ProjectData
}

export async function readFileData(projectName, fileName) {
    const fileUri = directoryUri + encodeURIComponent(projectName) + '/' + encodeURIComponent(fileName)
    
    // console.log(fileUri);
    return FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
        .then(e => {
            // console.log("readAsStringAsync" + e);
            return e
        }).catch(err => {
            console.error(err);
        })
}

export async function removeData(projectName,fileName) {
    const projectUri = directoryUri + encodeURIComponent(projectName)
    let deleteUri;
    let readUri;

    if (!fileName){
        deleteUri = projectUri
        readUri = directoryUri
    }else{
        deleteUri = projectUri + '/' + encodeURIComponent(fileName.replace('.md',''))+'.md'
        readUri = projectUri
    }

    await FileSystem.deleteAsync(deleteUri)

    const deleteData =await FileSystem.readDirectoryAsync(readUri)
        .then(e => {
            console.log("readAsStringAsync" + e);
            return e
        }).catch(err => {
            console.error(err);
        })

    return (!fileName ? projectName:{ [projectName]: deleteData})
}

export async function removeAllProjects() {
    FileSystem.deleteAsync(directoryUri)
}


function removeMarks(name) {
    const marks = [/\\/g, /\//g, /\:/g, /\*/g, /\?/g, /\</g, /\>/g, /\|/g, /^ */g, /^　*/g];
    // const marks = [/"\\"/, '/', ':', '*', '?', "<", ">", '|', /^ */g, /^　*/g];
    let name_removeMarks = name;
    for (const i in marks) {
        name_removeMarks = name_removeMarks.replace(marks[i], '')
    }
    return (name_removeMarks);
}

function createNewName(list,name) {

    for (const n in list) {
        const new_n=list[n].replace('.md', '')
        list.splice(n, 1, new_n)
    }

    let new_name = name;
    let i = 1;

    while (list.includes(new_name)) {
        new_name = `${name}(${i})`
        i = i + 1
    }

    return new_name
}