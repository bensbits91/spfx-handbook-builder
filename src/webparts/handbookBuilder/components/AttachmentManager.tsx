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
    DocumentCardLocation,
    DocumentCardActions
} from 'office-ui-fabric-react/lib/DocumentCard';
import { v4 as uuidv4 } from 'uuid';

import styles from './AttachmentManager.module.scss';

const mcc = 'color:black;background-color:lime;';

const image_types = ['.gif', '.jpg', '.jpeg', '.bmp', '.dib', '.tif', '.tiff', '.ico', '.png', '.jxr', '.svg'];
const file_types = ['.xls', '.xlsx', '.doc', '.docx', '.pdf', '.ppt', '.pptx', '.txt', '.vsd', '.vsdx'];
const file_icons = [
    { ext: '.xls', icon: 'ExcelDocument' },
    { ext: '.xlsx', icon: 'ExcelDocument' },
    { ext: '.doc', icon: 'WordDocument' },
    { ext: '.docx', icon: 'WordDocument' },
    { ext: '.pdf', icon: 'PDF' },
    { ext: '.ppt', icon: 'PowerPointDocument' },
    { ext: '.pptx', icon: 'PowerPointDocument' },
    { ext: '.txt', icon: 'TextDocument' },
    { ext: '.vsd', icon: 'VisioDocument' },
    { ext: '.vsdx', icon: 'VisioDocument' },
];

const addIcon: IIconProps = { iconName: 'Add' };
const removeIcon: IIconProps = {
    iconName: 'Cancel',
    style: {
        fontSize: 8,
        lineHeight: 26
    }
};

export interface AttachmentManagerProps {
    context?: any;
    handler?: any;
    tab: any;
    readonly?: boolean;
    dark?: boolean;
    compact?: boolean;
}

export interface AttachmentManagerState {
    // files: any;
}

class AttachmentManager extends React.Component<AttachmentManagerProps, AttachmentManagerState> {
    constructor(props: AttachmentManagerProps) {
        super(props);
        this.state = {
            // files: null
        };
    }

