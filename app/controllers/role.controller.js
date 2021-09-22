const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("user_role")
 .readOwn("profile")
 .updateOwn("profile")

ac.grant("admin_role")
 .extend("user_role")
 .readAny("profile")
 .updateAny("profile")
 .deleteAny("profile")

return ac;
})();
