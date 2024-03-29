import {
    Checkbox,
    Flex,
    GridItem,
    Input,
    InputProps,
    Text,
    Textarea,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import {
    EHSFormName,
    IEHSForm,
    IEHSFormData,
    IEHSFormFillItem,
    IEHSFormTargetInItem,
    IEHSCheckTarget,
} from '../../Interface/EHSForm/Common';
import { FormikProps } from 'formik';
import {
    baseStyle,
    disabledStyle,
    placeholderStyle,
    tableStyle,
} from './Styles';
import { ChevronDownIcon } from '../../Icons/Icons';
import { EHSFormHandler } from '../../Utils/EHSForm/Handler';
import { Fragment, ChangeEvent, Dispatch, SetStateAction } from 'react';
import GridInputItem from '../Shared/GridInputItem';
import { IEHSFormNormal } from '../../Interface/EHSForm/Normal';
import { IEHSFormSpecial } from '../../Interface/EHSForm/Special';

export default class FormFactory {
    formProps: FormikProps<IEHSForm>;
    type: EHSFormName;
    handler: EHSFormHandler<IEHSFormNormal | IEHSFormSpecial>;
    data: IEHSFormData;
    setData: Dispatch<SetStateAction<IEHSFormData>>;

    constructor(
        formProps: FormikProps<IEHSForm>,
        type: EHSFormName,
        handler: EHSFormHandler<IEHSFormNormal | IEHSFormSpecial>,
        data: IEHSFormData,
        setData: Dispatch<SetStateAction<IEHSFormData>>
    ) {
        this.formProps = formProps;
        this.type = type;
        this.handler = handler;
        this.data = data;
        this.setData = setData;
    }
    input(props: InputProps) {
        return (
            <Input
                size="sm"
                placeholder="請填寫"
                _placeholder={placeholderStyle}
                isDisabled={false}
                _disabled={disabledStyle}
                {...props}
            />
        );
    }
    textArea() {
        return (
            <Textarea
                h="100%"
                border="0px"
                placeholder="填寫"
                _placeholder={placeholderStyle}
                resize="none"
            />
        );
    }
    getAllItems() {
        let acc = 0;
        const items = [];
        for (let key in this.handler.itemGroups) {
            const group = this.handler.itemGroups[key];
            const subtitle = group.name.split(' ');
            const section = (
                <Fragment key={key}>
                    <GridItem
                        rowStart={acc + 3}
                        rowEnd={group.items.length + acc + 3}
                        {...baseStyle}
                        borderTop="0px"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        letterSpacing="0.5em"
                        textAlign="center"
                        pl={'10px'}
                    >
                        <Text w="60px">{subtitle[0]}</Text>
                        <Text w="40px">{subtitle[1]}</Text>
                    </GridItem>
                    {group.items.map((item, index) =>
                        this.row(group.name, item, index)
                    )}
                </Fragment>
            );

            acc += group.items.length;
            items.push(section);
        }
        return items;
    }
    row(name: string, item: IEHSFormFillItem, index: number) {
        return (
            <Fragment key={`${name}-${index}`}>
                <GridItem {...tableStyle} justifyContent="center">
                    {item.code}
                </GridItem>
                <GridItem {...tableStyle} pl={2}>
                    <Text>{item.content}</Text>
                </GridItem>
                <GridInputItem
                    fieldName={item.normal}
                    inputComponent={this.normalCheckbox(item, true)}
                    style={{ ...tableStyle, justifyContent: 'center' }}
                    fast
                />
                <GridInputItem
                    fieldName={item.normal}
                    inputComponent={this.normalCheckbox(item, false)}
                    style={{ ...tableStyle, justifyContent: 'center' }}
                    fast
                />
                <GridInputItem
                    fieldName={item.misfit}
                    inputComponent={this.misfitCheckbox(item)}
                    style={{ ...tableStyle, justifyContent: 'center' }}
                    fast
                />
                <GridInputItem
                    fieldName={item.ameliorate}
                    inputComponent={this.corpNameSelect(
                        item.ameliorate as keyof IEHSForm
                    )}
                    inputRightComponent={<ChevronDownIcon />}
                    style={tableStyle}
                />
            </Fragment>
        );
    }
    normalCheckbox(item: IEHSFormFillItem, target: boolean) {
        const values = this.formProps.values as IEHSFormNormal &
            IEHSFormSpecial;
        const value =
            values[item.normal as keyof IEHSFormNormal | keyof IEHSFormSpecial];
        return (
            <Checkbox
                isChecked={value === target}
                onChange={(e) => {
                    const checked = e.target.checked;
                    this.formProps.setFieldValue(item.misfit, null);
                    checked === true
                        ? this.formProps.setFieldValue(item.normal, target)
                        : this.formProps.setFieldValue(item.normal, null);
                    this.clearAmeliorate(item);
                }}
            />
        );
    }
    clearAmeliorate(item: IEHSFormFillItem) {
        this.formProps.setFieldValue(item.ameliorate, []);
        this.setData((prev) => {
            const newSelected = {} as { [k: string]: Set<string> };
            Object.keys(prev.selectedCorp).map((k) => {
                newSelected[k] = prev.selectedCorp[k];
                newSelected[k].delete(item.code);
            });
            return {
                ...prev,
                selectedCorp: newSelected,
            };
        });
    }
    misfitCheckbox(item: IEHSFormFillItem) {
        const values = this.formProps.values as IEHSFormNormal &
            IEHSFormSpecial;
        const value =
            values[item.misfit as keyof IEHSFormNormal | keyof IEHSFormSpecial];
        return (
            <Checkbox
                isChecked={!!value}
                onChange={(e) => {
                    const checked = e.target.checked;
                    this.formProps.setFieldValue(item.misfit, checked);
                    if (checked === true) {
                        this.formProps.setFieldValue(item.normal, null);
                        this.clearAmeliorate(item);
                    }
                }}
            />
        );
    }
    handleCheckTargetOnChange(e: ChangeEvent<HTMLInputElement>, name: string) {
        const checked = e.target.checked;
        if (checked) {
            this.formProps.setFieldValue('checkTarget', [
                ...this.formProps.values.checkTarget,
                {
                    corpName: name,
                    siteId: this.formProps.values.siteId,
                    day: this.formProps.values.day,
                },
            ]);
        } else {
            this.formProps.setFieldValue(
                'checkTarget',
                this.formProps.values.checkTarget.filter(
                    (target) => target.corpName !== name
                )
            );
            for (let key in this.handler.itemGroups) {
                this.handler.itemGroups[key].items.forEach((item) => {
                    this.formProps.setFieldValue(
                        item.ameliorate,
                        (
                            this.formProps.values[
                                item.ameliorate as keyof IEHSForm
                            ] as IEHSFormTargetInItem[]
                        ).filter((target) => target.corpName !== name)
                    );
                });
            }
            this.setData((prev) => {
                return {
                    ...prev,
                    selectedCorp: {
                        ...prev.selectedCorp,
                        [name]: new Set<string>(),
                    },
                };
            });
        }
    }
    handleAmeliorateOnChange(
        e: ChangeEvent<HTMLInputElement>,
        name: string,
        field: keyof IEHSForm
    ) {
        const checked = e.target.checked;
        const target = this.formProps.values[field] as IEHSFormTargetInItem[];
        const code = field.replace('Ameliorate', '');

        this.setData((prev) => {
            let selectedSet = prev.selectedCorp[name] || new Set<string>();
            if (checked) {
                const selected = {
                    corpName: name,
                    siteId: this.formProps.values.siteId,
                    day: this.formProps.values.day,
                    code: code,
                };
                this.formProps.setFieldValue(field, [
                    ...(target ?? []),
                    selected,
                ]);
                selectedSet.add(code);
            } else {
                this.formProps.setFieldValue(
                    field,
                    target.filter((target) => target.corpName !== name)
                );
                selectedSet.delete(code);
            }
            return {
                ...prev,
                selectedCorp: {
                    ...prev.selectedCorp,
                    [name]: selectedSet,
                },
            };
        });
    }
    corpNameSelect(field: keyof IEHSForm) {
        const { onToggle } = useDisclosure();
        const target = this.formProps.values[field] as
            | IEHSFormTargetInItem[]
            | IEHSCheckTarget[];
        const code = field.replace('Ameliorate', '');
        const disabled =
            field === 'checkTarget'
                ? false
                : this.handler.isAmeliorateDisabled(
                      this.formProps.values as IEHSFormNormal | IEHSFormSpecial,
                      code
                  );
        const corps =
            field === 'checkTarget'
                ? this.data.searchName
                : this.getFilledCorp();
        const options = corps.map((name, index) => (
            <Checkbox
                key={`${field}-corpName-${index}`}
                size={'sm'}
                isChecked={target?.some((i) => i.corpName === name)}
                onChange={(e) =>
                    field === 'checkTarget'
                        ? this.handleCheckTargetOnChange(e, name)
                        : this.handleAmeliorateOnChange(e, name, field)
                }
            >
                {name}
            </Checkbox>
        ));
        return (
            <Popover placement={'bottom-start'}>
                <PopoverTrigger>
                    <Button
                        size={'sm'}
                        w={'100%'}
                        variant={'outline'}
                        isDisabled={disabled}
                        onClick={() => {
                            onToggle();
                        }}
                    >
                        已選擇 {target ? target.length : '?'} 個
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody
                        display={'flex'}
                        padding={'24px'}
                        flexDirection={'column'}
                        justifyContent={'space-between'}
                    >
                        <Flex
                            direction={'column'}
                            gap={'12px'}
                            overflowX={'hidden'}
                        >
                            <Text as="b">巡檢對象</Text>
                            <Flex
                                direction={'column'}
                                gap={'12px'}
                                overflowY={'auto'}
                                wordBreak={'break-word'}
                            >
                                {options}
                            </Flex>
                        </Flex>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        );
    }
    getFilledCorp() {
        const target: string[] = [];
        this.formProps.values.checkTarget?.map((i) => {
            target.push(i.corpName);
        });
        return target;
    }
}
