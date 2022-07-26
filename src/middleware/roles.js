const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("user")
.resource("profile")
.readOwn()
.updateOwn()
.resource("post")
.createOwn()
.readAny()
.updateOwn()
 
ac.grant("admin")
.extend("user")
.resource("profile")
.readAny()
.createAny()
.updateAny("profile", ["*", "!password"]) //not working
.deleteAny()
.resource("post")
.deleteAny()
 
return ac;
})();