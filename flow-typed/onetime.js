declare module 'onetime' {
    declare export default function onetime<F: (...Array<any>) => mixed>(
        fn: F
    ): F
}
