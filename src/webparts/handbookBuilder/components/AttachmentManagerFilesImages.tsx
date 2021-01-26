import * as React from 'react';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { IconButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardDetails,
    DocumentCardPreview,
    DocumentCardTitle,
    IDocumentCardPreviewProps,
    DocumentCardType,
    IDocumentCardActivityPerson,
    DocumentCardStatus,
    DocumentCardLocation
} from 'office-ui-fabric-react/lib/DocumentCard';

const mcc = 'color:black;background-color:lime;';

const imgTypes = ['.gif', '.jpg', '.jpeg', '.bmp', '.dib', '.tif', '.tiff', '.ico', '.png', '.jxr', '.svg'];
const docTypes = ['.xls', '.xlsx', '.doc', '.docx', '.pdf', '.ppt', '.pptx', '.txt'];
const docLogos = [
    { ext: '.xls', icon: '' },
    { ext: '.xlsx', icon: '' },
    { ext: '.doc', icon: 'WordDocument' },
    { ext: '.docx', icon: 'WordDocument' },
    { ext: '.pdf', icon: '' },
    { ext: '.ppt', icon: '' },
    { ext: '.pptx', icon: '' },
    { ext: '.txt', icon: '' },
];

const addIcon: IIconProps = { iconName: 'Add' };
const removeIcon: IIconProps = {
    iconName: 'Cancel',
    style: {
        fontSize: 8,
        lineHeight: 26
    }
};

const previewPropsUsingIcon: IDocumentCardPreviewProps = {
    previewImages: [
        {
            previewIconProps: { iconName: 'OpenFile', styles: { root: { fontSize: 60, color: '#eee' } } },
            width: 144
        }
    ],
    styles: { previewIcon: { backgroundColor: '#333' } }
};
export interface AttachmentManagerProps {
    context: any;
}

export interface AttachmentManagerState {
    images: any;
    files: any;
    // filePickerResult: any;
}

class AttachmentManager extends React.Component<AttachmentManagerProps, AttachmentManagerState> {
    constructor(props: AttachmentManagerProps) {
        super(props);
        this.state = {
            images: null,
            files: null
        };
    }

    public componentDidUpdate(prevProps: AttachmentManagerProps, prevState: AttachmentManagerState) {
        console.log('%c : AttachmentManager -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public onSave_filePicker(file) {
        console.log('%c : AttachmentManager -> onSave_filePicker -> file', mcc, file);
        const ext = file.fileName.split(file.fileNameWithoutExtension/*  + '.' */)[1];
        console.log('%c : AttachmentManager -> onSave_filePicker -> ext', mcc, ext);


        file.ext = ext;

        const isImg = imgTypes.indexOf(ext) > -1;
        console.log('%c : AttachmentManager -> onSave_filePicker -> isImg', mcc, isImg);
        if (isImg) {
            const images_copy = JSON.parse(JSON.stringify(this.state.images));
            const images_new = images_copy ? images_copy.concat(file) : [file];
            this.setState({ images: images_new });
        }
        else {
            const files_copy = JSON.parse(JSON.stringify(this.state.files));
            const files_new = files_copy ? files_copy.concat(file) : [file];
            this.setState({ files: files_new });
        }
    }

    public onChange_filePicker(file) {
        console.log('%c : AttachmentManager -> onChange_filePicker -> file', mcc, file);
        const ext = file.fileName.split(file.fileNameWithoutExtension + '.')[1];
        console.log('%c : AttachmentManager -> onChange_filePicker -> ext', mcc, ext);
    }

    public onClick_remove(e, file) {
        console.log('%c : AttachmentManager -> onClick_remove -> e', mcc, e);
        console.log('%c : AttachmentManager -> onClick_remove -> file', mcc, file);
    }

    public render() {

        const { files, images } = this.state;

        const file_div = files ?
            <div>
                <h3>Attached files</h3>
                {files.map(f => {
                    const file_name = f.fileName;
                    const file_link = f.fileAbsoluteUrl;
                    const file_ext = f.ext;

                    const previewIcon: IDocumentCardPreviewProps = {
                        previewImages: [
                            {
                                previewIconProps: {
                                    iconName: file_ext == '.doc' || file_ext == '.docx' ? 'WordDocument' : 'OutlookLogo',
                                    styles: {
                                        root: {
                                            fontSize: 60,
                                            color: '#0078d7',
                                            backgroundColor: '#eee'
                                        }
                                    }
                                },
                                width: 144
                            }
                        ],
                        styles: {
                            previewIcon: { backgroundColor: '#eee' }
                        }
                    };



                    return (
                        <div>
                            <DocumentCard
                                type={DocumentCardType.compact}
                                onClickHref={file_link}
                            >
                                <DocumentCardPreview {...previewIcon} />
                                <DocumentCardDetails>
                                    <DocumentCardTitle title={file_name} shouldTruncate={true} />
                                    <DocumentCardLocation location='remove x' />
                                </DocumentCardDetails>
                            </DocumentCard>
                        </div>
                    );
                })}
            </div>
            : <></>;

        const image_div = images ?
            <div>
                <h3>Attached images</h3>
                {images.map(f => {
                    const file_name = f.fileName;
                    const file_link = f.fileAbsoluteUrl;

                    const imgProps = {
                        name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
                        linkProps: {
                            href: file_link,
                            target: '_blank'
                        },
                        previewImageSrc: file_link,
                        // iconSrc: TestImages.iconPpt,
                        width: 144
                    }


                    return (
                        <div>
                            <DocumentCard
                                type={DocumentCardType.compact}
                                onClickHref={file_link}
                            >
                                <DocumentCardPreview previewImages={[imgProps]} />
                                <DocumentCardDetails>
                                    <DocumentCardTitle title={file_name} shouldTruncate={true} />
                                    <DocumentCardLocation location='remove x' />
                                </DocumentCardDetails>

                            </DocumentCard>
                        </div>
                    );
                })}
            </div>
            : <></>;

        const att_div = files || images ?
            <div>
                {file_div}
                {image_div}
            </div>
            : <></>;

        return (
            <>
                <FilePicker
                    // bingAPIKey='<BING API KEY>'
                    accepts={[...imgTypes, ...docTypes]}
                    buttonIcon='FileImage'
                    onSave={(filePickerResult: IFilePickerResult) => { this.onSave_filePicker(filePickerResult) }}
                    onChanged={(filePickerResult: IFilePickerResult) => { this.onChange_filePicker(filePickerResult) }}
                    // onChanged={(filePickerResult: IFilePickerResult) => { this.setState({ filePickerResult }) }}
                    context={this.props.context}

                    label='Attach images and documents to this page'
                    buttonLabel='Add attachment'
                />
                {att_div}
            </>
        );
    }
}

export default AttachmentManager;