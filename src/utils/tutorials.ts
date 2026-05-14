const PORT: string = process.env.PORT ?? "3000";
const HOST: string = process.env.HOST ?? "localhost";

export default {
    pingServer: `http://${HOST}:${PORT}/ping`,
    pingUser: `http://${HOST}:${PORT}/user/ping`,
    pingFriend: `http://${HOST}:${PORT}/friend/ping`
}