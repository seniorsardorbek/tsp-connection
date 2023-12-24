module.exports =  function sendMessage (chatId , message , token){
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    try {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}