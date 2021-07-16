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
const imagePickerUri = FileSystem.documentDirectory + 'SimpleMarkdown/ImagePicker/'
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


const allowImageHandlers = [
    'data:image/png;base64',
    'data:image/gif;base64',
    'data:image/jpeg;base64',
    'https://',
    'http://',
]


const needAddHeaderImageHandlers = [
    /^data\//,
    /^var\//,
]

const localDefaltImageHandler = 'file:///'

export async function exportPdfFile(filename, content) {
    const filename_removeMarks = removeMarks(filename.replace('.md', ''))
    const fileUri  = cacheDirectoryUri+filename_removeMarks+'.pdf'
    let   html     = marked(content)

    html=await convertImage(html)

    const pdf = await Print.printToFileAsync({ html: html })
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
    let html = marked(content)
    html = await convertImage(html)
    await Print.printAsync({ html: html }).catch(err=>{console.error(err);})
}

 async function convertImage(html) {
    // imgタグの取得
    const imageTag = /(<img src=)["|'](.*?)["|']+/gi
    const imageTagList = html.match(imageTag)

    // imgタグがあるとき
    if (imageTagList.length != 0) {
        let imageSrcList = []
        // imgタグを削除してsrcを取り出す
        imageTagList.forEach(imageTag => {
            const imageSrc = imageTag.replace(/<img src=["|'](.*?)["|']+/i, "$1")
            imageSrcList.push(imageSrc)
        })

        // base64に置換が必要なsrcリスト
        let needReaplace_imageSrcList = [...imageSrcList]

        // base64に置換不要なsrcを取り除く
        allowImageHandlers.forEach(imageHandler => {
            needReaplace_imageSrcList =
                needReaplace_imageSrcList
                    .filter(imageSrc => { return filterByImageHandler(imageSrc, imageHandler) })
        })


        // base64に置換が必要なsrcリストをbase64に変換

        for (const imageSrc of needReaplace_imageSrcList) {
            let before_imageSrc = imageSrc
            let imageUri = imagePickerUri + imageSrc

            needAddHeaderImageHandlers.forEach(imageHandler => {
                const matchData = imageSrc.match(imageHandler)
                if (!!matchData) {
                    imageUri = localDefaltImageHandler + { ...matchData }.input
                }
            })

            const matchData = imageSrc.match(localDefaltImageHandler)
            if (!!matchData) {
                imageUri = { ...matchData }.input
            }

            const ext = imageUri.match(/.*\.(.*$)/)[1].toLowerCase()
            const fileType = ext == 'jpeg' ? 'jpg' : ext

            const after_imageSrc =
                `data:image/${fileType};base64,` +
                await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 })

            html = html.replace(before_imageSrc, after_imageSrc)

        }

        const imgStyle = `<img style="max-width:20%;max-height;50%;"`

        html = html.replace(/<img /g, imgStyle)
    }
     return `<style>@page{margin: 50px;}</style>${html}`
}

function filterByImageHandler(imageSrc, imageHandler) {
    return !imageSrc.match(imageHandler)
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
