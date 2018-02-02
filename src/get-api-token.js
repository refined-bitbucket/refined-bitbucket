const getApiToken = () => {
    const apiTokenContent = document.querySelector('meta[name="apitoken"]')
        .content;
    const parsedApiTokenContent = JSON.parse(apiTokenContent);
    return parsedApiTokenContent.token;
};

export default getApiToken;
