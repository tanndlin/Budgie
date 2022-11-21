export const verifyEmail = (email) => {
    return email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
};

export const verifyPassword = (password) => {
    return password.length >= 6;
};
