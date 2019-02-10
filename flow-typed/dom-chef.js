declare module 'dom-chef' {
    declare export function h(type: 'a'): HTMLAnchorElement
    declare export function h(type: 'br'): HTMLBRElement
    declare export function h(type: 'button'): HTMLButtonElement
    declare export function h(type: 'div'): HTMLDivElement
    declare export function h(type: 'input'): HTMLInputElement
    declare export function h(type: 'label'): HTMLLabelElement
    declare export function h(type: 'li'): HTMLLIElement
    declare export function h(type: 'path'): any // SVGPathElement
    declare export function h(type: 'script'): HTMLScriptElement
    declare export function h(type: 'span'): HTMLSpanElement
    declare export function h(type: 'svg'): any // SVGElement
    declare export function h(type: 'dd'): HTMLElement
}
