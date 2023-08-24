import { Box, Checkbox, Flex, Input, Text } from '@chakra-ui/react';
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
    AutoCompleteCreatable,
    AutoCompleteTag,
    ItemTag,
} from '@choc-ui/chakra-autocomplete';
import { FormikProps } from 'formik';
import { placeholderStyle } from './Styles';
import { systemConst } from '../../Constants/System';
import {
    SetStateAction,
    Dispatch,
    useState,
    useEffect,
    useRef,
    MutableRefObject,
} from 'react';
import {
    IWorkPermit,
    IWorkPermitData,
    IWorkPermitOptions,
} from '../../Interface/WorkPermit';
import SharedFactory from '../Shared/Factory';

export default class FormFactory extends SharedFactory {
    formProps: FormikProps<IWorkPermit>;
    data: IWorkPermitData;
    setData: Dispatch<SetStateAction<IWorkPermitData>>;
    options: IWorkPermitOptions;
    setOptions: Dispatch<SetStateAction<IWorkPermitOptions>>;
    opCheckOtherState: [boolean, Dispatch<SetStateAction<boolean>>];
    opCheckCols: (keyof IWorkPermit)[] = [
        'opFire',
        'opAloft',
        'opElectric',
        'opCage',
        'opLift',
        'opAssemble',
        'opDetach',
        'opHole',
        'opChemical',
    ];

    constructor(
        formProps: FormikProps<IWorkPermit>,
        data: IWorkPermitData,
        setData: Dispatch<SetStateAction<IWorkPermitData>>,
        options: IWorkPermitOptions,
        setOptions: Dispatch<SetStateAction<IWorkPermitOptions>>
    ) {
        super();
        this.formProps = formProps;
        this.data = data;
        this.setData = setData;
        this.options = options;
        this.setOptions = setOptions;
        this.opCheckOtherState = useState<boolean>(false);
    }

    opCheckBox(name: keyof IWorkPermit, text: string) {
        return (
            <Checkbox
                w="100%"
                h="100%"
                spacing="2rem"
                isChecked={this.formProps.values[name] as boolean}
                onChange={this.formProps.handleChange}
            >
                {text}
            </Checkbox>
        );
    }

    textInput() {
        return (
            <Input
                type="text"
                border="0px"
                placeholder="填寫"
                _placeholder={placeholderStyle}
            />
        );
    }

