// flow-typed signature: ba5a4e1511564064d1aa8a959c43c6b9
// flow-typed version: 41e1aa3217/ignore_v4.x.x/flow_>=v0.25.0

declare module 'ignore' {
    declare interface Ignore {
        add(pattern: string | Ignore): Ignore;
        add(patterns: $ReadOnlyArray<string | Ignore>): Ignore;

        filter(paths: Array<string> | string): Array<string>;

        createFilter(): (path: ?string) => boolean;

        ignores(path: ?string): boolean;
    }

    declare type Options = {|
        ignorecase?: boolean,
    |}

    declare module.exports: (options?: Options) => Ignore
}
