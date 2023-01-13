import React from 'react';

import {
    Button,
    Flex,
    Text,
    Grid,
    GridItem,
    Input,
    Select,
    Box,
    Center,
    Image,
    IconButton,
} from '@chakra-ui/react';
import { Form, FormikProps } from 'formik';
import { formFiles, formValues } from './BuildFormik';
import { AddIcon, CloseIcon, EditIcon, ReplyIcon } from '../../Icons/Icons';
import FormGridInputItem from './GridInputItem';
import GridFileItem from './GridFileItem';
import FileInput from './FileInput';

export default function FromPage(props: {
    formProps: FormikProps<formValues>;
    fileStates: formFiles;
    setFileStates: React.Dispatch<React.SetStateAction<formFiles>>;
}) {
    const { formProps, fileStates, setFileStates } = props;
    function checkStatus(
        e: React.ChangeEvent<HTMLInputElement>,
        target: string,
        status: string,
        year: number,
        withdraw?: string
    ) {
        const date = new Date(e.target.value + 'T00:00:00.000+08:00');
        const withDrawDate = new Date(
            date.getFullYear() + year,
            date.getMonth(),
            date.getDate() - 1,
            0,
            0,
            0,
            0
        );
        const now = new Date();
        const diff =
            now.valueOf() -
            withDrawDate.valueOf() -
            (year == 0 ? 2 * 86400000 : 86400000);
        formProps.setValues({
            ...formProps.values,
            [target]: date.toISOString().split('T')[0],
            ...(withdraw && {
                [withdraw]: withDrawDate.toISOString().split('T')[0],
            }),
            [status]: diff < 0 ? 'OK' : `已過期${Math.ceil(diff / 86400000)}天`,
        });
    }

    return (
        <Flex direction={'column'} h={'100%'}>
            <Flex
                h={'117px'}
                align={'center'}
                justify={'space-between'}
                p={'2.938rem 2.625rem 1.563rem 2.125rem'}
                position={'sticky'}
            >
                <Text fontSize={'2.25rem'}>人員資料建置</Text>
                <Flex gap={'10px'}>
                    <Button
                        leftIcon={<ReplyIcon />}
                        bg={'rgba(102, 112, 128, 0.1)'}
                        color={'#667080'}
                        border={'2px solid #919AA9'}
                    >
                        匯入
                    </Button>
                    <Button
                        leftIcon={<EditIcon />}
                        bg={'#4C7DE7'}
                        color={'#FFFFFF'}
                        isLoading={formProps.isSubmitting}
                        onClick={formProps.submitForm}
                        type="submit"
                    >
                        確定編輯
                    </Button>
                </Flex>
            </Flex>
            <Flex
                direction={'column'}
                align={'center'}
                justify={'flex-start'}
                flex={1}
                borderTop={'1px solid #667080'}
                bg={'#FFFFFF'}
                overflowY={'auto'}
                p={'25px 93px'}
            >
                <Text pb={'25px'} fontSize={'2.25rem'}>
                    個人資料
                </Text>
                <Form>
                    <Grid
                        templateRows="repeat(5, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(3, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px repeat(2, 50px) 20px 388px 224px 388px 388px"
                        templateColumns="repeat(6, 1fr)"
                        gap={'4px 45px'}
                    >
                        <FormGridInputItem
                            fieldName="idno"
                            handleValidate={(value: any) =>
                                !value && '欄位不能為空'
                            }
                            formlabel={'身分證字號'}
                            inputComponent={<Input type={'text'} />}
                            gridRange={[1, 2, 1, 3]}
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[1, 2, 3, 5]}
                            fieldName="name"
                            formlabel="姓名"
                            inputComponent={<Input type={'text'} />}
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[1, 2, 5, 7]}
                            fieldName="gender"
                            formlabel="性別"
                            inputComponent={
                                <Select>
                                    <option value={'男'}>男</option>
                                    <option value={'女'}>女</option>
                                </Select>
                            }
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[2, 3, 1, 3]}
                            fieldName="birthday"
                            formlabel="出生日期"
                            inputComponent={<Input type={'date'} />}
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[2, 3, 3, 5]}
                            fieldName="bloodtype"
                            formlabel="血型"
                            inputComponent={
                                <Select>
                                    <option value={'A型'}>A型</option>
                                    <option value={'B型'}>B型</option>
                                    <option value={'AB型'}>AB型</option>
                                    <option value={'O型'}>O型</option>
                                </Select>
                            }
                        ></FormGridInputItem>
                        <GridItem colSpan={2}></GridItem>
                        <FormGridInputItem
                            gridRange={[3, 4, 1, 3]}
                            fieldName="tel"
                            formlabel="連絡電話"
                            inputComponent={<Input type={'tel'} />}
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[3, 4, 3, 5]}
                            fieldName="liaison"
                            formlabel="家屬聯絡人"
                            inputComponent={<Input type={'text'} />}
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[3, 4, 5, 7]}
                            fieldName="emergencyTel"
                            formlabel={`緊急聯絡\n電話`}
                            inputComponent={<Input type={'tel'} />}
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[4, 5, 1, 5]}
                            fieldName="address"
                            formlabel="聯絡地址"
                            inputComponent={<Input type={'text'} />}
                        ></FormGridInputItem>
                        <GridItem colSpan={2}></GridItem>
                        <FormGridInputItem
                            gridRange={[5, 6, 1, 3]}
                            fieldName="hazardNotifyDate"
                            formlabel="危害告知日期"
                            inputComponent={<Input type={'date'} />}
                            helpText="*須有存查資料"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[5, 6, 3, 5]}
                            fieldName="supplierIndustrialSafetyNumber"
                            formlabel="供應商工安認證編號"
                            inputComponent={<Input type={'text'} />}
                            helpText="*須有存查資料"
                        ></FormGridInputItem>
                        <GridItem colSpan={2}></GridItem>
                        <FormGridInputItem
                            gridRange={[6, 7, 1, 6]}
                            title="一般安全衛生教育訓練（6小時）"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[7, 8, 1, 3]}
                            fieldName="safetyHealthyEducationIssue"
                            formlabel={'發證/回訓'}
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'safetyHealthyEducationIssue',
                                            'safetyHealthyEducationStatus',
                                            3,
                                            'safetyHealthyEducationWithdraw'
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[7, 8, 3, 5]}
                            fieldName="safetyHealthyEducationWithdraw"
                            formlabel={'應回訓日期'}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'safetyHealthyEducationWithdraw',
                                            'safetyHealthyEducationStatus',
                                            0
                                        );
                                    }}
                                />
                            }
                            helpText="*三年減一天"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[7, 8, 5, 7]}
                            fieldName="safetyHealthyEducationStatus"
                            formlabel="6小時效期狀況"
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效3年"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[8, 9, 1, 3]}
                            fieldName="laborInsuranceApplyDate"
                            formlabel={`勞保申請\n日期`}
                            inputComponent={<Input type={'date'} />}
                            helpText="*提供一個月內"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[8, 9, 3, 5]}
                            fieldName="laborAssociationDate"
                            formlabel={`工會申請\n日期`}
                            inputComponent={<Input type={'date'} />}
                            helpText="*提供一個月內"
                        ></FormGridInputItem>
                        <GridItem colSpan={2}></GridItem>
                        <FormGridInputItem
                            gridRange={[9, 10, 1, 5]}
                            title="主管證照"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[10, 11, 1, 3]}
                            fieldName="certificationName"
                            formlabel="證照名稱"
                            inputComponent={<Input type={'text'} />}
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[10, 11, 3, 5]}
                            fieldName="certificationIssue"
                            formlabel="發證/回訓"
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'certificationIssue',
                                            'certificationStatus',
                                            2,
                                            'certificationWithdraw'
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[10, 11, 5, 7]}
                            fieldName="certificationWithdraw"
                            formlabel="應回訓日期"
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'certificationWithdraw',
                                            'certificationStatus',
                                            0
                                        );
                                    }}
                                />
                            }
                            helpText="*兩年減一天"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[11, 12, 1, 3]}
                            fieldName="certificationStatus"
                            formlabel={`主管證照\n效期狀況`}
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效2年"
                        ></FormGridInputItem>
                        <GridItem colSpan={4}></GridItem>
                        <FormGridInputItem
                            gridRange={[12, 13, 1, 5]}
                            title="意外險有效期"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[13, 14, 1, 3]}
                            fieldName="accidentInsuranceStart"
                            formlabel="起始日"
                            inputComponent={<Input type={'date'} />}
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[13, 14, 3, 5]}
                            fieldName="accidentInsuranceEnd"
                            formlabel="截止日"
                            inputComponent={<Input type={'date'} />}
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[13, 14, 5, 7]}
                            fieldName="accidentInsuranceAmount"
                            formlabel={`保險金額\n（萬元）`}
                            inputComponent={<Input type={'text'} />}
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[14, 15, 1, 3]}
                            fieldName="accidentInsuranceSignDate"
                            formlabel="加保日期"
                            inputComponent={<Input type={'date'} />}
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[14, 15, 3, 5]}
                            fieldName="accidentInsuranceCompanyName"
                            formlabel="保險公司"
                            inputComponent={<Input type={'text'} />}
                        ></FormGridInputItem>
                        <GridItem colSpan={2}></GridItem>
                        <FormGridInputItem
                            gridRange={[15, 16, 1, 3]}
                            fieldName="contractingCompanyName"
                            formlabel="承攬公司"
                            inputComponent={<Input type={'text'} />}
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[15, 16, 3, 5]}
                            fieldName="viceContractingCompanyName"
                            formlabel="次承攬公司"
                            inputComponent={<Input type={'text'} />}
                        ></FormGridInputItem>
                        <GridItem colSpan={2}></GridItem>
                        <FormGridInputItem
                            gridRange={[16, 17, 1, 3]}
                            title="高空工作車(A)"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[17, 18, 1, 3]}
                            fieldName="aCertificationDate"
                            formlabel="發證/回訓"
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'aCertificationDate',
                                            'aCertificationStatus',
                                            3
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[18, 19, 1, 3]}
                            fieldName="aCertificationStatus"
                            formlabel="期效狀況"
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效3年"
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[16, 17, 3, 5]}
                            title="高處（施工架）(WAH)"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[17, 18, 3, 5]}
                            fieldName="wahCertificationDate"
                            formlabel="發證/回訓"
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'wahCertificationDate',
                                            'wahCertificationStatus',
                                            3
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[18, 19, 3, 5]}
                            fieldName="wahCertificationStatus"
                            formlabel="期效狀況"
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效3年"
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[16, 17, 5, 7]}
                            title="吊掛作業(L)"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[17, 18, 5, 7]}
                            fieldName="lCertificationDate"
                            formlabel="發證/回訓"
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'lCertificationDate',
                                            'lCertificationStatus',
                                            3
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[18, 19, 5, 7]}
                            fieldName="lCertificationStatus"
                            formlabel="期效狀況"
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效3年"
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[19, 20, 1, 3]}
                            title="侷限空間(C)"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[20, 21, 1, 3]}
                            fieldName="cCertificationDate"
                            formlabel="發證/回訓"
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'cCertificationDate',
                                            'cCertificationStatus',
                                            3
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[21, 22, 1, 3]}
                            fieldName="cCertificationStatus"
                            formlabel="期效狀況"
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效3年"
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[19, 20, 3, 5]}
                            title="有機溶劑(H)"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[20, 21, 3, 5]}
                            fieldName="hCertificationDate"
                            formlabel="發證/回訓"
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'hCertificationDate',
                                            'hCertificationStatus',
                                            3
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[21, 22, 3, 5]}
                            fieldName="hCertificationStatus"
                            formlabel="期效狀況"
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效3年"
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[19, 20, 5, 7]}
                            title="防爆區(Ex)"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[20, 21, 5, 7]}
                            fieldName="exCertificationDate"
                            formlabel="發證/回訓"
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'exCertificationDate',
                                            'exCertificationStatus',
                                            3
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[21, 22, 5, 7]}
                            fieldName="exCertificationStatus"
                            formlabel="期效狀況"
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效3年"
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[22, 23, 1, 3]}
                            title="營造業主管(S)"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[23, 24, 1, 3]}
                            fieldName="sCertificationDate"
                            formlabel="發證/回訓"
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'sCertificationDate',
                                            'sCertificationStatus',
                                            3
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[24, 25, 1, 3]}
                            fieldName="sCertificationStatus"
                            formlabel="期效狀況"
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效3年"
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[22, 23, 3, 5]}
                            title="施工架作業主管(SA)"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[23, 24, 3, 5]}
                            fieldName="saCertificationDate"
                            formlabel="發證/回訓"
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'saCertificationDate',
                                            'saCertificationStatus',
                                            3
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[24, 25, 3, 5]}
                            fieldName="saCertificationStatus"
                            formlabel="期效狀況"
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效3年"
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[22, 23, 5, 7]}
                            title="有機溶劑作業主管(OS)"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[23, 24, 5, 7]}
                            fieldName="osCertificationDate"
                            formlabel="發證/回訓"
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'osCertificationDate',
                                            'osCertificationStatus',
                                            3
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[24, 25, 5, 7]}
                            fieldName="osCertificationStatus"
                            formlabel="期效狀況"
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效3年"
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[25, 26, 1, 3]}
                            title="缺氧作業主管(O2)"
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[26, 27, 1, 3]}
                            fieldName="o2CertificationDate"
                            formlabel="發證/回訓"
                            independent={false}
                            inputComponent={
                                <Input
                                    type={'date'}
                                    onChange={(e) => {
                                        checkStatus(
                                            e,
                                            'o2CertificationDate',
                                            'o2CertificationStatus',
                                            3
                                        );
                                    }}
                                />
                            }
                        ></FormGridInputItem>
                        <FormGridInputItem
                            gridRange={[27, 28, 1, 3]}
                            fieldName="o2CertificationStatus"
                            formlabel="期效狀況"
                            inputComponent={<Input type={'text'} disabled />}
                            helpText="*期效3年"
                        ></FormGridInputItem>

                        <FormGridInputItem
                            gridRange={[28, 29, 1, 5]}
                            title="照片佐證資料"
                        ></FormGridInputItem>

                        <GridFileItem
                            gridRange={[29, 30, 1, 4]}
                            fieldName="PImg"
                            formlabel="個人照"
                            inputComponent={
                                <FileInput
                                    fileStates={fileStates}
                                    setFileStates={setFileStates}
                                    fieldName={'PImg'}
                                ></FileInput>
                            }
                        ></GridFileItem>
                        <GridFileItem
                            gridRange={[29, 30, 4, 7]}
                            fieldName="LImg"
                            formlabel="勞保"
                            inputComponent={
                                <FileInput
                                    fileStates={fileStates}
                                    setFileStates={setFileStates}
                                    fieldName={'LImg'}
                                ></FileInput>
                            }
                        ></GridFileItem>

                        <GridFileItem
                            gridRange={[30, 31, 1, 4]}
                            fieldName="IDFImg"
                            formlabel="身分證影本(正面)"
                            inputComponent={
                                <FileInput
                                    fileStates={fileStates}
                                    setFileStates={setFileStates}
                                    height={'210px'}
                                    fieldName={'IDFImg'}
                                ></FileInput>
                            }
                        ></GridFileItem>
                        <GridFileItem
                            gridRange={[30, 31, 4, 7]}
                            fieldName="IDRImg"
                            formlabel="身分證影本(反面)"
                            inputComponent={
                                <FileInput
                                    fileStates={fileStates}
                                    setFileStates={setFileStates}
                                    height={'210px'}
                                    fieldName={'IDRImg'}
                                ></FileInput>
                            }
                        ></GridFileItem>

                        <GridFileItem
                            gridRange={[31, 32, 1, 4]}
                            fieldName="F6Img"
                            formlabel="一般安全衛生教育訓練證明(正面)"
                            inputComponent={
                                <FileInput
                                    fileStates={fileStates}
                                    setFileStates={setFileStates}
                                    fieldName={'F6Img'}
                                ></FileInput>
                            }
                        ></GridFileItem>
                        <GridFileItem
                            gridRange={[31, 32, 4, 7]}
                            fieldName="R6Img"
                            formlabel="一般安全衛生教育訓練證明(反面)"
                            inputComponent={
                                <FileInput
                                    fileStates={fileStates}
                                    setFileStates={setFileStates}
                                    fieldName={'R6Img'}
                                ></FileInput>
                            }
                        ></GridFileItem>

                        <GridFileItem
                            gridRange={[32, 33, 1, 4]}
                            fieldName="GImg"
                            formlabel="團保"
                            inputComponent={
                                <FileInput
                                    fileStates={fileStates}
                                    setFileStates={setFileStates}
                                    fieldName={'GImg'}
                                ></FileInput>
                            }
                        ></GridFileItem>

                        <GridItem colSpan={4} rowSpan={3}></GridItem>
                        {[...fileStates.HImgs, undefined]?.map(
                            (file, index) => {
                                return (
                                    <GridFileItem
                                        key={index}
                                        colSpan={3}
                                        height={'388px'}
                                        fieldName={'HImgs'}
                                        formlabel={'個人健康檢查資料'}
                                        inputComponent={
                                            <Box
                                                flexGrow={1}
                                                h={'374px'}
                                                bg={'#FFFFFF'}
                                                borderRadius={'0.375rem'}
                                                border={'2px solid #919AA9'}
                                            >
                                                <Center
                                                    w={'100%'}
                                                    h={'100%'}
                                                    pos={'relative'}
                                                >
                                                    {file ? (
                                                        <Image
                                                            h={'100%'}
                                                            w={'100%'}
                                                            objectFit={
                                                                'contain'
                                                            }
                                                            src={
                                                                fileStates
                                                                    .HImgs[
                                                                    index
                                                                ] as any
                                                            }
                                                            // onLoad={(e) => {
                                                            //     const image =
                                                            //         e.target as HTMLImageElement;
                                                            //     URL.revokeObjectURL(
                                                            //         image.src
                                                            //     );
                                                            // }}
                                                        />
                                                    ) : (
                                                        <Button
                                                            leftIcon={
                                                                <AddIcon
                                                                    width={'14'}
                                                                    height={
                                                                        '14'
                                                                    }
                                                                />
                                                            }
                                                            bg={'#4C7DE7'}
                                                            color={'#FFFFFF'}
                                                            borderRadius={'3px'}
                                                            size={'xs'}
                                                            fontSize={
                                                                '0.625rem'
                                                            }
                                                        >
                                                            上傳照片
                                                        </Button>
                                                    )}
                                                    <Input
                                                        pos={'absolute'}
                                                        h={'100%'}
                                                        w={'100%'}
                                                        opacity={0}
                                                        type={'file'}
                                                        accept={'image/*'}
                                                        onChange={(e) => {
                                                            if (
                                                                e.target
                                                                    .files &&
                                                                e.target
                                                                    .files[0]
                                                            ) {
                                                                setFileStates({
                                                                    ...fileStates,
                                                                    HImgs: file
                                                                        ? [
                                                                              ...fileStates.HImgs.slice(
                                                                                  0,
                                                                                  index
                                                                              ),
                                                                              e
                                                                                  .target
                                                                                  .files[0],
                                                                              ...fileStates.HImgs.slice(
                                                                                  index +
                                                                                      1
                                                                              ),
                                                                          ]
                                                                        : [
                                                                              ...fileStates.HImgs,
                                                                              e
                                                                                  .target
                                                                                  .files[0],
                                                                          ],
                                                                });
                                                                e.target.value =
                                                                    '';
                                                            }
                                                        }}
                                                    ></Input>
                                                    {file && (
                                                        <IconButton
                                                            size={'xs'}
                                                            aria-label="DeletePhoto"
                                                            icon={<CloseIcon />}
                                                            bg={'none'}
                                                            position={
                                                                'absolute'
                                                            }
                                                            top={0}
                                                            right={0}
                                                            onClick={() => {
                                                                if (
                                                                    fileStates.HImgs
                                                                ) {
                                                                    setFileStates(
                                                                        {
                                                                            ...fileStates,
                                                                            HImgs: [
                                                                                ...fileStates.HImgs.slice(
                                                                                    0,
                                                                                    index
                                                                                ),
                                                                                ...fileStates.HImgs.slice(
                                                                                    index +
                                                                                        1
                                                                                ),
                                                                            ],
                                                                        }
                                                                    );
                                                                }
                                                            }}
                                                        ></IconButton>
                                                    )}
                                                </Center>
                                            </Box>
                                        }
                                    ></GridFileItem>
                                );
                            }
                        )}
                    </Grid>
                </Form>
            </Flex>
        </Flex>
    );
}