    public componentDidUpdate(prevProps: AttachmentManagerProps, prevState: AttachmentManagerState) {
        console.log('%c : AttachmentManager -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public onSave_filePicker(file) {
        console.log('%c : AttachmentManager -> onSave_filePicker -> file', mcc, file);
        const ext = file.fileName.split(file.fileNameWithoutExtension)[1];
        console.log('%c : AttachmentManager -> onSave_filePicker -> ext', mcc, ext);


        file.ext = ext;

        file.uuid = uuidv4();

        // const files_copy = JSON.parse(JSON.stringify(this.state.files));
        const files_copy = this.props.tab.attachments ? JSON.parse(JSON.stringify(this.props.tab.attachments)) : null;
        const files_new = files_copy ? files_copy.concat(file) : [file];
        this.props.handler(files_new, this.props.tab.id);
        // this.setState({ files: files_new });
    }

    // public onChange_filePicker(file) {
    //     console.log('%c : AttachmentManager -> onChange_filePicker -> file', mcc, file);
    //     const ext = file.fileName.split(file.fileNameWithoutExtension + '.')[1];
    //     console.log('%c : AttachmentManager -> onChange_filePicker -> ext', mcc, ext);
    // }

    public onClick_remove(e, file) {
        e.stopPropagation();
        e.preventDefault();
        console.log('%c : AttachmentManager -> onClick_remove -> e', mcc, e);
        console.log('%c : AttachmentManager -> onClick_remove -> file', mcc, file);

        const files_copy = JSON.parse(JSON.stringify(this.props.tab.attachments));
        // const files_copy = JSON.parse(JSON.stringify(this.state.files));
        const files_new = files_copy.filter(f => f.uuid != file.uuid);
        this.props.handler(files_new, this.props.tab.id);
        // this.setState({ files: files_new });

    }

    public onClick_file(e, file_link) {
        console.log('%c : AttachmentManager -> onClick_file -> file_link', mcc, file_link);
        window.open(file_link, '_blank');
    }

    public render() {

        const { readonly, tab, dark, compact } = this.props;

        const { attachments } = tab;

        const el_subhead = readonly ? <div className={styles.attSubhead}>
            Please review all attached files.
        </div> : <></>; // when not read-only, get subhead from FilePicker label

        const el_filePicker = readonly ? <></> :
            <FilePicker
                accepts={[...image_types, ...file_types]}
                buttonIcon='FileImage'
                onSave={(filePickerResult: IFilePickerResult) => { this.onSave_filePicker(filePickerResult) }}
                // onChanged={(filePickerResult: IFilePickerResult) => { this.onChange_filePicker(filePickerResult) }}
                // onChanged={(filePickerResult: IFilePickerResult) => { this.setState({ filePickerResult }) }}
                // bingAPIKey='<BING API KEY>'
                context={this.props.context}

                label='Attach images and documents to this page'
                buttonLabel='Add attachment'
            />;

        const el_attachments = attachments ? //         NEED    STYLES FOR COMPACT AND DARK         <================================================================
            <div>
                {attachments.map(f => {
                    const file_name = f.fileName;
                    const file_link = f.fileAbsoluteUrl;
                    const file_ext = f.ext;
                    // console.log('%c : AttachmentManager -> render -> file_ext', mcc, file_ext);

                    const isImg = image_types.indexOf(file_ext) > -1;
                    // console.log('%c : AttachmentManager -> render -> isImg', mcc, isImg);


                    const preview: IDocumentCardPreviewProps = isImg ?
                        {
                            previewImages: [
                                {
                                    previewImageSrc: file_link,
                                    // iconSrc: TestImages.iconPpt,
                                    height: 75,
                                    width: 100,
                                }
                            ],
                            styles: {
                                root: {
                                    borderRight: dark ? 'none' : '#eee',
                                    selectors: {
                                        '& .ms-Image': {
                                            display: 'flex'
                                        },
                                        '& img': {
                                            objectFit: 'cover',
                                            flex: 1
                                        },
                                    }
                                },
                            }
                        } : {
                            previewImages: [
                                {
                                    // linkProps: {
                                    //     href: file_link,
                                    //     target: '_blank'
                                    // },
                                    previewIconProps: {
                                        iconName: file_icons.filter(fi => fi.ext == file_ext)[0].icon,
                                        styles: {
                                            root: {
                                                fontSize: 30,
                                                color: '#eee',
                                                backgroundColor: '#333'
                                            }
                                        }
                                    },
                                    width: 100,
                                }
                            ],
                            styles: {
                                // root: { borderRight: dark ? 'none' : '#eee', },
                                previewIcon: { backgroundColor: '#333' },
                            }
                        };

                    const styles_documentCard = {
                        root: {
                            height: 75,
                            margin: '10px 0 20px',
                            backgroundColor: dark ? '#333' : '#fff',
                            selectors: {
                                '& .ms-DocumentCardPreview': { borderRight: dark ? 'none' : '#eee' }
                            }
                        },
                        iconContainer: { backgroundColor: '#333' },
                    };

                    const styles_documentCard_title = {
                        root: { color: dark ? '#eee' : '#333' }
                    };



                    const action_array = readonly ? []
                        : [
                            {
                                iconProps: { iconName: 'Delete' },
                                onClick: e => { this.onClick_remove(e, f) },
                                ariaLabel: 'remove'
                            }
                        ];

                    return (
                        <div>
                            <DocumentCard
                                type={DocumentCardType.compact}
                                onClick={e => this.onClick_file(e, file_link)}
                                styles={styles_documentCard}
                            >
                                <DocumentCardPreview {...preview} />
                                <DocumentCardDetails>
                                    <DocumentCardTitle
                                        title={file_name}
                                        shouldTruncate={true}
                                        styles={styles_documentCard_title}
                                    />
                                    {/* <DocumentCardLocation location='remove x' />
                                    <span>asdf</span> */}
                                    <DocumentCardActions
                                        actions={action_array}
                                    />
                                </DocumentCardDetails>
                            </DocumentCard>
                        </div>
                    );
                })}
            </div>
            : <></>;



        return (
            <div className={dark ? styles.attWrapDark : styles.attWrap}>
                <h2>Attachments</h2>
                {el_subhead}
                {el_filePicker}
                {el_attachments}
            </div>
        );
    }
}

export default AttachmentManager;