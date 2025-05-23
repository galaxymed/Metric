exports.handler = async (event) => {
    const streamUrl = "https://usa14.fastcast4u.com/proxy/invasiva?mp=/1"; // Cambia esto cuando necesites actualizar el servidor
    return {
        statusCode: 302,
        headers: {
            "Location": streamUrl
        }
    };
};
