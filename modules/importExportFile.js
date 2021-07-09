import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import * as Device from 'expo-device';
import { Share } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const directoryUri = FileSystem.documentDirectory + 'SimpleMarkdown/projects/'
const cacheDirectoryUri = FileSystem.cacheDirectory + 'SimpleMarkdown/temp/'
let FS = Device.osName == 'Android' ? StorageAccessFramework : FileSystem

export async function importFile() {
    const data = await DocumentPicker.getDocumentAsync()
    const state = data.type

    if (state == "success") {
        const filename = data.name
        const fileUri = data.uri

        const filecontent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
            .then(e => {
                console.log("readAsStringAsync >>" + e);
                return e
            }).catch(err => {
                console.error("readAsStringAsync >>" + err);
                return false
            })

        return ({
            filename: filename,
            filecontent: filecontent
        })
    }
}

export async function exportMdFile(filename, content) {
    const fileUri = cacheDirectoryUri + encodeURIComponent(removeMarks(filename.replace('.md', ''))) + '.md'

    await FileSystem.makeDirectoryAsync(cacheDirectoryUri, { intermediates: true })
        .then(e => {
            // console.log("makeDirectoryAsync" + e);
        }).catch(err => {
            console.error(err);
        })

    await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 })
        .then(e => {
            // console.log("writeAsStringAsync >>" + e);
        }).catch(err => {
            console.log(fileUri);
            console.error("writeAsStringAsync >>" + err);
        })


    const shareUrl = await FileSystem.getContentUriAsync(fileUri)
    Share.share({ url: shareUrl })
        .then(e => {
            // console.log(Share.sharedAction);
        }).catch(err => {
            console.error(err);
        })

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