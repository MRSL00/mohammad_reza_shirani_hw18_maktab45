module.exports = {
  Url: "mongodb://localhost:27017/SessionLogin",
  Use: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  CheckConnection: (err) => {
    if (err) return console.log("[!] Database connection failed.");
    console.log("[+] Database connected succesfully.");
  },
};
