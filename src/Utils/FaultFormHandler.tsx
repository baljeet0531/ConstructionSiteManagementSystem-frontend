import { gql } from '@apollo/client';
import { FormikErrors, FormikProps } from 'formik';
import { FileType } from 'rsuite/esm/Uploader';
import {
    IFaultForm,
    IFaultFormImage,
    stringKeys,
} from '../Interface/FaultForm';
import { getImage } from './Resources';

export class FaultFormHandler {
    siteId: string;
    day: string;
    responsibleTarget: string;
    code: string;
    queryName = 'faultForm';
    query = gql`
        query faultForm(
            $siteId: String!
            $day: Date
            $responsibleTarget: String
            $code: String
        ) {
            faultForm(
                siteId: $siteId
                day: $day
                responsibleTarget: $responsibleTarget
                code: $code
            ) {
                siteId
                day
                responsibleTarget
                code
                staff
                area
                jobNumber
                serialNumber
                department
                issueDay
                responsibleUnitStatus
                description
                promptFix
                fixDeadline
                fixReport
                faultPoint
                reviewDate
                reviewer
                reviewResult
                images {
                    edges {
                        node {
                            path
                        }
                    }
                }
            }
        }
    `;
    mutationName = 'updateFaultForm';
    mutation = gql`
        mutation updateFaultForm(
            $area: String
            $code: String!
            $day: Date!
            $department: String
            $description: String
            $faultPoint: Int
            $fixDeadline: Date
            $fixReport: Boolean
            $images: [Upload]
            $issueDay: Date
            $jobNumber: String
            $promptFix: Boolean
            $responsibleTarget: String!
            $responsibleUnitStatus: Boolean
            $reviewDate: Date
            $reviewResult: Boolean
            $reviewer: String
            $siteId: String!
            $staff: String
        ) {
            updateFaultForm(
                area: $area
                code: $code
                day: $day
                department: $department
                description: $description
                faultPoint: $faultPoint
                fixDeadline: $fixDeadline
                fixReport: $fixReport
                images: $images
                issueDay: $issueDay
                jobNumber: $jobNumber
                promptFix: $promptFix
                responsibleTarget: $responsibleTarget
                responsibleUnitStatus: $responsibleUnitStatus
                reviewDate: $reviewDate
                reviewResult: $reviewResult
                reviewer: $reviewer
                siteId: $siteId
                staff: $staff
            ) {
                ok
                message
            }
        }
    `;

    constructor(
        siteId: string,
        day: string,
        responsibleTarget: string,
        code: string
    ) {
        this.siteId = siteId;
        this.day = day;
        this.responsibleTarget = responsibleTarget;
        this.code = code;
    }

    getInitialValues(): IFaultForm {
        return {
            siteId: this.siteId,
            day: this.day,
            responsibleTarget: this.responsibleTarget,
            code: this.code,
            staff: null,
            area: null,
            jobNumber: null,
            serialNumber: null,
            department: null,
            issueDay: null,
            responsibleUnitStatus: null,
            description: null,
            promptFix: null,
            fixDeadline: null,
            fixReport: null,
            faultPoint: null,
            reviewDate: null,
            reviewer: null,
            reviewResult: null,
            images: [],
            uploaderImages: [],
        };
    }

    parse(
        data: IFaultForm[],
        formProps: FormikProps<IFaultForm>
    ): IFaultForm | undefined {
        if (!data[0]) return;
        let t: IFaultForm = { ...data[0] };
        const imagesPath = t.images as { edges: IFaultFormImage[] };
        const getFaultImages = async () => {
            const images: FileType[] = [];
            for (const image of imagesPath.edges) {
                const b = await getImage(image.node.path);
                images.push({
                    blobFile: new File(
                        [b as Blob],
                        `${image.node.path.split('/').pop()}`,
                        {
                            type: b?.type,
                        }
                    ),
                });
            }
            return images;
        };
        getFaultImages().then((images) => {
            formProps.setFieldValue('uploaderImages', images);
        });

        for (const key of stringKeys) {
            if (t[key] === null) {
                t = { ...t, [key]: '' };
            }
        }

        return t;
    }

    marshal(values: IFaultForm) {
        let submitValues = { ...values };
        const images = submitValues.uploaderImages;
        submitValues.images = images.map((image: FileType) => {
            return image.blobFile;
        });
        for (const key of stringKeys) {
            if (submitValues[key] === '') {
                submitValues = { ...submitValues, [key]: null };
            }
        }
        return submitValues;
    }

    validate(values: IFaultForm) {
        const errors: FormikErrors<IFaultForm> = {};
        console.log(values);

        return errors;
    }
}
