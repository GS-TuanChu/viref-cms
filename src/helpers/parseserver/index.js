import Parse from 'parse';

class ParseServer {
    constructor() {
        Parse.initialize(
            process.env.VUE_APP_PARSE_APPID,
            process.env.VUE_APP_PARSE_JSKEY
        );
        Parse.serverURL = process.env.VUE_APP_PARSE_SERVERURL;
    }

    async logIn(params) {
        const user = await Parse.User.logIn(params.email, params.password);
        return user;
    }

    logout() {
        const result = Parse.User.logOut();
        return result;
    }

    async getUserList() {
        const userData = await Parse.Cloud.run('user:list');
        return userData;
    }

    async getUserDetail(id) {
        const params = { uid: id };
        const userData = await Parse.Cloud.run('user:getUserDetail', params);
        return userData;
    }

    async getCampaignList() {
        const { campaigns } = await Parse.Cloud.run('campaign:list');
        return campaigns;
    }
}

let _parseServer = null;

const initParseServer = () => {
    if (!_parseServer) _parseServer = new ParseServer();
    return _parseServer;
};

const getParseServer = () => _parseServer;

export default {
    install: (Vue) => {
        window.$parse = new ParseServer();
        Vue.prototype.$parse = window.$parse;
    },
};

export { initParseServer, getParseServer };