    selectAreaInput() {
        useEffect(() => {
            this.setOptions({
                ...this.options,
                zones: this.getZones(this.formProps.values.area as string),
            });
        }, [this.formProps.values.area]);
        const areas = this.data.siteAreas
            ?.map((v) => v.name)
            .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i);
        return (
            <AutoComplete
                openOnFocus
                creatable
                listAllValuesOnFocus
                onChange={(value: string) => {
                    const before = this.formProps.values.area;
                    if (before !== '' && before !== value) {
                        this.formProps.setFieldValue('zone', []);
                    }
                    this.formProps.setFieldValue('area', value);
                }}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                    value={this.formProps.values.area}
                    onChange={(e) =>
                        this.formProps.setFieldValue('area', e.target.value)
                    }
                />
                <AutoCompleteList>
                    {areas.map((area: string, cid: number) => (
                        <AutoCompleteItem
                            key={`option-${cid}`}
                            value={area}
                            textTransform="capitalize"
                        >
                            {area}
                        </AutoCompleteItem>
                    ))}
                    <AutoCompleteCreatable>
                        {({ value }) => <Text>新增 "{value}"</Text>}
                    </AutoCompleteCreatable>
                </AutoCompleteList>
            </AutoComplete>
        );
    }

    getZones(area: string) {
        return this.data.siteAreas
            .filter((v) => v.name == area)
            .map((v) => v.zone)
            .filter((v) => v !== ' ');
    }

    selectZoneInput() {
        const [tags, setTags] = useState<ItemTag[]>([]);
        const [value, setValue] = useState('');
        const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
        return (
            <AutoComplete
                multiple
                openOnFocus
                creatable
                listAllValuesOnFocus
                value={this.formProps.values.zone}
                onChange={(value: string[]) => {
                    this.formProps.setFieldValue('zone', value);
                    setValue('');
                }}
                onReady={({ tags }) => {
                    setTags(tags);
                }}
            >
                <Flex
                    h="45px"
                    mt={4}
                    flexWrap="wrap"
                    overflowY="auto"
                    onClick={() => inputRef.current.focus()}
                >
                    {tags.map((tag, tid) => (
                        <AutoCompleteTag
                            size="md"
                            m={1}
                            color="#667080"
                            key={tid}
                            label={tag.label}
                            onRemove={tag.onRemove}
                        />
                    ))}
                </Flex>
                <AutoCompleteInput
                    p={0}
                    value={value}
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    ref={inputRef}
                />
                <AutoCompleteList>
                    {this.options.zones.map((zone: string, cid: number) => (
                        <AutoCompleteItem key={`option-${cid}`} value={zone}>
                            {zone}
                        </AutoCompleteItem>
                    ))}
                    <AutoCompleteCreatable>
                        {({ value }) => <Text>新增 "{value}"</Text>}
                    </AutoCompleteCreatable>
                </AutoCompleteList>
            </AutoComplete>
        );
    }

    selectSystemInput() {
        return (
            <AutoComplete
                openOnFocus
                listAllValuesOnFocus
                onChange={(value: string) => {
                    const before = this.formProps.values.system;
                    if (before !== '' && before !== value) {
                        this.formProps.setFieldValue('systemBranch', '');
                        this.formProps.setFieldValue('project', '');
                        this.clearOpCheck();
                    }
                    this.formProps.setFieldValue('system', value);
                }}
                value={this.formProps.values.system}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                    value={this.formProps.values.system}
                    onChange={(e) =>
                        this.formProps.setFieldValue('system', e.target.value)
                    }
                />
                <AutoCompleteList>
                    {Object.keys(systemConst).map(
                        (system: string, cid: number) => (
                            <AutoCompleteItem
                                key={`option-${cid}`}
                                value={system}
                                textTransform="capitalize"
                            >
                                {system}
                            </AutoCompleteItem>
                        )
                    )}
                </AutoCompleteList>
            </AutoComplete>
        );
    }

    getSystemBranches() {
        const system = this.formProps.values.system;
        return system && system in systemConst
            ? Object.keys(systemConst[system])
            : [];
    }

    selectSystemBranchInput() {
        const systemBranches = this.getSystemBranches();
        return (
            <AutoComplete
                openOnFocus
                creatable
                listAllValuesOnFocus
                onChange={(value: string) => {
                    const before = this.formProps.values.systemBranch;
                    if (before !== '' && before !== value) {
                        this.formProps.setFieldValue('project', '');
                        this.clearOpCheck();
                    }
                    this.formProps.setFieldValue('systemBranch', value);
                    this.updateOpCheck(
                        this.formProps.values.system,
                        value,
                        this.formProps.values.project
                    );
                }}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                    value={this.formProps.values.systemBranch}
                    onChange={(e) =>
                        this.formProps.setFieldValue(
                            'systemBranch',
                            e.target.value
                        )
                    }
                />
                <AutoCompleteList>
                    {systemBranches.map((system: string, cid: number) => (
                        <AutoCompleteItem key={`option-${cid}`} value={system}>
                            {system}
                        </AutoCompleteItem>
                    ))}
                    <AutoCompleteCreatable>
                        {({ value }) => <Text>新增 "{value}"</Text>}
                    </AutoCompleteCreatable>
                </AutoCompleteList>
            </AutoComplete>
        );
    }

    getProjects() {
        const [system, branch] = [
            this.formProps.values.system,
            this.formProps.values.systemBranch,
        ];
        const exists =
            system &&
            branch &&
            systemConst[system] &&
            systemConst[system][branch];

        return exists ? Object.keys(systemConst[system][branch].projects) : [];
    }

    selectProjectInput() {
        const projects = this.getProjects();
        return (
            <AutoComplete
                openOnFocus
                creatable
                listAllValuesOnFocus
                value={this.formProps.values.project}
                onChange={(value: string) => {
                    this.formProps.setFieldValue('project', value);
                    this.updateOpCheck(
                        this.formProps.values.system,
                        this.formProps.values.systemBranch,
                        value
                    );
                }}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                    value={this.formProps.values.project}
                    onChange={(e) =>
                        this.formProps.setFieldValue('project', e.target.value)
                    }
                ></AutoCompleteInput>
                <AutoCompleteList>
                    {projects.map((project: string, cid: number) => (
                        <AutoCompleteItem key={`option-${cid}`} value={project}>
                            {project}
                        </AutoCompleteItem>
                    ))}
                    <AutoCompleteCreatable>
                        {({ value }) => <Text>新增 "{value}"</Text>}
                    </AutoCompleteCreatable>
                </AutoCompleteList>
            </AutoComplete>
        );
    }

    clearOpCheck() {
        const [, setIsChecked] = this.opCheckOtherState;
        this.opCheckCols.map((col) => {
            this.formProps.setFieldValue(col, false);
        });
        this.formProps.setFieldValue('opElse', '');
        setIsChecked(false);
    }

    updateOpCheck(
        system: string | undefined,
        branch: string | undefined,
        project: string | undefined
    ) {
        const [, setIsChecked] = this.opCheckOtherState;
        this.clearOpCheck();

        const exists =
            system &&
            branch &&
            systemConst[system] &&
            systemConst[system][branch];

        if (exists) {
            const trigger = systemConst[system][branch].trigger;
            trigger.map((col) => {
                col === 'opElse'
                    ? setIsChecked(true)
                    : this.formProps.setFieldValue(col, true);
            });
        }

        if (
            exists &&
            project &&
            systemConst[system][branch].projects[project]
        ) {
            const trigger = systemConst[system][branch].projects[project];
            trigger.map((col) => {
                col === 'opElse'
                    ? setIsChecked(true)
                    : this.formProps.setFieldValue(col, true);
            });
        }
    }

    opCheckOtherBox() {
        const [isChecked, setIsChecked] = this.opCheckOtherState;
        return (
            <>
                <Checkbox
                    isChecked={isChecked}
                    onChange={() => {
                        setIsChecked(!isChecked);
                    }}
                />
                <Input
                    type="text"
                    border="0px"
                    ml="18px"
                    placeholder="填寫"
                    _placeholder={placeholderStyle}
                    isDisabled={!isChecked}
                    value={this.formProps.values.opElse}
                    onChange={(e) => {
                        const target = e.target.value;
                        this.formProps.setFieldValue('opElse', target);
                    }}
                />
            </>
        );
    }
    selectContractingCorpInput() {
        return (
            <AutoComplete
                openOnFocus
                listAllValuesOnFocus
                onChange={(value: string) => {
                    this.formProps.setFieldValue('supervisorCorp', value);
                }}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    textAlign="left"
                    value={this.formProps.values['supervisorCorp'] as string}
                    onChange={(e) => {
                        const target = e.target.value;
                        this.formProps.setFieldValue('supervisorCorp', target);
                    }}
                    _placeholder={placeholderStyle}
                />
                <AutoCompleteList>
                    {this.data.contractingCorpName?.map(
                        (corp: string, cid: number) => (
                            <AutoCompleteItem
                                key={`option-${cid}`}
                                value={corp}
                                textTransform="capitalize"
                            >
                                {corp}
                            </AutoCompleteItem>
                        )
                    )}
                </AutoCompleteList>
            </AutoComplete>
        );
    }
    selectSupervisorInput() {
        return (
            <AutoComplete
                openOnFocus
                listAllValuesOnFocus
                onChange={(value: string) => {
                    const target = JSON.parse(value) as {
                        name: string;
                        tel: string;
                    };
                    target.name &&
                        this.formProps.setFieldValue('supervisor', target.name);
                    target.tel &&
                        this.formProps.setFieldValue('tel', target.tel);
                }}
            >
                <AutoCompleteInput
                    border="0px"
                    placeholder="填寫"
                    textAlign="left"
                    value={this.formProps.values['supervisor'] as string}
                    onChange={(e) => {
                        const target = e.target.value;
                        this.formProps.setFieldValue('supervisor', target);
                    }}
                    _placeholder={placeholderStyle}
                />
                <AutoCompleteList>
                    {this.data.nameAndTel?.map(
                        (item: { name: string; tel: string }, cid: number) => (
                            <AutoCompleteItem
                                key={`option-${cid}`}
                                value={JSON.stringify(item)}
                                textTransform="capitalize"
                            >
                                <Box>
                                    <Text>{item.name}</Text>
                                    <Text fontSize="xs" color="gray.400">
                                        {item.tel || '沒有電話號碼'}
                                    </Text>
                                </Box>
                            </AutoCompleteItem>
                        )
                    )}
                </AutoCompleteList>
            </AutoComplete>
        );
    }
}
