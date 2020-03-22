declare const BEM_CLASSNAMES_CONTAINER_SELECTOR = ".n-hopin-styleguide-js-bem-classnames";
declare const INVALID_CLASSNAMES_CONTAINER_SELECTOR = ".n-hopin-styleguide-js-invalid-classnames";
declare const IDS_CONTAINER_SELECTOR = ".n-hopin-styleguide-js-ids";
declare const ELEMENTS_CONTAINER_SELECTOR = ".n-hopin-styleguide-js-elements";
declare class ClassName {
    getCSSReports(): CSSStyleheetReport[];
    getCSSRulesForStylesheet(report: CSSStyleheetReport, stylesheet: CSSStyleSheet): void;
    parseCSSMediaRule(report: CSSStyleheetReport, mediaRule: CSSMediaRule): void;
    parseCSSStyleRule(report: CSSStyleheetReport, rule: CSSStyleRule): void;
    parseSelector(report: CSSStyleheetReport, selector: string): void;
    parseBEMSelector(selector: string): (null | BEMSelector);
    render(): void;
    renderList(classes: string[], container: Element): void;
    renderBEMList(selectors: BEMSelector[], container: Element): void;
    renderRowGroup(selectors: BEMSelector[], namefn: (s: BEMSelector) => {
        name: string;
        id: string;
    }): Element;
    renderBEMGroup(group: BEMGroup): Element;
    groupNames(selectors: BEMSelector[], namefn: (s: BEMSelector) => {
        name: string;
        id: string;
    }): {
        name: string;
        id: string;
        count: number;
        selectors: BEMSelector[];
    }[];
    orderedItems(reports: CSSStyleheetReport[], fn: (r: CSSStyleheetReport) => string[]): string[];
    orderedBEMSelectors(reports: CSSStyleheetReport[]): BEMSelector[];
    splitSelectors(selector: string): string[];
}
interface BEMSelector {
    namespace: string | null;
    type: string;
    body: string;
    element: string;
    modifier: string;
}
interface CSSStyleheetReport {
    StylesheetHref: string;
    BEMClassSelectors: BEMSelector[];
    NonBEMClassSelectors: string[];
    IDSelectors: string[];
    UnknownSelectors: string[];
}
interface BEMGroup {
    name: string;
    count: number;
    subgroups: BEMGroup[];
}
