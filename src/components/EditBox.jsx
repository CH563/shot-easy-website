import React, { useState, useRef } from 'react';
import FilerobotImageEditor, {
    TABS,
    TOOLS,
} from 'react-filerobot-image-editor';
import photo from '../static/photo.png';
import usePaste from '../lib/usePaste';
import { url2Blob, toDownloadFile } from '../lib/utils'

async function onSaveToClipboard(imageInfo) {
    const blob = await url2Blob(imageInfo.imageBase64);
    navigator.clipboard.write([
        new ClipboardItem({
            [imageInfo.mimeType]: blob,
        }),
        ]).catch((error) => {
            console.error(error);
        });
}

export default function App() {
    const fileInput = useRef(null);
    const [isReader, setIsReader] = useState(true);
    const [photoUrl, setPhotoUrl] = useState(photo.src);
    const [photoName, setPhotoName] = useState('neom-s6g6ZSxM3kQ-unsplash');

    usePaste((file) => {
        setPhotoUrl(window.URL.createObjectURL(file));
    })

    const handleSelect = () => {
        fileInput.current?.click();
    }
    const onSelectChange = (files) => {
        if (files.target?.files?.length) {
            setIsReader(false);
            const file = files.target.files[0];
            setPhotoName(file.name);
            setPhotoUrl(window.URL.createObjectURL(file));
            setTimeout(() => {
                setIsReader(true);
            }, 50);
        }
    }
    return (
        <>
            <div className="flex justify-center items-center gap-2 mb-6">
                <div className="relative">
                    <button className="py-1 flex gap-1 items-center px-4 rounded-full text-sm border-0 bg-[#6879eb] text-white" onClick={handleSelect}>Select photo to edit</button>
                    <input
                        ref={fileInput}
                        type="file"
                        id="file"
                        hidden
                        accept="image/jpeg,image/webp,image/png,image/gif,image/bmp,image/heic,image/heif"
                        onChange={onSelectChange}
                    />
                    <span className="absolute text-xs opacity-60 top-8 left-[50%] translate-x-[-50%]">Or paste it</span>
                    <svg className="absolute -right-12 top-1 opacity-80" xmlns="http://www.w3.org/2000/svg" version="1.1" width="54" height="54" x="0" y="0" viewBox="0 0 100 100"><g><path d="m74.3 66.8-5.8 5.8c-.6-20.7-8.9-27.8-13.6-30.1-.1-.4-.1-.8-.2-1.2-1-4.1-5.9-17.3-29.5-17.3h-.1v2h.1C47 26 51.7 37.9 52.6 41.7c-4.1-1.2-8-.2-9.7 2.4-1.5 2.3-1 5.2 1.4 8.1 3 3.6 5.7 2.8 6.7 2.3 2.6-1.3 4.2-5.2 4-9.5 5.7 3.4 10.9 12 11.4 27.6l-5.7-5.7-1.4 1.4 8.2 8.2 8.2-8.2zM50.1 52.7c-1.6.8-3.2-.5-4.3-1.8-1.8-2.1-2.2-4.2-1.2-5.7.9-1.3 2.6-2 4.6-2 .9 0 1.9.1 2.9.4l.9.3c.4 4.3-1 7.8-2.9 8.8z" fill="#000000" opacity="1"></path></g></svg>
                </div>
            </div>
            <div className="h-[600px] min-h-[500px] rounded-md shadow-lg">
                {isReader && <FilerobotImageEditor
                    source={photoUrl}
                    defaultSavedImageName={photoName}
                    onSave={(editedImageObject, designState) => {
                        const url = editedImageObject.imageBase64;
                        const { fullName: fileName } = editedImageObject;
                        toDownloadFile(url, fileName);
                    }}
                    theme={{}}
                    annotationsCommon={{
                        fill: '#ff0000',
                    }}
                    Text={{ text: 'Shot Easy' }}
                    Rotate={{ angle: 90, componentType: 'slider' }}
                    Crop={{
                        presetsItems: [
                            {
                                titleKey: 'classicTv',
                                descriptionKey: '4:3',
                                ratio: 4 / 3,
                                // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                            },
                            {
                                titleKey: 'cinemascope',
                                descriptionKey: '21:9',
                                ratio: 21 / 9,
                                // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                            },
                        ],
                        // presetsFolders: [
                        //     {
                        //         titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                        //         // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                        //         groups: [
                        //             {
                        //                 titleKey: 'facebook',
                        //                 items: [
                        //                     {
                        //                         titleKey: 'profile',
                        //                         width: 180,
                        //                         height: 180,
                        //                         descriptionKey: 'fbProfileSize',
                        //                     },
                        //                     {
                        //                         titleKey: 'coverPhoto',
                        //                         width: 820,
                        //                         height: 312,
                        //                         descriptionKey:'fbCoverPhotoSize',
                        //                     },
                        //                 ],
                        //             },
                        //         ],
                        //     },
                        // ],
                    }}
                    tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK, TABS.FILTERS, TABS.FINETUNE, TABS.RESIZE]} // or {['Adjust', 'Annotate', 'Watermark']}
                    defaultTabId={TABS.ADJUST} // or 'Annotate'
                    defaultToolId={TOOLS.CROP} // or 'Text'
                    useBackendTranslations={false}
                    avoidChangesNotSavedAlertOnLeave={true}
                />}
            </div>
        </>
    );
}
