import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import * as Device from 'expo-device';
import { Share } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import marked from 'marked';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


const cacheDirectoryUri = FileSystem.cacheDirectory + 'SimpleMarkdown/temp/'
const documentPickerCacheUri = FileSystem.cacheDirectory + 'DocumentPicker/'
let FS = Device.osName == 'Android' ? StorageAccessFramework : FileSystem

export async function importFile() {
    const data = await DocumentPicker.getDocumentAsync({ type: 'text/*', copyToCacheDirectory: true})
    const state = data.type

    if (state == "success") {
        const filename = data.name
        const dataUri = data.uri
        const fileUri = documentPickerCacheUri+dataUri.match(".+/(.+?)([\?#;].*)?$")[1]

        const filecontent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
            .then(e => {
                // console.log("readAsStringAsync >>" + e);
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
    const filename_removeMarks = removeMarks(filename.replace('.md', ''))
    const fileUri = cacheDirectoryUri + encodeURIComponent(filename_removeMarks) + '.md'

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
    Share.share({ message: content, url: shareUrl, title: `${filename_removeMarks}.md`})
        .then(e => {
            // console.log(Share.sharedAction);
        }).catch(err => {
            console.error(err);
        })

}


export async function exportHtmlFile(filename,content) {
    const filename_removeMarks = removeMarks(filename.replace('.md', ''))
    const fileUri = cacheDirectoryUri + encodeURIComponent(filename_removeMarks) + '.html'
    const html=marked(content)

    await FileSystem.makeDirectoryAsync(cacheDirectoryUri, { intermediates: true })
        .then(e => {
            // console.log("makeDirectoryAsync" + e);
        }).catch(err => {
            console.error(err);
        })

    await FileSystem.writeAsStringAsync(fileUri, html, { encoding: FileSystem.EncodingType.UTF8 })
        .then(e => {
            // console.log("writeAsStringAsync >>" + e);
        }).catch(err => {
            console.log(fileUri);
            console.error("writeAsStringAsync >>" + err);
        })


    const shareUrl = await FileSystem.getContentUriAsync(fileUri)
    Share.share({ message: html, url: shareUrl, title: `${filename_removeMarks}.html` })
        .then(e => {
            // console.log(Share.sharedAction);
        }).catch(err => {
            console.error(err);
        })

}



export async function exportPdfFile(filename, content) {
    const filename_removeMarks = removeMarks(filename.replace('.md', ''))
    const fileUri  = cacheDirectoryUri+filename_removeMarks+'.pdf'
    const html     = `<style>@page{margin: 50px;}</style>${marked(content)}`
    const pdf      = await Print.printToFileAsync({ html: html})
    const shareUrl = await FileSystem.getContentUriAsync(pdf.uri)

        await FileSystem.makeDirectoryAsync(cacheDirectoryUri, { intermediates: true })
            .then(e => {
            }).catch(err => {
                console.error(err);
            })
        await FS.copyAsync({ from: shareUrl, to: fileUri})
        Sharing.shareAsync(fileUri)
}


export async function printHtmlFile(filename, content) {
    const html = `<style>@page{margin: 50px;}</style>${marked(content)}`
    console.log(html);
    await Print.printAsync({ html: html }).catch(err=>{console.error(err);})
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