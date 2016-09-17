"use strict";
var Response;
(function (Response) {
    /**
     *
     */
    var ChannelParser = (function () {
        function ChannelParser() {
        }
        /**
         *
         */
        ChannelParser.prototype.parse = function (data) {
            var result = new Array();
            var components = data.toString().split(/\s|,/);
            while (components.length > 0) {
                result.push({ channel: components.shift(), format: components.shift(), status: components.shift() });
            }
            if (result.length > 0) {
                return result;
            }
            return null;
        };
        return ChannelParser;
    }());
    Response.ChannelParser = ChannelParser;
    /**
     *
     */
    var ConfigParser = (function () {
        function ConfigParser() {
        }
        /**
         *
         */
        ConfigParser.prototype.parse = function (data) {
            return data;
        };
        return ConfigParser;
    }());
    Response.ConfigParser = ConfigParser;
    /**
     *
     */
    var DataParser = (function () {
        function DataParser() {
        }
        /**
         *
         */
        DataParser.prototype.parse = function (data) {
            return data;
        };
        return DataParser;
    }());
    Response.DataParser = DataParser;
    /**
     *
     */
    var DataListParser = (function () {
        function DataListParser() {
        }
        /**
         *
         */
        DataListParser.prototype.parse = function (data) {
            return data;
        };
        return DataListParser;
    }());
    Response.DataListParser = DataListParser;
    /**
     *
     */
    var InfoTemplateParser = (function () {
        function InfoTemplateParser() {
        }
        /**
         *
         */
        InfoTemplateParser.prototype.parse = function (data) {
            return data;
        };
        return InfoTemplateParser;
    }());
    Response.InfoTemplateParser = InfoTemplateParser;
    /**
     *
     */
    var HelpParser = (function () {
        function HelpParser() {
        }
        /**
         *
         */
        HelpParser.prototype.parse = function (data) {
            return data;
        };
        return HelpParser;
    }());
    Response.HelpParser = HelpParser;
    /**
     *
     */
    var GLParser = (function () {
        function GLParser() {
        }
        /**
         *
         */
        GLParser.prototype.parse = function (data) {
            return data;
        };
        return GLParser;
    }());
    Response.GLParser = GLParser;
    /**
     *
     */
    var InfoDelayParser = (function () {
        function InfoDelayParser() {
        }
        /**
         *
         */
        InfoDelayParser.prototype.parse = function (data) {
            return data;
        };
        return InfoDelayParser;
    }());
    Response.InfoDelayParser = InfoDelayParser;
    /**
     *
     */
    var InfoParser = (function () {
        function InfoParser() {
        }
        /**
         *
         */
        InfoParser.prototype.parse = function (data) {
            return data;
        };
        return InfoParser;
    }());
    Response.InfoParser = InfoParser;
    /**
     *
     */
    var InfoThreadsParser = (function () {
        function InfoThreadsParser() {
        }
        /**
         *
         */
        InfoThreadsParser.prototype.parse = function (data) {
            return data;
        };
        return InfoThreadsParser;
    }());
    Response.InfoThreadsParser = InfoThreadsParser;
    /**
     *
     */
    var ThumbnailParser = (function () {
        function ThumbnailParser() {
        }
        /**
         *
         */
        ThumbnailParser.prototype.parse = function (data) {
            return "data:image/png;base64,\"+partialBase64" + data;
        };
        return ThumbnailParser;
    }());
    Response.ThumbnailParser = ThumbnailParser;
    /**
     *
     */
    var VersionParser = (function () {
        function VersionParser() {
        }
        /**
         *
         */
        VersionParser.prototype.parse = function (data) {
            return data;
        };
        return VersionParser;
    }());
    Response.VersionParser = VersionParser;
    /**
     *
     */
    var PathParser = (function () {
        function PathParser() {
        }
        /**
         *
         */
        PathParser.prototype.parse = function (data) {
            var arrayCast = [].concat(data);
            return arrayCast.map(function (i) {
                var components = i.split(" ");
                // is font
                if (components.length === 2) {
                    return { name: components[1].replace(/\"/g, ""), type: "font" };
                }
                // is template
                if (components.length === 4) {
                    return { name: components[0].replace(/\"/g, ""), type: "template" };
                }
                // is media
                return { name: components[0].replace(/\"/g, ""), type: components[1].toLowerCase() === "movie" ? "video" : components[1].toLowerCase() === "still" ? "image" : components[1].toLowerCase() };
            });
        };
        return PathParser;
    }());
    Response.PathParser = PathParser;
    /**
     *
     */
    var CinfParser = (function () {
        function CinfParser() {
        }
        /**
         *
         */
        CinfParser.prototype.parse = function (data) {
            return data;
        };
        return CinfParser;
    }());
    Response.CinfParser = CinfParser;
    /**
     *
     */
    var InfoQueuesParser = (function () {
        function InfoQueuesParser() {
        }
        /**
         *
         */
        InfoQueuesParser.prototype.parse = function (data) {
            return data;
        };
        return InfoQueuesParser;
    }());
    Response.InfoQueuesParser = InfoQueuesParser;
    /**
     *
     */
    var InfoServerParser = (function () {
        function InfoServerParser() {
        }
        /**
         *
         */
        InfoServerParser.prototype.parse = function (data) {
            return data;
        };
        return InfoServerParser;
    }());
    Response.InfoServerParser = InfoServerParser;
    /**
     *
     */
    var InfoPathsParser = (function () {
        function InfoPathsParser() {
        }
        /**
         *
         */
        InfoPathsParser.prototype.parse = function (data) {
            return data;
        };
        return InfoPathsParser;
    }());
    Response.InfoPathsParser = InfoPathsParser;
    /**
     *
     */
    var InfoSystemParser = (function () {
        function InfoSystemParser() {
        }
        /**
         *
         */
        InfoSystemParser.prototype.parse = function (data) {
            return data;
        };
        return InfoSystemParser;
    }());
    Response.InfoSystemParser = InfoSystemParser;
})(Response = exports.Response || (exports.Response = {}));

//# sourceMappingURL=../maps/lib/ResponseParsers.js.map
