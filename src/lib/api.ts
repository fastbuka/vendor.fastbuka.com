export const sendOTPtoMail = async (email: string) => {
    return fetch('/api/otp?action=send', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });
}

export const verifyOTP = async (fullOTP: string, email: string) => {
    return fetch('/api/otp?action=verify', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp: fullOTP }) 
    });
}