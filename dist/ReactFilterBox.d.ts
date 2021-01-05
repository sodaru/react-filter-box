import * as React from 'react';
import FilterInput from "./FilterInput";
import SimpleResultProcessing from "./SimpleResultProcessing";
import GridDataAutoCompleteHandler, { Option } from "./GridDataAutoCompleteHandler";
import Expression from "./Expression";
import FilterQueryParser from "./FilterQueryParser";
import BaseResultProcessing from "./BaseResultProcessing";
import BaseAutoCompleteHandler from "./BaseAutoCompleteHandler";
import ParsedError from "./ParsedError";
import validateQuery from './validateQuery';
export default class ReactFilterBox extends React.Component<any, any> {
    static defaultProps: any;
    parser: FilterQueryParser;
    constructor(props: any);
    needAutoCompleteValues(codeMirror: any, text: string): import("./models/ExtendedCodeMirror").HintInfo[];
    onSubmit(query: string): any;
    onChange(query: string): void;
    onBlur(): void;
    onFocus(): void;
    render(): JSX.Element;
}
export { SimpleResultProcessing, BaseResultProcessing, GridDataAutoCompleteHandler, BaseAutoCompleteHandler, Option as AutoCompleteOption, Expression, FilterInput, FilterQueryParser, ParsedError, validateQuery };
