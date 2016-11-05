cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-local-notifications-mm.LocalNotification",
        "file": "plugins/cordova-plugin-local-notifications-mm/www/local-notification.js",
        "pluginId": "cordova-plugin-local-notifications-mm",
        "clobbers": [
            "cordova.plugins.notification.local",
            "plugin.notification.local"
        ]
    },
    {
        "id": "cordova-plugin-local-notifications-mm.LocalNotification.Core",
        "file": "plugins/cordova-plugin-local-notifications-mm/www/local-notification-core.js",
        "pluginId": "cordova-plugin-local-notifications-mm",
        "clobbers": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "id": "cordova-plugin-local-notifications-mm.LocalNotification.Util",
        "file": "plugins/cordova-plugin-local-notifications-mm/www/local-notification-util.js",
        "pluginId": "cordova-plugin-local-notifications-mm",
        "merges": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-plugin-device": "1.1.3",
    "cordova-plugin-app-event": "1.2.0",
    "cordova-plugin-local-notifications-mm": "1.0.4"
};
// BOTTOM OF METADATA
});