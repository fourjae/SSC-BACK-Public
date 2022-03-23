const app = require("./app");

app.listen(app.get("port"), () => {
    console.log("서버 구동 ");
});
