const User = require("../models/userModel")

// Function to generate the next user ID
async function generateNextUserId(appName) {
    try {
        const lastUser = await User.findOne({}, {}, { sort: { userId: -1 } });

        let nextNumber = 1;

        if (lastUser) {
            const lastUserId = lastUser.userId;
            const lastNumber = parseInt(lastUserId.replace(appName, ''), 10);
            if (!isNaN(lastNumber)) {
                nextNumber = lastNumber + 1;
            }
        }

        const nextUserId = `${appName}${nextNumber}`;

        return nextUserId;
    } catch (error) {
        throw error;
    }
}

// Usage example
// generateNextUserId('abc')
//     .then((nextUserId) => {
//         console.log(`Next User ID: ${nextUserId}`);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

module.exports = generateNextUserId;