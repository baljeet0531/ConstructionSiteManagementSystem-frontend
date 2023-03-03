import { DocumentNode } from 'graphql';
import { IOpCheck, SignatureName } from '../../Interface/OpCheck/Common';
import { SignatureStateItem } from '../../Interface/Signature';

export abstract class OpCheckHandler {
    signatures: Record<SignatureName, SignatureStateItem>;
    abstract uniqueKeys: Exclude<keyof IOpCheck, keyof IOpCheck>;
    abstract schema: IOpCheck;
    abstract query: DocumentNode;
    abstract mutation: DocumentNode;
    abstract getInitialValues(): IOpCheck;
    // eslint-disable-next-line no-unused-vars
    abstract parse(data: object): IOpCheck;
    abstract getBeforeWorkItem(): Map<string, string>;
    abstract getAfterWorkItem(): Map<string, string>;

    constructor(signatures: Record<SignatureName, SignatureStateItem>) {
        this.signatures = signatures;
    }
}
