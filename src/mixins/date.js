export default {
    methods: {
        formatDate(date) {
            let dateObj = new Date(date);
            let month = dateObj.getUTCMonth() + 1;
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();
            return `${day}/${month}/${year}`;
        },
    },
};
