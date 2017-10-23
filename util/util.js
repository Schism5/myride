module.exports = {
    createSuccessStatus: (data) => {
        return { success: true, data };
    },

    createFailureStatus: (message) => {
        return { success: false, message };
    }
};