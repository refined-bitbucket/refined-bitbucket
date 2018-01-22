export const cleanDocumentBody = () => {
    while (document.body.hasChildNodes()) {
        document.body.removeChild(document.body.lastChild);
    }
};
