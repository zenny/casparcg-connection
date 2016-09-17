"use strict";
var xml2js_1 = require("xml2js");
var Response;
(function (Response) {
    /**
     *
     */
    var StatusValidator = (function () {
        function StatusValidator() {
        }
        /**
         *
         */
        StatusValidator.prototype.resolve = function (response) {
            return null;
        };
        return StatusValidator;
    }());
    Response.StatusValidator = StatusValidator;
    /**
     *
     */
    var XMLValidator = (function () {
        function XMLValidator() {
        }
        /**
         *
         */
        XMLValidator.prototype.resolve = function (response) {
            var parseNumbers = function (str) {
                if (!isNaN(str)) {
                    str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
                }
                return str;
            };
            var returnFalse;
            var returnData;
            xml2js_1.parseString(response.items[0].replace("\n", ""), { async: false, trim: true, explicitArray: false, valueProcessors: [parseNumbers] }, function (error, result) {
                returnFalse = error;
                returnData = result;
            });
            return (returnFalse !== null) ? false : returnData;
        };
        return XMLValidator;
    }());
    Response.XMLValidator = XMLValidator;
    /**
     *
     */
    var ListValidator = (function () {
        function ListValidator() {
        }
        /**
         *
         */
        ListValidator.prototype.resolve = function (response) {
            // filters on stringitems in items-list and validates if any items present
            var stringItems = response.items.filter(function (i) { return typeof i === "string"; });
            return stringItems;
        };
        return ListValidator;
    }());
    Response.ListValidator = ListValidator;
    /**
     *
     */
    var DataValidator = (function () {
        function DataValidator() {
        }
        /**
         *
         */
        DataValidator.prototype.resolve = function (response) {
            return null;
        };
        return DataValidator;
    }());
    Response.DataValidator = DataValidator;
    /**
     *
     */
    var Base64Validator = (function () {
        function Base64Validator() {
        }
        /**
         *
         */
        Base64Validator.prototype.resolve = function (response) {
            return response.items[0];
        };
        return Base64Validator;
    }());
    Response.Base64Validator = Base64Validator;
    /**
     *
     */
    var SomeThingValidator = (function () {
        function SomeThingValidator() {
        }
        /**
         *
         */
        SomeThingValidator.prototype.resolve = function (response) {
            return null;
        };
        return SomeThingValidator;
    }());
    Response.SomeThingValidator = SomeThingValidator;
})(Response = exports.Response || (exports.Response = {}));

//# sourceMappingURL=../maps/lib/ResponseValidators.js.map
